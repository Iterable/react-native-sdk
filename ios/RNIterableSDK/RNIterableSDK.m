#import "RNIterableSDK.h"
#import <React/RCTLog.h>

@import IterableSDK;

@implementation RNIterableSDK;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initializeWithApiKey: (NSString *) apiKey) {
    RCTLogInfo(@"IterableAPI.initialize(:apiKey)");
    [IterableAPI initializeWithApiKey: apiKey];
}

RCT_REMAP_METHOD(getMessages,
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
