import {
  Text,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { useCallback, useMemo } from 'react';
import type { IterableEmbeddedMessageElementsButton } from '../../classes/IterableEmbeddedMessageElementsButton';
import { IterableEmbeddedViewType } from '../../enums';
import type { IterableEmbeddedComponentProps } from '../IterableEmbeddedViewProps';
import { getStyles } from '../utils/getStyles';
import { runButtonClick } from '../utils/runButtonClick';
import { styles } from './IterableEmbeddedNotification.styles';

export const IterableEmbeddedNotification = ({
  config,
  message,
  onButtonClick = () => {},
}: IterableEmbeddedComponentProps) => {
  const parsedStyles = useMemo(() => {
    return getStyles(IterableEmbeddedViewType.Notification, config);
  }, [config]);

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
      {}
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
