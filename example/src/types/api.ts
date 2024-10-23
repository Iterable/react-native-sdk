export enum Api {
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
  GetInAppMessages = 'Iterable.inAppManager.getMessages',
  ShowInAppMessages = 'Iterable.inAppManager.showMessage',
  RemoveInAppMessages = 'Iterable.inAppManager.removeMessage',
  SetReadInAppMessages = 'Iterable.inAppManager.setReadForMessage',
  HandleAppLink = 'Iterable.handleAppLink',
  UpdateSubscriptions = 'Iterable.updateSubscriptions',
  GetHtmlContentForMessage = 'Iterable.inAppManager.getHtmlContentForMessage',
}

export interface ApiData {
  id: string;
  value: Api;
}