#import "RNIterableSDK.h"
#import <React/RCTLog.h>

@import IterableSDK;

@implementation RNIterableSDK;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setEmail: (NSString *) email) {
    IterableAPI.email = email;
    RCTLogInfo(@"Setting Iterable email %@", email);
}

RCT_EXPORT_METHOD(track: (NSString *) event) {
    [IterableAPI track:event];
    RCTLogInfo(@"Tracking event %@", event);
}

@end
