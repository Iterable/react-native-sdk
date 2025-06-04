#import <React/RCTView.h>
#import <React/RCTComponent.h>
#import <IterableSDK/IterableSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNIterableInboxViewCompat : RCTView

@property (nonatomic, copy) NSString *noMessagesTitle;
@property (nonatomic, copy) NSString *noMessagesBody;
@property (nonatomic, assign) BOOL showDate;
@property (nonatomic, assign) BOOL showUnreadBadge;
@property (nonatomic, assign) BOOL showInboxTitle;
@property (nonatomic, copy) NSString *inboxTitle;
@property (nonatomic, assign) BOOL showInboxOnAppear;

@property (nonatomic, copy) RCTDirectEventBlock onMessageSelected;
@property (nonatomic, copy) RCTDirectEventBlock onMessageDismissed;
@property (nonatomic, copy) RCTDirectEventBlock onInboxEmpty;

@end

NS_ASSUME_NONNULL_END
