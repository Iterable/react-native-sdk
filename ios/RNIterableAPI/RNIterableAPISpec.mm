#import "RNIterableAPISpec.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <IterableSDK/IterableSDK.h>

@implementation RNIterableAPISpec

RCT_EXPORT_MODULE(RNIterableAPI)

- (NSArray<NSString *> *)supportedEvents {
    return @[
        @"urlHandler",
        @"customActionHandler",
        @"inAppReceived",
        @"inAppDisplayed",
        @"inAppDismissed",
        @"inAppClicked"
    ];
}

RCT_EXPORT_METHOD(initializeWithApiKey:(NSString *)apiKey
                  config:(NSDictionary *)config
                  version:(NSString *)version
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    IterableConfig *iterableConfig = [self getIterableConfigFromDictionary:config];
    [IterableAPI initializeWithApiKey:apiKey config:iterableConfig];
    [IterableAPI.sharedInstance setDeviceAttribute:@"reactNativeSDKVersion" value:version];
    resolve(@YES);
}

RCT_EXPORT_METHOD(initialize2WithApiKey:(NSString *)apiKey
                  config:(NSDictionary *)config
                  apiEndPoint:(NSString *)apiEndPoint
                  version:(NSString *)version
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    IterableConfig *iterableConfig = [self getIterableConfigFromDictionary:config];
    [IterableAPI initializeWithApiKey:apiKey config:iterableConfig apiEndPoint:apiEndPoint];
    [IterableAPI.sharedInstance setDeviceAttribute:@"reactNativeSDKVersion" value:version];
    resolve(@YES);
}

RCT_EXPORT_METHOD(setEmail:(NSString *)email authToken:(NSString *)authToken) {
    [IterableAPI.sharedInstance setEmail:email authToken:authToken];
}

RCT_EXPORT_METHOD(getEmail:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(IterableAPI.sharedInstance.email);
}

RCT_EXPORT_METHOD(setUserId:(NSString *)userId authToken:(NSString *)authToken) {
    [IterableAPI.sharedInstance setUserId:userId authToken:authToken];
}

RCT_EXPORT_METHOD(getUserId:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(IterableAPI.sharedInstance.userId);
}

RCT_EXPORT_METHOD(disableDeviceForCurrentUser) {
    [IterableAPI.sharedInstance disableDeviceForCurrentUser];
}

RCT_EXPORT_METHOD(setInAppShowResponse:(double)inAppShowResponse) {
    // Implementation for in-app show response
}

RCT_EXPORT_METHOD(getLastPushPayload:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(IterableAPI.sharedInstance.lastPushPayload);
}

RCT_EXPORT_METHOD(getAttributionInfo:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    resolve([self dictionaryFromAttributionInfo:IterableAPI.sharedInstance.attributionInfo]);
}

RCT_EXPORT_METHOD(setAttributionInfo:(NSDictionary *)attributionInfo) {
    [IterableAPI.sharedInstance setAttributionInfo:[self attributionInfoFromDictionary:attributionInfo]];
}

RCT_EXPORT_METHOD(trackPushOpen:(double)campaignId
                  templateId:(NSNumber *)templateId
                  messageId:(NSString *)messageId
                  appAlreadyRunning:(BOOL)appAlreadyRunning
                  dataFields:(NSDictionary *)dataFields) {
    [IterableAPI.sharedInstance trackPushOpen:messageId
                                  campaignId:(NSInteger)campaignId
                                 templateId:templateId
                           appAlreadyRunning:appAlreadyRunning
                                 dataFields:dataFields];
}

RCT_EXPORT_METHOD(updateCart:(NSArray *)items) {
    [IterableAPI.sharedInstance updateCart:[self commerceItemsFromArray:items]];
}

RCT_EXPORT_METHOD(trackPurchase:(double)total
                  items:(NSArray *)items
                  dataFields:(NSDictionary *)dataFields) {
    [IterableAPI.sharedInstance trackPurchase:total
                                       items:[self commerceItemsFromArray:items]
                                  dataFields:dataFields];
}

RCT_EXPORT_METHOD(trackInAppOpen:(NSString *)messageId location:(double)location) {
    [IterableAPI.sharedInstance.inAppManager trackInAppOpen:messageId
                                                 location:[self inAppLocationFromInteger:(int)location]];
}

RCT_EXPORT_METHOD(trackInAppClick:(NSString *)messageId
                  location:(double)location
                  clickedUrl:(NSString *)clickedUrl) {
    [IterableAPI.sharedInstance.inAppManager trackInAppClick:messageId
                                                  location:[self inAppLocationFromInteger:(int)location]
                                                clickedUrl:clickedUrl];
}

RCT_EXPORT_METHOD(trackInAppClose:(NSString *)messageId
                  location:(double)location
                  source:(double)source
                  clickedUrl:(NSString *)clickedUrl) {
    [IterableAPI.sharedInstance.inAppManager trackInAppClose:messageId
                                                  location:[self inAppLocationFromInteger:(int)location]
                                                    source:[self inAppCloseSourceFromInteger:(int)source]
                                                clickedUrl:clickedUrl];
}

RCT_EXPORT_METHOD(inAppConsume:(NSString *)messageId
                  location:(double)location
                  source:(double)source) {
    [IterableAPI.sharedInstance.inAppManager removeMessage:messageId
                                                location:[self inAppLocationFromInteger:(int)location]
                                                  source:[self inAppDeleteSourceFromInteger:(int)source]];
}

RCT_EXPORT_METHOD(getHtmlInAppContentForMessage:(NSString *)messageId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [IterableAPI.sharedInstance.inAppManager getHtmlInAppContentForMessage:messageId
                                                               onSuccess:^(NSString *html) {
        resolve(html);
    } onFailure:^(NSString *reason) {
        reject(@"", reason, nil);
    }];
}

RCT_EXPORT_METHOD(trackEvent:(NSString *)name dataFields:(NSDictionary *)dataFields) {
    [IterableAPI.sharedInstance trackEvent:name dataFields:dataFields];
}

RCT_EXPORT_METHOD(updateUser:(NSDictionary *)dataFields mergeNestedObjects:(BOOL)mergeNestedObjects) {
    [IterableAPI.sharedInstance updateUser:dataFields mergeNestedObjects:mergeNestedObjects];
}

RCT_EXPORT_METHOD(updateEmail:(NSString *)email authToken:(NSString *)authToken) {
    [IterableAPI.sharedInstance updateEmail:email authToken:authToken];
}

RCT_EXPORT_METHOD(handleAppLink:(NSString *)appLink
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [IterableAPI.sharedInstance handleAppLink:appLink
                                   onSuccess:^(NSDictionary *data) {
        resolve(data);
    } onFailure:^(NSString *reason) {
        reject(@"", reason, nil);
    }];
}

RCT_EXPORT_METHOD(getInAppMessages:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [IterableAPI.sharedInstance.inAppManager getMessages:^(NSArray<IterableInAppMessage *> *messages) {
        resolve([self arrayFromInAppMessages:messages]);
    } onFailure:^(NSString *reason) {
        reject(@"", reason, nil);
    }];
}

RCT_EXPORT_METHOD(getInboxMessages:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [IterableAPI.sharedInstance.inAppManager getInboxMessages:^(NSArray<IterableInAppMessage *> *messages) {
        resolve([self arrayFromInAppMessages:messages]);
    } onFailure:^(NSString *reason) {
        reject(@"", reason, nil);
    }];
}

RCT_EXPORT_METHOD(getUnreadInboxMessagesCount:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [IterableAPI.sharedInstance.inAppManager getUnreadInboxMessagesCount:^(NSInteger count) {
        resolve(@(count));
    } onFailure:^(NSString *reason) {
        reject(@"", reason, nil);
    }];
}

RCT_EXPORT_METHOD(showMessage:(NSString *)messageId
                  consume:(BOOL)consume
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [IterableAPI.sharedInstance.inAppManager showMessage:messageId
                                              consume:consume
                                           onSuccess:^(NSDictionary *data) {
        resolve(data);
    } onFailure:^(NSString *reason) {
        reject(@"", reason, nil);
    }];
}

RCT_EXPORT_METHOD(setReadForMessage:(NSString *)messageId read:(BOOL)read) {
    [IterableAPI.sharedInstance.inAppManager setRead:messageId read:read];
}

RCT_EXPORT_METHOD(removeMessage:(NSString *)messageId
                  location:(double)location
                  deleteSource:(double)deleteSource) {
    [IterableAPI.sharedInstance.inAppManager removeMessage:messageId
                                                location:[self inAppLocationFromInteger:(int)location]
                                                  source:[self inAppDeleteSourceFromInteger:(int)deleteSource]];
}

#pragma mark - Helper Methods

- (IterableConfig *)getIterableConfigFromDictionary:(NSDictionary *)config {
    IterableConfig *iterableConfig = [[IterableConfig alloc] init];

    if (config[@"pushIntegrationName"]) {
        iterableConfig.pushIntegrationName = config[@"pushIntegrationName"];
    }

    if (config[@"autoPushRegistration"]) {
        iterableConfig.autoPushRegistration = [config[@"autoPushRegistration"] boolValue];
    }

    if (config[@"logLevel"]) {
        iterableConfig.logLevel = [config[@"logLevel"] integerValue];
    }

    if (config[@"inAppDisplayInterval"]) {
        iterableConfig.inAppDisplayInterval = [config[@"inAppDisplayInterval"] doubleValue];
    }

    if (config[@"urlHandler"]) {
        iterableConfig.urlHandler = ^(NSURL *url) {
            [self sendEventWithName:@"urlHandler" body:url.absoluteString];
            return [config[@"urlHandler"][@"shouldOpenInNewWindow"] boolValue];
        };
    }

    if (config[@"customActionHandler"]) {
        iterableConfig.customActionHandler = ^(IterableAction *action, IterableActionContext *context) {
            [self sendEventWithName:@"customActionHandler" body:action.type];
            return [config[@"customActionHandler"][@"shouldHandleCustomAction"] boolValue];
        };
    }

    if (config[@"inAppHandler"]) {
        iterableConfig.inAppHandler = [[IterableInAppHandler alloc] init];
        iterableConfig.inAppHandler.onInAppReceived = ^(IterableInAppMessage *message) {
            [self sendEventWithName:@"inAppReceived" body:message.messageId];
            return [config[@"inAppHandler"][@"shouldShowInApp"] boolValue];
        };
        iterableConfig.inAppHandler.onInAppDisplayed = ^(IterableInAppMessage *message) {
            [self sendEventWithName:@"inAppDisplayed" body:message.messageId];
        };
        iterableConfig.inAppHandler.onInAppDismissed = ^(IterableInAppMessage *message) {
            [self sendEventWithName:@"inAppDismissed" body:message.messageId];
        };
        iterableConfig.inAppHandler.onInAppClicked = ^(IterableInAppMessage *message, NSString *clickedUrl) {
            [self sendEventWithName:@"inAppClicked" body:message.messageId];
        };
    }

    return iterableConfig;
}

- (NSDictionary *)dictionaryFromAttributionInfo:(IterableAttributionInfo *)attributionInfo {
    if (!attributionInfo) {
        return nil;
    }

    return @{
        @"campaignId": attributionInfo.campaignId ?: [NSNull null],
        @"templateId": attributionInfo.templateId ?: [NSNull null],
        @"messageId": attributionInfo.messageId ?: [NSNull null]
    };
}

- (IterableAttributionInfo *)attributionInfoFromDictionary:(NSDictionary *)dictionary {
    if (!dictionary) {
        return nil;
    }

    return [[IterableAttributionInfo alloc] initWithCampaignId:dictionary[@"campaignId"]
                                                    templateId:dictionary[@"templateId"]
                                                     messageId:dictionary[@"messageId"]];
}

- (NSArray *)commerceItemsFromArray:(NSArray *)items {
    NSMutableArray *commerceItems = [NSMutableArray array];

    for (NSDictionary *item in items) {
        IterableCommerceItem *commerceItem = [[IterableCommerceItem alloc] initWithId:item[@"id"]
                                                                                name:item[@"name"]
                                                                               price:[item[@"price"] doubleValue]
                                                                            quantity:[item[@"quantity"] integerValue]];
        [commerceItems addObject:commerceItem];
    }

    return commerceItems;
}

- (NSArray *)arrayFromInAppMessages:(NSArray<IterableInAppMessage *> *)messages {
    NSMutableArray *array = [NSMutableArray array];

    for (IterableInAppMessage *message in messages) {
        [array addObject:@{
            @"messageId": message.messageId,
            @"campaignId": @(message.campaignId),
            @"content": @{
                @"html": message.content.html ?: [NSNull null],
                @"edgeInsets": @{
                    @"top": @(message.content.padding.top),
                    @"left": @(message.content.padding.left),
                    @"bottom": @(message.content.padding.bottom),
                    @"right": @(message.content.padding.right)
                }
            }
        }];
    }

    return array;
}

- (IterableInAppLocation)inAppLocationFromInteger:(int)location {
    switch (location) {
        case 0:
            return IterableInAppLocationInApp;
        case 1:
            return IterableInAppLocationInbox;
        default:
            return IterableInAppLocationInApp;
    }
}

- (IterableInAppCloseSource)inAppCloseSourceFromInteger:(int)source {
    switch (source) {
        case 0:
            return IterableInAppCloseSourceBack;
        case 1:
            return IterableInAppCloseSourceLink;
        case 2:
            return IterableInAppCloseSourceClose;
        default:
            return IterableInAppCloseSourceBack;
    }
}

- (IterableInAppDeleteSource)inAppDeleteSourceFromInteger:(int)source {
    switch (source) {
        case 0:
            return IterableInAppDeleteSourceInboxSwipe;
        case 1:
            return IterableInAppDeleteSourceDeleteButton;
        default:
            return IterableInAppDeleteSourceInboxSwipe;
    }
}

@end
