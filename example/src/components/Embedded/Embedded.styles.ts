import { StyleSheet } from 'react-native';
import {
  button,
  buttonText,
  container,
  hr,
  link,
  colors,
} from '../../constants';

const styles = StyleSheet.create({
  button,
  buttonText,
  container: { ...container, paddingHorizontal: 0 },
  embeddedSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingHorizontal: 16,
  },
  embeddedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  embeddedTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  hr,
  link,
  text: { textAlign: 'center' },
  utilitySection: {
    paddingHorizontal: 16,
  },
  viewTypeButton: {
    alignItems: 'center',
    borderColor: colors.brandCyan,
    borderRadius: 8,
    borderWidth: 2,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  viewTypeButtonSelected: {
    backgroundColor: colors.brandCyan,
  },
  viewTypeButtonText: {
    color: colors.brandCyan,
    fontSize: 14,
    fontWeight: '600',
  },
  viewTypeButtonTextSelected: {
    color: colors.backgroundPrimary,
  },
  viewTypeButtons: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-around',
    marginTop: 8,
  },
  viewTypeSelector: {
    marginVertical: 12,
  },
});

export default styles;
