import { useRoute } from '@react-navigation/native';
import { useMemo } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { ApiListDetail } from './Apis.constants';
import { formStyles } from './Apis.styles';
import {
  DisableDeviceForCurrentUser,
  GetAttributionInfo,
  GetEmail,
  GetLastPushPayload,
  GetUserId,
  SetAttributionInfo,
  SetEmail,
  SetUserId,
} from './detailScreens';

const getComponent = (apiName: string) => {
  switch (apiName) {
    case ApiListDetail.SetEmail:
      return <SetEmail />;
    case ApiListDetail.GetEmail:
      return <GetEmail />;
    case ApiListDetail.SetUserId:
      return <SetUserId />;
    case ApiListDetail.GetUserId:
      return <GetUserId />;
    case ApiListDetail.DisableDeviceForCurrentUser:
      return <DisableDeviceForCurrentUser />;
    case ApiListDetail.GetLastPushPayload:
      return <GetLastPushPayload />;
    case ApiListDetail.SetAttributionInfo:
      return <SetAttributionInfo />;
    case ApiListDetail.GetAttributionInfo:
      return <GetAttributionInfo />;
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
    <SafeAreaView>
      <ScrollView id={apiId} contentContainerStyle={formStyles.formContainer}>
        {component}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApiDetail;
