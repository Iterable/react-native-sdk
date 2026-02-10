//
//  JwtTokenModule.m
//  ReactNativeSdkExample
//
//  React Native module bridge for JWT token generation
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(JwtTokenModule, NSObject)

RCT_EXTERN_METHOD(generateJwtToken:(NSString *)secret
                  durationMs:(double)durationMs
                  email:(NSString *)email
                  userId:(NSString *)userId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

@end

