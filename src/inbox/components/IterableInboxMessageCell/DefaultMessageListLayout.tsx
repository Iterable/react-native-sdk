/* eslint-disable react-native/no-inline-styles */
import { useMemo } from 'react';
import {
  Image,
  type ImageStyle,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

import type { IterableInboxDataModel } from '../../classes/IterableInboxDataModel';
import type {
  IterableInboxCustomizations,
  IterableInboxRowViewModel,
} from '../../types';
import { inboxMessageCellTestIDs } from './constants';
import { styles } from './DefaultMessageListLayout.styles';

/**
 * Renders a default layout for a message list item in the inbox.
 *
 * @param last - Indicates if this is the last item in the list.
 * @param dataModel - The data model containing the message data.
 * @param rowViewModel - The view model for the current row.
 * @param customizations - Custom styles and configurations.
 * @param isPortrait - Indicates if the device is in portrait mode.
 */
export const DefaultMessageListLayout = ({
  last,
  dataModel,
  rowViewModel,
  customizations,
  isPortrait,
}: {
  last: boolean;
  dataModel: IterableInboxDataModel;
  rowViewModel: IterableInboxRowViewModel;
  customizations: IterableInboxCustomizations;
  isPortrait: boolean;
}) => {
  const messageTitle = useMemo(
    () => rowViewModel.inAppMessage.inboxMetadata?.title ?? '',
    [rowViewModel]
  );
  const messageBody = useMemo(
    () => rowViewModel.inAppMessage.inboxMetadata?.subtitle ?? '',
    [rowViewModel]
  );
  const messageCreatedAt = useMemo(
    () => dataModel.getFormattedDate(rowViewModel.inAppMessage) ?? '',
    [dataModel, rowViewModel]
  );
  const thumbnailURL = useMemo(() => rowViewModel.imageUrl, [rowViewModel]);
  const resolvedStyles = useMemo(
    () => ({ ...styles, ...customizations }),
    [customizations]
  );

  return (
    <View
      testID={inboxMessageCellTestIDs.defaultContainer}
      style={[
        resolvedStyles.messageRow as ViewStyle,
        last ? { borderBottomWidth: 1 } : {},
      ]}
    >
      <View style={resolvedStyles.unreadIndicatorContainer as ViewStyle}>
        {rowViewModel.read ? null : (
          <View
            testID={inboxMessageCellTestIDs.unreadIndicator}
            style={[
              styles.unreadIndicator,
              isPortrait ? {} : { marginLeft: 40 },
            ]}
          />
        )}
      </View>
      <View
        style={
          (rowViewModel.read
            ? [
                resolvedStyles.readMessageThumbnailContainer,
                isPortrait ? {} : { paddingLeft: 65 },
              ]
            : resolvedStyles.unreadMessageThumbnailContainer) as ViewStyle
        }
      >
        {thumbnailURL ? (
          <Image
            testID={inboxMessageCellTestIDs.thumbnail}
            style={resolvedStyles.thumbnail as ImageStyle}
            source={{ uri: thumbnailURL }}
          />
        ) : null}
      </View>
      <View
        testID={inboxMessageCellTestIDs.textContainer}
        style={[
          resolvedStyles.messageContainer as ViewStyle,
          isPortrait ? {} : resolvedStyles.landscapeMessageContainer,
        ]}
      >
        <Text
          testID={inboxMessageCellTestIDs.title}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            resolvedStyles.title as TextStyle,
            isPortrait ? {} : { width: '50%' },
          ]}
        >
          {messageTitle}
        </Text>
        <Text
          testID={inboxMessageCellTestIDs.body}
          numberOfLines={3}
          ellipsizeMode="tail"
          style={resolvedStyles.body as TextStyle}
        >
          {messageBody}
        </Text>
        <Text
          testID={inboxMessageCellTestIDs.createdAt}
          style={resolvedStyles.createdAt as TextStyle}
        >
          {messageCreatedAt}
        </Text>
      </View>
    </View>
  );
};
