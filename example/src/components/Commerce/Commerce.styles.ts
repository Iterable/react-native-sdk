import { StyleSheet } from 'react-native';
import {
  button,
  buttonText,
  colors,
  container,
  title,
  subtitle,
  shadows,
} from '../../constants';

const styles = StyleSheet.create({
  button: { ...button, marginTop: 10, paddingVertical: 5, width: 100 },
  buttonText,
  cardContainer: {
    backgroundColor: colors?.white,
    borderColor: colors?.grey5,
    borderWidth: 1,
    elevation: shadows.card.elevation, // Required for Android
    height: 150,
    marginBottom: 10,
    padding: 15,
    shadowColor: shadows.card.color,
    shadowOffset: shadows.card.offset,
    shadowOpacity: shadows.card.opacity,
    shadowRadius: shadows.card.radius,
    width: '100%',
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
