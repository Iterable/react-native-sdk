#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTUtils.h>
#import <React/RCTConvert.h>
#import <React/RCTTurboModuleRegistry.h>
#import <RNIterableAPISpec/RNIterableAPISpec.h>

@interface RNIterableAPI : RCTEventEmitter <NativeRNIterableAPISpec>

@end
