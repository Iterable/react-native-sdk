#import "RNIterableAPI.h"
#import <IterableSDK/IterableSDK.h>  // umbrella (Objective-C) header

// Forward-declare the Swift protocols/enum used in the Swift header.
@protocol IterableInAppDelegate;
@protocol IterableCustomActionDelegate;
@protocol IterableAuthDelegate;
@protocol IterableURLDelegate;
typedef NS_ENUM(NSInteger, InAppShowResponse) {
  InAppShowResponseShow = 0,
  InAppShowResponseSkip = 1, // use real cases if different; values just need to exist
};

#import "RNIterableAPI-Swift.h"


@implementation RNIterableAPI {
  ReactIterableAPI *_swiftAPI;
}

RCT_EXPORT_MODULE(RNIterableAPI)

- (instancetype)init {
  NSLog(@"RNIterableAPI init");
  if ((self = [super init])) {
    _swiftAPI = [ReactIterableAPI shared];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNIterableAPISpecJSI>(params);
}

- (void)hello {
  NSLog(@"Hello from Objective-C");
  [(ReactIterableAPI *)_swiftAPI hello];
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

@end



/**
 * OLD BELOW
 */
// //
// //  Created by Tapash Majumder on 3/19/20.
// //  Copyright © 2020 Iterable. All rights reserved.
// //
// #import "RNIterableAPI.h"

// @interface RCT_EXTERN_REMAP_MODULE(RNIterableAPI, ReactIterableAPI, NSObject)

// // MARK: - Native SDK Functions

// RCT_EXTERN_METHOD(initializeWithApiKey: (nonnull NSString *) apiKey
//                   config: (nonnull NSDictionary *) config
//                   version: (nonnull NSString *) version
//                   resolver: (RCTPromiseResolveBlock) resolve
//                   rejecter: (RCTPromiseRejectBlock) reject)

// RCT_EXTERN_METHOD(initialize2WithApiKey: (nonnull NSString *) apiKey
//                   config: (nonnull NSDictionary *) config
//                   apiEndPointOverride: (nonnull NSString *) apiEndPoint
//                   version: (nonnull NSString *) version
//                   resolver: (RCTPromiseResolveBlock) resolve
//                   rejecter: (RCTPromiseRejectBlock) reject)

// RCT_EXTERN_METHOD(setEmail: (NSString *) email
//                   authToken: (NSString *) authToken)

// RCT_EXTERN_METHOD(getEmail: (RCTPromiseResolveBlock) resolve
//                   rejecter: (RCTPromiseRejectBlock) reject)

// RCT_EXTERN_METHOD(setUserId: (NSString *) userId
//                   authToken: (NSString *) authToken)

// RCT_EXTERN_METHOD(getUserId: (RCTPromiseResolveBlock) resolve
//                   rejecter: (RCTPromiseRejectBlock) reject)

// // MARK: - Iterable API Request Functions

// RCT_EXTERN_METHOD(disableDeviceForCurrentUser)

// RCT_EXTERN_METHOD(setInAppShowResponse: (nonnull NSNumber *) inAppShowResponse)

// RCT_EXTERN_METHOD(getLastPushPayload: (RCTPromiseResolveBlock) resolve
//                   rejecter: (RCTPromiseRejectBlock) reject)

// RCT_EXTERN_METHOD(getAttributionInfo: (RCTPromiseResolveBlock) resolve
//                   rejecter: (RCTPromiseRejectBlock) reject)

// RCT_EXTERN_METHOD(setAttributionInfo: (NSDictionary *) attributionInfo)

// RCT_EXTERN_METHOD(trackPushOpenWithCampaignId: (nonnull NSNumber *) campaignId
//                   templateId: (nonnull NSNumber *) templateId
//                   messageId: (nonnull NSString *) messageId
//                   appAlreadyRunning: (BOOL) appAlreadyRunning
//                   dataFields: (NSDictionary *) dataFields)

// RCT_EXTERN_METHOD(updateCart: (NSArray *) items)

// RCT_EXTERN_METHOD(trackPurchase: (nonnull NSNumber *) total
//                   items: (NSArray *) items
//                   dataFields: (NSDictionary *) dataFields)

// RCT_EXTERN_METHOD(trackInAppOpen: (NSString *) messageId
//                   location: (nonnull NSNumber *) location)

// RCT_EXTERN_METHOD(trackInAppClick: (nonnull NSString *) messageId
//                   location: (nonnull NSNumber *) location
//                   clickedUrl: (nonnull NSString *) clickedUrl)

// RCT_EXTERN_METHOD(trackInAppClose: (nonnull NSString *) messageId
//                   location: (nonnull NSNumber *) location
//                   source: (nonnull NSNumber *) source
//                   clickedUrl: (NSString *) clickedUrl)

// RCT_EXTERN_METHOD(inAppConsume: (nonnull NSString *) messageId
//                   location: (nonnull NSNumber *) location
//                   source: (nonnull NSNumber *) source)

// RCT_EXTERN_METHOD(trackEvent: (nonnull NSString *) name
//                   dataFields: (NSDictionary *) dataFields)

// RCT_EXTERN_METHOD(updateUser: (nonnull NSDictionary *) dataFields
//                   mergeNestedObjects: (BOOL) mergeNestedObjects)

// RCT_EXTERN_METHOD(updateEmail: (nonnull NSString *) email
//                   authToken: (NSString *) authToken)

// RCT_EXTERN_METHOD(handleAppLink: (nonnull NSString *) appLink
//                   resolver: (RCTPromiseResolveBlock) resolve
//                   rejecter: (RCTPromiseRejectBlock) reject)

// RCT_EXTERN_METHOD(updateSubscriptions: (NSArray *) emailListIds
//                   unsubscribedChannelIds: (NSArray *) unsubscribedChannelIds
//                   unsubscribedMessageTypeIds: (NSArray *) unsubscribedMessageTypeIds
//                   subscribedMessageTypeIds: (NSArray *) subscribedMessageTypeIds
//                   campaignId: (nonnull NSNumber *) campaignId
//                   templateId: (nonnull NSNumber *) templateId)

// // MARK: - SDK In-App Manager Functions

// RCT_EXTERN_METHOD(getInAppMessages: (RCTPromiseResolveBlock) resolve
//                   rejecter: (RCTPromiseRejectBlock) reject)

// RCT_EXTERN_METHOD(getHtmlInAppContentForMessage: (nonnull NSString *) messageId
//                   resolver: (RCTPromiseResolveBlock) resolve
//                   rejecter: (RCTPromiseRejectBlock) reject)

// RCT_EXTERN_METHOD(getInboxMessages: (RCTPromiseResolveBlock) resolve
//                   rejecter: (RCTPromiseRejectBlock) reject)

// RCT_EXTERN_METHOD(getUnreadInboxMessagesCount: (RCTPromiseResolveBlock) resolve
//                   rejecter: (RCTPromiseRejectBlock) reject)

// RCT_EXTERN_METHOD(showMessage: (nonnull NSString *) messageId
//                   consume: (nonnull BOOL) consume
//                   resolver: (RCTPromiseResolveBlock) resolve
//                   rejecter: (RCTPromiseRejectBlock) reject)

// RCT_EXTERN_METHOD(removeMessage: (nonnull NSString *) messageId
//                   location: (nonnull NSNumber *) location
//                   source: (nonnull NSNumber *) source)

// RCT_EXTERN_METHOD(setReadForMessage: (nonnull NSString *) messageId
//                   read: (BOOL) read)

// RCT_EXTERN_METHOD(setAutoDisplayPaused: (BOOL) paused)

// // MARK: - SDK Inbox Session Tracking Functions

// RCT_EXTERN_METHOD(startSession: (nonnull NSArray *) visibleRows)

// RCT_EXTERN_METHOD(endSession)

// RCT_EXTERN_METHOD(updateVisibleRows: (nonnull NSArray *) visibleRows)

// // MARK: - SDK Auth Manager Functions

// RCT_EXTERN_METHOD(passAlongAuthToken: (NSString *) authToken)

// @end
