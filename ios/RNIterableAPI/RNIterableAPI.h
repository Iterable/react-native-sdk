#import <Foundation/Foundation.h>

#if RCT_NEW_ARCH_ENABLED

#import <RNIterableAPISpec/RNIterableAPISpec.h>
#import <React/RCTUtils.h>
#import <React/RCTConvert.h>
#import <React/RCTTurboModuleRegistry.h>
@interface RNIterableAPI : NSObject <NativeRNIterableAPISpec>

// #else
// #import <React/RCTEventEmitter.h>
// #import <React/RCTBridgeModule.h>
// @interface RNIterableAPI : RCTEventEmitter <RCTBridgeModule>

#endif

@end
