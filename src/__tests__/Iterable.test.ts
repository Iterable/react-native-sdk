import { NativeEventEmitter } from 'react-native';

import { MockLinking } from '../__mocks__/MockLinking';
import { MockRNIterableAPI } from '../__mocks__/MockRNIterableAPI';
import { TestHelper } from './TestHelper';

// import from the same location that consumers import from
import {
  Iterable,
  IterableAction,
  IterableActionContext,
  IterableActionSource,
  IterableAttributionInfo,
  IterableCommerceItem,
  IterableConfig,
  IterableLogLevel,
} from '../index';
import { IterableEventName } from '../Iterable';
import { IterableDataRegion } from '../IterableDataRegion';
import { IterableLogger } from '../IterableLogger';

describe('Iterable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Iterable.logger = new IterableLogger(new IterableConfig());
  });

  it('setEmail_getEmail_email_returnsEmail', async () => {
    Iterable.logger.log('setEmail_getEmail_email_returnsEmail');
    const result = 'user@example.com';
    // GIVEN an email
    const email = 'user@example.com';
    // WHEN Iterable.setEmail is called with the given email
    Iterable.setEmail(email);
    // THEN Iterable.getEmail returns the given email
    return await Iterable.getEmail().then((mail) => {
      expect(mail).toBe(result);
    });
  });
  test('setUserId_getUserId_userId_returnsUserId', async () => {
    Iterable.logger.log('setUserId_getUserId_userId_returnsUserId');
    const result = 'user1';
    // GIVEN an userId
    const userId = 'user1';
    // WHEN Iterable.setUserId is called with the given userId
    Iterable.setUserId(userId);
    // THEN Iterable.getUserId returns the given userId
    return await Iterable.getUserId().then((id) => {
      expect(id).toBe(result);
    });
  });
  test('disableDeviceForCurrentUser_noParams_methodCalled', () => {
    Iterable.logger.log('disableDeviceForCurrentUser_noParams_methodCalled');
    // GIVEN no parameters
    // WHEN Iterable.disableDeviceForCurrentUser is called
    Iterable.disableDeviceForCurrentUser();
    // THEN corresponding method is called on RNITerableAPI
    expect(MockRNIterableAPI.disableDeviceForCurrentUser).toBeCalled();
  });
  test('getLastPushPayload_noParams_returnLastPushPayload', async () => {
    Iterable.logger.log('getLastPushPayload_noParams_returnLastPushPayload');
    const result = { var1: 'val1', var2: true };
    // GIVEN no parameters
    // WHEN the lastPushPayload is set
    MockRNIterableAPI.lastPushPayload = { var1: 'val1', var2: true };
    // THEN the lastPushPayload is returned when getLastPushPayload is called
    return await Iterable.getLastPushPayload().then((payload) => {
      expect(payload).toEqual(result);
    });
  });
  test('trackPushOpenWithCampaignId_pushParams_methodCalled', () => {
    Iterable.logger.log('getLastPushPayload_noParams_returnLastPushPayload');
    // GIVEN the following parameters
    const campaignId = 123;
    const templateId = 234;
    const messageId = 'someMessageId';
    const appAlreadyRunning = false;
    const dataFields = { dataFieldKey: 'dataFieldValue' };
    // WHEN Iterable.trackPushOpenWithCampaignId is called
    Iterable.trackPushOpenWithCampaignId(
      campaignId,
      templateId,
      messageId,
      appAlreadyRunning,
      dataFields
    );
    // THEN corresponding function is called on RNIterableAPI
    expect(MockRNIterableAPI.trackPushOpenWithCampaignId).toBeCalledWith(
      campaignId,
      templateId,
      messageId,
      appAlreadyRunning,
      dataFields
    );
  });
  test('updateCart_items_methodCalled', () => {
    Iterable.logger.log('updateCart_items_methodCalled');
    // GIVEN list of items
    const items = [new IterableCommerceItem('id1', 'Boba Tea', 18, 26)];
    // WHEN Iterable.updateCart is called
    Iterable.updateCart(items);
    // THEN corresponding function is called on RNIterableAPI
    expect(MockRNIterableAPI.updateCart).toBeCalledWith(items);
  });
  test('trackPurchase_params_methodCalled', () => {
    Iterable.logger.log('trackPurchase_params_methodCalled');
    // GIVEN the following parameters
    const total = 10;
    const items = [new IterableCommerceItem('id1', 'Boba Tea', 18, 26)];
    const dataFields = { dataFieldKey: 'dataFieldValue' };
    // WHEN Iterable.trackPurchase is called
    Iterable.trackPurchase(total, items, dataFields);
    // THEN corresponding function is called on RNIterableAPI
    expect(MockRNIterableAPI.trackPurchase).toBeCalledWith(
      total,
      items,
      dataFields
    );
  });
  test('trackPurchase_paramsWithOptionalFields_methodCalled', () => {
    Iterable.logger.log('trackPurchase_paramsWithOptionalFields_methodCalled');
    // GIVEN the following parameters
    const total = 5;
    const items = [
      new IterableCommerceItem(
        'id',
        'swordfish',
        64,
        1,
        'SKU',
        'description',
        'url',
        'imageUrl',
        ['sword', 'shield']
      ),
    ];
    const dataFields = { key: 'value' };
    // WHEN Iterable.trackPurchase is called
    Iterable.trackPurchase(total, items, dataFields);
    // THEN corresponding function is called on RNIterableAPI
    expect(MockRNIterableAPI.trackPurchase).toBeCalledWith(
      total,
      items,
      dataFields
    );
  });
  test('trackEvent_params_methodCalled', () => {
    Iterable.logger.log('trackPurchase_paramsWithOptionalFields_methodCalled');
    // GIVEN the following parameters
    const name = 'EventName';
    const dataFields = { DatafieldKey: 'DatafieldValue' };
    // WHEN Iterable.trackEvent is called
    Iterable.trackEvent(name, dataFields);
    // THEN corresponding function is called on RNIterableAPI
    expect(MockRNIterableAPI.trackEvent).toBeCalledWith(name, dataFields);
  });
  test('setAttributionInfo_getAttributionInfo_attributionInfo_returnsAttributionInfo', async () => {
    Iterable.logger.log(
      'setAttributionInfo_getAttributionInfo_attributionInfo_returnsAttributionInfo'
    );
    // GIVEN attribution info
    const campaignId = 1234;
    const templateId = 5678;
    const messageId = 'qwer';
    // WHEN Iterable.setAttributionInfo is called with the given attribution info
    Iterable.setAttributionInfo(
      new IterableAttributionInfo(campaignId, templateId, messageId)
    );
    // THEN Iterable.getAttrbutionInfo returns the given attribution info
    return await Iterable.getAttributionInfo().then((attributionInfo) => {
      expect(attributionInfo?.campaignId).toBe(campaignId);
      expect(attributionInfo?.templateId).toBe(templateId);
      expect(attributionInfo?.messageId).toBe(messageId);
    });
  });
  test('updateUser_params_methodCalled', () => {
    Iterable.logger.log('updateUser_params_methodCalled');
    // GIVEN the following parameters
    const dataFields = { field: 'value1' };
    // WHEN Iterable.updateUser is called
    Iterable.updateUser(dataFields, false);
    // THEN corresponding function is called on RNIterableAPI
    expect(MockRNIterableAPI.updateUser).toBeCalledWith(dataFields, false);
  });
  test('updateEmail_email_methodCalled', () => {
    Iterable.logger.log('updateEmail_email_methodCalled');
    // GIVEN the new email
    const newEmail = 'woo@newemail.com';
    // WHEN Iterable.updateEmail is called
    Iterable.updateEmail(newEmail);
    // THEN corresponding function is called on RNIterableAPI
    expect(MockRNIterableAPI.updateEmail).toBeCalledWith(newEmail, undefined);
  });
  test('updateEmail_emailAndToken_methodCalled', () => {
    Iterable.logger.log('updateEmail_emailAndToken_methodCalled');
    // GIVEN the new email and a token
    const newEmail = 'woo@newemail.com';
    const newToken = 'token2';
    // WHEN Iterable.updateEmail is called
    Iterable.updateEmail(newEmail, newToken);
    // THEN corresponding function is called on RNITerableAPI
    expect(MockRNIterableAPI.updateEmail).toBeCalledWith(newEmail, newToken);
  });
  test('iterableConfig_noParams_defaultValues', () => {
    Iterable.logger.log('iterableConfig_noParams_defaultValues');
    // GIVEN no parameters
    // WHEN config is initialized
    const config = new IterableConfig();
    // THEN config has default values
    expect(config.pushIntegrationName).toBe(undefined);
    expect(config.autoPushRegistration).toBe(true);
    expect(config.checkForDeferredDeeplink).toBe(false);
    expect(config.inAppDisplayInterval).toBe(30.0);
    expect(config.urlHandler).toBe(undefined);
    expect(config.customActionHandler).toBe(undefined);
    expect(config.inAppHandler).toBe(undefined);
    expect(config.authHandler).toBe(undefined);
    expect(config.logLevel).toBe(IterableLogLevel.info);
    expect(config.logReactNativeSdkCalls).toBe(true);
    expect(config.expiringAuthTokenRefreshPeriod).toBe(60.0);
    expect(config.allowedProtocols).toEqual([]);
    expect(config.androidSdkUseInMemoryStorageForInApps).toBe(false);
    expect(config.useInMemoryStorageForInApps).toBe(false);
    expect(config.dataRegion).toBe(IterableDataRegion.US);
    expect(config.encryptionEnforced).toBe(false);
  });
  test('iterableConfig_noParams_defaultDictValues', () => {
    Iterable.logger.log('iterableConfig_noParams_defaultDictValues');
    // GIVEN no parameters
    // WHEN config is initialized and converted to a dictionary
    const configDict = new IterableConfig().toDict();
    // THEN config has default dictionary values
    expect(configDict.pushIntegrationName).toBe(undefined);
    expect(configDict.autoPushRegistration).toBe(true);
    expect(configDict.inAppDisplayInterval).toBe(30.0);
    expect(configDict.urlHandlerPresent).toBe(false);
    expect(configDict.customActionHandlerPresent).toBe(false);
    expect(configDict.inAppHandlerPresent).toBe(false);
    expect(configDict.authHandlerPresent).toBe(false);
    expect(configDict.logLevel).toBe(IterableLogLevel.info);
    expect(configDict.expiringAuthTokenRefreshPeriod).toBe(60.0);
    expect(configDict.allowedProtocols).toEqual([]);
    expect(configDict.androidSdkUseInMemoryStorageForInApps).toBe(false);
    expect(configDict.useInMemoryStorageForInApps).toBe(false);
    expect(configDict.dataRegion).toBe(IterableDataRegion.US);
    expect(configDict.encryptionEnforced).toBe(false);
  });
  test('urlHandler_canOpenUrlSetToTrueAndUrlHandlerReturnsFalse_openUrlCalled', async () => {
    Iterable.logger.log(
      'urlHandler_canOpenUrlSetToTrueAndUrlHandlerReturnsFalse_openUrlCalled'
    );
    // sets up event emitter
    const nativeEmitter = new NativeEventEmitter();
    nativeEmitter.removeAllListeners(IterableEventName.handleUrlCalled);
    // sets up config file and urlHandler function
    // urlHandler set to return false
    const config = new IterableConfig();
    config.urlHandler = jest.fn((_url: string, _: IterableActionContext) => {
      return false;
    });
    // initialize Iterable object
    Iterable.initialize('apiKey', config);
    // GIVEN canOpenUrl set to return a promise that resolves to true
    MockLinking.canOpenURL = jest.fn(async () => {
      return await new Promise((resolve) => {
        resolve(true);
      });
    });
    MockLinking.openURL.mockReset();
    const expectedUrl = 'https://somewhere.com';
    const actionDict = { type: 'openUrl' };
    const dict = {
      url: expectedUrl,
      context: { action: actionDict, source: 'inApp' },
    };
    // WHEN handleUrlCalled event is emitted
    nativeEmitter.emit(IterableEventName.handleUrlCalled, dict);
    // THEN urlHandler and MockLinking is called with expected url
    return await TestHelper.delayed(0, () => {
      expect(config.urlHandler).toBeCalledWith(expectedUrl, dict.context);
      expect(MockLinking.openURL).toBeCalledWith(expectedUrl);
    });
  });
  test('urlHandler_canOpenUrlSetToFalseAndUrlHandlerReturnsFalse_openUrlNotCalled', async () => {
    Iterable.logger.log(
      'urlHandler_canOpenUrlSetToFalseAndUrlHandlerReturnsFalse_openUrlNotCalled'
    );
    // sets up event emitter
    const nativeEmitter = new NativeEventEmitter();
    nativeEmitter.removeAllListeners(IterableEventName.handleUrlCalled);
    // sets up config file and urlHandler function
    // urlHandler set to return false
    const config = new IterableConfig();
    config.urlHandler = jest.fn((_url: string, _: IterableActionContext) => {
      return false;
    });
    // initialize Iterable object
    Iterable.initialize('apiKey', config);
    // GIVEN canOpenUrl set to return a promise that resolves to false
    MockLinking.canOpenURL = jest.fn(async () => {
      return await new Promise((resolve) => {
        resolve(false);
      });
    });
    MockLinking.openURL.mockReset();
    const expectedUrl = 'https://somewhere.com';
    const actionDict = { type: 'openUrl' };
    const dict = {
      url: expectedUrl,
      context: { action: actionDict, source: 'inApp' },
    };
    // WHEN handleUrlCalled event is emitted
    nativeEmitter.emit(IterableEventName.handleUrlCalled, dict);
    // THEN urlHandler is called and MockLinking.openURL is not called
    return await TestHelper.delayed(0, () => {
      expect(config.urlHandler).toBeCalledWith(expectedUrl, dict.context);
      expect(MockLinking.openURL).not.toBeCalled();
    });
  });
  test('urlHandler_canOpenUrlSetToTrueAndUrlHandlerReturnsTrue_openUrlNotCalled', async () => {
    Iterable.logger.log(
      'urlHandler_canOpenUrlSetToTrueAndUrlHandlerReturnsTrue_openUrlNotCalled'
    );
    // sets up event emitter
    const nativeEmitter = new NativeEventEmitter();
    nativeEmitter.removeAllListeners(IterableEventName.handleUrlCalled);
    // sets up config file and urlHandler function
    // urlHandler set to return true
    const config = new IterableConfig();
    config.urlHandler = jest.fn((_url: string, _: IterableActionContext) => {
      return true;
    });
    // initialize Iterable object
    Iterable.initialize('apiKey', config);
    // GIVEN canOpenUrl set to return a promise that resolves to true
    MockLinking.canOpenURL = jest.fn(async () => {
      return await new Promise((resolve) => {
        resolve(true);
      });
    });
    MockLinking.openURL.mockReset();
    const expectedUrl = 'https://somewhere.com';
    const actionDict = { type: 'openUrl' };
    const dict = {
      url: expectedUrl,
      context: { action: actionDict, source: 'inApp' },
    };
    // WHEN handleUrlCalled event is emitted
    nativeEmitter.emit(IterableEventName.handleUrlCalled, dict);
    // THEN urlHandler is called and MockLinking.openURL is not called
    return await TestHelper.delayed(0, () => {
      expect(config.urlHandler).toBeCalledWith(expectedUrl, dict.context);
      expect(MockLinking.openURL).not.toBeCalled();
    });
  });
  test('customActionHandler_actionNameAndActionData_customActionHandlerCalled', () => {
    Iterable.logger.log(
      'customActionHandler_actionNameAndActionData_customActionHandlerCalled'
    );
    // sets up event emitter
    const nativeEmitter = new NativeEventEmitter();
    nativeEmitter.removeAllListeners(
      IterableEventName.handleCustomActionCalled
    );
    // sets up config file and customActionHandler function
    // customActionHandler set to return true
    const config = new IterableConfig();
    config.customActionHandler = jest.fn(
      (_action: IterableAction, _context: IterableActionContext) => {
        return true;
      }
    );
    // initialize Iterable object
    Iterable.initialize('apiKey', config);
    // GIVEN custom action name and custom action data
    const actionName = 'zeeActionName';
    const actionData = 'zeeActionData';
    const actionDict = { type: actionName, data: actionData };
    const actionSource = IterableActionSource.inApp;
    const dict = {
      action: actionDict,
      context: { action: actionDict, source: IterableActionSource.inApp },
    };
    // WHEN handleCustomActionCalled event is emitted
    nativeEmitter.emit(IterableEventName.handleCustomActionCalled, dict);
    // THEN customActionHandler is called with expected action and expected context
    const expectedAction = new IterableAction(actionName, actionData);
    const expectedContext = new IterableActionContext(
      expectedAction,
      actionSource
    );
    expect(config.customActionHandler).toBeCalledWith(
      expectedAction,
      expectedContext
    );
  });
  test('handleAppLink_link_methodCalled', () => {
    Iterable.logger.log('handleAppLink_link_methodCalled');
    // GIVEN a link
    const link = 'https://somewhere.com/link/something';
    // WHEN Iterable.handleAppLink is called
    Iterable.handleAppLink(link);
    // THEN corresponding function is called on RNITerableAPI
    expect(MockRNIterableAPI.handleAppLink).toBeCalledWith(link);
  });
  test('updateSubscriptions_params_methodCalled', () => {
    Iterable.logger.log('update subscriptions is called');
    // GIVEN the following parameters
    const emailListIds = [1, 2, 3];
    const unsubscribedChannelIds = [4, 5, 6];
    const unsubscribedMessageTypeIds = [7, 8];
    const subscribedMessageTypeIds = [9];
    const campaignId = 10;
    const templateId = 11;
    // WHEN Iterable.updateSubscriptions is called
    Iterable.updateSubscriptions(
      emailListIds,
      unsubscribedChannelIds,
      unsubscribedMessageTypeIds,
      subscribedMessageTypeIds,
      campaignId,
      templateId
    );
    // THEN corresponding function is called on RNIterableAPI
    expect(MockRNIterableAPI.updateSubscriptions).toBeCalledWith(
      emailListIds,
      unsubscribedChannelIds,
      unsubscribedMessageTypeIds,
      subscribedMessageTypeIds,
      campaignId,
      templateId
    );
  });
});
