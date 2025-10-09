import {
  Image,
  Text,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useCallback, useMemo } from 'react';

import type { IterableEmbeddedComponentProps } from '../IterableEmbeddedViewProps';
import { IterableEmbeddedViewType } from '../../enums';
import { getStyles } from '../utils/getStyles';
import { getMedia } from '../utils/getMedia';
import { styles } from './IterableEmbeddedCard.styles';
import type { IterableEmbeddedMessageElementsButton } from '../../classes/IterableEmbeddedMessageElementsButton';
import { runButtonClick } from '../utils/runButtonClick';

export const IterableEmbeddedCard = ({
  config,
  message,
  onButtonClick = () => {},
}: IterableEmbeddedComponentProps) => {
  const parsedStyles = useMemo(() => {
    return getStyles(IterableEmbeddedViewType.Card, config);
  }, [config]);
  const media = useMemo(() => {
    return getMedia(IterableEmbeddedViewType.Card, message);
  }, [message]);
  const handleButtonClick = useCallback(
    (button: IterableEmbeddedMessageElementsButton) => {
      onButtonClick(button);
      runButtonClick(button, message);
    },
    [onButtonClick, message]
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
      {media.shouldShow && (
        <View style={styles.mediaContainer}>
          <Image
            source={{ uri: media.url as string }}
            style={styles.mediaImage}
            alt={media.caption as string}
          />
        </View>
      )}
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
