import { RequestFactoryWrapper, RequestFactory } from '../NumbersClient';

export const ROUTING_PATH = '/routing/get-number-for-contact';

type RoutingClientConstructor = {
  requestWrapper: RequestFactoryWrapper;
  routingPath?: string;
};

interface GetNumberForContactArgs {
  toNumber: string;
  profileId: string;
  contactZipCode?: string;
}

interface GetNumberForContactResult {
  fromNumber: string;
}

class RoutingClient {
  _requestFactory: RequestFactory = null;
  routingPath: string = ROUTING_PATH;

  constructor(options: RoutingClientConstructor) {
    const { requestWrapper, routingPath } = options;

    if (!requestWrapper) {
      throw new Error('Parameter `requestWrapper` required in constructor');
    }

    if (routingPath) {
      this.routingPath = routingPath;
    }

    this._requestFactory = requestWrapper(this.routingPath);
  }

  getNumberForContact = async (
    args: GetNumberForContactArgs,
  ): Promise<GetNumberForContactResult> => {
    const { toNumber, profileId, contactZipCode } = args;
    const query: Record<string, string> = {
      to_number: toNumber,
      profile_id: profileId,
    };
    if (contactZipCode) {
      query.contact_zip_code = contactZipCode;
    }
    const response = await this._requestFactory().query(query);
    return { fromNumber: response.body.from_number };
  };
}

export { RoutingClient };
