describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have set email button', async () => {
    await expect(element(by.text('Set Email'))).toBeVisible();
  });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});