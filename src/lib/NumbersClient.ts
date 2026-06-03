import request from 'superagent';
import crypto from 'crypto';
import ql from 'superagent-graphql';

import { LookupClient } from './lookup/LookupClient';
import { SMSClient } from './sms/SMSClient';
import { RoutingClient } from './routing/RoutingClient';
import { raiseGqlErrors } from './util';

export const DEFAULT_BASE_URL = 'https://switchboard.spokewtr.com';

export type RequestFactory = () => request.SuperAgentRequest;
export type RequestFactoryWrapper = (path?: string) => RequestFactory;

type NumbersClientConstructor = {
  apiKey: string;
  endpointBaseUrl?: string;
};

class NumbersClient {
  apiKey: string = null;
  endpointBaseUrl: string = DEFAULT_BASE_URL;
  lookup: LookupClient = null;
  sms: SMSClient = null;
  routing: RoutingClient = null;

  /**
   * @param options NumbersClient initialization options
   */
  constructor(options: NumbersClientConstructor) {
    const { apiKey, endpointBaseUrl } = options;
    if (!apiKey) {
      throw new Error('Parameter `apiKey` required in constructor');
    }

    this.apiKey = apiKey;

    if (endpointBaseUrl) {
      this.endpointBaseUrl = endpointBaseUrl;
    }

    this.lookup = new LookupClient({ requestWrapper: this._requestWrapper });
    this.sms = new SMSClient({ requestWrapper: this._requestWrapper });
    this.routing = new RoutingClient({
      requestWrapper: this._getRequestWrapper,
    });
  }

  /**
   * @hidden
   */
  _requestWrapper =
    (path = '') =>
    () =>
      request.post(`${this.endpointBaseUrl}${path}`).set('token', this.apiKey);

  /**
   * @hidden
   */
  _getRequestWrapper =
    (path = '') =>
    () =>
      request.get(`${this.endpointBaseUrl}${path}`).set('token', this.apiKey);

  /**
   * If you need to make a rawGraphQL request for some access pattern
   * not supported, you can use this endpoint
   * @param query a GraphQL query string to run
   * @param variables variables matching your graphql query
   */
  rawGraphQLRequest = async (path: string, query, variables) => {
    const response = await this._requestWrapper(path)()
      .use(ql(query, variables))
      .then(raiseGqlErrors);
    return response.body.data;
  };

  validateInboundMessageWebhook = (messageId: string, signature: string) => {
    const expectedSignature = crypto
      .createHmac('sha1', this.apiKey)
      .update(messageId)
      .digest('hex');

    return signature === expectedSignature;
  };

  validateDeliveryReportWebhook = (
    messageId: string,
    eventType: string,
    signature: string,
  ) => {
    const expectedSignature = crypto
      .createHmac('sha1', this.apiKey)
      .update(`${messageId}|${eventType}`)
      .digest('hex');

    return signature === expectedSignature;
  };
}

export { NumbersClient };
