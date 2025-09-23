#pragma once

#include <ReactCommon/TurboModule.h>
#include <jsi/jsi.h>

namespace facebook {
namespace react {

/**
 * The spec from RNIterableSpec.ts, translated to C++.
 */
class JSI_EXPORT RNIterableAPISpecJSI : public TurboModule {
 protected:
  RNIterableAPISpecJSI(std::shared_ptr<CallInvoker> jsInvoker);

 public:
  // MARK: - Native SDK Functions

  virtual void initializeWithApiKey(
      jsi::Runtime& runtime,
      const jsi::Value& apiKey,
      const jsi::Value& config,
      const jsi::Value& version,
      const jsi::Value& promise) = 0;

  virtual void initialize2WithApiKey(
      jsi::Runtime& runtime,
      const jsi::Value& apiKey,
      const jsi::Value& config,
      const jsi::Value& apiEndPointOverride,
      const jsi::Value& version,
      const jsi::Value& promise) = 0;

  virtual void setEmail(
      jsi::Runtime& runtime,
      const jsi::Value& email,
      const jsi::Value& authToken) = 0;

  virtual void getEmail(
      jsi::Runtime& runtime,
      const jsi::Value& promise) = 0;

  virtual void setUserId(
      jsi::Runtime& runtime,
      const jsi::Value& userId,
      const jsi::Value& authToken) = 0;

  virtual void getUserId(
      jsi::Runtime& runtime,
      const jsi::Value& promise) = 0;

  // MARK: - Iterable API Request Functions

  virtual void disableDeviceForCurrentUser(jsi::Runtime& runtime) = 0;

  virtual void setInAppShowResponse(
      jsi::Runtime& runtime,
      const jsi::Value& inAppShowResponse) = 0;

  virtual void getLastPushPayload(
      jsi::Runtime& runtime,
      const jsi::Value& promise) = 0;

  virtual void getAttributionInfo(
      jsi::Runtime& runtime,
      const jsi::Value& promise) = 0;

  virtual void setAttributionInfo(
      jsi::Runtime& runtime,
      const jsi::Value& attributionInfo) = 0;

  virtual void trackPushOpenWithCampaignId(
      jsi::Runtime& runtime,
      const jsi::Value& campaignId,
      const jsi::Value& templateId,
      const jsi::Value& messageId,
      const jsi::Value& appAlreadyRunning,
      const jsi::Value& dataFields) = 0;

  virtual void updateCart(
      jsi::Runtime& runtime,
      const jsi::Value& items) = 0;

  virtual void trackPurchase(
      jsi::Runtime& runtime,
      const jsi::Value& total,
      const jsi::Value& items,
      const jsi::Value& dataFields) = 0;

  virtual void trackInAppOpen(
      jsi::Runtime& runtime,
      const jsi::Value& messageId,
      const jsi::Value& location) = 0;

  virtual void trackInAppClick(
      jsi::Runtime& runtime,
      const jsi::Value& messageId,
      const jsi::Value& location,
      const jsi::Value& clickedUrl) = 0;

  virtual void trackInAppClose(
      jsi::Runtime& runtime,
      const jsi::Value& messageId,
      const jsi::Value& location,
      const jsi::Value& source,
      const jsi::Value& clickedUrl) = 0;

  virtual void inAppConsume(
      jsi::Runtime& runtime,
      const jsi::Value& messageId,
      const jsi::Value& location,
      const jsi::Value& source) = 0;

  virtual void trackEvent(
      jsi::Runtime& runtime,
      const jsi::Value& name,
      const jsi::Value& dataFields) = 0;

  virtual void updateUser(
      jsi::Runtime& runtime,
      const jsi::Value& dataFields,
      const jsi::Value& mergeNestedObjects) = 0;

  virtual void updateEmail(
      jsi::Runtime& runtime,
      const jsi::Value& email,
      const jsi::Value& authToken) = 0;

  virtual void handleAppLink(
      jsi::Runtime& runtime,
      const jsi::Value& appLink,
      const jsi::Value& promise) = 0;

  virtual void updateSubscriptions(
      jsi::Runtime& runtime,
      const jsi::Value& emailListIds,
      const jsi::Value& unsubscribedChannelIds,
      const jsi::Value& unsubscribedMessageTypeIds,
      const jsi::Value& subscribedMessageTypeIds,
      const jsi::Value& campaignId,
      const jsi::Value& templateId) = 0;

  // MARK: - SDK In-App Manager Functions

  virtual void getInAppMessages(
      jsi::Runtime& runtime,
      const jsi::Value& promise) = 0;

  virtual void getHtmlInAppContentForMessage(
      jsi::Runtime& runtime,
      const jsi::Value& messageId,
      const jsi::Value& promise) = 0;

  virtual void getInboxMessages(
      jsi::Runtime& runtime,
      const jsi::Value& promise) = 0;

  virtual void getUnreadInboxMessagesCount(
      jsi::Runtime& runtime,
      const jsi::Value& promise) = 0;

  virtual void showMessage(
      jsi::Runtime& runtime,
      const jsi::Value& messageId,
      const jsi::Value& consume,
      const jsi::Value& promise) = 0;

  virtual void removeMessage(
      jsi::Runtime& runtime,
      const jsi::Value& messageId,
      const jsi::Value& location,
      const jsi::Value& source) = 0;

  virtual void setReadForMessage(
      jsi::Runtime& runtime,
      const jsi::Value& messageId,
      const jsi::Value& read) = 0;

  virtual void setAutoDisplayPaused(
      jsi::Runtime& runtime,
      const jsi::Value& paused) = 0;

  // MARK: - SDK Inbox Session Tracking Functions

  virtual void startSession(
      jsi::Runtime& runtime,
      const jsi::Value& visibleRows) = 0;

  virtual void endSession(jsi::Runtime& runtime) = 0;

  virtual void updateVisibleRows(
      jsi::Runtime& runtime,
      const jsi::Value& visibleRows) = 0;

  // MARK: - SDK Auth Manager Functions

  virtual void passAlongAuthToken(
      jsi::Runtime& runtime,
      const jsi::Value& authToken) = 0;
};

} // namespace react
} // namespace facebook
