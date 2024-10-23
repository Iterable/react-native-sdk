import * as ReactNative from 'react-native';

import { MockRNIterableAPI } from './MockRNIterableAPI';
import { MockLinking } from './MockLinking';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js');

jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return {
    WebView: View,
  };
});

jest.doMock('react-native', () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      // Mock RNIterableAPI
      NativeModules: {
        ...ReactNative.NativeModules,
        RNIterableAPI: MockRNIterableAPI,
      },
      Linking: MockLinking,
    },
    ReactNative
  );
});
