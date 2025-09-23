#import "RNIterableAPI.h"

#if RCT_NEW_ARCH_ENABLED
  #import "RNIterableAPISpec.h"
#endif

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
  self = [super init];
  if(self) {
    // Option 2.B - Instantiate the Calculator and set the delegate
    _swiftAPI = [ReactIterableAPI new];
    _swiftAPI.delegate = self;
  }
  return self;
}

RCT_EXPORT_MODULE()

// - (NSArray<NSString *> *)supportedEvents {
//   return [_swiftAPI supportedEvents];
// }


- (NSArray<NSString *> *)supportedEvents {
  return [ReactIterableAPI supportedEvents];
}

- (void)sendEventWithName:(NSString * _Nonnull)name result:(double)result {
  [self sendEventWithName:name body:@(result)];
}

#if RCT_NEW_ARCH_ENABLED
- (void)startObserving {
  NSLog(@"ReactNativeSdk startObserving");
  [(ReactIterableAPI *)_swiftAPI startObserving];
}

- (void)stopObserving {
  NSLog(@"ReactNativeSdk stopObserving");
  [(ReactIterableAPI *)_swiftAPI stopObserving];
}

- (void)hello {
  NSLog(@"Hello from Objective-C");
  [(ReactIterableAPI *)_swiftAPI hello];
}

- (void)testEventDispatch {
  NSLog(@"***ITBL OBJ-C*** testEventDispatch");
  [_swiftAPI testEventDispatch];
}

- (void)initializeWithApiKey:(NSString *)apiKey
                    config:(NSDictionary *)config
                   version:(NSString *)version
                   resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject
{
  NSLog(@"ReactNativeSdk initializeWithApiKey");
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
  NSLog(@"ReactNativeSdk initialize2WithApiKey");
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
  NSLog(@"ReactNativeSdk setEmail");
  [_swiftAPI setEmail:email authToken:authToken];
}

- (void)getEmail:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  NSLog(@"ReactNativeSdk getEmail");
  [_swiftAPI getEmail:resolve rejecter:reject];
}

- (void)setUserId:(NSString * _Nullable)userId
       authToken:(NSString * _Nullable)authToken
{
  NSLog(@"ReactNativeSdk setUserId");
  [_swiftAPI setUserId:userId authToken:authToken];
}

- (void)getUserId:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  NSLog(@"ReactNativeSdk getUserId");
  [_swiftAPI getUserId:resolve rejecter:reject];
}

- (void)setInAppShowResponse:(NSNumber *)inAppShowResponse
{
  NSLog(@"ReactNativeSdk setInAppShowResponse");
  [_swiftAPI setInAppShowResponse:inAppShowResponse];
}

- (void)getInAppMessages:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  NSLog(@"ReactNativeSdk getInAppMessages");
  [_swiftAPI getInAppMessages:resolve rejecter:reject];
}

- (void)getInboxMessages:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  NSLog(@"ReactNativeSdk getInboxMessages");
  [_swiftAPI getInboxMessages:resolve rejecter:reject];
}

// NOTE: This is not used anywhere on the JS side.
- (void)getUnreadInboxMessagesCount:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  NSLog(@"ReactNativeSdk getUnreadInboxMessagesCount");
  [_swiftAPI getUnreadInboxMessagesCount:resolve rejecter:reject];
}

- (void)showMessage:(NSString *)messageId
       consume:(BOOL)consume
       resolve:(RCTPromiseResolveBlock)resolve
       reject:(RCTPromiseRejectBlock)reject
{
  NSLog(@"ReactNativeSdk showMessage");
  [_swiftAPI showMessage:messageId consume:consume resolver:resolve rejecter:reject];
}

- (void)removeMessage:(NSString *)messageId
       location:(NSNumber *)location
       source:(NSNumber *)source
{
  NSLog(@"ReactNativeSdk removeMessage");
  [_swiftAPI removeMessage:messageId location:location source:source];
}

- (void)setReadForMessage:(NSString *)messageId
       read:(BOOL)read
{
  NSLog(@"ReactNativeSdk setReadForMessage");
  [_swiftAPI setReadForMessage:messageId read:read];
}

- (void)setAutoDisplayPaused:(BOOL)autoDisplayPaused
{
  NSLog(@"ReactNativeSdk setAutoDisplayPaused");
  [_swiftAPI setAutoDisplayPaused:autoDisplayPaused];
}

- (void)trackEvent:(NSString *)name
       dataFields:(NSDictionary *)dataFields
{
  NSLog(@"ReactNativeSdk trackEvent");
  [_swiftAPI trackEvent:name dataFields:dataFields];
}

- (void)trackPushOpenWithCampaignId:(NSNumber *)campaignId
       templateId:(NSNumber *)templateId
       messageId:(NSString *)messageId
       appAlreadyRunning:(BOOL)appAlreadyRunning
       dataFields:(NSDictionary *)dataFields
{
  NSLog(@"ReactNativeSdk trackPushOpenWithCampaignId");
  [_swiftAPI trackPushOpenWithCampaignId:campaignId templateId:templateId messageId:messageId appAlreadyRunning:appAlreadyRunning dataFields:dataFields];
}

- (void)trackInAppOpen:(NSString *)messageId
       location:(NSNumber *)location
{
  NSLog(@"ReactNativeSdk trackInAppOpen");
  [_swiftAPI trackInAppOpen:messageId location:location];
}

- (void)trackInAppClick:(NSString *)messageId
       location:(NSNumber *)location
       clickedUrl:(NSString *)clickedUrl
{
  NSLog(@"ReactNativeSdk trackInAppClick");
  [_swiftAPI trackInAppClick:messageId location:location clickedUrl:clickedUrl];
}

- (void)trackInAppClose:(NSString *)messageId
       location:(NSNumber *)location
       source:(NSNumber *)source
       clickedUrl:(NSString *)clickedUrl
{
  NSLog(@"ReactNativeSdk trackInAppClose");
  [_swiftAPI trackInAppClose:messageId location:location source:source clickedUrl:clickedUrl];
}

- (void)inAppConsume:(NSString *)messageId
       location:(NSNumber *)location
       source:(NSNumber *)source
{
  NSLog(@"ReactNativeSdk inAppConsume");
  [_swiftAPI inAppConsume:messageId location:location source:source];
}

- (void)updateCart:(NSArray *)items
{
  NSLog(@"ReactNativeSdk updateCart");
  [_swiftAPI updateCart:items];
}

- (void)trackPurchase:(NSNumber *)total
       items:(NSArray *)items
       dataFields:(NSDictionary *)dataFields
{
  NSLog(@"ReactNativeSdk trackPurchase");
  [_swiftAPI trackPurchase:total items:items dataFields:dataFields];
}

- (void)updateUser:(NSDictionary *)dataFields
       mergeNestedObjects:(BOOL)mergeNestedObjects
{
  NSLog(@"ReactNativeSdk updateUser");
  [_swiftAPI updateUser:dataFields mergeNestedObjects:mergeNestedObjects];
}

- (void)updateEmail:(NSString *)email
       authToken:(NSString *)authToken
{
  NSLog(@"ReactNativeSdk updateEmail");
  [_swiftAPI updateEmail:email authToken:authToken];
}

- (void)getAttributionInfo:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  NSLog(@"ReactNativeSdk getAttributionInfo");
  [_swiftAPI getAttributionInfo:resolve rejecter:reject];
}

- (void)setAttributionInfo:(NSDictionary *)attributionInfo
{
  NSLog(@"ReactNativeSdk setAttributionInfo");
  [_swiftAPI setAttributionInfo:attributionInfo];
}

- (void)disableDeviceForCurrentUser
{
  NSLog(@"ReactNativeSdk disableDeviceForCurrentUser");
  [_swiftAPI disableDeviceForCurrentUser];
}

- (void)getLastPushPayload:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  NSLog(@"ReactNativeSdk getLastPushPayload");
  [_swiftAPI getLastPushPayload:resolve rejecter:reject];
}

- (void)getHtmlInAppContentForMessage:(NSString *)messageId
       resolve:(RCTPromiseResolveBlock)resolve
       reject:(RCTPromiseRejectBlock)reject
{
  NSLog(@"ReactNativeSdk getHtmlInAppContentForMessage");
  [_swiftAPI getHtmlInAppContentForMessage:messageId resolver:resolve rejecter:reject];
}

- (void)handleAppLink:(NSString *)appLink
       resolve:(RCTPromiseResolveBlock)resolve
       reject:(RCTPromiseRejectBlock)reject
{
  NSLog(@"ReactNativeSdk handleAppLink");
  [_swiftAPI handleAppLink:appLink resolver:resolve rejecter:reject];
}

- (void)updateSubscriptions:(NSArray *)emailListIds
       unsubscribedChannelIds:(NSArray *)unsubscribedChannelIds
       unsubscribedMessageTypeIds:(NSArray *)unsubscribedMessageTypeIds
       subscribedMessageTypeIds:(NSArray *)subscribedMessageTypeIds
       campaignId:(NSNumber *)campaignId
       templateId:(NSNumber *)templateId
{
  NSLog(@"ReactNativeSdk updateSubscriptions");
  [_swiftAPI updateSubscriptions:emailListIds unsubscribedChannelIds:unsubscribedChannelIds unsubscribedMessageTypeIds:unsubscribedMessageTypeIds subscribedMessageTypeIds:subscribedMessageTypeIds campaignId:campaignId templateId:templateId];
}

- (void)startSession:(NSArray *)visibleRows
{
  NSLog(@"ReactNativeSdk startSession");
  [_swiftAPI startSession:visibleRows];
}

- (void)endSession
{
  NSLog(@"ReactNativeSdk endSession");
  [_swiftAPI endSession];
}

- (void)updateVisibleRows:(NSArray *)visibleRows
{
  NSLog(@"ReactNativeSdk updateVisibleRows");
  [_swiftAPI updateVisibleRows:visibleRows];
}

- (void)passAlongAuthToken:(NSString *)authToken
{
  NSLog(@"ReactNativeSdk passAlongAuthToken");
  [_swiftAPI passAlongAuthToken:authToken];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNIterableAPISpecJSI>(params);
}
#else

RCT_EXPORT_METHOD(startObserving) {
  NSLog(@"ReactNativeSdk startObserving");
  [(ReactIterableAPI *)_swiftAPI startObserving];
}

RCT_EXPORT_METHOD(stopObserving) {
  NSLog(@"ReactNativeSdk stopObserving");
  [(ReactIterableAPI *)_swiftAPI stopObserving];
}

RCT_EXPORT_METHOD(hello) {
  NSLog(@"***ITBL OBJ-C*** hello");
  [_swiftAPI hello];
}

RCT_EXPORT_METHOD(testEventDispatch) {
  NSLog(@"***ITBL OBJ-C*** testEventDispatch");
  [_swiftAPI testEventDispatch];
}

RCT_EXPORT_METHOD(initializeWithApiKey:(NSString *)apiKey
                    config:(NSDictionary *)config
                   version:(NSString *)version
                   resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject) {
  NSLog(@"ReactNativeSdk initializeWithApiKey");
  [_swiftAPI initializeWithApiKey:apiKey
                             config:config
                            version:version
                           resolver:resolve
                          rejecter:reject];
}

RCT_EXPORT_METHOD(initialize2WithApiKey:(NSString *)apiKey
                    config:(NSDictionary *)config
                   version:(NSString *)version
       apiEndPointOverride:(NSString *)apiEndPointOverride
                   resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject) {
  NSLog(@"ReactNativeSdk initialize2WithApiKey");
  [_swiftAPI initialize2WithApiKey:apiKey
                            config:config
               apiEndPointOverride:apiEndPointOverride
                           version:version
                          resolver:resolve
                          rejecter:reject];
}

RCT_EXPORT_METHOD(setEmail:(NSString * _Nullable)email
       authToken:(NSString * _Nullable)authToken) {
  NSLog(@"ReactNativeSdk setEmail");
  [_swiftAPI setEmail:email authToken:authToken];
}

RCT_EXPORT_METHOD(getEmail:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject) {
  NSLog(@"ReactNativeSdk getEmail");
  [_swiftAPI getEmail:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setUserId:(NSString * _Nullable)userId
       authToken:(NSString * _Nullable)authToken) {
  NSLog(@"ReactNativeSdk setUserId");
  [_swiftAPI setUserId:userId authToken:authToken];
}

RCT_EXPORT_METHOD(getUserId:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject) {
  NSLog(@"ReactNativeSdk getUserId");
  [_swiftAPI getUserId:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setInAppShowResponse:(NSNumber *)inAppShowResponse) {
  NSLog(@"ReactNativeSdk setInAppShowResponse");
  [_swiftAPI setInAppShowResponse:inAppShowResponse];
}

RCT_EXPORT_METHOD(getInAppMessages:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject) {
  NSLog(@"ReactNativeSdk getInAppMessages");
  [_swiftAPI getInAppMessages:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getInboxMessages:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject) {
  NSLog(@"ReactNativeSdk getInboxMessages");
  [_swiftAPI getInboxMessages:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getUnreadInboxMessagesCount:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject) {
  NSLog(@"ReactNativeSdk getUnreadInboxMessagesCount");
  [_swiftAPI getUnreadInboxMessagesCount:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(showMessage:(NSString *)messageId
       consume:(BOOL)consume
       resolve:(RCTPromiseResolveBlock)resolve
       reject:(RCTPromiseRejectBlock)reject) {
  NSLog(@"ReactNativeSdk showMessage");
  [_swiftAPI showMessage:messageId consume:consume resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(removeMessage:(NSString *)messageId
       location:(NSNumber *)location
       source:(NSNumber *)source) {
  NSLog(@"ReactNativeSdk removeMessage");
  [_swiftAPI removeMessage:messageId location:location source:source];
}

RCT_EXPORT_METHOD(setReadForMessage:(NSString *)messageId
       read:(BOOL)read) {
  NSLog(@"ReactNativeSdk setReadForMessage");
  [_swiftAPI setReadForMessage:messageId read:read];
}

RCT_EXPORT_METHOD(setAutoDisplayPaused:(BOOL)autoDisplayPaused) {
  NSLog(@"ReactNativeSdk setAutoDisplayPaused");
  [_swiftAPI setAutoDisplayPaused:autoDisplayPaused];
}

RCT_EXPORT_METHOD(trackEvent:(NSString *)name
       dataFields:(NSDictionary *)dataFields) {
  NSLog(@"ReactNativeSdk trackEvent");
  [_swiftAPI trackEvent:name dataFields:dataFields];
}

RCT_EXPORT_METHOD(trackPushOpenWithCampaignId:(NSNumber *)campaignId
       templateId:(NSNumber *)templateId
       messageId:(NSString *)messageId
       appAlreadyRunning:(BOOL)appAlreadyRunning
       dataFields:(NSDictionary *)dataFields) {
  NSLog(@"ReactNativeSdk trackPushOpenWithCampaignId");
  [_swiftAPI trackPushOpenWithCampaignId:campaignId templateId:templateId messageId:messageId appAlreadyRunning:appAlreadyRunning dataFields:dataFields];
}

RCT_EXPORT_METHOD(trackInAppOpen:(NSString *)messageId
       location:(NSNumber *)location) {
  NSLog(@"ReactNativeSdk trackInAppOpen");
  [_swiftAPI trackInAppOpen:messageId location:location];
}

RCT_EXPORT_METHOD(trackInAppClick:(NSString *)messageId
       location:(NSNumber *)location
       clickedUrl:(NSString *)clickedUrl) {
  NSLog(@"ReactNativeSdk trackInAppClick");
  [_swiftAPI trackInAppClick:messageId location:location clickedUrl:clickedUrl];
}

RCT_EXPORT_METHOD(trackInAppClose:(NSString *)messageId
       location:(NSNumber *)location
       source:(NSNumber *)source
       clickedUrl:(NSString *)clickedUrl) {
  NSLog(@"ReactNativeSdk trackInAppClose");
  [_swiftAPI trackInAppClose:messageId location:location source:source clickedUrl:clickedUrl];
}

RCT_EXPORT_METHOD(inAppConsume:(NSString *)messageId
       location:(NSNumber *)location
       source:(NSNumber *)source) {
  NSLog(@"ReactNativeSdk inAppConsume");
  [_swiftAPI inAppConsume:messageId location:location source:source];
}

RCT_EXPORT_METHOD(updateCart:(NSArray *)items) {
  NSLog(@"ReactNativeSdk updateCart");
  [_swiftAPI updateCart:items];
}

RCT_EXPORT_METHOD(trackPurchase:(NSNumber *)total
       items:(NSArray *)items
       dataFields:(NSDictionary *)dataFields) {
  NSLog(@"ReactNativeSdk trackPurchase");
  [_swiftAPI trackPurchase:total items:items dataFields:dataFields];
}

RCT_EXPORT_METHOD(updateUser:(NSDictionary *)dataFields
       mergeNestedObjects:(BOOL)mergeNestedObjects) {
  NSLog(@"ReactNativeSdk updateUser");
  [_swiftAPI updateUser:dataFields mergeNestedObjects:mergeNestedObjects];
}
    RCT_EXPORT_METHOD(updateEmail:(NSString *)email
       authToken:(NSString *)authToken) {
  NSLog(@"ReactNativeSdk updateEmail");
  [_swiftAPI updateEmail:email authToken:authToken];
}

RCT_EXPORT_METHOD(getAttributionInfo:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject) {
  NSLog(@"ReactNativeSdk getAttributionInfo");
  [_swiftAPI getAttributionInfo:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setAttributionInfo:(NSDictionary *)attributionInfo) {
  NSLog(@"ReactNativeSdk setAttributionInfo");
  [_swiftAPI setAttributionInfo:attributionInfo];
}

RCT_EXPORT_METHOD(disableDeviceForCurrentUser) {
  NSLog(@"ReactNativeSdk disableDeviceForCurrentUser");
  [_swiftAPI disableDeviceForCurrentUser];
}

RCT_EXPORT_METHOD(getLastPushPayload:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject) {
  NSLog(@"ReactNativeSdk getLastPushPayload");
  [_swiftAPI getLastPushPayload:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getHtmlInAppContentForMessage:(NSString *)messageId
       resolve:(RCTPromiseResolveBlock)resolve
       reject:(RCTPromiseRejectBlock)reject) {
  NSLog(@"ReactNativeSdk getHtmlInAppContentForMessage");
  [_swiftAPI getHtmlInAppContentForMessage:messageId resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(handleAppLink:(NSString *)appLink
       resolve:(RCTPromiseResolveBlock)resolve
       reject:(RCTPromiseRejectBlock)reject) {
  NSLog(@"ReactNativeSdk handleAppLink");
  [_swiftAPI handleAppLink:appLink resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(updateSubscriptions:(NSArray *)emailListIds
       unsubscribedChannelIds:(NSArray *)unsubscribedChannelIds
       unsubscribedMessageTypeIds:(NSArray *)unsubscribedMessageTypeIds
       subscribedMessageTypeIds:(NSArray *)subscribedMessageTypeIds
       campaignId:(NSNumber *)campaignId
       templateId:(NSNumber *)templateId) {
  NSLog(@"ReactNativeSdk updateSubscriptions");
  [_swiftAPI updateSubscriptions:emailListIds unsubscribedChannelIds:unsubscribedChannelIds unsubscribedMessageTypeIds:unsubscribedMessageTypeIds subscribedMessageTypeIds:subscribedMessageTypeIds campaignId:campaignId templateId:templateId];
}

RCT_EXPORT_METHOD(startSession:(NSArray *)visibleRows) {
  NSLog(@"ReactNativeSdk startSession");
  [_swiftAPI startSession:visibleRows];
}

RCT_EXPORT_METHOD(endSession) {
  NSLog(@"ReactNativeSdk endSession");
  [_swiftAPI endSession];
}

RCT_EXPORT_METHOD(updateVisibleRows:(NSArray *)visibleRows) {
  NSLog(@"ReactNativeSdk updateVisibleRows");
  [_swiftAPI updateVisibleRows:visibleRows];
}

RCT_EXPORT_METHOD(passAlongAuthToken:(NSString *)authToken) {
  NSLog(@"ReactNativeSdk passAlongAuthToken");
  [_swiftAPI passAlongAuthToken:authToken];
}

#endif

@end
