#import "RNIterableSDK.h"
#import <React/RCTLog.h>

@import IterableSDK;

@implementation RNIterableSDK;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location) {
    NSLog(@"Hello, World!");
    NSLog(@"Something Else");
    RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

RCT_EXPORT_METHOD(setEmail: (NSString *) email) {
    IterableAPI.email = email;
    RCTLogInfo(@"set email");
}

@end
