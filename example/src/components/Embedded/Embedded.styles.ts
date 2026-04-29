import { StyleSheet } from 'react-native';
import {
  backgroundColors,
  button,
  buttonText,
  colors,
  container,
  hr,
  input,
  modalButton,
  modalButtons,
  modalContent,
  modalOverlay,
  subtitle,
  title,
  utilityColors
} from '../../constants';

const styles = StyleSheet.create({
  button,
  buttonText,
  compactUtilityButton: {
    ...button,
    paddingVertical: 8,
  },
  compactUtilityButtonText: {
    ...buttonText,
    fontSize: 12,
    lineHeight: 17,
  },
  container:{
    ...container,
    marginHorizontal: 0,
    marginTop: 0,
    paddingHorizontal: 0,
  },
  embeddedHr: {
    ...hr,
    marginVertical: 12,
  },
  embeddedSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginVertical: 10,
  },
  jsonEditor: {
    ...input,
    fontSize: 12,
    height: 220,
  },
  modalButton,
  modalButtons,
  modalContent,
  modalOverlay,
  placementIdsInput: {
    ...input,
    flex: 1,
    marginBottom: 0,
    minWidth: 72,
  },
  placementIdsLabel: {
    flexShrink: 1,
    fontSize: 14,
  },
  placementIdsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  sessionButtonHalf: {
    flex: 1,
  },
  sessionButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
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
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  viewTypeButtonSelected: {
    backgroundColor: colors.brandCyan,
  },
  viewTypeButtonText: {
    color: colors.brandCyan,
    fontSize: 12,
    fontWeight: '600',
  },
  viewTypeButtonTextSelected: {
    color: colors.backgroundPrimary,
  },
  viewTypeButtons: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-around',
    minWidth: 0,
  },
  viewTypeLabel: {
    flexShrink: 0,
    fontSize: 13,
    fontWeight: '600',
  },
  viewTypeSelector: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
