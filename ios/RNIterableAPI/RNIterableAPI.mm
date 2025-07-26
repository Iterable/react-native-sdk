#import "RNIterableAPI.h"
#import "RNIterableAPISpec.h"
#import <IterableSDK/IterableSDK.h>  // umbrella (Objective-C) header

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

- (instancetype)init {
  if (self = [super init]) {
    _swiftAPI = [ReactIterableAPI new];
    // [_api configureWithBridge:self.bridge];
  }
  return self;
}

// - (instancetype)init {
//   self = [super init];
//   if(self) {
//     // Option 2.B - Instantiate the Calculator and set the delegate
//     _swiftAPI = [ReactIterableAPI shared];
//     _swiftAPI.delegate = self;
//   }
//   return self;
// }

RCT_EXPORT_MODULE()

// - (NSArray<NSString *> *)supportedEvents {
//   return [ReactIterableAPI supportedEvents];
// }


// // 2) When JS calls emitter.addListener(), React will call this on *your* module.
// //    Forward it to the Swift emitter so that its `startObserving()` fires.
// - (void)startObserving {
//   [_swiftAPI startObserving];
// }

// // 3) When JS calls emitter.removeListeners(n), React will call this.
// //    Forward it to Swift so its `stopObserving()` fires.
// - (void)stopObserving {
//   [_swiftAPI stopObserving];
// }

// // 4) Swift will call this delegate method when it wants to emit.
// //    Forward it up to React’s `sendEventWithName:body:`
// - (void)sendEventWithName:(NSString *)name body:(id)body {
//   [super sendEventWithName:name body:body];
// }

- (void)addListener:(NSString *)eventName {
  // No-op; required to prevent selector crash
}

- (void)removeListeners:(double)count {
  // No-op; required to prevent selector crash
}

// - (void)addListener:(NSString *)eventName
// {
//   [_swiftAPI.delegate addListener:eventName];
// }

// - (void)removeListeners:(double)count
// {
//   [_swiftAPI.delegate removeListeners:count];
// }

- (void)testEventDispatch {
  [_swiftAPI testEventDispatch];
}

- (void)initializeWithApiKey:(NSString *)apiKey
                    config:(NSDictionary *)config
                   version:(NSString *)version
                   resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject
{
  [_swiftAPI initializeWithApiKey:apiKey
                             config:config
                            version:version
                           resolver:resolve
                          rejecter:reject];
}

- (void)initialize2WithApiKey:(NSString *)apiKey
                    config:(NSDictionary *)config
                   version:(NSString *)version
       apiEndPointOverride:(NSString *)apiEndPointOverride
                   resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject
{
  [_swiftAPI initialize2WithApiKey:apiKey
                            config:config
               apiEndPointOverride:apiEndPointOverride
                           version:version
                          resolver:resolve
                          rejecter:reject];
}

- (void)setEmail:(NSString * _Nullable)email
       authToken:(NSString * _Nullable)authToken
{
  [_swiftAPI setEmail:email authToken:authToken];
}

- (void)getEmail:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  [_swiftAPI getEmail:resolve rejecter:reject];
}

- (void)setUserId:(NSString * _Nullable)userId
       authToken:(NSString * _Nullable)authToken
{
  [_swiftAPI setUserId:userId authToken:authToken];
}

- (void)getUserId:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  [_swiftAPI getUserId:resolve rejecter:reject];
}

- (void)setInAppShowResponse:(NSNumber *)inAppShowResponse
{
  [_swiftAPI setInAppShowResponse:inAppShowResponse];
}

- (void)getInAppMessages:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  [_swiftAPI getInAppMessages:resolve rejecter:reject];
}

- (void)getInboxMessages:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  [_swiftAPI getInboxMessages:resolve rejecter:reject];
}

// NOTE: This is not used anywhere on the JS side.
- (void)getUnreadInboxMessagesCount:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  [_swiftAPI getUnreadInboxMessagesCount:resolve rejecter:reject];
}

- (void)showMessage:(NSString *)messageId
       consume:(BOOL)consume
       resolve:(RCTPromiseResolveBlock)resolve
       reject:(RCTPromiseRejectBlock)reject
{
  [_swiftAPI showMessage:messageId consume:consume resolver:resolve rejecter:reject];
}

- (void)removeMessage:(NSString *)messageId
       location:(NSNumber *)location
       source:(NSNumber *)source
{
  [_swiftAPI removeMessage:messageId location:location source:source];
}

- (void)setReadForMessage:(NSString *)messageId
       read:(BOOL)read
{
  [_swiftAPI setReadForMessage:messageId read:read];
}

- (void)setAutoDisplayPaused:(BOOL)autoDisplayPaused
{
  [_swiftAPI setAutoDisplayPaused:autoDisplayPaused];
}

- (void)trackEvent:(NSString *)name
       dataFields:(NSDictionary *)dataFields
{
  [_swiftAPI trackEvent:name dataFields:dataFields];
}

- (void)trackPushOpenWithCampaignId:(NSNumber *)campaignId
       templateId:(NSNumber *)templateId
       messageId:(NSString *)messageId
       appAlreadyRunning:(BOOL)appAlreadyRunning
       dataFields:(NSDictionary *)dataFields
{
  [_swiftAPI trackPushOpenWithCampaignId:campaignId templateId:templateId messageId:messageId appAlreadyRunning:appAlreadyRunning dataFields:dataFields];
}

- (void)trackInAppOpen:(NSString *)messageId
       location:(NSNumber *)location
{
  [_swiftAPI trackInAppOpen:messageId location:location];
}

- (void)trackInAppClick:(NSString *)messageId
       location:(NSNumber *)location
       clickedUrl:(NSString *)clickedUrl
{
  [_swiftAPI trackInAppClick:messageId location:location clickedUrl:clickedUrl];
}

- (void)trackInAppClose:(NSString *)messageId
       location:(NSNumber *)location
       source:(NSNumber *)source
       clickedUrl:(NSString *)clickedUrl
{
  [_swiftAPI trackInAppClose:messageId location:location source:source clickedUrl:clickedUrl];
}

- (void)inAppConsume:(NSString *)messageId
       location:(NSNumber *)location
       source:(NSNumber *)source
{
  [_swiftAPI inAppConsume:messageId location:location source:source];
}

- (void)updateCart:(NSArray *)items
{
  [_swiftAPI updateCart:items];
}

- (void)trackPurchase:(NSNumber *)total
       items:(NSArray *)items
       dataFields:(NSDictionary *)dataFields
{
  [_swiftAPI trackPurchase:total items:items dataFields:dataFields];
}

- (void)updateUser:(NSDictionary *)dataFields
       mergeNestedObjects:(BOOL)mergeNestedObjects
{
  [_swiftAPI updateUser:dataFields mergeNestedObjects:mergeNestedObjects];
}

- (void)updateEmail:(NSString *)email
       authToken:(NSString *)authToken
{
  [_swiftAPI updateEmail:email authToken:authToken];
}

- (void)getAttributionInfo:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  [_swiftAPI getAttributionInfo:resolve rejecter:reject];
}

- (void)setAttributionInfo:(NSDictionary *)attributionInfo
{
  [_swiftAPI setAttributionInfo:attributionInfo];
}

- (void)disableDeviceForCurrentUser
{
  [_swiftAPI disableDeviceForCurrentUser];
}

- (void)getLastPushPayload:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  [_swiftAPI getLastPushPayload:resolve rejecter:reject];
}

- (void)getHtmlInAppContentForMessage:(NSString *)messageId
       resolve:(RCTPromiseResolveBlock)resolve
       reject:(RCTPromiseRejectBlock)reject
{
  [_swiftAPI getHtmlInAppContentForMessage:messageId resolver:resolve rejecter:reject];
}

- (void)handleAppLink:(NSString *)appLink
       resolve:(RCTPromiseResolveBlock)resolve
       reject:(RCTPromiseRejectBlock)reject
{
  [_swiftAPI handleAppLink:appLink resolver:resolve rejecter:reject];
}

- (void)updateSubscriptions:(NSArray * _Nullable)emailListIds
       unsubscribedChannelIds:(NSArray * _Nullable)unsubscribedChannelIds
       unsubscribedMessageTypeIds:(NSArray * _Nullable)unsubscribedMessageTypeIds
       subscribedMessageTypeIds:(NSArray * _Nullable)subscribedMessageTypeIds
       campaignId:(NSNumber *)campaignId
       templateId:(NSNumber *)templateId
{
  [_swiftAPI updateSubscriptions:emailListIds unsubscribedChannelIds:unsubscribedChannelIds unsubscribedMessageTypeIds:unsubscribedMessageTypeIds subscribedMessageTypeIds:subscribedMessageTypeIds campaignId:campaignId templateId:templateId];
}

- (void)startSession:(NSArray *)visibleRows
{
  [_swiftAPI startSession:visibleRows];
}

- (void)endSession
{
  [_swiftAPI endSession];
}

- (void)updateVisibleRows:(NSArray *)visibleRows
{
  [_swiftAPI updateVisibleRows:visibleRows];
}

- (void)passAlongAuthToken:(NSString *)authToken
{
  [_swiftAPI passAlongAuthToken:authToken];
}

using namespace facebook::react;



- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNIterableAPISpecJSI>(params);
}

@end
