import { useRoute } from '@react-navigation/native';
import { useMemo } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import { ApiListDetail } from './Apis.constants';
import { formStyles } from './Apis.styles';
import {
  DisableDeviceForCurrentUser,
  GetAttributionInfo,
  GetEmail,
  GetInAppMessages,
  GetLastPushPayload,
  GetUserId,
  HandleAppLink,
  InAppConsume,
  RemoveInAppMessages,
  SetAttributionInfo,
  SetEmail,
  SetReadInAppMessages,
  SetUserId,
  ShowInAppMessages,
  TrackEvent,
  TrackInAppClick,
  TrackInAppClose,
  TrackInAppOpen,
  TrackPurchase,
  TrackPushOpenWithCampaignId,
  UpdateEmail,
  UpdateSubscriptions,
  UpdateUser,
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
    case ApiListDetail.TrackPushOpenWithCampaignId:
      return <TrackPushOpenWithCampaignId />;
    case ApiListDetail.TrackPurchase:
      return <TrackPurchase />;
    case ApiListDetail.TrackInAppOpen:
      return <TrackInAppOpen />;
    case ApiListDetail.TrackInAppClick:
      return <TrackInAppClick />;
    case ApiListDetail.TrackInAppClose:
      return <TrackInAppClose />;
    case ApiListDetail.InAppConsume:
      return <InAppConsume />;
    case ApiListDetail.TrackEvent:
      return <TrackEvent />;
    case ApiListDetail.UpdateUser:
      return <UpdateUser />;
    case ApiListDetail.UpdateEmail:
      return <UpdateEmail />;
    case ApiListDetail.GetInAppMessages:
      return <GetInAppMessages />;
    case ApiListDetail.ShowInAppMessages:
      return <ShowInAppMessages />;
    case ApiListDetail.RemoveInAppMessages:
      return <RemoveInAppMessages />;
    case ApiListDetail.SetReadInAppMessages:
      return <SetReadInAppMessages />;
    case ApiListDetail.HandleAppLink:
      return <HandleAppLink />;
    case ApiListDetail.UpdateSubscriptions:
      return <UpdateSubscriptions />;
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
