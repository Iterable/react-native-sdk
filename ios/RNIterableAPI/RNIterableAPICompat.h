#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <IterableSDK/IterableSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNIterableAPICompat : RCTEventEmitter <RCTBridgeModule>

// Initialization
- (void)initializeWithApiKey:(NSString *)apiKey
                     config:(NSDictionary *)config
                    version:(NSString *)version
                   resolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject;

- (void)initialize2WithApiKey:(NSString *)apiKey
                      config:(NSDictionary *)config
                 apiEndPoint:(NSString *)apiEndPoint
                     version:(NSString *)version
                    resolver:(RCTPromiseResolveBlock)resolve
                    rejecter:(RCTPromiseRejectBlock)reject;

// User Management
- (void)setEmail:(NSString *)email authToken:(NSString *)authToken;
- (void)getEmail:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;
- (void)setUserId:(NSString *)userId authToken:(NSString *)authToken;
- (void)getUserId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;
- (void)disableDeviceForCurrentUser;

// Push Notifications
- (void)getLastPushPayload:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;
- (void)trackPushOpen:(double)campaignId
           templateId:(NSNumber *)templateId
            messageId:(NSString *)messageId
      appAlreadyRunning:(BOOL)appAlreadyRunning
            dataFields:(NSDictionary *)dataFields;

// In-App Messages
- (void)getInAppMessages:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;
- (void)getInboxMessages:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;
- (void)getUnreadInboxMessagesCount:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;
- (void)showMessage:(NSString *)messageId
            consume:(BOOL)consume
           resolver:(RCTPromiseResolveBlock)resolve
           rejecter:(RCTPromiseRejectBlock)reject;
- (void)setReadForMessage:(NSString *)messageId read:(BOOL)read;
- (void)removeMessage:(NSString *)messageId
            location:(double)location
        deleteSource:(double)deleteSource;

// Events and User Attributes
- (void)trackEvent:(NSString *)name dataFields:(NSDictionary *)dataFields;
- (void)updateUser:(NSDictionary *)dataFields mergeNestedObjects:(BOOL)mergeNestedObjects;
- (void)updateEmail:(NSString *)email authToken:(NSString *)authToken;

// Attribution
- (void)getAttributionInfo:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;
- (void)setAttributionInfo:(NSDictionary *)attributionInfo;

// Commerce
- (void)updateCart:(NSArray *)items;
- (void)trackPurchase:(double)total
               items:(NSArray *)items
          dataFields:(NSDictionary *)dataFields;

// In-App Tracking
- (void)trackInAppOpen:(NSString *)messageId location:(double)location;
- (void)trackInAppClick:(NSString *)messageId
              location:(double)location
            clickedUrl:(NSString *)clickedUrl;
- (void)trackInAppClose:(NSString *)messageId
              location:(double)location
                source:(double)source
            clickedUrl:(NSString *)clickedUrl;
- (void)inAppConsume:(NSString *)messageId
            location:(double)location
              source:(double)source;

// App Links
- (void)handleAppLink:(NSString *)appLink
             resolver:(RCTPromiseResolveBlock)resolve
             rejecter:(RCTPromiseRejectBlock)reject;

@end

NS_ASSUME_NONNULL_END
