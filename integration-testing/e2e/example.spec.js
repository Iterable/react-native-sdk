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

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});