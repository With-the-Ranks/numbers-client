import test from 'ava';
import request from 'superagent';

import { RoutingClient, ROUTING_PATH } from './RoutingClient';
import { RequestFactoryWrapper, DEFAULT_BASE_URL } from '../NumbersClient';

if (!process.env.TEST_API_KEY) {
  console.log('Must set env var TEST_API_KEY to run tests');
  process.exit(1);
}

if (!process.env.TEST_PROFILE_ID) {
  console.log('Must set env var TEST_PROFILE_ID to run tests');
  process.exit(1);
}

if (!process.env.TEST_DESTINATION_PHONE_NUMBER) {
  console.log('Must set env var TEST_DESTINATION_PHONE_NUMBER to run tests');
  process.exit(1);
}

const { TEST_API_KEY, TEST_PROFILE_ID, TEST_DESTINATION_PHONE_NUMBER } =
  process.env;

const REQUEST: RequestFactoryWrapper = (path) => () =>
  request.get(`${DEFAULT_BASE_URL}${path}`).set('token', TEST_API_KEY);

test('can get number for contact', async (t) => {
  const client = new RoutingClient({ requestWrapper: REQUEST });
  const response = await client.getNumberForContact({
    toNumber: TEST_DESTINATION_PHONE_NUMBER,
    profileId: TEST_PROFILE_ID,
    contactZipCode: '10001',
  });
  t.is(typeof response.fromNumber, 'string');
});
