import { StyleSheet } from 'react-native';
import { button, buttonText, colors, container, title } from '../../constants';

const styles = StyleSheet.create({
  container,
  title: { ...title, textAlign: 'center' },
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
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: 120,
    height: 100,
    flex: 0,
  },
  textContainer: {
    paddingTop: 10,
    flex: 1,
    marginLeft: 10,
  },
  cardImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  price: {
    marginVertical: 5,
    fontWeight: 'bold',
    color: colors.salmon50,
  },
  button: { ...button, width: 100, marginTop: 10, paddingVertical: 5 },
  buttonText,
});

export default styles;
