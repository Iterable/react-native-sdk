#import "RNIterableAPI.h"
#import <React/RCTLog.h>

@import IterableSDK;

@implementation RNIterableAPI;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initializeWithApiKey: (NSString *) apiKey) {
    RCTLogInfo(@"IterableAPI.initialize(:apiKey)");
    [IterableAPI initializeWithApiKey: apiKey];
}

RCT_REMAP_METHOD(getInAppMessages,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    NSArray* messages =  [[IterableAPI inAppManager] getMessages];
    resolve(messages);
}

RCT_EXPORT_METHOD(setEmail: (NSString *) email) {
    IterableAPI.email = email;
    RCTLogInfo(@"Setting Iterable email %@", email);
}

RCT_EXPORT_METHOD(track: (NSString *) event) {
    [IterableAPI track:event];
    RCTLogInfo(@"Tracking event %@", event);
}

@end
