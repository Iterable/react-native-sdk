//
//  Created by Tapash Majumder on 3/19/20.
//  Copyright © 2020 Iterable. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(RNIterableAPI, ReactIterableAPI, NSObject)

RCT_EXTERN_METHOD(initializeWithApiKey: (NSString *) apiKey
                                config: (NSDictionary *) config)

RCT_EXTERN_METHOD(setEmail: (NSString *) email)

RCT_EXTERN_METHOD(getEmail: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setUserId: (NSString *) userId)

RCT_EXTERN_METHOD(getUserId: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(disableDeviceForCurrentUser)

RCT_EXTERN_METHOD(disableDeviceForAllUsers)

RCT_EXTERN_METHOD(setUrlHandled: (BOOL) handled)

RCT_EXTERN_METHOD(setInAppShowResponse: (nonnull NSNumber *) inAppShowResponse)

RCT_EXTERN_METHOD(getLastPushPayload: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getAttributionInfo: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setAttributionInfo: (NSDictionary *) attributionInfo)

RCT_EXTERN_METHOD(trackPushOpenWithPayload: (NSDictionary *) payload
                  dataFields: (NSDictionary *) dataFields)

RCT_EXTERN_METHOD(trackPushOpenWithCampaignId: (nonnull NSNumber *) campaignId
                  templateId: (nonnull NSNumber *) templateId
                  messageId: (NSString *) messageId
                  appAlreadyRunning: (BOOL) appAlreadyRunning
                  dataFields: (NSDictionary *) dataFields)

RCT_EXTERN_METHOD(trackPurchase: (nonnull NSNumber *) total
                  items: (NSArray *) items
                  dataFields: (NSDictionary *) dataFields)

RCT_EXTERN_METHOD(trackInAppOpen: (NSString *) messageId
                  location: (nonnull NSNumber *) location)

RCT_EXTERN_METHOD(trackInAppClick: (nonnull NSString *) messageId
                  location: (nonnull NSNumber *) location
                  clickedUrl: (nonnull NSString *) clickedUrl)

RCT_EXTERN_METHOD(getInAppMessages: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(track: (NSString *) event)

@end
