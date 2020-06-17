//
//  Created by Tapash Majumder on 6/17/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(RNE2E, ReactE2E, NSObject)

RCT_EXTERN_METHOD(sendCommand: (nonnull NSString *) command)

@end
