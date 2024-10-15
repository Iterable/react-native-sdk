import { useRoute } from '@react-navigation/native';
import { useMemo } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import type { Route } from '../../constants';
import { Api, type ApiTabProps } from '../../types';
import { formStyles } from './Apis.styles';
import {
  DisableDeviceForCurrentUser,
  GetAttributionInfo,
  GetEmail,
  GetHtmlContentForMessage,
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
    case Api.SetEmail:
      return <SetEmail />;
    case Api.GetEmail:
      return <GetEmail />;
    case Api.SetUserId:
      return <SetUserId />;
    case Api.GetUserId:
      return <GetUserId />;
    case Api.DisableDeviceForCurrentUser:
      return <DisableDeviceForCurrentUser />;
    case Api.GetLastPushPayload:
      return <GetLastPushPayload />;
    case Api.SetAttributionInfo:
      return <SetAttributionInfo />;
    case Api.GetAttributionInfo:
      return <GetAttributionInfo />;
    case Api.TrackPushOpenWithCampaignId:
      return <TrackPushOpenWithCampaignId />;
    case Api.TrackPurchase:
      return <TrackPurchase />;
    case Api.TrackInAppOpen:
      return <TrackInAppOpen />;
    case Api.TrackInAppClick:
      return <TrackInAppClick />;
    case Api.TrackInAppClose:
      return <TrackInAppClose />;
    case Api.InAppConsume:
      return <InAppConsume />;
    case Api.TrackEvent:
      return <TrackEvent />;
    case Api.UpdateUser:
      return <UpdateUser />;
    case Api.UpdateEmail:
      return <UpdateEmail />;
    case Api.GetInAppMessages:
      return <GetInAppMessages />;
    case Api.ShowInAppMessages:
      return <ShowInAppMessages />;
    case Api.RemoveInAppMessages:
      return <RemoveInAppMessages />;
    case Api.SetReadInAppMessages:
      return <SetReadInAppMessages />;
    case Api.HandleAppLink:
      return <HandleAppLink />;
    case Api.UpdateSubscriptions:
      return <UpdateSubscriptions />;
    case Api.GetHtmlContentForMessage:
      return <GetHtmlContentForMessage />;
    default:
      return <Text>Invalid API</Text>;
  }
};

export const ApiDetail = () => {
  const route = useRoute<ApiTabProps<Route.ApiDetail>['route']>();
  const apiId = route.params?.id;
  const apiName = route.params?.value;

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
