import { StyleSheet } from 'react-native';
import { button, buttonText, container, hr } from '../../constants';

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
  hr,
  text: { textAlign: 'center' },
  utilitySection: {
    paddingHorizontal: 16,
  },
});

export default styles;
