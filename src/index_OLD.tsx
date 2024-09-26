// import { NativeModules } from 'react-native';
// import { NativeModules, Platform } from 'react-native';

// const LINKING_ERROR =
//   `The package '@iterable/react-native-sdk' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo Go\n';

// const ReactNativeSdk = NativeModules.ReactNativeSdk
//   ? NativeModules.ReactNativeSdk
//   : new Proxy(
//       {},
//       {
//         get() {
//           throw new Error(LINKING_ERROR);
//         },
//       },
//     );

// const RNIterableAPI = NativeModules.ReactIterableAPI
//   ? NativeModules.ReactIterableAPI
//   : new Proxy(
//       {},
//       {
//         get() {
//           throw new Error(LINKING_ERROR);
//         },
//       },
//     );

// export function multiply(a: number, b: number): Promise<number> {
//   return NativeModules.ReactNativeSdk?.multiply(a, b) || Promise.resolve(a * b);
// }
