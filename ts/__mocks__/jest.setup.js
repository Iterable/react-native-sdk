jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js')

import * as ReactNative from 'react-native';

class RNIterableAPIMock {
  static email;

  static getEmail() {
    return new Promise((resolve, reject) => {
      resolve(email)
    })
  }

  static setEmail(value) {
    email = value
  }
}

jest.doMock('react-native', () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      // Mock RNIterableAPI
      NativeModules: {
        ...ReactNative.NativeModules,
        RNIterableAPI: RNIterableAPIMock,
      },
    },
    ReactNative,
  );
});