#import "RNIterableInboxView.h"
#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <React/RCTUtils.h>
#import <IterableSDK/IterableSDK.h>

using namespace facebook::react;

@implementation RNIterableInboxView {
    IterableInboxViewController *_inboxViewController;
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const RNIterableInboxViewProps>();
        _props = defaultProps;

        _inboxViewController = [[IterableInboxViewController alloc] init];
        [self addSubview:_inboxViewController.view];
    }
    return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps {
    const auto &oldViewProps = *std::static_pointer_cast<const RNIterableInboxViewProps>(_props);
    const auto &newViewProps = *std::static_pointer_cast<const RNIterableInboxViewProps>(props);

    [super updateProps:props oldProps:oldProps];

    // Update inbox view controller properties
    if (oldViewProps.noMessagesTitle != newViewProps.noMessagesTitle) {
        _inboxViewController.noMessagesTitle = RCTNSStringFromString(newViewProps.noMessagesTitle);
    }

    if (oldViewProps.noMessagesBody != newViewProps.noMessagesBody) {
        _inboxViewController.noMessagesBody = RCTNSStringFromString(newViewProps.noMessagesBody);
    }

    if (oldViewProps.showDate != newViewProps.showDate) {
        _inboxViewController.showDate = newViewProps.showDate;
    }

    if (oldViewProps.showUnreadBadge != newViewProps.showUnreadBadge) {
        _inboxViewController.showUnreadBadge = newViewProps.showUnreadBadge;
    }

    if (oldViewProps.showInboxTitle != newViewProps.showInboxTitle) {
        _inboxViewController.showInboxTitle = newViewProps.showInboxTitle;
    }

    if (oldViewProps.inboxTitle != newViewProps.inboxTitle) {
        _inboxViewController.inboxTitle = RCTNSStringFromString(newViewProps.inboxTitle);
    }

    if (oldViewProps.showInboxOnAppear != newViewProps.showInboxOnAppear) {
        _inboxViewController.showInboxOnAppear = newViewProps.showInboxOnAppear;
    }
}

- (void)layoutSubviews {
    [super layoutSubviews];
    _inboxViewController.view.frame = self.bounds;
}

@end

Class<RCTComponentViewProtocol> RNIterableInboxViewCls(void) {
    return RNIterableInboxView.class;
}
