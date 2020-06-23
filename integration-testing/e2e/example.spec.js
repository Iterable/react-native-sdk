describe('Iterable', () => {
  beforeEach(async () => {
    // await device.reloadReactNative();
  });

  it('should have Login button', async () => {
    // await expect(element(by.id('Logout'))).toBeVisible();
    await expect(element(by.id('loginBtn'))).toBeVisible();
  });

  it('Login User', async () => {
    await expect(element(by.id('loginText'))).toBeVisible();
    await element(by.id('loginText')).typeText('user@example.com');
    await element(by.id('loginBtn')).multiTap(2);
    await waitFor(element(by.id('logoutBtn'))).toBeVisible();
  });

  it('Send in-app', async () => {
    await element(by.id('sendInAppBtn')).tap();
    await waitFor(element(by.text('Later'))).toExist().withTimeout(10000);
    //await element(by.text('Later')).tap();
  });
});