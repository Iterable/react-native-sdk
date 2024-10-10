export enum ApiListDetail {
  SetEmail = 'Iterable.setEmail',
  GetEmail = 'Iterable.getEmail',
  SetUserId = 'Iterable.setUserId',
  GetUserId = 'Iterable.getUserId',
  DisableDeviceForCurrentUser = 'Iterable.disableDeviceForCurrentUser',
  GetLastPushPayload = 'Iterable.getLastPushPayload',
  SetAttributionInfo = 'Iterable.setAttributionInfo',
  GetAttributionInfo = 'Iterable.getAttributionInfo',
  TrackPushOpenWithCampaignId = 'Iterable.trackPushOpenWithCampaignId',
  TrackPurchase = 'Iterable.trackPurchase',
  TrackInAppOpen = 'Iterable.trackInAppOpen',
  TrackInAppClick = 'Iterable.trackInAppClick',
  TrackInAppClose = 'Iterable.trackInAppClose',
  InAppConsume = 'Iterable.inAppConsume',
  TrackEvent = 'Iterable.trackEvent',
  UpdateUser = 'Iterable.updateUser',
  UpdateEmail = 'Iterable.updateEmail',
  GetInAppMessages = 'Iterable.getInAppMessages',
  ShowInAppMessages = 'Iterable.showInAppMessages',
  RemoveInAppMessages = 'Iterable.removeInAppMessages',
  SetReadInAppMessages = 'Iterable.setReadInAppMessages',
  UpdateSubscriptions = 'Iterable.updateSubscriptions',
  GetInAppContent = 'Iterable.getInAppContent',
}

export const LIST_DATA = Object.entries(ApiListDetail).map(([key, value]) => {
  return { id: key, value };
});
