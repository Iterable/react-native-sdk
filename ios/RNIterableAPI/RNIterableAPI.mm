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

// Export the initialize2 method
// RCT_EXPORT_METHOD(initialize2WithApiKey:(NSString *)apiKey
//                   config:(NSDictionary *)config
//                   apiEndPointOverride:(NSString *)apiEndPointOverride
//                   version:(NSString *)version
//                   resolve:(RCTPromiseResolveBlock)resolve
//                   reject:(RCTPromiseRejectBlock)reject)
// {
//   [_swiftAPI initialize2WithApiKey:apiKey
//                             config:config
//                 apiEndPointOverride:apiEndPointOverride
//                            version:version
//                           resolver:resolve
//                          rejecter:reject];
// }




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
