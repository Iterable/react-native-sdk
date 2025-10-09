import { IterableApi } from '../classes/IterableApi';
import type { IterableEmbeddedSession } from '../../embedded/classes/IterableEmbeddedSession';
import type { IterableCommerceItem } from '../classes/IterableCommerceItem';
import type { IterableInAppMessage } from '../../inApp/classes/IterableInAppMessage';
import type { IterableInAppLocation } from '../../inApp/enums/IterableInAppLocation';
import type { IterableInAppCloseSource } from '../../inApp/enums/IterableInAppCloseSource';
import type { IterableEmbeddedMessage } from '../../embedded/types/IterableEmbeddedMessage';

/**
 * Create a `pushOpen` event on the current user's Iterable profile, populating
 * it with data provided to the method call.
 *
 * **NOTE**: Iterable's SDK automatically tracks push notification opens.
 * However, it's also possible to manually track these events by calling this
 * method.
 *
 * @param campaignId - The ID of the campaign to associate with the push open
 * @param templateId - The ID of the template to associate with the push open
 * @param messageId - The ID of the message to associate with the push open
 * @param appAlreadyRunning - Whether or not the app was already running when
 * the push notification arrived
 * @param dataFields - Information to store with the push open event
 *
 * @example
 * ```typescript
 * const CAMPAIGN_ID = 12345;
 * const TEMPLATE_ID = 67890;
 * const MESSAGE_ID = '0fc6657517c64014868ea2d15f23082b';
 * const APP_ALREADY_RUNNING = false;
 * const DATA_FIELDS = {
 *    "discount": 0.99,
 *    "product": "cappuccino",
 * };
 *
 * trackPushOpen(CAMPAIGN_ID, TEMPLATE_ID, MESSAGE_ID, APP_ALREADY_RUNNING, DATA_FIELDS);
 * ```
 */
export const trackPushOpenWithCampaignId = (
  campaignId: number,
  templateId: number,
  messageId: string | undefined,
  appAlreadyRunning: boolean,
  dataFields?: unknown
) => {
  return IterableApi.trackPushOpenWithCampaignId(
    campaignId,
    templateId,
    messageId,
    appAlreadyRunning,
    dataFields
  );
};

/**
 * Create a purchase event on the current user's Iterable profile.
 *
 * Represent each item in the purchase event with an {@link IterableCommerceItem} object.
 *
 * @see {@link IterableCommerceItem}
 *
 * **NOTE**: `total` is a parameter that is passed in. Iterable does not sum the `price` fields of the various items in the purchase event.
 *
 * @param total - The total cost of the purchase
 * @param items - The items included in the purchase
 * @param dataFields - Descriptive data to store on the purchase event
 *
 * @example
 * ```typescript
 * const items = [
 *  new IterableCommerceItem('item1', 'Item 1', 10.0, 1),
 *  new IterableCommerceItem('item2', 'Item 2', 20.0, 2),
 * ];
 * const dataFields = { 'key1': 'value1', };
 *
 * trackPurchase(30.0, items, dataFields);
 * ```
 */
export const trackPurchase = (
  total: number,
  items: IterableCommerceItem[],
  dataFields?: unknown
) => {
  return IterableApi.trackPurchase(total, items, dataFields);
};

/**
 * Create an `inAppOpen` event for the specified message on the current user's profile
 * for manual tracking purposes. Iterable's SDK automatically tracks in-app message opens when you use the
 * SDK's default rendering.
 *
 * @param message - The in-app message (an {@link IterableInAppMessage} object)
 * @param location - The location of the in-app message (an IterableInAppLocation enum)
 *
 * @example
 * ```typescript
 * const message = new IterableInAppMessage(1234, 4567, IterableInAppTrigger.auto, new Date(), new Date(), false, undefined, undefined, false, 0);
 * trackInAppOpen(message, IterableInAppLocation.inApp);
 * ```
 *
 * @remarks
 * Iterable's SDK automatically tracks in-app message opens when you use the
 * SDK's default rendering. However, it's also possible to manually track
 * these events by calling this method.
 */
export const trackInAppOpen = (
  message: IterableInAppMessage,
  location: IterableInAppLocation
) => {
  return IterableApi.trackInAppOpen(message, location);
};

/**
 * Create an `inAppClick` event for the specified message on the current user's profile
 * for manual tracking purposes. Iterable's SDK automatically tracks in-app message clicks when you use the
 * SDK's default rendering. Click events refer to click events within the in-app message to distinguish
 * from `inAppOpen` events.
 *
 * @param message - The in-app message.
 * @param location - The location of the in-app message.
 * @param clickedUrl - The URL clicked by the user.
 *
 * @example
 * ```typescript
 * const message = new IterableInAppMessage(1234, 4567, IterableInAppTrigger.auto, new Date(), new Date(), false, undefined, undefined, false, 0);
 * trackInAppClick(message, IterableInAppLocation.inApp, 'https://www.example.com');
 * ```
 *
 * @remarks
 * Iterable's SDK automatically tracks in-app message clicks when you use the
 * SDK's default rendering. However, you can also manually track these events
 * by calling this method.
 */
export const trackInAppClick = (
  message: IterableInAppMessage,
  location: IterableInAppLocation,
  clickedUrl: string
) => {
  return IterableApi.trackInAppClick(message, location, clickedUrl);
};

/**
 * Create an `inAppClose` event for the specified message on the current
 * user's profile for manual tracking purposes. Iterable's SDK automatically
 * tracks in-app message close events when you use the SDK's default
 * rendering.
 *
 * @param message - The in-app message.
 * @param location - The location of the in-app message.  Useful for determining if the messages is in a mobile inbox.
 * @param source - The way the in-app was closed.
 * @param clickedUrl - The URL clicked by the user.
 *
 * @example
 * ```typescript
 * const message = new IterableInAppMessage(1234, 4567, IterableInAppTrigger.auto, new Date(), new Date(), false, undefined, undefined, false, 0);
 * trackInAppClose(message, IterableInAppLocation.inApp, IterableInAppCloseSource.back, 'https://www.example.com');
 * ```
 *
 * @remarks
 * Iterable's SDK automatically tracks in-app message close events when you
 * use the SDK's default rendering. However, it's also possible to manually
 * track these events by calling this method.
 */
export const trackInAppClose = (
  message: IterableInAppMessage,
  location: IterableInAppLocation,
  source: IterableInAppCloseSource,
  clickedUrl?: string
) => {
  return IterableApi.trackInAppClose(message, location, source, clickedUrl);
};

/**
 * Create a custom event to the current user's Iterable profile.
 *
 * Pass in the name of the event stored in eventName key and the data associated with the event.
 * The eventType is set to "customEvent".
 *
 * @param name - The event name of the custom event
 * @param dataFields - Descriptive data to store on the custom event
 *
 *  @example
 * ```typescript
 * trackEvent("completedOnboarding",
 *  {
 *    "includedProfilePhoto": true,
 *    "favoriteColor": "red",
 *    "favoriteFlavor": "cinnamon",
 *  }
 * );
 * ```
 */
export const trackEvent = (name: string, dataFields?: unknown) => {
  return IterableApi.trackEvent(name, dataFields);
};

/**
 * Track an embedded session.
 *
 * @param session - The session to track
 *
 * @example
 * ```typescript
 * const session = new IterableEmbeddedSession({
 *  start: new Date(),
 *  end: new Date(),
 *  impressions: [],
 * });
 *
 * trackEmbeddedSession(session);
 * ```
 */
export const trackEmbeddedSession = (session: IterableEmbeddedSession) => {
  return IterableApi.trackEmbeddedSession(session);
};

export const trackEmbeddedClick = (
  message: IterableEmbeddedMessage,
  buttonId: string,
  clickedUrl: string
) => {
  return IterableApi.trackEmbeddedClick(message, buttonId, clickedUrl);
};

export const trackEmbeddedMessageReceived = (
  message: IterableEmbeddedMessage
) => {
  return IterableApi.trackEmbeddedMessageReceived(message);
};
