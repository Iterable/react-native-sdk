import { useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';

import { ApiListDetail } from './Apis.constants';
import { useMemo } from 'react';

const SetEmail = () => {
  return (
    <View>
      <Text>Set Email</Text>
    </View>
  );
};

const getComponent = (apiName: string) => {
  switch (apiName) {
    case ApiListDetail.SetEmail:
      return <SetEmail />;
    default:
      return <Text>Invalid API</Text>;
  }
};

export const ApiDetail = () => {
  const route = useRoute();
  const apiId = route.params?.item?.id;
  const apiName = route.params?.item?.value;

  const component = useMemo(() => getComponent(apiName), [apiName]);

  return (
    <View id={apiId}>
      <Text>{component}</Text>
    </View>
  );
};

export default ApiDetail;
