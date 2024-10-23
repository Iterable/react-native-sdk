import { StyleSheet, type TextStyle } from 'react-native';
import { appNameSmall, button, buttonText, container } from '../../constants';

const text: TextStyle = {
  textAlign: 'center',
  marginBottom: 20,
};

const styles = StyleSheet.create({
  container,
  appName: appNameSmall,
  button,
  buttonText,
  secondaryButton: {
    ...button,
    backgroundColor: 'gray',
  },
  text,
});

export default styles;
