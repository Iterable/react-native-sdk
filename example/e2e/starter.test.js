describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {});

  it('should be able to login', async () => {
    await expect(element(by.text('Login'))).toBeVisible();
    // await element(by.id('api-key')).tap();
    await element(by.id('api-key')).replaceText(
      '42404ed640b44645ac8133499b515e23'
    );
    await element(by.id('user-id')).replaceText('loren.posen@iterable.com');
    await element(by.text('Login')).tap();
    await waitFor(element(by.id('inbox')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
