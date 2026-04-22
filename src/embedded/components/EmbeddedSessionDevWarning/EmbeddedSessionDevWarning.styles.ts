import { StyleSheet } from 'react-native';

const ERROR_BANNER_BACKGROUND = '#FEF2F2';
const ERROR_BANNER_BORDER = '#FECACA';
const ERROR_BANNER_TEXT = '#991B1B';

export const styles = StyleSheet.create({
  banner: {
    alignSelf: 'stretch',
    backgroundColor: ERROR_BANNER_BACKGROUND,
    borderColor: ERROR_BANNER_BORDER,
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    color: ERROR_BANNER_TEXT,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
});
