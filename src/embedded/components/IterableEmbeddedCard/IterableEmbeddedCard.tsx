import { useEffect } from 'react';
import {
  Image,
  PixelRatio,
  Text,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { IterableEmbeddedViewType } from '../../enums';
import { useEmbeddedView } from '../../hooks/useEmbeddedView';
import { useComponentVisibility } from '../../hooks/useComponentVisibility';
import type { IterableEmbeddedComponentProps } from '../../types/IterableEmbeddedViewProps';
import { IMAGE_HEIGHT, styles } from './IterableEmbeddedCard.styles';

export const IterableEmbeddedCard = ({
  config,
  message,
  onButtonClick = () => {},
}: IterableEmbeddedComponentProps) => {
  const { parsedStyles, media, handleButtonClick } = useEmbeddedView(
    IterableEmbeddedViewType.Card,
    { message, config, onButtonClick }
  );
  const buttons = message?.elements?.buttons ?? [];

  // Use the visibility hook to track if the component is visible
  const { isVisible, componentRef, handleLayout } = useComponentVisibility({
    threshold: 0.1, // Component is considered visible if 10% is on screen
    checkOnAppState: true, // Consider app state (active/background)
    enablePeriodicCheck: true, // Enable periodic checking for navigation changes
    checkInterval: 500, // Check every 500ms for navigation changes
  });

  useEffect(() => {
    console.log('RENDERED');
    return () => {
      console.log('UNMOUNTED');
    };
  }, []);

  // Log visibility changes for debugging
  useEffect(() => {
    console.log('Card visibility changed:', isVisible);
  }, [isVisible]);

  return (
    <View
      ref={componentRef}
      focusable={true}
      removeClippedSubviews={true}
      onLayout={handleLayout}
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
              : // eslint-disable-next-line @typescript-eslint/no-require-imports
                require('../../../core/images/logo-grey.png')
          }
          style={
            media.shouldShow ? styles.mediaImage : styles.mediaImagePlaceholder
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
  );
};
