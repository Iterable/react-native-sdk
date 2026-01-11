#import "RNIterableAPI.h"

#if RCT_NEW_ARCH_ENABLED
  #import "RNIterableAPISpec.h"
#endif

#import <IterableSDK/IterableSDK.h>

// Forward-declare the Swift protocols/enum used in the Swift header
// to avoid compiler errors.
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

// MARK: - Initialization
- (instancetype)init {
  self = [super init];
  if(self) {
    // Instantiate the ReactIterableAPI and set the delegate
    _swiftAPI = [ReactIterableAPI new];
    _swiftAPI.delegate = self;
  }
  return self;
}

RCT_EXPORT_MODULE()

// MARK: - RCTEventEmitter functions
- (NSArray<NSString *> *)supportedEvents {
  return [ReactIterableAPI supportedEvents];
}

- (void)sendEventWithName:(NSString *_Nonnull)name result:(double)result {
  [self sendEventWithName:name body:@(result)];
}

#if RCT_NEW_ARCH_ENABLED

// MARK: - New Architecture functions exposed to JS

- (void)startObserving {
  [(ReactIterableAPI *)_swiftAPI startObserving];
}

- (void)stopObserving {
  [(ReactIterableAPI *)_swiftAPI stopObserving];
}

- (void)initializeWithApiKey:(NSString *)apiKey
                      config:(NSDictionary *)config
                     version:(NSString *)version
                     resolve:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject {
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
                       reject:(RCTPromiseRejectBlock)reject {
  [_swiftAPI initialize2WithApiKey:apiKey
                            config:config
                           version:version
               apiEndPointOverride:apiEndPointOverride
                          resolver:resolve
                          rejecter:reject];
}

- (void)setEmail:(NSString *_Nullable)email
       authToken:(NSString *_Nullable)authToken {
  [_swiftAPI setEmail:email authToken:authToken];
}

- (void)getEmail:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject {
  [_swiftAPI getEmail:resolve rejecter:reject];
}

- (void)setUserId:(NSString *_Nullable)userId
        authToken:(NSString *_Nullable)authToken {
  [_swiftAPI setUserId:userId authToken:authToken];
}

- (void)getUserId:(RCTPromiseResolveBlock)resolve
           reject:(RCTPromiseRejectBlock)reject {
  [_swiftAPI getUserId:resolve rejecter:reject];
}

- (void)setInAppShowResponse:(double)inAppShowResponse {
  [_swiftAPI setInAppShowResponse:inAppShowResponse];
}

- (void)getInAppMessages:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject {
  [_swiftAPI getInAppMessages:resolve rejecter:reject];
}

- (void)getInboxMessages:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject {
  [_swiftAPI getInboxMessages:resolve rejecter:reject];
}

// NOTE: This is not used anywhere on the JS side.
- (void)getUnreadInboxMessagesCount:(RCTPromiseResolveBlock)resolve
                             reject:(RCTPromiseRejectBlock)reject {
  [_swiftAPI getUnreadInboxMessagesCount:resolve rejecter:reject];
}

- (void)showMessage:(NSString *)messageId
            consume:(BOOL)consume
            resolve:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject {
  [_swiftAPI showMessage:messageId
                 consume:consume
                resolver:resolve
                rejecter:reject];
}

- (void)removeMessage:(NSString *)messageId
             location:(double)location
               source:(double)source {
  [_swiftAPI removeMessage:messageId location:location source:source];
}

- (void)setReadForMessage:(NSString *)messageId read:(BOOL)read {
  [_swiftAPI setReadForMessage:messageId read:read];
}

- (void)setAutoDisplayPaused:(BOOL)autoDisplayPaused {
  [_swiftAPI setAutoDisplayPaused:autoDisplayPaused];
}

- (void)trackEvent:(NSString *)name dataFields:(NSDictionary *)dataFields {
  [_swiftAPI trackEvent:name dataFields:dataFields];
}

- (void)trackPushOpenWithCampaignId:(double)campaignId
                         templateId:(NSNumber *)templateId
                          messageId:(NSString *)messageId
                  appAlreadyRunning:(BOOL)appAlreadyRunning
                         dataFields:(NSDictionary *)dataFields {
  [_swiftAPI trackPushOpenWithCampaignId:campaignId
                              templateId:templateId
                               messageId:messageId
                       appAlreadyRunning:appAlreadyRunning
                              dataFields:dataFields];
}

- (void)trackInAppOpen:(NSString *)messageId location:(double)location {
  [_swiftAPI trackInAppOpen:messageId location:location];
}

- (void)trackInAppClick:(NSString *)messageId
               location:(double)location
             clickedUrl:(NSString *)clickedUrl {
  [_swiftAPI trackInAppClick:messageId location:location clickedUrl:clickedUrl];
}

- (void)trackInAppClose:(NSString *)messageId
               location:(double)location
                 source:(double)source
             clickedUrl:(NSString *_Nullable)clickedUrl {
  [_swiftAPI trackInAppClose:messageId
                    location:location
                      source:source
                  clickedUrl:clickedUrl];
}

- (void)inAppConsume:(NSString *)messageId
            location:(double)location
              source:(double)source {
  [_swiftAPI inAppConsume:messageId location:location source:source];
}

- (void)updateCart:(NSArray *)items {
  [_swiftAPI updateCart:items];
}

- (void)trackPurchase:(double)total
                items:(NSArray *)items
           dataFields:(NSDictionary *)dataFields {
  [_swiftAPI trackPurchase:total items:items dataFields:dataFields];
}

- (void)updateUser:(NSDictionary *)dataFields
    mergeNestedObjects:(BOOL)mergeNestedObjects {
  [_swiftAPI updateUser:dataFields mergeNestedObjects:mergeNestedObjects];
}

- (void)updateEmail:(NSString *)email authToken:(NSString *)authToken {
  [_swiftAPI updateEmail:email authToken:authToken];
}

- (void)getAttributionInfo:(RCTPromiseResolveBlock)resolve
                    reject:(RCTPromiseRejectBlock)reject {
  [_swiftAPI getAttributionInfo:resolve rejecter:reject];
}

- (void)setAttributionInfo:(NSDictionary *_Nullable)attributionInfo {
  [_swiftAPI setAttributionInfo:attributionInfo];
}

- (void)disableDeviceForCurrentUser {
  [_swiftAPI disableDeviceForCurrentUser];
}

- (void)getLastPushPayload:(RCTPromiseResolveBlock)resolve
                    reject:(RCTPromiseRejectBlock)reject {
  [_swiftAPI getLastPushPayload:resolve rejecter:reject];
}

- (void)getHtmlInAppContentForMessage:(NSString *)messageId
                              resolve:(RCTPromiseResolveBlock)resolve
                               reject:(RCTPromiseRejectBlock)reject {
  [_swiftAPI getHtmlInAppContentForMessage:messageId
                                  resolver:resolve
                                  rejecter:reject];
}

- (void)handleAppLink:(NSString *)appLink
              resolve:(RCTPromiseResolveBlock)resolve
               reject:(RCTPromiseRejectBlock)reject {
  [_swiftAPI handleAppLink:appLink resolver:resolve rejecter:reject];
}

- (void)updateSubscriptions:(NSArray *_Nullable)emailListIds
        unsubscribedChannelIds:(NSArray *_Nullable)unsubscribedChannelIds
    unsubscribedMessageTypeIds:(NSArray *_Nullable)unsubscribedMessageTypeIds
      subscribedMessageTypeIds:(NSArray *_Nullable)subscribedMessageTypeIds
                    campaignId:(double)campaignId
                    templateId:(double)templateId {
  [_swiftAPI updateSubscriptions:emailListIds
          unsubscribedChannelIds:unsubscribedChannelIds
      unsubscribedMessageTypeIds:unsubscribedMessageTypeIds
        subscribedMessageTypeIds:subscribedMessageTypeIds
                      campaignId:campaignId
                      templateId:templateId];
}

- (void)startSession:(NSArray *)visibleRows {
  [_swiftAPI startSession:visibleRows];
}

- (void)endSession {
  [_swiftAPI endSession];
}

- (void)updateVisibleRows:(NSArray *)visibleRows {
  [_swiftAPI updateVisibleRows:visibleRows];
}

- (void)passAlongAuthToken:(NSString *_Nullable)authToken {
  [_swiftAPI passAlongAuthToken:authToken];
}

- (void)pauseAuthRetries:(BOOL)pauseRetry {
  [_swiftAPI pauseAuthRetries:pauseRetry];
}

- (void)startEmbeddedSession {
  [_swiftAPI startEmbeddedSession];
}

- (void)endEmbeddedSession {
  [_swiftAPI endEmbeddedSession];
}

- (void)syncEmbeddedMessages {
  [_swiftAPI syncEmbeddedMessages];
}

- (void)getEmbeddedMessages:(NSArray *_Nullable)placementIds
                    resolve:(RCTPromiseResolveBlock)resolve
                     reject:(RCTPromiseRejectBlock)reject {
  [_swiftAPI getEmbeddedMessages:placementIds resolver:resolve rejecter:reject];
}

- (void)startEmbeddedImpression:(NSString *)messageId placementId:(double)placementId {
  [_swiftAPI startEmbeddedImpression:messageId placementId:placementId];
}

- (void)pauseEmbeddedImpression:(NSString *)messageId {
  [_swiftAPI pauseEmbeddedImpression:messageId];
}

- (void)trackEmbeddedClick:(NSDictionary *)message
                  buttonId:(NSString *_Nullable)buttonId
                clickedUrl:(NSString *_Nullable)clickedUrl {
  [_swiftAPI trackEmbeddedClick:message buttonId:buttonId clickedUrl:clickedUrl];
}

- (void)wakeApp {
  // Placeholder function -- this method is only used in Android
}

// MARK: - TurboModule integration
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeRNIterableAPISpecJSI>(params);
}

#else

// MARK: - RCTBridgeModule integration for Legacy Architecture

RCT_EXPORT_METHOD(startObserving) {
  [(ReactIterableAPI *)_swiftAPI startObserving];
}

RCT_EXPORT_METHOD(stopObserving) {
  [(ReactIterableAPI *)_swiftAPI stopObserving];
}

RCT_EXPORT_METHOD(
    initializeWithApiKey : (NSString *)apiKey config : (NSDictionary *)
        config version : (NSString *)version resolve : (RCTPromiseResolveBlock)
            resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI initializeWithApiKey:apiKey
                           config:config
                          version:version
                         resolver:resolve
                         rejecter:reject];
}

RCT_EXPORT_METHOD(
    initialize2WithApiKey : (NSString *)apiKey config : (NSDictionary *)
        config version : (NSString *)version apiEndPointOverride : (NSString *)
            apiEndPointOverride resolve : (RCTPromiseResolveBlock)
                resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI initialize2WithApiKey:apiKey
                            config:config
                           version:version
               apiEndPointOverride:apiEndPointOverride
                          resolver:resolve
                          rejecter:reject];
}

RCT_EXPORT_METHOD(setEmail : (NSString *_Nullable)
                      email authToken : (NSString *_Nullable)authToken) {
  [_swiftAPI setEmail:email authToken:authToken];
}

RCT_EXPORT_METHOD(getEmail : (RCTPromiseResolveBlock)
                      resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI getEmail:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setUserId : (NSString *_Nullable)
                      userId authToken : (NSString *_Nullable)authToken) {
  [_swiftAPI setUserId:userId authToken:authToken];
}

RCT_EXPORT_METHOD(getUserId : (RCTPromiseResolveBlock)
                      resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI getUserId:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setInAppShowResponse : (double)inAppShowResponse) {
  [_swiftAPI setInAppShowResponse:inAppShowResponse];
}

RCT_EXPORT_METHOD(getInAppMessages : (RCTPromiseResolveBlock)
                      resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI getInAppMessages:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getInboxMessages : (RCTPromiseResolveBlock)
                      resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI getInboxMessages:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getUnreadInboxMessagesCount : (RCTPromiseResolveBlock)
                      resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI getUnreadInboxMessagesCount:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(showMessage : (NSString *)messageId consume : (BOOL)
                      consume resolve : (RCTPromiseResolveBlock)
                          resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI showMessage:messageId
                 consume:consume
                resolver:resolve
                rejecter:reject];
}

RCT_EXPORT_METHOD(removeMessage : (NSString *)messageId location : (double)
                      location source : (double)source) {
  [_swiftAPI removeMessage:messageId location:location source:source];
}

RCT_EXPORT_METHOD(setReadForMessage : (NSString *)messageId read : (BOOL)read) {
  [_swiftAPI setReadForMessage:messageId read:read];
}

RCT_EXPORT_METHOD(setAutoDisplayPaused : (BOOL)autoDisplayPaused) {
  [_swiftAPI setAutoDisplayPaused:autoDisplayPaused];
}

RCT_EXPORT_METHOD(trackEvent : (NSString *)name dataFields : (NSDictionary *)
                      dataFields) {
  [_swiftAPI trackEvent:name dataFields:dataFields];
}

RCT_EXPORT_METHOD(
    trackPushOpenWithCampaignId : (double)campaignId templateId : (NSNumber *)
        templateId messageId : (NSString *)messageId appAlreadyRunning : (BOOL)
            appAlreadyRunning dataFields : (NSDictionary *)dataFields) {
  [_swiftAPI trackPushOpenWithCampaignId:campaignId
                              templateId:templateId
                               messageId:messageId
                       appAlreadyRunning:appAlreadyRunning
                              dataFields:dataFields];
}

RCT_EXPORT_METHOD(trackInAppOpen : (NSString *)messageId location : (double)
                      location) {
  [_swiftAPI trackInAppOpen:messageId location:location];
}

RCT_EXPORT_METHOD(trackInAppClick : (NSString *)messageId location : (double)
                      location clickedUrl : (NSString *)clickedUrl) {
  [_swiftAPI trackInAppClick:messageId location:location clickedUrl:clickedUrl];
}

RCT_EXPORT_METHOD(trackInAppClose : (NSString *)messageId location : (double)
                      location source : (double)source clickedUrl : (NSString *)
                          clickedUrl) {
  [_swiftAPI trackInAppClose:messageId
                    location:location
                      source:source
                  clickedUrl:clickedUrl];
}

RCT_EXPORT_METHOD(inAppConsume : (NSString *)messageId location : (double)
                      location source : (double)source) {
  [_swiftAPI inAppConsume:messageId location:location source:source];
}

RCT_EXPORT_METHOD(updateCart : (NSArray *)items) {
  [_swiftAPI updateCart:items];
}

RCT_EXPORT_METHOD(trackPurchase : (double)total items : (NSArray *)
                      items dataFields : (NSDictionary *)dataFields) {
  [_swiftAPI trackPurchase:total items:items dataFields:dataFields];
}

RCT_EXPORT_METHOD(updateUser : (NSDictionary *)dataFields mergeNestedObjects : (
    BOOL)mergeNestedObjects) {
  [_swiftAPI updateUser:dataFields mergeNestedObjects:mergeNestedObjects];
}

RCT_EXPORT_METHOD(updateEmail : (NSString *)email authToken : (NSString *)
                      authToken) {
  [_swiftAPI updateEmail:email authToken:authToken];
}

RCT_EXPORT_METHOD(getAttributionInfo : (RCTPromiseResolveBlock)
                      resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI getAttributionInfo:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(setAttributionInfo : (NSDictionary *)attributionInfo) {
  [_swiftAPI setAttributionInfo:attributionInfo];
}

RCT_EXPORT_METHOD(disableDeviceForCurrentUser) {
  [_swiftAPI disableDeviceForCurrentUser];
}

RCT_EXPORT_METHOD(getLastPushPayload : (RCTPromiseResolveBlock)
                      resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI getLastPushPayload:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(getHtmlInAppContentForMessage : (NSString *)
                      messageId resolve : (RCTPromiseResolveBlock)
                          resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI getHtmlInAppContentForMessage:messageId
                                  resolver:resolve
                                  rejecter:reject];
}

RCT_EXPORT_METHOD(handleAppLink : (NSString *)appLink resolve : (
    RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI handleAppLink:appLink resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(
    updateSubscriptions : (NSArray *)emailListIds unsubscribedChannelIds : (
        NSArray *)
        unsubscribedChannelIds unsubscribedMessageTypeIds : (NSArray *)
            unsubscribedMessageTypeIds subscribedMessageTypeIds : (NSArray *)
                subscribedMessageTypeIds campaignId : (double)
                    campaignId templateId : (double)templateId) {
  [_swiftAPI updateSubscriptions:emailListIds
          unsubscribedChannelIds:unsubscribedChannelIds
      unsubscribedMessageTypeIds:unsubscribedMessageTypeIds
        subscribedMessageTypeIds:subscribedMessageTypeIds
                      campaignId:campaignId
                      templateId:templateId];
}

RCT_EXPORT_METHOD(startSession : (NSArray *)visibleRows) {
  [_swiftAPI startSession:visibleRows];
}

RCT_EXPORT_METHOD(endSession) { [_swiftAPI endSession]; }

RCT_EXPORT_METHOD(updateVisibleRows : (NSArray *)visibleRows) {
  [_swiftAPI updateVisibleRows:visibleRows];
}

RCT_EXPORT_METHOD(passAlongAuthToken : (NSString *_Nullable)authToken) {
  [_swiftAPI passAlongAuthToken:authToken];
}

RCT_EXPORT_METHOD(pauseAuthRetries : (BOOL)pauseRetry) {
  [_swiftAPI pauseAuthRetries:pauseRetry];
}

RCT_EXPORT_METHOD(startEmbeddedSession) {
  [_swiftAPI startEmbeddedSession];
}

RCT_EXPORT_METHOD(endEmbeddedSession) {
  [_swiftAPI endEmbeddedSession];
}

RCT_EXPORT_METHOD(syncEmbeddedMessages) {
  [_swiftAPI syncEmbeddedMessages];
}

RCT_EXPORT_METHOD(getEmbeddedMessages : (NSArray *_Nullable)placementIds resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  [_swiftAPI getEmbeddedMessages:placementIds resolver:resolve rejecter:reject];
}

RCT_EXPORT_METHOD(startEmbeddedImpression : (NSString *)messageId placementId : (double)placementId) {
  [_swiftAPI startEmbeddedImpression:messageId placementId:placementId];
}

RCT_EXPORT_METHOD(pauseEmbeddedImpression : (NSString *)messageId) {
  [_swiftAPI pauseEmbeddedImpression:messageId];
}

RCT_EXPORT_METHOD(trackEmbeddedClick : (NSDictionary *)message buttonId : (NSString *_Nullable)buttonId clickedUrl : (NSString *_Nullable)clickedUrl) {
  [_swiftAPI trackEmbeddedClick:message buttonId:buttonId clickedUrl:clickedUrl];
}

RCT_EXPORT_METHOD(wakeApp) {
  // Placeholder function -- this method is only used in Android
}

#endif

@end
