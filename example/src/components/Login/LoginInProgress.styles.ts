import { StyleSheet } from 'react-native';
import { container } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    ...container,
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginTop: 150,
  },
});
