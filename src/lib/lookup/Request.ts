import ql from 'superagent-graphql';

import {
  ADD_PHONE_NUMBERS_TO_REQUEST,
  CLOSE_REQUEST,
  REQUEST_PROGRESS,
  REQUEST_RESULTS_BY_TYPE,
} from './queries';
import { RequestFactory } from '../NumbersClient';
import { raiseGqlErrors } from '../util';

const MAX_NUMBERS_PER_REQUEST = 1000;
const DEFAULT_POLL_INTERVAL = 1000;
const DEFAULT_PAGE_SIZE = 100;

type RequestConstructorOptions = {
  requestFactory: RequestFactory;
  requestId: string;
};

type LookupRequestResult = {
  phoneNumber: string;
  carrierName: string;
  lrnUpdatedAt: string;
};

type EachPageOptions = {
  pageSize?: number;
  onPage?: (numbers: LookupRequestResult[]) => Promise<void> | void;
};

type ProgressUpdate = {
  completedAt: Date | null;
  progress: number | null;
};

type WaitUntilDoneOptions = {
  pollInterval?: number;
  onProgressUpdate?: (progress: number) => void;
};

type AddPhoneNumbersResponse = {
  countAdded: number;
  invalidNumbers: string[];
};

class Request {
  _requestFactroy: RequestFactory = undefined;
  requestId: string = undefined;
  closed = false;
  done = false;

  /**
   * @param options options to initialize Request instance
   */
  constructor(options: RequestConstructorOptions) {
    const { requestFactory, requestId } = options;
    this._requestFactroy = requestFactory;
    this.requestId = requestId;
  }

  /**
   * Add phone numbers to a created, open request
   * @param phoneNumbers the phone numbers to add – up to 1000
   */
  async addPhoneNumbers(
    phoneNumbers: string[],
  ): Promise<AddPhoneNumbersResponse> {
    if (this.closed) {
      throw new Error(`You cannot add numbers to a closed request`);
    }

    if (phoneNumbers.length > MAX_NUMBERS_PER_REQUEST) {
      throw new Error(
        `Please only add ${MAX_NUMBERS_PER_REQUEST} numbers at a time`,
      );
    }

    const response = await this._requestFactroy()
      .use(
        ql(ADD_PHONE_NUMBERS_TO_REQUEST, {
          phoneNumbers,
          requestId: this.requestId,
        }),
      )
      .then(raiseGqlErrors);

    return response.body.data.addPhoneNumbersToRequest;
  }

  /**
   * Close the request so that its completion can be awaited
   */
  async close() {
    await this._requestFactroy()
      .use(
        ql(CLOSE_REQUEST, {
          requestId: this.requestId,
        }),
      )
      .then(raiseGqlErrors);

    this.closed = true;
  }

  /**
   * Return the current progress and completion status
   */
  async poll(): Promise<ProgressUpdate> {
    const response = await this._requestFactroy()
      .use(
        ql(REQUEST_PROGRESS, {
          requestId: this.requestId,
        }),
      )
      .then(raiseGqlErrors);

    const { completedAt, progress } =
      response.body.data.requestProgress.requestProgressResult;

    const result: ProgressUpdate = {
      completedAt: completedAt !== null ? new Date(completedAt) : null,
      progress: parseFloat(progress),
    };

    return result;
  }

  /**
   * @hidden
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   *
   * @param param0
   */
  async waitUntilDone(options: WaitUntilDoneOptions) {
    const { onProgressUpdate, pollInterval = DEFAULT_POLL_INTERVAL } = options;
    if (!this.closed) {
      throw new Error(
        'You must close a request before awaiting its completion',
      );
    }

    const usePollingFunction = typeof onProgressUpdate === 'function';

    while (!this.done) {
      const pollResult = await this.poll();
      const completedAt = pollResult.completedAt;
      const progress = pollResult.progress;
      if (completedAt !== null) {
        this.done = true;
      }

      if (usePollingFunction) {
        onProgressUpdate(progress);
      }

      this.sleep(pollInterval);
    }
  }

  /**
   * @hidden
   */
  wrapEachPage(phoneType: string) {
    const eachPage = async (options: EachPageOptions) => {
      const { pageSize = DEFAULT_PAGE_SIZE, onPage } = options;

      const useOnPageFunction = typeof onPage === 'function';

      let cursor: string;
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await this._requestFactroy()
          .use(
            ql(REQUEST_RESULTS_BY_TYPE, {
              cursor,
              pageSize,
              phoneType: phoneType.toUpperCase(),
              requestId: this.requestId,
            }),
          )
          .then(raiseGqlErrors);

        const pageInfo = response.body.data.requestResults.pageInfo;
        const numbers = response.body.data.requestResults.nodes;

        hasNextPage = pageInfo.hasNextPage;
        cursor = pageInfo.endCursor;

        if (useOnPageFunction) await onPage(numbers);
      }
    };

    return eachPage;
  }

  mobiles = {
    eachPage: this.wrapEachPage('mobile'),
  };

  landlines = {
    eachPage: this.wrapEachPage('landline'),
  };

  invalids = {
    eachPage: this.wrapEachPage('invalid'),
  };

  voips = {
    eachPage: this.wrapEachPage('voip'),
  };

  unknowns = {
    eachPage: this.wrapEachPage('unknown'),
  };
}

export { Request };
