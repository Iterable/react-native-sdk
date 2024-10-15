import { Iterable } from '@iterable/react-native-sdk';
import { Alert, Pressable, Text } from 'react-native';

import { CodeBlock } from '../../CodeBlock';
import { formStyles } from '../Apis.styles';

const codeString = `
Iterable.disableDeviceForCurrentUser();
Alert.alert('Device disabled for current user');
`;

export const DisableDeviceForCurrentUser = () => {
  return (
    <>
      <Text style={formStyles.label}>Code:</Text>
      <CodeBlock codeString={codeString} />
      <Pressable
        style={formStyles.button}
        onPress={() => {
          Iterable.disableDeviceForCurrentUser();
          Alert.alert('Device disabled for current user');
        }}
      >
        <Text style={formStyles.buttonText}>Run</Text>
      </Pressable>
    </>
  );
};
