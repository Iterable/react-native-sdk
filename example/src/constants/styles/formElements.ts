import type { ViewStyle, TextStyle } from 'react-native';
import { colors } from './colors';

export const button: ViewStyle = {
  alignItems: 'center',
  backgroundColor: colors.brandPurple,
  borderRadius: 32,
  paddingVertical: 12,
  paddingHorizontal: 10,
};

export const buttonDisabled: ViewStyle = {
  ...button,
  backgroundColor: colors.backgroundDisabled,
};

export const buttonBlock: ViewStyle = {
  ...button,
  width: '100%',
};

export const buttonText: TextStyle = {
  color: 'white',
  fontWeight: '700',
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.1,
  textAlign: 'center',
};

export const buttonTextDisabled: TextStyle = {
  ...buttonText,
  color: colors.textDisabled,
};

export const input: TextStyle = {
  height: 40,
  backgroundColor: colors.white,
  borderColor: colors.borderPrimary,
  borderWidth: 1,
  padding: 10,
  borderRadius: 8,
  shadowColor: colors.black,
  elevation: 2,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.06,
  shadowRadius: 2,
  marginBottom: 8,
};
