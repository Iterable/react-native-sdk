// #if RCT_NEW_ARCH_ENABLED
//   #import <RNIterableAPISpec/RNIterableAPISpec.h>
//   #import <React/RCTEventEmitter.h>
//   @interface RNIterableAPI : RCTEventEmitter <NativeRNIterableAPISpec>
//   @end
// #else
//   #import <React/RCTEventEmitter.h>
//   #import <React/RCTBridgeModule.h>
//   @interface RNIterableAPI : RCTEventEmitter <RCTBridgeModule>
//   @end
// #endif

#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>

#if RCT_NEW_ARCH_ENABLED

#import <RNIterableAPISpec/RNIterableAPISpec.h>
@interface RNIterableAPI : RCTEventEmitter <NativeRNIterableAPISpec>

#else

#import <React/RCTBridgeModule.h>
@interface RNIterableAPI : RCTEventEmitter <RCTBridgeModule>

#endif

@end
