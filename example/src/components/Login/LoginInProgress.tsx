import { View, Text } from 'react-native';
import { styles } from './LoginInProgress.styles';

export const LoginInProgress = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logging in...</Text>
    </View>
  );
};

export default LoginInProgress;
