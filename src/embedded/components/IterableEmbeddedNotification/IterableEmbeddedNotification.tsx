import {
  Text,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
  Pressable,
} from 'react-native';

import { IterableEmbeddedViewType } from '../../enums/IterableEmbeddedViewType';
import { useEmbeddedView } from '../../hooks/useEmbeddedView';
import type { IterableEmbeddedComponentProps } from '../../types/IterableEmbeddedComponentProps';
import { styles } from './IterableEmbeddedNotification.styles';

/**
 * The IterableEmbeddedNotification component is used to render a notification message.
 *
 * @param config - The config for the IterableEmbeddedNotification component.
 * @param message - The message to render.
 * @param onButtonClick - The function to call when a button is clicked.
 * @param onMessageClick - The function to call when the message is clicked.
 * @returns The IterableEmbeddedNotification component.
 *
 * @example
 * ```tsx
 * return (
 *   <IterableEmbeddedNotification
 *     config={config}
 *     message={message}
 *     onButtonClick={onButtonClick}
 *     onMessageClick={onMessageClick}
 *   />
 * );
 * ```
 */
export const IterableEmbeddedNotification = ({
  config,
  message,
  onButtonClick,
  onMessageClick,
}: IterableEmbeddedComponentProps) => {
  const { parsedStyles, handleButtonClick, handleMessageClick } =
    useEmbeddedView(IterableEmbeddedViewType.Notification, {
      message,
      config,
      onButtonClick,
      onMessageClick,
    });

  const buttons = message.elements?.buttons ?? [];

  return (
    <Pressable onPress={() => handleMessageClick()}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: parsedStyles.backgroundColor,
            borderColor: parsedStyles.borderColor,
            borderRadius: parsedStyles.borderCornerRadius,
            borderWidth: parsedStyles.borderWidth,
          } as ViewStyle,
        ]}
      >
        <View style={styles.bodyContainer}>
          <Text
            style={[
              styles.title,
              { color: parsedStyles.titleTextColor } as TextStyle,
            ]}
          >
            {message.elements?.title}
          </Text>
          <Text
            style={[
              styles.body,
              { color: parsedStyles.bodyTextColor } as TextStyle,
            ]}
          >
            {message.elements?.body}
          </Text>
        </View>
        {buttons.length > 0 && (
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => {
              const backgroundColor =
                index === 0
                  ? parsedStyles.primaryBtnBackgroundColor
                  : parsedStyles.secondaryBtnBackgroundColor;
              const textColor =
                index === 0
                  ? parsedStyles.primaryBtnTextColor
                  : parsedStyles.secondaryBtnTextColor;
              return (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor } as ViewStyle]}
                  onPress={() => handleButtonClick(button)}
                  key={button.id}
                >
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={[
                      styles.buttonText,
                      { color: textColor } as TextStyle,
                    ]}
                  >
                    {button.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </Pressable>
  );
};
