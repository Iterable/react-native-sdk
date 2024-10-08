import { Text, View } from 'react-native';
import { styles } from './Login.styles';

export const LoginToView = () => (
  <View style={styles.loginScreenContainer}>
    <Text style={styles.title}>Login to view page</Text>
  </View>
);

export default LoginToView;
