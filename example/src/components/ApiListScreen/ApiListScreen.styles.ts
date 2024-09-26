import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'whitesmoke',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 50,
  },

  headline: {
    fontWeight: 'bold',
    fontSize: 40,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    backgroundColor: 'whitesmoke',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
});

export default styles;
