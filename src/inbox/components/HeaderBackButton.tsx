import type { PropsWithChildren, ReactElement } from 'react';
import {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  type ImageSourcePropType,
  type TouchableWithoutFeedbackProps,
} from 'react-native';
import { ITERABLE_INBOX_COLORS } from '../constants/colors';

// Base64 encoded back arrow icons
// [Original image](https://github.com/react-navigation/react-navigation/blob/main/packages/elements/src/assets/back-icon%404x.ios.png)
const backArrowLarge =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABUCAYAAADEZ7TLAAAC8ElEQVR42u2bWchOaxTH/xfnHMcZnHkwRobwJfdIkkSSkpKSEikREcla+81X5tR34c61O8kQIknmKUnGyCzzjczzz817Kfm+9dbasn/13P/X/1n72XuvZy2VGmeQnA1yrsh4LGe/DNda2qnUNPOdjBY572XwiXVeNZpUStbxvZyNMvjsci7Ud6Jk4o3NMvjCVStT2vwgY2srxCPnYHnEO9tl0Mr1WOmspZ2cHTJow7qY7fyPcnbJoI1rvdJoob2M3QHxr9RM/yznf5KxJyAeOQsyxe8NiS9YpRTW8LOMfUHnl2c5/4uMA0HnlymF1fwq53BIvLEky/kOco4G06ZQCqv4Tc7xoPOLs5z/XcaJoPhFSmElf8g5+XWe8yv4S86p4GkzLytt/pZzOuj8nCzn/5FzJuj8rCzn/5VzLiD+gwpmKoXl/CfjfEi8M0MpGB1lXAw6Py0rbTrJuBR4WN+rYGqW+C5yLofEG1OUgtNVzpVA2rxTjclZzneTcy0k3pmUJb67jOuBtHkrZ6JSKOgh42ZIfMGELPE95dwKpM0bFYzPEt9bxu2QeGdcVs73kXEnkDav5YzNEt9Xzt1Q0ckYkyW+v4z7QfGjlUKNJjkPAmnzUgUjs8QPkPEw4PwLFYzIEj9QzqOA889VMDwr5/8PiTeeqWCY0jDWB5x/KmeoMgkcl0/kDFGA/ABqDFadKoVCD7HxsFEPcXWMluVFVn1KtJmCfnLuBYMYpTrV53T2D012EL0a+UtZ/dSHyirOjUaVVarCVqi0aFxtVGmxKu4GgujcyPJ6dcGResVkTFed6pIvdM1qnM2+Zs2/6HZmK0h+q0HB3Owg/gw3ezjzVadqtylLw1Ney5lxLLgTlr0THWQcCe5ETUHibZfGoeDp1Kwg+Y2vzlIFyW89LlihIPnN385qpdJC+3D7vbFQQfIHIGo0lWEEZWdkBKUaAmrgGNa2+BhWfhBbWhnAgTLOUW4KfmLkT7K2Zhi0GsetBqK/dT4Csa/f2ZlrPiMAAAAASUVORK5CYII=';

export const ICON_SIZE = Platform.OS === 'ios' ? 21 : 24;
export const ICON_MARGIN = Platform.OS === 'ios' ? 8 : 3;
const ICON_COLOR = ITERABLE_INBOX_COLORS.BUTTON_PRIMARY_TEXT;

const styles = StyleSheet.create({
  icon: {
    height: ICON_SIZE,
    margin: ICON_MARGIN,
    width: ICON_SIZE,
  },

  returnButton: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },

  returnButtonText: {
    color: ITERABLE_INBOX_COLORS.BUTTON_PRIMARY_TEXT,
    fontSize: 20,
  },
});

/**
 * Props for the HeaderBackButton component.
 */
export interface HeaderBackButtonProps extends TouchableWithoutFeedbackProps {
  /**
   * The text to display next to the back arrow.
   */
  label?: string;
  /**
   * The URI of the image to display.
   *
   * This defaults to a base64 encoded version of [the back arrow used in react-navigation/elements](https://github.com/react-navigation/react-navigation/blob/main/packages/elements/src/assets/back-icon%404x.ios.png)
   */
  imageUri?: string;
  /**
   * The source of the image to display.
   */
  imageSource?: ImageSourcePropType;
}

/**
 * A back arrow button used in a header
 *
 * @returns A button with a back arrow
 */
export const HeaderBackButton = ({
  label,
  imageUri = backArrowLarge,
  imageSource = {
    uri: imageUri,
    width: PixelRatio.getPixelSizeForLayoutSize(ICON_SIZE),
    height: PixelRatio.getPixelSizeForLayoutSize(ICON_SIZE),
  },
  ...props
}: PropsWithChildren<HeaderBackButtonProps>): ReactElement => {
  return (
    <TouchableWithoutFeedback {...props}>
      <View style={styles.returnButton}>
        <Image
          source={imageSource}
          resizeMode="contain"
          fadeDuration={0}
          tintColor={ICON_COLOR}
          style={styles.icon}
          height={ICON_SIZE}
          width={ICON_SIZE}
          resizeMethod="scale"
        />
        {label && <Text style={styles.returnButtonText}>{label}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};
