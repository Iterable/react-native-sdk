#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>

#if RCT_NEW_ARCH_ENABLED

  #import <React/RCTUtils.h>
  #import <React/RCTConvert.h>
  #import <React/RCTTurboModuleRegistry.h>
  #import <RNIterableAPISpec/RNIterableAPISpec.h>
@interface RNIterableAPI : RCTEventEmitter <NativeRNIterableAPISpec>

#endif

@end
