import ql from 'superagent-graphql';

import {
  GET_SENDING_LOCATIONS,
  CREATE_SENDING_LOCATION,
  UPDATE_SENDING_LOCATION,
  DELETE_SENDING_LOCATION,
  SEND_MESSAGE,
} from './queries';
import { RequestFactoryWrapper, RequestFactory } from '../NumbersClient';
import { raiseGqlErrors } from '../util';

export const SMS_GRAPHQL_PATH = '/sms/graphql';

interface CreateSendingLocationInput {
  profileId: string;
  referenceName: string;
  purchasingStrategy: string;
  center: string;
}

interface UpdateSendingLocationPatch {
  referenceName?: string;
  areaCodes?: string[];
  center?: string;
}

interface SendMessageInput {
  profileId: string;
  to: string;
  body: string;
  mediaUrls?: string[];
  contactZipCode?: string;
  sendBefore: string;
}

export interface SendingLocation {
  id: string;
  areaCodes: string[];
  center: string;
  referenceName: string;
}

interface GraphQLError {
  message: string;
  locations: string[];
  path: string[];
}

interface QueryResult<T> {
  data: T;
  errors?: GraphQLError[];
}

type CreateSendingLocationResult = QueryResult<{
  createSendingLocation: { sendingLocation: SendingLocation };
}>;

type UpdateSendingLocationResult = QueryResult<{
  updateSendingLocation: { sendingLocation: SendingLocation };
}>;

type GetSendingLocationsResult = QueryResult<{
  sendingLocations: {
    nodes: SendingLocation[];
  };
}>;

type DeleteSendingLocationResult = QueryResult<{
  deleteSendingLocation: {
    sendingLocation: {
      id: string;
    };
  };
}>;

type SendMessageResult = QueryResult<{
  sendMessage: {
    outboundMessage: {
      id: string;
    };
  };
}>;

type SMSClientConstructor = {
  requestWrapper: RequestFactoryWrapper;
  smsGraphqlPath?: string;
};

class SMSClient {
  _requestFactory: RequestFactory = null;
  smsGraphqlPath: string = SMS_GRAPHQL_PATH;

  /**
   * @param options SMSClient initialization options
   */
  constructor(options: SMSClientConstructor) {
    const { requestWrapper, smsGraphqlPath } = options;

    if (!requestWrapper) {
      throw new Error('Parameter `requestWrapper` required in constructor');
    }

    if (smsGraphqlPath) {
      this.smsGraphqlPath = smsGraphqlPath;
    }

    this._requestFactory = requestWrapper(this.smsGraphqlPath);
  }

  request = () => this._requestFactory();

  createSendingLocation = async (
    args: CreateSendingLocationInput,
  ): Promise<CreateSendingLocationResult> => {
    const response = await this.request()
      .use(ql(CREATE_SENDING_LOCATION, args))
      .then(raiseGqlErrors);
    return response.body;
  };

  updateSendingLocation = async (
    id: string,
    patch: UpdateSendingLocationPatch,
  ): Promise<UpdateSendingLocationResult> => {
    const response = await this.request()
      .use(ql(UPDATE_SENDING_LOCATION, { id, patch }))
      .then(raiseGqlErrors);
    return response.body;
  };

  deleteSendingLocation = async (
    id: string,
  ): Promise<DeleteSendingLocationResult> => {
    const response = await this.request()
      .use(ql(DELETE_SENDING_LOCATION, { id }))
      .then(raiseGqlErrors);
    return response.body;
  };

  getSendingLocations = async (
    profileId: string,
  ): Promise<GetSendingLocationsResult> => {
    const response = await this.request()
      .use(ql(GET_SENDING_LOCATIONS, { profileId }))
      .then(raiseGqlErrors);
    return response.body;
  };

  sendMessage = async (args: SendMessageInput): Promise<SendMessageResult> => {
    const response = await this.request()
      .use(ql(SEND_MESSAGE, args))
      .then(raiseGqlErrors);
    return response.body;
  };
}

export { SMSClient };
