import { device } from 'detox';

// eslint-disable-next-line no-undef
beforeAll(async () => {
  await device.launchApp({
    /**
     * Uncomment the following lines to enable verbose logging of
     * synchronization issues.
     * See: https://wix.github.io/Detox/docs/next/troubleshooting/synchronization
     */
    // launchArgs: {
    //   DTXEnableVerboseSyncSystem: 'YES',
    //   DTXEnableVerboseSyncResources: 'YES',
    // },
    newInstance: true,
  });
});
