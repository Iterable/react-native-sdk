import { StyleSheet } from 'react-native';
import {
  backgroundColors,
  button,
  buttonText,
  colors,
  container,
  hr,
  input,
  subtitle,
  title,
  utilityColors,
} from '../../constants';

const styles = StyleSheet.create({
  button,
  buttonText,
  container,
  embeddedSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingHorizontal: 16,
  },
  hr,
  inputContainer: {
    marginVertical: 10,
  },
  subtitle: { ...subtitle, textAlign: 'center' },
  text: { textAlign: 'center' },
  textInput: input,
  title: { ...title, textAlign: 'center' },
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
  warningContainer: {
    backgroundColor: backgroundColors.backgroundWarningSubtle,
    borderLeftColor: utilityColors.warning100,
    borderLeftWidth: 4,
    borderRadius: 5,
    marginBottom: 12,
    marginHorizontal: 16,
    marginTop: 0,
    padding: 12,
  },
  warningText: {
    color: utilityColors.warning100,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;
