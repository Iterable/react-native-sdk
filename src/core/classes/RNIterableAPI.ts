import { NativeModules } from 'react-native';

// const LINKING_ERROR =
//   `The package '@iterable/react-native-sdk' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo Go\n';

/**
 * A bridge between React Native and the native Iterable SDK.
 *
 * If the module is not available, it throws an error when accessed.
 *
 * @type {object}
 * @throws {Error} Throws an error if the RNIterableAPI module is not linked properly.
 */
export const RNIterableAPI = NativeModules.RNIterableAPI;
  // ? NativeModules.RNIterableAPI
  // : new Proxy(
  //     {},
  //     {
  //       get() {
  //         throw new Error(LINKING_ERROR);
  //       },
  //     }
  //   );
