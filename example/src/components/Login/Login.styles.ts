import { StyleSheet, type ViewStyle } from 'react-native';

import {
  appName,
  buttonBlock,
  buttonDisabled,
  buttonText,
  buttonTextDisabled,
  colors,
  container,
  input,
  label,
  subtitle,
  title,
} from '../../constants';

const setButton = (buttonToSet: ViewStyle = {}) => ({
  ...buttonBlock,
  ...buttonToSet,
  marginTop: 32,
});

export const styles = StyleSheet.create({
  appName,
  button: setButton(),
  buttonDisabled: setButton(buttonDisabled),
  buttonText,
  buttonTextDisabled,
  formContainer: { marginTop: 24 },
  input: { ...input, marginBottom: 15 },
  label,
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loginScreenContainer: {
    ...container,
    backgroundColor: colors.white,
  },
  subtitle,
  title,
});
