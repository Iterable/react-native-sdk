#import "RNIterableInboxViewCompat.h"
#import <React/RCTUtils.h>

@implementation RNIterableInboxViewCompat {
    IterableInboxViewController *_inboxViewController;
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        _inboxViewController = [[IterableInboxViewController alloc] init];
        _inboxViewController.delegate = self;
        [self addSubview:_inboxViewController.view];

        // Set default values
        _showDate = YES;
        _showUnreadBadge = YES;
        _showInboxTitle = YES;
        _showInboxOnAppear = YES;
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    _inboxViewController.view.frame = self.bounds;
}

#pragma mark - Property Setters

- (void)setNoMessagesTitle:(NSString *)noMessagesTitle {
    _noMessagesTitle = [noMessagesTitle copy];
    _inboxViewController.noMessagesTitle = noMessagesTitle;
}

- (void)setNoMessagesBody:(NSString *)noMessagesBody {
    _noMessagesBody = [noMessagesBody copy];
    _inboxViewController.noMessagesBody = noMessagesBody;
}

- (void)setShowDate:(BOOL)showDate {
    _showDate = showDate;
    _inboxViewController.showDate = showDate;
}

- (void)setShowUnreadBadge:(BOOL)showUnreadBadge {
    _showUnreadBadge = showUnreadBadge;
    _inboxViewController.showUnreadBadge = showUnreadBadge;
}

- (void)setShowInboxTitle:(BOOL)showInboxTitle {
    _showInboxTitle = showInboxTitle;
    _inboxViewController.showInboxTitle = showInboxTitle;
}

- (void)setInboxTitle:(NSString *)inboxTitle {
    _inboxTitle = [inboxTitle copy];
    _inboxViewController.inboxTitle = inboxTitle;
}

- (void)setShowInboxOnAppear:(BOOL)showInboxOnAppear {
    _showInboxOnAppear = showInboxOnAppear;
    _inboxViewController.showInboxOnAppear = showInboxOnAppear;
}

#pragma mark - IterableInboxViewControllerDelegate

- (void)iterableInboxViewController:(IterableInboxViewController *)viewController
                    didSelectMessage:(IterableInAppMessage *)message {
    if (_onMessageSelected) {
        _onMessageSelected(@{
            @"messageId": message.messageId,
            @"campaignId": @(message.campaignId)
        });
    }
}

- (void)iterableInboxViewController:(IterableInboxViewController *)viewController
                    didDismissMessage:(IterableInAppMessage *)message {
    if (_onMessageDismissed) {
        _onMessageDismissed(@{
            @"messageId": message.messageId,
            @"campaignId": @(message.campaignId)
        });
    }
}

- (void)iterableInboxViewControllerDidShowEmptyState:(IterableInboxViewController *)viewController {
    if (_onInboxEmpty) {
        _onInboxEmpty(nil);
    }
}

@end
