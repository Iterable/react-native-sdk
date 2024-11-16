import { StyleSheet, type TextStyle } from 'react-native';
import { appNameSmall, button, buttonText, container } from '../../constants';

const text: TextStyle = {
  textAlign: 'center',
  marginBottom: 20,
};

const styles = StyleSheet.create({
  appName: appNameSmall,
  button,
  buttonText,
  container,
  secondaryButton: {
    ...button,
    backgroundColor: 'gray',
  },
  text,
});

export default styles;
