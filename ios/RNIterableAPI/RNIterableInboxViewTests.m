#import <XCTest/XCTest.h>
#import "RNIterableInboxView.h"
#import "RNIterableInboxViewProps.h"
#import <OCMock/OCMock.h>
#import <IterableSDK/IterableSDK.h>

@interface RNIterableInboxViewTests : XCTestCase

@property (nonatomic, strong) RNIterableInboxView *inboxView;
@property (nonatomic, strong) id mockInboxViewController;

@end

@implementation RNIterableInboxViewTests

- (void)setUp {
    [super setUp];
    self.inboxView = [[RNIterableInboxView alloc] init];
    self.mockInboxViewController = OCMClassMock([IterableInboxViewController class]);
    self.inboxView.inboxViewController = self.mockInboxViewController;
}

- (void)tearDown {
    self.inboxView = nil;
    self.mockInboxViewController = nil;
    [super tearDown];
}

#pragma mark - Initialization Tests

- (void)testInitialization {
    // Then
    XCTAssertNotNil(self.inboxView);
    XCTAssertNotNil(self.inboxView.inboxViewController);
}

#pragma mark - Props Update Tests

- (void)testUpdateProps {
    // Given
    RNIterableInboxViewProps props;
    props.noMessagesTitle = @"No Messages";
    props.noMessagesBody = @"You have no messages";
    props.showDate = YES;
    props.showUnreadBadge = YES;
    props.showInboxTitle = YES;
    props.inboxTitle = @"My Inbox";
    props.showInboxOnAppear = YES;

    // When
    [self.inboxView updateProps:props];

    // Then
    OCMVerify([self.mockInboxViewController setNoMessagesTitle:@"No Messages"]);
    OCMVerify([self.mockInboxViewController setNoMessagesBody:@"You have no messages"]);
    OCMVerify([self.mockInboxViewController setShowDate:YES]);
    OCMVerify([self.mockInboxViewController setShowUnreadBadge:YES]);
    OCMVerify([self.mockInboxViewController setShowInboxTitle:YES]);
    OCMVerify([self.mockInboxViewController setInboxTitle:@"My Inbox"]);
    OCMVerify([self.mockInboxViewController setShowInboxOnAppear:YES]);
}

#pragma mark - Layout Tests

- (void)testLayoutSubviews {
    // Given
    CGRect frame = CGRectMake(0, 0, 320, 480);
    self.inboxView.frame = frame;

    // When
    [self.inboxView layoutSubviews];

    // Then
    XCTAssertEqual(self.inboxView.inboxViewController.view.frame.origin.x, 0);
    XCTAssertEqual(self.inboxView.inboxViewController.view.frame.origin.y, 0);
    XCTAssertEqual(self.inboxView.inboxViewController.view.frame.size.width, 320);
    XCTAssertEqual(self.inboxView.inboxViewController.view.frame.size.height, 480);
}

#pragma mark - Message Selection Tests

- (void)testMessageSelection {
    // Given
    NSString *messageId = @"test-message";
    NSDictionary *data = @{@"key": @"value"};

    // When
    [self.inboxView inboxViewController:self.mockInboxViewController didSelectMessage:messageId data:data];

    // Then
    // Verify that the message selection event is emitted
    // Note: This would require additional setup to verify event emission
}

#pragma mark - Message Dismissal Tests

- (void)testMessageDismissal {
    // Given
    NSString *messageId = @"test-message";

    // When
    [self.inboxView inboxViewController:self.mockInboxViewController didDismissMessage:messageId];

    // Then
    // Verify that the message dismissal event is emitted
    // Note: This would require additional setup to verify event emission
}

#pragma mark - Empty Inbox Tests

- (void)testEmptyInbox {
    // When
    [self.inboxView inboxViewControllerDidFinishLoading:self.mockInboxViewController];

    // Then
    // Verify that the empty inbox event is emitted
    // Note: This would require additional setup to verify event emission
}

@end
