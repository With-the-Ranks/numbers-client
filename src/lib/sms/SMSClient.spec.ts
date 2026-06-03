import test from 'ava';
import request from 'superagent';

import { SMSClient } from './SMSClient';
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

const { TEST_API_KEY, TEST_PROFILE_ID } = process.env;
const TEST_CENTER = '11205';
const PURCHASING_STRATEGY = 'SAME_STATE_BY_DISTANCE';
const randomInt = Math.round(Math.random() * 1000);
const LOCATION_REFERENCE_NAME = `TestLocation_${Date.now()}_${randomInt}`;

const REQUEST: RequestFactoryWrapper = (path) => () =>
  request.post(`${DEFAULT_BASE_URL}${path}`).set('token', TEST_API_KEY);

const client = new SMSClient({ requestWrapper: REQUEST });

test('can create sending location', async (t) => {
  const response = await client.createSendingLocation({
    profileId: TEST_PROFILE_ID,
    referenceName: LOCATION_REFERENCE_NAME,
    purchasingStrategy: PURCHASING_STRATEGY,
    center: TEST_CENTER,
  });

  t.is(typeof response.data.createSendingLocation.sendingLocation, 'object');
  t.is(
    Array.isArray(
      response.data.createSendingLocation.sendingLocation.areaCodes,
    ),
    true,
  );
});
