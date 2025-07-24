#import "RNIterableAPI.h"

#if RCT_NEW_ARCH_ENABLED
#import "RNIterableAPISpec.h"
#endif

#import <IterableSDK/IterableSDK.h> // umbrella (Objective-C) header

// Forward-declare the Swift protocols/enum used in the Swift header.
@protocol IterableInAppDelegate;
@protocol IterableCustomActionDelegate;
@protocol IterableAuthDelegate;
@protocol IterableURLDelegate;
typedef NS_ENUM(NSInteger, InAppShowResponse) {
  show = 0,
  skip = 1,
};

#import "Iterable_React_Native_SDK-Swift.h"

@interface RNIterableAPI () <ReactIterableAPIDelegate>
@end

@implementation RNIterableAPI {
  ReactIterableAPI *_swiftAPI;
}

#pragma mark - Init / bridge wiring

- (instancetype)init {
  self = [super init];
  if (self) {
    _swiftAPI = [ReactIterableAPI new];
    _swiftAPI.delegate = self;
  }
  return self;
}

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

#pragma mark - TurboModule hook (new arch only)

#if RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeRNIterableAPISpecJSI>(params);
}
#endif

// Visual Studio, LLVM, Google, Chromium, Mozilla, WebKit, Microsoft, GNU

#pragma mark - Events

- (NSArray<NSString *> *)supportedEvents {
  return [ReactIterableAPI supportedEvents];
}

- (void)sendEventWithName:(NSString *_Nonnull)name result:(double)result {
  [self sendEventWithName:name body:@(result)];
}

#pragma mark - Public API (all paths call into Swift)

RCT_EXPORT_METHOD(testEventDispatch) { [_swiftAPI testEventDispatch]; }

RCT_EXPORT_METHOD(initializeWithApiKey: (nonnull NSString *) apiKey
                  config: (nonnull NSDictionary *) config
                  version: (nonnull NSString *) version
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
  [_swiftAPI initializeWithApiKey:apiKey
                           config:config
                          version:version
                         resolver:resolve
                         rejecter:reject];
}

RCT_EXPORT_METHOD(initialize2WithApiKey: (nonnull NSString *) apiKey
                  config: (nonnull NSDictionary *) config
                  apiEndPointOverride: (nonnull NSString *) apiEndPoint
                  version: (nonnull NSString *) version
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
  [_swiftAPI initialize2WithApiKey:apiKey
                            config:config
               apiEndPointOverride:apiEndPoint
                           version:version
                          resolver:resolve
                          rejecter:reject];
}

RCT_EXPORT_METHOD(setEmail: (NSString *) email
                  authToken: (NSString *) authToken) {
  [_swiftAPI setEmail:email authToken:authToken];
}

RCT_EXPORT_METHOD(getEmail: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
  [_swiftAPI getEmail:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setUserId: (NSString *) userId
                  authToken: (NSString *) authToken) {
  [_swiftAPI setUserId:userId authToken:authToken];
}

RCT_EXPORT_METHOD(getUserId: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
  [_swiftAPI getUserId:resolve rejecter:reject];
}

#pragma mark - Iterable API Request Functions

RCT_EXPORT_METHOD(disableDeviceForCurrentUser) {
  [_swiftAPI disableDeviceForCurrentUser];
}

RCT_EXPORT_METHOD(setInAppShowResponse: (nonnull NSNumber *) inAppShowResponse) {
  [_swiftAPI setInAppShowResponse:inAppShowResponse];
}

RCT_EXPORT_METHOD(getLastPushPayload: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
  [_swiftAPI getLastPushPayload:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getAttributionInfo : (RCTPromiseResolveBlock)
                      resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI getAttributionInfo:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setAttributionInfo: (NSDictionary *) attributionInfo) {
  [_swiftAPI setAttributionInfo:attributionInfo];
}

RCT_EXPORT_METHOD(trackPushOpenWithCampaignId: (nonnull NSNumber *) campaignId
                  templateId: (nonnull NSNumber *) templateId
                  messageId: (nonnull NSString *) messageId
                  appAlreadyRunning: (BOOL) appAlreadyRunning
                  dataFields: (NSDictionary *) dataFields) {
  [_swiftAPI trackPushOpenWithCampaignId:campaignId
                              templateId:templateId
                               messageId:messageId
                       appAlreadyRunning:appAlreadyRunning
                              dataFields:dataFields];
}

RCT_EXPORT_METHOD(updateCart: (NSArray *) items) {
  [_swiftAPI updateCart:items];
}

RCT_EXPORT_METHOD(trackPurchase: (nonnull NSNumber *) total
                  items: (NSArray *) items
                  dataFields: (NSDictionary *) dataFields) {
  [_swiftAPI trackPurchase:total items:items dataFields:dataFields];
}

RCT_EXPORT_METHOD(trackInAppOpen: (NSString *) messageId
                  location: (nonnull NSNumber *) location) {
  [_swiftAPI trackInAppOpen:messageId location:location];
}

RCT_EXPORT_METHOD(trackInAppClick: (nonnull NSString *) messageId
                  location: (nonnull NSNumber *) location
                  clickedUrl: (nonnull NSString *) clickedUrl) {
  [_swiftAPI trackInAppClick:messageId location:location clickedUrl:clickedUrl];
}

RCT_EXPORT_METHOD(trackInAppClose: (nonnull NSString *) messageId
                  location: (nonnull NSNumber *) location
                  source: (nonnull NSNumber *) source
                  clickedUrl: (NSString *) clickedUrl) {
  [_swiftAPI trackInAppClose:messageId
                    location:location
                      source:source
                  clickedUrl:clickedUrl];
}

RCT_EXPORT_METHOD(inAppConsume: (nonnull NSString *) messageId
                  location: (nonnull NSNumber *) location
                  source: (nonnull NSNumber *) source) {
  [_swiftAPI inAppConsume:messageId location:location source:source];
}

RCT_EXPORT_METHOD(trackEvent: (nonnull NSString *) name
                  dataFields: (NSDictionary *) dataFields) {
  [_swiftAPI trackEvent:name dataFields:dataFields];
}

RCT_EXPORT_METHOD(updateUser: (nonnull NSDictionary *) dataFields
                  mergeNestedObjects: (BOOL) mergeNestedObjects) {
  [_swiftAPI updateUser:dataFields mergeNestedObjects:mergeNestedObjects];
}

RCT_EXPORT_METHOD(updateEmail: (nonnull NSString *) email
                  authToken: (NSString *) authToken) {
  [_swiftAPI updateEmail:email authToken:authToken];
}

RCT_EXPORT_METHOD(handleAppLink: (nonnull NSString *) appLink
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
  [_swiftAPI handleAppLink:appLink resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(updateSubscriptions: (NSArray *) emailListIds
                  unsubscribedChannelIds: (NSArray *) unsubscribedChannelIds
                  unsubscribedMessageTypeIds: (NSArray *) unsubscribedMessageTypeIds
                  subscribedMessageTypeIds: (NSArray *) subscribedMessageTypeIds
                  campaignId: (nonnull NSNumber *) campaignId
                  templateId: (nonnull NSNumber *) templateId) {
  [_swiftAPI updateSubscriptions:emailListIds
          unsubscribedChannelIds:unsubscribedChannelIds
      unsubscribedMessageTypeIds:unsubscribedMessageTypeIds
        subscribedMessageTypeIds:subscribedMessageTypeIds
                      campaignId:campaignId
                      templateId:templateId];
}

#pragma mark - SDK In-App Manager Functions

RCT_EXPORT_METHOD(getInAppMessages: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
  [_swiftAPI getInAppMessages:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getHtmlInAppContentForMessage: (nonnull NSString *) messageId
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
  [_swiftAPI getHtmlInAppContentForMessage:messageId
                                  resolver:resolve
                                  rejecter:reject];
}

RCT_EXPORT_METHOD(getInboxMessages: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
  [_swiftAPI getInboxMessages:resolve rejecter:reject];
}

// NOTE: This is not used anywhere on the JS side.
RCT_EXPORT_METHOD(getUnreadInboxMessagesCount: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
  [_swiftAPI getUnreadInboxMessagesCount:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(showMessage: (nonnull NSString *) messageId
                  consume: (BOOL) consume
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject) {
  [_swiftAPI showMessage:messageId
                 consume:consume
                resolver:resolve
                rejecter:reject];
}

RCT_EXPORT_METHOD(removeMessage: (nonnull NSString *) messageId
                  location: (nonnull NSNumber *) location
                  source: (nonnull NSNumber *) source) {
  [_swiftAPI removeMessage:messageId location:location source:source];
}

RCT_EXPORT_METHOD(setReadForMessage: (nonnull NSString *) messageId
                  read: (BOOL) read) {
  [_swiftAPI setReadForMessage:messageId read:read];
}

RCT_EXPORT_METHOD(setAutoDisplayPaused: (BOOL) paused) {
  [_swiftAPI setAutoDisplayPaused:paused];
}

#pragma mark - SDK Inbox Session Tracking Functions

RCT_EXPORT_METHOD(startSession: (nonnull NSArray *) visibleRows) {
  [_swiftAPI startSession:visibleRows];
}

RCT_EXPORT_METHOD(endSession) { [_swiftAPI endSession]; }

RCT_EXPORT_METHOD(updateVisibleRows: (nonnull NSArray *) visibleRows) {
  [_swiftAPI updateVisibleRows:visibleRows];
}

#pragma mark - SDK Auth Manager Functions

RCT_EXPORT_METHOD(passAlongAuthToken: (NSString *) authToken) {
  [_swiftAPI passAlongAuthToken:authToken];
}

@end
