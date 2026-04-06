import { useMemo } from 'react';

import { IterableEmbeddedViewType } from '../enums/IterableEmbeddedViewType';
import type { IterableEmbeddedComponentProps } from '../types/IterableEmbeddedComponentProps';
import { IterableEmbeddedBanner } from './IterableEmbeddedBanner';
import { IterableEmbeddedCard } from './IterableEmbeddedCard';
import { IterableEmbeddedNotification } from './IterableEmbeddedNotification';

/**
 * The props for the IterableEmbeddedView component.
 */
export interface IterableEmbeddedViewProps extends IterableEmbeddedComponentProps {
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
 * This component is used to render pre-created, customizable message displays
 * included with Iterables RN SDK: cards, banners, and notifications.
 *
 * @example
 * ```tsx
 * // See `IterableEmbeddedViewType`` for available view types.
 * const viewType = IterableEmbeddedViewType.Card;
 *
 * // The message object that will be rendered.
 * // You can retrieve  messages by calling `Iterable.embeddedManager.getMessages(IDS)`
 * const message = {
 *   metadata: {
 *     messageId: 'test-message-123',
 *     campaignId: 123456,
 *     placementId: 'test-placement',
 *   },
 *   elements: {
 *     title: 'Test Title',
 *     body: 'Test Body',
 *     buttons: [
 *       { id: 'button-1', label: 'Button 1', action: 'button-1-action' },
 *       { id: 'button-2', label: 'Button 2', action: 'button-2-action' },
 *     ],
 *   },
 * };
 *
 * // The config for the IterableEmbeddedView component, most likely used to style the view.
 * // See `IterableEmbeddedViewConfig` for available config options.
 * const config = { backgroundColor: '#FFFFFF', borderRadius: 8 };
 *
 * // A callback that will be called when a button is clicked.
 * // General click handling is handled by the SDK; This is only for custom logic.
 * const onButtonClick = () => {
 *   console.log('Button clicked');
 * };
 *
 * // A callback that will be called when the message is clicked.
 * // This is not called when a button is clicked.
 * // If a default action is set, this is what will be called.
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
