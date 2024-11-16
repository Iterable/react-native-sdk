import { StyleSheet } from 'react-native';
import {
  button,
  buttonText,
  colors,
  container,
  title,
  subtitle,
} from '../../constants';

const styles = StyleSheet.create({
  button: { ...button, marginTop: 10, paddingVertical: 5, width: 100 },
  buttonText,
  cardContainer: {
    backgroundColor: colors?.white,
    borderWidth: 1,
    padding: 15,
    borderColor: colors?.grey5,
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10, // Required for Android
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  cardImage: {
    height: '100%',
    resizeMode: 'contain',
    width: '100%',
  },
  cardSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container,
  imageContainer: {
    flex: 0,
    height: 100,
    width: 120,
  },
  infoContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  price: {
    color: colors.salmon50,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  subtitle: { ...subtitle, textAlign: 'center' },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    paddingTop: 10,
  },
  title: { ...title, textAlign: 'center' },
});

export default styles;
