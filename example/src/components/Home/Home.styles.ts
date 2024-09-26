import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import {
  appName,
  buttonText,
  subtitle,
  title,
  input,
  button,
  container,
  appNameSmall,
} from '../../constants';

const label: TextStyle = {
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 10,
  paddingBottom: 10,
  color: 'gray',
};

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
