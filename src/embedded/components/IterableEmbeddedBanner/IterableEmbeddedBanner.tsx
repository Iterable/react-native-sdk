import {
  Image,
  Text,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
  PixelRatio,
} from 'react-native';

import { IterableEmbeddedViewType } from '../../enums';
import { useEmbeddedView } from '../../hooks/useEmbeddedView';
import type { IterableEmbeddedComponentProps } from '../../types/IterableEmbeddedComponentProps';
import {
  styles,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
} from './IterableEmbeddedBanner.styles';

/**
 * TODO: figure out how default action works.
 */

export const IterableEmbeddedBanner = ({
  config,
  message,
  onButtonClick = () => {},
}: IterableEmbeddedComponentProps) => {
  const { parsedStyles, media, handleButtonClick } = useEmbeddedView(
    IterableEmbeddedViewType.Banner,
    { message, config, onButtonClick }
  );

  const buttons = message.elements?.buttons ?? [];

  return (
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
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={[styles.bodyContainer, { gap: media.shouldShow ? 16 : 0 }]}>
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
        {media.shouldShow && (
          <View style={styles.mediaContainer}>
            <Image
              source={{
                uri: media.url as string,
                width: PixelRatio.getPixelSizeForLayoutSize(IMAGE_WIDTH),
                height: PixelRatio.getPixelSizeForLayoutSize(IMAGE_HEIGHT),
              }}
              style={styles.mediaImage}
              alt={media.caption as string}
            />
          </View>
        )}
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
                  style={[styles.buttonText, { color: textColor } as TextStyle]}
                >
                  {button.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
