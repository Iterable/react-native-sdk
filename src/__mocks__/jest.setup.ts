import * as ReactNative from 'react-native';

import { MockRNIterableAPI } from './MockRNIterableAPI';
import { MockLinking } from './MockLinking';

const mockNativeEventEmitter =
  new (require('events').EventEmitter)() as import('events').EventEmitter;

const mockNativeEventEmitterConstructor = jest.fn().mockImplementation(() => ({
  addListener: (
    eventType: string,
    listener: (...args: unknown[]) => void
  ) => {
    mockNativeEventEmitter.addListener(eventType, listener);

    return {
      remove: () => mockNativeEventEmitter.removeListener(eventType, listener),
    };
  },
  emit: (eventType: string, ...args: unknown[]) =>
    mockNativeEventEmitter.emit(eventType, ...args),
  removeAllListeners: (eventType?: string) =>
    eventType
      ? mockNativeEventEmitter.removeAllListeners(eventType)
      : mockNativeEventEmitter.removeAllListeners(),
  removeListener: (
    eventType: string,
    listener: (...args: unknown[]) => void
  ) => mockNativeEventEmitter.removeListener(eventType, listener),
}));

jest.mock(
  'react-native/Libraries/EventEmitter/NativeEventEmitter',
  () => mockNativeEventEmitterConstructor
);

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
      Linking: MockLinking,
      NativeEventEmitter: mockNativeEventEmitterConstructor,
      TurboModuleRegistry: {
        ...ReactNative.TurboModuleRegistry,
        getEnforcing: jest.fn((name: string) => {
          if (name === 'RNIterableAPI') {
            return MockRNIterableAPI;
          }

          return ReactNative.TurboModuleRegistry.getEnforcing(name);
        }),
      },
    },
    ReactNative
  );
});
