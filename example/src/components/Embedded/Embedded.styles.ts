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
  configError: {
    color: utilityColors.warning100,
    fontSize: 12,
    marginBottom: 8,
  },
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
  jsonEditor: {
    ...input,
    fontFamily: undefined,
    fontSize: 12,
    height: 220,
    marginBottom: 12,
    padding: 10,
  },
  modalButton: {
    flex: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 12,
    maxHeight: '80%',
    padding: 16,
  },
  // eslint-disable-next-line react-native/no-color-literals
  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
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
