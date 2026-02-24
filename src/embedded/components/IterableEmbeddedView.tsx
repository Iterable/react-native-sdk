import { useMemo } from 'react';
import { View, Text } from 'react-native';

import { IterableEmbeddedViewType } from '../enums/IterableEmbeddedViewType';

import { IterableEmbeddedBanner } from './IterableEmbeddedBanner';
import { IterableEmbeddedCard } from './IterableEmbeddedCard';
import { IterableEmbeddedNotification } from './IterableEmbeddedNotification';
import type { IterableEmbeddedComponentProps } from '../types/IterableEmbeddedComponentProps';
import { useEmbeddedView } from '../hooks/useEmbeddedView/useEmbeddedView';

/**
 * The props for the IterableEmbeddedView component.
 */
interface IterableEmbeddedViewProps extends IterableEmbeddedComponentProps {
  /** The type of view to render. */
  viewType: IterableEmbeddedViewType;
}

/**
 *
 * @param viewType - The type of view to render.
 * @param message - The message to render.
 * @param config - The config for the IterableEmbeddedView component, most likely used to style the view.
 * @param onButtonClick - The function to call when a button is clicked.
 * @returns The IterableEmbeddedView component.
 *
 * This component is used to render pre-created, customizable message displays
 * included with Iterables RN SDK: cards, banners, and notifications.
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

  const { parsedStyles } =
    useEmbeddedView(IterableEmbeddedViewType.Notification, props);

  return Cmp ? (
    <View>
      <Text>parsedStyles.backgroundColor: {String(parsedStyles.backgroundColor)}</Text>
      <Text>parsedStyles.borderColor: {String(parsedStyles.borderColor)}</Text>
      <Text>parsedStyles.borderWidth: {parsedStyles.borderWidth}</Text>
      <Text>parsedStyles.borderCornerRadius: {parsedStyles.borderCornerRadius}</Text>
      <Text>parsedStyles.primaryBtnBackgroundColor: {String(parsedStyles.primaryBtnBackgroundColor)}</Text>
      <Text>parsedStyles.primaryBtnTextColor: {String(parsedStyles.primaryBtnTextColor)}</Text>
      <Text>parsedStyles.secondaryBtnBackgroundColor: {String(parsedStyles.secondaryBtnBackgroundColor)}</Text>
      <Text>parsedStyles.secondaryBtnTextColor: {String(parsedStyles.secondaryBtnTextColor)}</Text>
      <Text>parsedStyles.titleTextColor: {String(parsedStyles.titleTextColor)}</Text>
      <Text>parsedStyles.bodyTextColor: {String(parsedStyles.bodyTextColor)}</Text>
      <Cmp {...props} />
    </View>
  ) : null;
};
