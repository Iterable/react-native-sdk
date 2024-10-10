import { StatusBar, StyleSheet } from 'react-native';
import {
  colors,
  subtitle,
  title,
  input,
  label,
  buttonBlock,
  container,
  buttonText,
} from '../../constants';

export const listStyles = StyleSheet.create({
  container: { flex: 1, marginTop: StatusBar.currentHeight || 0 },
  title: { ...title, textAlign: 'center' },
  subtitle: {
    ...subtitle,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  listItem: {
    padding: 20,
    backgroundColor: colors?.white,
    borderWidth: 1,
    borderColor: colors?.grey5,
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10, // Required for Android
  },
  listItemTitle: { fontSize: 16 },
});

export const formStyles = StyleSheet.create({
  formContainer: {
    ...container,
    marginTop: 0,
  },
  input: { ...input, width: '100%' },
  label,
  button: { ...buttonBlock, marginBottom: 20 },
  buttonText,
  codeContainer: {
    height: 200,
    marginBottom: 10,
  },
});
