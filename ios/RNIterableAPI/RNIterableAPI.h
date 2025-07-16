//
//  RNIterableAPI.h
//  RNIterableAPI
//
//  Created by Loren Posen on 6/11/25.
//  Copyright © 2025 Iterable. All rights reserved.
//
#import <React/RCTBridgeModule.h>
#import <React/RCTTurboModule.h>
#ifdef RCT_NEW_ARCH_ENABLED
#import <ReactIterableAPI/ReactIterableAPI.h>
#endif

@interface ReactIterableAPI : NSObject <RCTBridgeModule, RCTTurboModule>
@end

#ifdef RCT_NEW_ARCH_ENABLED
@interface ReactIterableAPI () <NativeRNIterableAPISpec>

@end
#endif