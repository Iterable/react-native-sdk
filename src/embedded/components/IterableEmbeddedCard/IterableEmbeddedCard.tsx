import {
  Image,
  PixelRatio,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { IterableLogoGrey } from '../../../core/assets';
import { IterableEmbeddedViewType } from '../../enums';
import { useEmbeddedView } from '../../hooks/useEmbeddedView';
import type { IterableEmbeddedComponentProps } from '../../types/IterableEmbeddedComponentProps';
import { IMAGE_HEIGHT, styles } from './IterableEmbeddedCard.styles';

/**
 *
 * @param config - The config for the IterableEmbeddedCard component.
 * @param message - The message to render.
 * @param onButtonClick - The function to call when a button is clicked.
 * @param onMessageClick - The function to call when the message is clicked.
 * @returns The IterableEmbeddedCard component.
 *
 * @example
 * ```tsx
 * return (
 *   <IterableEmbeddedCard
 *     config={config}
 *     message={message}
 *     onButtonClick={onButtonClick}
 *     onMessageClick={onMessageClick}
 *   />
 * );
 * ```
 */
export const IterableEmbeddedCard = ({
  config,
  message,
  onButtonClick = () => {},
  onMessageClick = () => {},
}: IterableEmbeddedComponentProps) => {
  const { handleButtonClick, handleMessageClick, media, parsedStyles } =
    useEmbeddedView(IterableEmbeddedViewType.Card, {
      message,
      config,
      onButtonClick,
      onMessageClick,
    });
  const buttons = message?.elements?.buttons ?? [];

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
        <View
          style={[
            styles.mediaContainer,
            media.shouldShow ? {} : styles.mediaContainerNoImage,
          ]}
        >
          <Image
            source={
              media.shouldShow
                ? {
                    uri: media.url as string,
                    height: PixelRatio.getPixelSizeForLayoutSize(IMAGE_HEIGHT),
                  }
                : IterableLogoGrey
            }
            style={
              media.shouldShow
                ? styles.mediaImage
                : styles.mediaImagePlaceholder
            }
            alt={media.caption as string}
          />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.textContainer}>
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
      </View>
    </Pressable>
  );
};
