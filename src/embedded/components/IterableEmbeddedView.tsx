import { useMemo } from 'react';

import { IterableEmbeddedViewType } from '../enums/IterableEmbeddedViewType';
import type { IterableEmbeddedComponentProps } from '../types/IterableEmbeddedComponentProps';
import { IterableEmbeddedBanner } from './IterableEmbeddedBanner';
import { IterableEmbeddedCard } from './IterableEmbeddedCard';
import { IterableEmbeddedNotification } from './IterableEmbeddedNotification';

/**
 * The props for the IterableEmbeddedView component.
 */
export interface IterableEmbeddedViewProps
  extends IterableEmbeddedComponentProps {
  /** The type of view to render. */
  viewType: IterableEmbeddedViewType;
}

/**
 *
 * @param viewType - The type of view to render.
 * @param message - The message to render.
 * @param config - The config for the IterableEmbeddedView component, most likely used to style the view.
 * @param onButtonClick - The function to call when a button is clicked.
 * @param onMessageClick - The function to call when the message is clicked.
 * @returns The IterableEmbeddedView component.
 *
 * This component is used to render the following pre-created, customizable
 * message displays included with Iterables RN SDK: cards, banners, and
 * notifications.
 *
 * @example
 * ```tsx
 * import {
 *   IterableAction,
 *   IterableEmbeddedView,
 *   IterableEmbeddedViewType,
 *   type IterableEmbeddedMessage,
 *   type IterableEmbeddedMessageElementsButton,
 * } from '@iterable/react-native-sdk';
 *
 * // See `IterableEmbeddedViewType` for available view types.
 * const viewType = IterableEmbeddedViewType.Card;
 *
 * // Messages usually come from the embedded manager. `placementIds` is `number[] | null`
 * // (use `null` to load messages for all placements), for example:
 * // Iterable.embeddedManager.getMessages([101, 102]).then((messages) => { ... });
 * const message: IterableEmbeddedMessage = {
 *   metadata: {
 *     messageId: 'test-message-123',
 *     placementId: 101,
 *   },
 *   elements: {
 *     title: 'Test Title',
 *     body: 'Test Body',
 *     buttons: [
 *       {
 *         id: 'button-1',
 *         title: 'Button 1',
 *         action: new IterableAction('openUrl', 'https://example.com/one'),
 *       },
 *       {
 *         id: 'button-2',
 *         title: 'Button 2',
 *         action: new IterableAction('openUrl', 'https://example.com/two'),
 *       },
 *     ],
 *   },
 * };
 *
 * // The config is used to style the component.
 * // See `IterableEmbeddedViewConfig` for available config options.
 * const config = { backgroundColor: '#FFFFFF', borderRadius: 8 };
 *
 * // `onButtonClick` will be called when a button is clicked.
 * // This callback allows you to add custom logic in addition to the SDK's default handling.
 * const onButtonClick = (button: IterableEmbeddedMessageElementsButton) => {
 *   console.log('Button clicked', button.id, button.title, button.action);
 * };
 *
 * // `onMessageClick` will be called when the message is clicked anywhere outside of a button.
 * // If a default action is set, it will be handled prior to this callback.
 * const onMessageClick = () => {
 *   console.log('Message clicked');
 * };
 *
 * return (
 *   <IterableEmbeddedView
 *     viewType={viewType}
 *     message={message}
 *     config={config}
 *     onButtonClick={onButtonClick}
 *     onMessageClick={onMessageClick}
 *   />
 * );
 * ```
 */
export const IterableEmbeddedView = ({
  viewType,
  ...props
}: IterableEmbeddedViewProps) => {
  const Cmp = useMemo(() => {
    switch (viewType) {
      case IterableEmbeddedViewType.Card:
        return IterableEmbeddedCard;
      case IterableEmbeddedViewType.Notification:
        return IterableEmbeddedNotification;
      case IterableEmbeddedViewType.Banner:
        return IterableEmbeddedBanner;
      default:
        return null;
    }
  }, [viewType]);

  return Cmp ? <Cmp {...props} /> : null;
};
