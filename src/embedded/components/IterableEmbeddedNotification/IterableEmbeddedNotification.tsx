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
import { useWarnIfOutsideEmbeddedSession } from '../../hooks/useWarnIfOutsideEmbeddedSession';
import type { IterableEmbeddedComponentProps } from '../../types/IterableEmbeddedComponentProps';
import { EmbeddedSessionDevWarning } from '../EmbeddedSessionDevWarning/EmbeddedSessionDevWarning';
import { styles } from './IterableEmbeddedNotification.styles';

const COMPONENT_NAME = 'IterableEmbeddedNotification';

export const IterableEmbeddedNotification = ({
  config,
  message,
  onButtonClick,
  onMessageClick,
}: IterableEmbeddedComponentProps) => {
  const showEmbeddedSessionWarning =
    useWarnIfOutsideEmbeddedSession(COMPONENT_NAME);

  const { parsedStyles, handleButtonClick, handleMessageClick } =
    useEmbeddedView(IterableEmbeddedViewType.Notification, {
      message,
      config,
      onButtonClick,
      onMessageClick,
    });

  const buttons = message.elements?.buttons ?? [];

  if (showEmbeddedSessionWarning) {
    return (
      <EmbeddedSessionDevWarning visible componentName={COMPONENT_NAME} />
    );
  }

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
