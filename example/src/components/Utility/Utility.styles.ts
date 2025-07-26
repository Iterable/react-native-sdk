import { StyleSheet, type TextStyle } from 'react-native';
import { appNameSmall, buttonBlock, buttonText, container } from '../../constants';

const text: TextStyle = {
  textAlign: 'center',
  marginBottom: 20,
};

const styles = StyleSheet.create({
  appName: appNameSmall,
  button:buttonBlock,
  buttonText,
  container,
  text,
});

export default styles;
