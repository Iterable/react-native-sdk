import {
  Text,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { IterableEmbeddedViewType } from '../../enums/IterableEmbeddedViewType';
import { useEmbeddedView } from '../../hooks/useEmbeddedView';
import type { IterableEmbeddedComponentProps } from '../../types/IterableEmbeddedViewProps';
import { styles } from './IterableEmbeddedNotification.styles';

export const IterableEmbeddedNotification = ({
  config,
  message,
  onButtonClick = () => {},
}: IterableEmbeddedComponentProps) => {
  const { parsedStyles, handleButtonClick } = useEmbeddedView(
    IterableEmbeddedViewType.Notification,
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
