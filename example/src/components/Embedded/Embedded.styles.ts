import { StyleSheet } from 'react-native';
import { button, buttonText, container, hr, link, input, title, subtitle } from '../../constants';
import { neutrals, utilityColors, backgroundColors } from '../../constants/styles/colors';

const styles = StyleSheet.create({
  button,
  buttonDisabled: {
    backgroundColor: neutrals.grey25,
    opacity: 0.6,
  },
  buttonText,
  buttonTextDisabled: {
    color: neutrals.grey50,
  },
  container,
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
  inputContainer: {
    marginVertical: 10,
  },
  link,
  subtitle: { ...subtitle, textAlign: 'center' },
  text: { textAlign: 'center' },
  textInput: input,
  title: { ...title, textAlign: 'center' },
  utilitySection: {
    paddingHorizontal: 16,
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
