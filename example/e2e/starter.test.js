const API_KEY = '42404ed640b44645ac8133499b515e23';
const USER = 'loren.posen@iterable.com';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {});

  it('should be able to login', async () => {
    await expect(element(by.text('Login'))).toBeVisible();
    await element(by.id('api-key')).replaceText(API_KEY);
    await element(by.id('user-id')).replaceText(USER);
    await element(by.text('Login')).tap();
    await waitFor(element(by.id('inbox-header'))).toBeVisible();
  });
});
