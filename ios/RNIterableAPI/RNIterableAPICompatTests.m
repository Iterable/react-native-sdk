#import <XCTest/XCTest.h>
#import "RNIterableAPICompat.h"
#import <OCMock/OCMock.h>
#import <IterableSDK/IterableSDK.h>

@interface RNIterableAPICompatTests : XCTestCase

@property (nonatomic, strong) RNIterableAPICompat *apiCompat;
@property (nonatomic, strong) id mockIterableAPI;
@property (nonatomic, strong) id mockInAppManager;

@end

@implementation RNIterableAPICompatTests

- (void)setUp {
    [super setUp];
    self.apiCompat = [[RNIterableAPICompat alloc] init];
    self.mockIterableAPI = OCMClassMock([IterableAPI class]);
    self.mockInAppManager = OCMClassMock([IterableInAppManager class]);
    OCMStub([self.mockIterableAPI sharedInstance]).andReturn(self.mockIterableAPI);
    OCMStub([self.mockIterableAPI inAppManager]).andReturn(self.mockInAppManager);
}

- (void)tearDown {
    self.apiCompat = nil;
    self.mockIterableAPI = nil;
    self.mockInAppManager = nil;
    [super tearDown];
}

#pragma mark - Initialization Tests

- (void)testInitializeWithApiKey {
    // Given
    NSString *apiKey = @"test-api-key";
    NSDictionary *config = @{
        @"pushIntegrationName": @"test-push",
        @"autoPushRegistration": @YES,
        @"logLevel": @1,
        @"inAppDisplayInterval": @30
    };
    NSString *version = @"1.0.0";

    // When
    XCTestExpectation *expectation = [self expectationWithDescription:@"Initialize"];
    [self.apiCompat initializeWithApiKey:apiKey
                                 config:config
                                version:version
                               resolver:^(id result) {
        // Then
        XCTAssertTrue([result boolValue]);
        OCMVerify([self.mockIterableAPI initializeWithApiKey:apiKey config:[OCMArg any]]);
        OCMVerify([self.mockIterableAPI setDeviceAttribute:@"reactNativeSDKVersion" value:version]);
        [expectation fulfill];
    } rejecter:^(NSString *code, NSString *message, NSError *error) {
        XCTFail(@"Should not reject");
    }];

    [self waitForExpectationsWithTimeout:1.0 handler:nil];
}

#pragma mark - User Management Tests

- (void)testSetEmail {
    // Given
    NSString *email = @"test@example.com";
    NSString *authToken = @"test-token";

    // When
    [self.apiCompat setEmail:email authToken:authToken];

    // Then
    OCMVerify([self.mockIterableAPI setEmail:email authToken:authToken]);
}

- (void)testGetEmail {
    // Given
    NSString *expectedEmail = @"test@example.com";
    OCMStub([self.mockIterableAPI email]).andReturn(expectedEmail);

    // When
    XCTestExpectation *expectation = [self expectationWithDescription:@"Get Email"];
    [self.apiCompat getEmail:^(id result) {
        // Then
        XCTAssertEqualObjects(result, expectedEmail);
        [expectation fulfill];
    } rejecter:^(NSString *code, NSString *message, NSError *error) {
        XCTFail(@"Should not reject");
    }];

    [self waitForExpectationsWithTimeout:1.0 handler:nil];
}

#pragma mark - Push Notification Tests

- (void)testTrackPushOpen {
    // Given
    double campaignId = 123;
    NSNumber *templateId = @456;
    NSString *messageId = @"test-message";
    BOOL appAlreadyRunning = YES;
    NSDictionary *dataFields = @{@"key": @"value"};

    // When
    [self.apiCompat trackPushOpen:campaignId
                      templateId:templateId
                       messageId:messageId
                 appAlreadyRunning:appAlreadyRunning
                       dataFields:dataFields];

    // Then
    OCMVerify([self.mockIterableAPI trackPushOpen:messageId
                                      campaignId:(NSInteger)campaignId
                                     templateId:templateId
                               appAlreadyRunning:appAlreadyRunning
                                     dataFields:dataFields]);
}

#pragma mark - In-App Message Tests

- (void)testGetInAppMessages {
    // Given
    NSArray *expectedMessages = @[@"message1", @"message2"];
    OCMStub([self.mockInAppManager getMessages:[OCMArg any] onFailure:[OCMArg any]])
        .andDo(^(NSInvocation *invocation) {
            void (^successBlock)(NSArray<IterableInAppMessage *> *);
            [invocation getArgument:&successBlock atIndex:2];
            successBlock(expectedMessages);
        });

    // When
    XCTestExpectation *expectation = [self expectationWithDescription:@"Get In-App Messages"];
    [self.apiCompat getInAppMessages:^(id result) {
        // Then
        XCTAssertEqualObjects(result, expectedMessages);
        [expectation fulfill];
    } rejecter:^(NSString *code, NSString *message, NSError *error) {
        XCTFail(@"Should not reject");
    }];

    [self waitForExpectationsWithTimeout:1.0 handler:nil];
}

- (void)testShowMessage {
    // Given
    NSString *messageId = @"test-message";
    BOOL consume = YES;
    NSDictionary *expectedData = @{@"key": @"value"};

    OCMStub([self.mockInAppManager showMessage:messageId
                                      consume:consume
                                   onSuccess:[OCMArg any]
                                   onFailure:[OCMArg any]])
        .andDo(^(NSInvocation *invocation) {
            void (^successBlock)(NSDictionary *);
            [invocation getArgument:&successBlock atIndex:4];
            successBlock(expectedData);
        });

    // When
    XCTestExpectation *expectation = [self expectationWithDescription:@"Show Message"];
    [self.apiCompat showMessage:messageId
                       consume:consume
                      resolver:^(id result) {
        // Then
        XCTAssertEqualObjects(result, expectedData);
        [expectation fulfill];
    } rejecter:^(NSString *code, NSString *message, NSError *error) {
        XCTFail(@"Should not reject");
    }];

    [self waitForExpectationsWithTimeout:1.0 handler:nil];
}

#pragma mark - Event Tracking Tests

- (void)testTrackEvent {
    // Given
    NSString *eventName = @"test-event";
    NSDictionary *dataFields = @{@"key": @"value"};

    // When
    [self.apiCompat trackEvent:eventName dataFields:dataFields];

    // Then
    OCMVerify([self.mockIterableAPI trackEvent:eventName dataFields:dataFields]);
}

#pragma mark - Commerce Tests

- (void)testTrackPurchase {
    // Given
    double total = 99.99;
    NSArray *items = @[
        @{
            @"id": @"item1",
            @"name": @"Test Item 1",
            @"price": @49.99,
            @"quantity": @1
        },
        @{
            @"id": @"item2",
            @"name": @"Test Item 2",
            @"price": @50.00,
            @"quantity": @1
        }
    ];
    NSDictionary *dataFields = @{@"key": @"value"};

    // When
    [self.apiCompat trackPurchase:total items:items dataFields:dataFields];

    // Then
    OCMVerify([self.mockIterableAPI trackPurchase:total
                                           items:[OCMArg any]
                                      dataFields:dataFields]);
}

#pragma mark - Helper Method Tests

- (void)testGetIterableConfigFromDictionary {
    // Given
    NSDictionary *config = @{
        @"pushIntegrationName": @"test-push",
        @"autoPushRegistration": @YES,
        @"logLevel": @1,
        @"inAppDisplayInterval": @30,
        @"urlHandler": @{
            @"shouldOpenInNewWindow": @YES
        },
        @"customActionHandler": @{
            @"shouldHandleCustomAction": @YES
        },
        @"inAppHandler": @{
            @"shouldShowInApp": @YES
        }
    };

    // When
    IterableConfig *iterableConfig = [self.apiCompat getIterableConfigFromDictionary:config];

    // Then
    XCTAssertEqualObjects(iterableConfig.pushIntegrationName, @"test-push");
    XCTAssertTrue(iterableConfig.autoPushRegistration);
    XCTAssertEqual(iterableConfig.logLevel, 1);
    XCTAssertEqual(iterableConfig.inAppDisplayInterval, 30);
    XCTAssertNotNil(iterableConfig.urlHandler);
    XCTAssertNotNil(iterableConfig.customActionHandler);
    XCTAssertNotNil(iterableConfig.inAppHandler);
}

- (void)testDictionaryFromAttributionInfo {
    // Given
    IterableAttributionInfo *attributionInfo = [[IterableAttributionInfo alloc] initWithCampaignId:@"campaign1"
                                                                                       templateId:@"template1"
                                                                                        messageId:@"message1"];

    // When
    NSDictionary *dictionary = [self.apiCompat dictionaryFromAttributionInfo:attributionInfo];

    // Then
    XCTAssertEqualObjects(dictionary[@"campaignId"], @"campaign1");
    XCTAssertEqualObjects(dictionary[@"templateId"], @"template1");
    XCTAssertEqualObjects(dictionary[@"messageId"], @"message1");
}

- (void)testCommerceItemsFromArray {
    // Given
    NSArray *items = @[
        @{
            @"id": @"item1",
            @"name": @"Test Item 1",
            @"price": @49.99,
            @"quantity": @1
        },
        @{
            @"id": @"item2",
            @"name": @"Test Item 2",
            @"price": @50.00,
            @"quantity": @2
        }
    ];

    // When
    NSArray *commerceItems = [self.apiCompat commerceItemsFromArray:items];

    // Then
    XCTAssertEqual(commerceItems.count, 2);

    IterableCommerceItem *item1 = commerceItems[0];
    XCTAssertEqualObjects(item1.id, @"item1");
    XCTAssertEqualObjects(item1.name, @"Test Item 1");
    XCTAssertEqual(item1.price, 49.99);
    XCTAssertEqual(item1.quantity, 1);

    IterableCommerceItem *item2 = commerceItems[1];
    XCTAssertEqualObjects(item2.id, @"item2");
    XCTAssertEqualObjects(item2.name, @"Test Item 2");
    XCTAssertEqual(item2.price, 50.00);
    XCTAssertEqual(item2.quantity, 2);
}

@end
