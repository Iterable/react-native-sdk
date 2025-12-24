import { StyleSheet } from 'react-native';
import { button, buttonText, container, hr, link } from '../../constants';

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
});

export default styles;
