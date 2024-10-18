/** @type {Detox.DetoxConfig} */
module.exports = {
  behavior: {
    init: {
      reinstallApp: true,
      exposeGlobals: true,
    },
    launchApp: 'auto',
    cleanup: {
      shutdownDevice: true,
    },
  },
  logger: {
    level: process.env.CI ? 'debug' : undefined,
  },
  skipLegacyWorkersInjection: true,
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
      maxWorkers: process.env.CI ? 2 : undefined,
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  artifacts: {
    plugins: {
      log: process.env.CI ? 'failing' : undefined,
      screenshot: process.env.CI ? 'failing' : undefined,
      video: process.env.CI ? 'failing' : undefined,
      timeline: process.env.CI ? 'all' : undefined,
      instruments: process.env.CI ? 'all' : undefined,
      uiHierarchy: process.env.DETOX_ARGV_OVERRIDE ? 'enabled' : undefined,
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/ReactNativeSdkExample.app',
      build:
        'xcodebuild -workspace ios/ReactNativeSdkExample.xcworkspace -scheme ReactNativeSdkExample -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/ReactNativeSdkExample.app',
      build:
        'xcodebuild -workspace ios/ReactNativeSdkExample.xcworkspace -scheme ReactNativeSdkExample -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      reversePorts: [8081],
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build:
        'cd android ; ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release ; cd -',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      headless: Boolean(process.env.CI),
      device: {
        type: 'iPhone SE (3rd generation)',
      },
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*',
      },
    },
    emulator: {
      type: 'android.emulator',
      headless: Boolean(process.env.CI),
      gpuMode: process.env.CI ? 'off' : undefined,
      device: {
        avdName: 'Pixel_3a_API_34',
      },
    },
    'emulator.ci': {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_3a_API_34',
      },
      bootArgs: '-no-boot-anim -noaudio -camera-back none',
      headless: true,
      gpuMode: 'swiftshader_indirect',
      readonly: true,
      forceAdbInstall: true,
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release',
    },
    'ios.manual': {
      type: 'ios.manual',
      behavior: {
        launchApp: 'manual',
      },
      artifacts: false,
      session: {
        autoStart: true,
        server: 'ws://localhost:8099',
        sessionId: 'com.iterable.reactnativesdk.example',
      },
    },
    'android.att.debug': {
      device: 'attached',
      app: 'android.debug',
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.release',
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
    'android.emu.release': {
      device: 'emulator.ci',
      app: 'android.release',
    },
  },
};
