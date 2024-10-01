import { StyleSheet, type ViewStyle } from 'react-native';
import {
  appName,
  buttonBlock,
  buttonDisabled,
  buttonText,
  buttonTextDisabled,
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
  loginScreenContainer: { ...container, backgroundColor: 'white' },
  formContainer: { marginTop: 24 },
  appName,
  title,
  subtitle,
  input: { ...input, marginBottom: 15 },
  button: setButton(),
  buttonDisabled: setButton(buttonDisabled),
  buttonText,
  buttonTextDisabled,
  label,
});
