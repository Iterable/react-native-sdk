#import "RNIterableInboxViewManager.h"
#import "RNIterableInboxViewCompat.h"
#import <React/RCTUIManager.h>
#import <React/RCTBridge.h>

@implementation RNIterableInboxViewManager

RCT_EXPORT_MODULE(RNIterableInboxView)

- (UIView *)view {
    return [[RNIterableInboxViewCompat alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(noMessagesTitle, NSString)
RCT_EXPORT_VIEW_PROPERTY(noMessagesBody, NSString)
RCT_EXPORT_VIEW_PROPERTY(showDate, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showUnreadBadge, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showInboxTitle, BOOL)
RCT_EXPORT_VIEW_PROPERTY(inboxTitle, NSString)
RCT_EXPORT_VIEW_PROPERTY(showInboxOnAppear, BOOL)

RCT_EXPORT_VIEW_PROPERTY(onMessageSelected, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMessageDismissed, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onInboxEmpty, RCTDirectEventBlock)

@end
