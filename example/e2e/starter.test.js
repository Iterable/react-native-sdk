import { device, element, by, expect, waitFor } from 'detox';
import { ITBL_API_KEY, ITBL_ID } from '@env';

describe('Example', () => {
  beforeAll(async () => {
    await device.terminateApp();
    await device.launchApp({
      // launchArgs: { detoxEnableSynchronization: 0 },
      newInstance: true,
    });
  });

  beforeEach(async () => {});

  afterAll(async () => {
    await detox.cleanup();
    await device.terminateApp();
  });

  it('should be able to login', async () => {
    await expect(element(by.text('Login'))).toBeVisible();
    await element(by.id('api-key')).replaceText(ITBL_API_KEY);
    await element(by.id('user-id')).replaceText(ITBL_ID);
    await element(by.text('Login')).tap();
    await waitFor(element(by.id('inbox-header'))).toBeVisible();
  });
});
