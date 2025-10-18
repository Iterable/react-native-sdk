import type { IterableInAppMessage } from '../../inApp/classes/IterableInAppMessage';
import type { IterableInAppCloseSource } from '../../inApp/enums/IterableInAppCloseSource';
import type { IterableInAppLocation } from '../../inApp/enums/IterableInAppLocation';
import { IterableApi } from './IterableApi';
import { IterableAttributionInfo } from './IterableAttributionInfo';
import type { IterableCommerceItem } from './IterableCommerceItem';

/**
 * Contains functions that are used to track various events within the Iterable.
 */
export class IterableTrackingManager {
  /**
   * Manually set the current stored attribution information so that it can later be used when tracking events.
   *
   * The attribution information contains the campaign ID, template ID, and message ID of the message
   * that prompted the user to recently click a link.
   *
   * @see {@link IterableAttributionInfo}
   *
   * For deep link clicks, Iterable sets attribution information automatically.
   * However, use this method to set it manually if ever necessary.
   *
   * @param attributionInfo - Object storing current attribution info
   *
   * @example
   * ```typescript
   * const CAMPAIGN_ID = 1234;
   * const TEMPLATE_ID = 5678;
   * const MESSAGE_ID = 9012;
   *
   * const attributionInfo = new IterableAttributionInfo(CAMPAIGN_ID, TEMPLATE_ID, MESSAGE_ID);
   *
   * Iterable.setAttributionInfo(attributionInfo);
   * ```
   */
  static setAttributionInfo(attributionInfo?: IterableAttributionInfo) {
    IterableApi.setAttributionInfo(attributionInfo);
  }

  /**
   * Get the stored attribution information -- possibly based on a recent deep link click.
   *
   * The attribution information contains the campaign ID, template ID, and message ID of the message
   * that prompted the user to recently click a link.
   *
   * @see {@link IterableAttributionInfo}
   *
   * @example
   * ```typescript
   *  Iterable.getAttributionInfo().then((attributionInfo) => {
   *    Iterable.updateSubscriptions(
   *      null,
   *      [33015, 33016, 33018],
   *      null,
   *      null,
   *      attributionInfo.campaignId,
   *      attributionInfo.templateId
   *    );
   *  });
   * ```
   */
  static getAttributionInfo(): Promise<IterableAttributionInfo | undefined> {
    return IterableApi.getAttributionInfo().then(
      (
        dict: {
          campaignId: number;
          templateId: number;
          messageId: string;
        } | null
      ) => {
        if (dict) {
          return new IterableAttributionInfo(
            dict.campaignId as number,
            dict.templateId as number,
            dict.messageId as string
          );
        } else {
          return undefined;
        }
      }
    );
  }

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
   * Iterable.trackEvent("completedOnboarding",
   *  {
   *    "includedProfilePhoto": true,
   *    "favoriteColor": "red",
   *    "favoriteFlavor": "cinnamon",
   *  }
   * );
   * ```
   */
  static trackEvent(name: string, dataFields?: unknown) {
    IterableApi.trackEvent({ name, dataFields });
  }

  /**
   * Create an `inAppClick` event for the specified message on the current user's profile
   * for manual tracking purposes. Iterable's SDK automatically tracks in-app message clicks when you use the
   * SDK's default rendering. Click events refer to click events within the in-app message to distinguish
   * from `inAppOpen` events.
   *
   * @example
   * ```typescript
   * const message = new IterableInAppMessage(1234, 4567, IterableInAppTrigger.auto, new Date(), new Date(), false, undefined, undefined, false, 0);
   *
   * Iterable.track.trackInAppClick({ message, location: IterableInAppLocation.inApp, clickedUrl: 'https://www.example.com' });
   * ```
   *
   * @remarks
   * Iterable's SDK automatically tracks in-app message clicks when you use the
   * SDK's default rendering. However, you can also manually track these events
   * by calling this method.
   */
  static trackInAppClick(params: {
    /** The in-app message. */
    message: IterableInAppMessage;
    /** The location of the in-app message. */
    location: IterableInAppLocation;
    /** The URL clicked by the user. */
    clickedUrl: string;
  }) {
    IterableApi.trackInAppClick(params);
  }

  /**
   * Create an `inAppClose` event for the specified message on the current
   * user's profile for manual tracking purposes. Iterable's SDK automatically
   * tracks in-app message close events when you use the SDK's default
   * rendering.

   *
   * @example
   * ```typescript
   * const message = new IterableInAppMessage(1234, 4567, IterableInAppTrigger.auto, new Date(), new Date(), false, undefined, undefined, false, 0);
   *
   * Iterable.track.trackInAppClose({ message, location: IterableInAppLocation.inApp, source: IterableInAppCloseSource.back, clickedUrl: 'https://www.example.com' });
   * ```
   *
   * @remarks
   * Iterable's SDK automatically tracks in-app message close events when you
   * use the SDK's default rendering. However, it's also possible to manually
   * track these events by calling this method.
   */
  static trackInAppClose(params: {
    /** The in-app message. */
    message: IterableInAppMessage;
    /** The location of the in-app message. */
    location: IterableInAppLocation;
    /** The way the in-app was closed. */
    source: IterableInAppCloseSource;
    /** The URL clicked by the user. */
    clickedUrl?: string;
  }) {
    IterableApi.trackInAppClose(params);
  }

  /**
   * Create an `inAppOpen` event for the specified message on the current user's profile
   * for manual tracking purposes. Iterable's SDK automatically tracks in-app message opens when you use the
   * SDK's default rendering.
   *
   * @example
   * ```typescript
   * const message = new IterableInAppMessage(1234, 4567, IterableInAppTrigger.auto, new Date(), new Date(), false, undefined, undefined, false, 0);
   *
   * Iterable.track.trackInAppOpen({ message, location: IterableInAppLocation.inApp });
   * ```
   *
   * @remarks
   * Iterable's SDK automatically tracks in-app message opens when you use the
   * SDK's default rendering. However, it's also possible to manually track
   * these events by calling this method.
   */
  static trackInAppOpen(params: {
    /** The in-app message (an {@link IterableInAppMessage} object) */
    message: IterableInAppMessage;
    /** The location of the in-app message (an IterableInAppLocation enum). */
    location: IterableInAppLocation;
  }) {
    IterableApi.trackInAppOpen(params);
  }

  /**
   * Create a purchase event on the current user's Iterable profile.
   *
   * Represent each item in the purchase event with an {@link IterableCommerceItem} object.
   *
   * @see {@link IterableCommerceItem}
   *
   * **NOTE**: `total` is a parameter that is passed in. Iterable does not sum the `price` fields of the various items in the purchase event.
   *
   * @example
   * ```typescript
   * const items = [
   *  new IterableCommerceItem('item1', 'Item 1', 10.0, 1),
   *  new IterableCommerceItem('item2', 'Item 2', 20.0, 2),
   * ];
   * const dataFields = { 'key1': 'value1', };
   *
   * Iterable.track.trackPurchase({ total: 30.0, items, dataFields });
   * ```
   */
  static trackPurchase(params: {
    /** The total cost of the purchase. */
    total: number;
    /** The items included in the purchase. */
    items: IterableCommerceItem[];
    /** Descriptive data to store on the purchase event. */
    dataFields?: unknown;
  }) {
    IterableApi.trackPurchase(params);
  }

  /**
   * Create a `pushOpen` event on the current user's Iterable profile, populating
   * it with data provided to the method call.
   *
   * **NOTE**: Iterable's SDK automatically tracks push notification opens.
   * However, it's also possible to manually track these events by calling this
   * method.
   *
   *
   * @example
   * ```typescript
   * Iterable.track.trackPushOpenWithCampaignId({
   *  campaignId: 12345,
   *  templateId: 67890,
   *  messageId: '0fc6657517c64014868ea2d15f23082b',
   *  appAlreadyRunning: false,
   *  dataFields: {
   *    "discount": 0.99,
   *    "product": "cappuccino",
   *  },
   * });
   * ```
   */
  static trackPushOpenWithCampaignId(opts: {
    /** The ID of the campaign to associate with the push open. */
    campaignId: number;
    /** The ID of the template to associate with the push open. */
    templateId: number;
    /** The ID of the message to associate with the push open. */
    messageId: string | undefined;
    /** Whether or not the app was already running when the push notification arrived. */
    appAlreadyRunning: boolean;
    /** Information to store with the push open event. */
    dataFields?: unknown;
  }) {
    IterableApi.trackPushOpenWithCampaignId(opts);
  }
}
