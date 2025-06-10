#import <React/RCTBridgeModule.h>
#ifdef RCT_NEW_ARCH_ENABLED
#import <RNIterableSpec/RNIterableSpec.h>
#endif // RCT_NEW_ARCH_ENABLED

@interface RNIterableAPI: NSObject <RCTBridgeModule>

@end

#ifdef RCT_NEW_ARCH_ENABLED
@interface RNIterableAPI () <RNIterableSpec>

@end
#endif // RCT_NEW_ARCH_ENABLED
