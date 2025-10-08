import { useCallback, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import type { IterableEmbeddedMessageElementsButton } from '../../classes/IterableEmbeddedMessageElementsButton';
import { IterableEmbeddedViewType } from '../../enums';
import type { IterableEmbeddedComponentProps } from '../IterableEmbeddedViewProps';
import { getMedia } from '../utils/getMedia';
import { getStyles } from '../utils/getStyles';
import { styles } from './IterableEmbeddedBanner.styles';

export const IterableEmbeddedBanner = ({
  config,
  message,
}: IterableEmbeddedComponentProps) => {
  const parsedStyles = useMemo(() => {
    return getStyles(IterableEmbeddedViewType.Banner, config);
  }, [config]);
  const media = useMemo(() => {
    return getMedia(IterableEmbeddedViewType.Banner, message);
  }, [message]);
  console.log(`🚀 > IterableEmbeddedView > media:`, media);
  const onButtonPress = useCallback(
    (button: IterableEmbeddedMessageElementsButton) => {
      console.log('CLICK', button);
    },
    []
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
        <View style={styles.mediaContainer}>
          {/* <Image source={{ uri: media.url }} style={styles.mediaImage} /> */}
        </View>
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
                onPress={() => onButtonPress(button)}
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
