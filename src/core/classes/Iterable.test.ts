import { NativeEventEmitter, Platform } from 'react-native';

import { MockLinking } from '../../__mocks__/MockLinking';
import { MockRNIterableAPI } from '../../__mocks__/MockRNIterableAPI';
// import from the same location that consumers import from
import {
  Iterable,
  IterableAction,
  IterableActionContext,
  IterableActionSource,
  IterableAttributionInfo,
  IterableAuthResponse,
  IterableCommerceItem,
  IterableConfig,
  IterableDataRegion,
  IterableEventName,
  IterableInAppCloseSource,
  IterableInAppDeleteSource,
  IterableInAppLocation,
  IterableInAppMessage,
  IterableInAppShowResponse,
  IterableInAppTrigger,
  IterableInAppTriggerType,
  IterableLogLevel,
} from '../..';
import { TestHelper } from '../../__tests__/TestHelper';

describe('Iterable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up all event listeners to prevent Jest worker process hanging
    const nativeEmitter = new NativeEventEmitter();
    nativeEmitter.removeAllListeners(IterableEventName.handleUrlCalled);
    nativeEmitter.removeAllListeners(IterableEventName.handleInAppCalled);
    nativeEmitter.removeAllListeners(
      IterableEventName.handleCustomActionCalled
    );
    nativeEmitter.removeAllListeners(IterableEventName.handleAuthCalled);
    nativeEmitter.removeAllListeners(IterableEventName.handleAuthSuccessCalled);
    nativeEmitter.removeAllListeners(IterableEventName.handleAuthFailureCalled);
    nativeEmitter.removeAllListeners(
      IterableEventName.handleEmbeddedMessageUpdateCalled
    );
    nativeEmitter.removeAllListeners(
      IterableEventName.handleEmbeddedMessagingDisabledCalled
    );

    // Clear any pending timers
    jest.clearAllTimers();
  });

  describe('setEmail', () => {
    it('should set the email', async () => {
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
  });

  describe('setUserId', () => {
    it('should set the userId', async () => {
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
  });

  describe('logout', () => {
    it('should call setEmail with null', () => {
      // GIVEN no parameters
      // WHEN Iterable.logout is called
      const setEmailSpy = jest.spyOn(Iterable, 'setEmail');
      Iterable.logout();
      // THEN Iterable.setEmail is called with null
      expect(setEmailSpy).toBeCalledWith(null);
      setEmailSpy.mockRestore();
    });

    it('should call setUserId with null', () => {
      // GIVEN no parameters
      // WHEN Iterable.logout is called
      const setUserIdSpy = jest.spyOn(Iterable, 'setUserId');
      Iterable.logout();
      // THEN Iterable.setUserId is called with null
      expect(setUserIdSpy).toBeCalledWith(null);
      setUserIdSpy.mockRestore();
    });

    it('should clear email and userId', async () => {
      // GIVEN a user is logged in

      // This is just for testing purposed.
      // Usually you'd either call `setEmail` or `setUserId`, but not both.
      Iterable.setEmail('user@example.com');
      Iterable.setUserId('user123');
      // WHEN Iterable.logout is called
      Iterable.logout();
      // THEN email and userId are set to null
      const email = await Iterable.getEmail();
      const userId = await Iterable.getUserId();
      expect(email).toBeNull();
      expect(userId).toBeNull();
    });

    it('should call setEmail and setUserId with null', () => {
      // GIVEN no parameters
      const setEmailSpy = jest.spyOn(Iterable, 'setEmail');
      const setUserIdSpy = jest.spyOn(Iterable, 'setUserId');
      // WHEN Iterable.logout is called
      Iterable.logout();
      // THEN both methods are called with null
      expect(setEmailSpy).toBeCalledWith(null);
      expect(setUserIdSpy).toBeCalledWith(null);
      // Clean up
      setEmailSpy.mockRestore();
      setUserIdSpy.mockRestore();
    });
  });

  describe('disableDeviceForCurrentUser', () => {
    it('should disable the device for the current user', () => {
      // GIVEN no parameters
      // WHEN Iterable.disableDeviceForCurrentUser is called
      Iterable.disableDeviceForCurrentUser();
      // THEN corresponding method is called on RNITerableAPI
      expect(MockRNIterableAPI.disableDeviceForCurrentUser).toBeCalled();
    });
  });

  describe('getLastPushPayload', () => {
    it('should return the last push payload', async () => {
      const result = { var1: 'val1', var2: true };
      // GIVEN no parameters
      // WHEN the lastPushPayload is set
      MockRNIterableAPI.lastPushPayload = { var1: 'val1', var2: true };
      // THEN the lastPushPayload is returned when getLastPushPayload is called
      return await Iterable.getLastPushPayload().then((payload) => {
        expect(payload).toEqual(result);
      });
    });
  });

  describe('trackPushOpenWithCampaignId', () => {
    it('should track the push open with the campaign id', () => {
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
  });

  describe('updateCart', () => {
    it('should call IterableAPI.updateCart with the correct items', () => {
      // GIVEN list of items
      const items = [new IterableCommerceItem('id1', 'Boba Tea', 18, 26)];
      // WHEN Iterable.updateCart is called
      Iterable.updateCart(items);
      // THEN corresponding function is called on RNIterableAPI
      expect(MockRNIterableAPI.updateCart).toBeCalledWith(items);
    });
  });

  describe('trackPurchase', () => {
    it('should track the purchase', () => {
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

    it('should track the purchase when called with optional fields', () => {
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
  });

  describe('trackEvent', () => {
    it('should call IterableAPI.trackEvent with the correct name and dataFields', () => {
      // GIVEN the following parameters
      const name = 'EventName';
      const dataFields = { DatafieldKey: 'DatafieldValue' };
      // WHEN Iterable.trackEvent is called
      Iterable.trackEvent(name, dataFields);
      // THEN corresponding function is called on RNIterableAPI
      expect(MockRNIterableAPI.trackEvent).toBeCalledWith(name, dataFields);
    });
  });

  describe('setAttributionInfo', () => {
    it('should set the attribution info', async () => {
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
  });

  describe('updateUser', () => {
    it('should update the user', () => {
      // GIVEN the following parameters
      const dataFields = { field: 'value1' };
      // WHEN Iterable.updateUser is called
      Iterable.updateUser(dataFields, false);
      // THEN corresponding function is called on RNIterableAPI
      expect(MockRNIterableAPI.updateUser).toBeCalledWith(dataFields, false);
    });
  });

  describe('updateEmail', () => {
    it('should call IterableAPI.updateEmail with the correct email', () => {
      // GIVEN the new email
      const newEmail = 'woo@newemail.com';
      // WHEN Iterable.updateEmail is called
      Iterable.updateEmail(newEmail);
      // THEN corresponding function is called on RNIterableAPI
      expect(MockRNIterableAPI.updateEmail).toBeCalledWith(newEmail, undefined);
    });

    it('should call IterableAPI.updateEmail with the correct email and token', () => {
      // GIVEN the new email and a token
      const newEmail = 'woo@newemail.com';
      const newToken = 'token2';
      // WHEN Iterable.updateEmail is called
      Iterable.updateEmail(newEmail, newToken);
      // THEN corresponding function is called on RNITerableAPI
      expect(MockRNIterableAPI.updateEmail).toBeCalledWith(newEmail, newToken);
    });
  });

  describe('iterableConfig', () => {
    it('should have default values', () => {
      // GIVEN no parameters
      // WHEN config is initialized
      const config = new IterableConfig();
      // THEN config has default values
      expect(config.allowedProtocols).toEqual([]);
      expect(config.androidSdkUseInMemoryStorageForInApps).toBe(false);
      expect(config.authHandler).toBe(undefined);
      expect(config.autoPushRegistration).toBe(true);
      expect(config.checkForDeferredDeeplink).toBe(false);
      expect(config.customActionHandler).toBe(undefined);
      expect(config.dataRegion).toBe(IterableDataRegion.US);
      expect(config.enableEmbeddedMessaging).toBe(false);
      expect(config.encryptionEnforced).toBe(false);
      expect(config.expiringAuthTokenRefreshPeriod).toBe(60.0);
      expect(config.inAppDisplayInterval).toBe(30.0);
      expect(config.inAppHandler).toBe(undefined);
      expect(config.logLevel).toBe(IterableLogLevel.debug);
      expect(config.logReactNativeSdkCalls).toBe(true);
      expect(config.pushIntegrationName).toBe(undefined);
      expect(config.urlHandler).toBe(undefined);
      expect(config.useInMemoryStorageForInApps).toBe(false);
      const configDict = config.toDict();
      expect(configDict.allowedProtocols).toEqual([]);
      expect(configDict.androidSdkUseInMemoryStorageForInApps).toBe(false);
      expect(configDict.authHandlerPresent).toBe(false);
      expect(configDict.autoPushRegistration).toBe(true);
      expect(configDict.customActionHandlerPresent).toBe(false);
      expect(configDict.dataRegion).toBe(IterableDataRegion.US);
      expect(configDict.enableEmbeddedMessaging).toBe(false);
      expect(configDict.encryptionEnforced).toBe(false);
      expect(configDict.expiringAuthTokenRefreshPeriod).toBe(60.0);
      expect(configDict.inAppDisplayInterval).toBe(30.0);
      expect(configDict.inAppHandlerPresent).toBe(false);
      expect(configDict.logLevel).toBe(IterableLogLevel.debug);
      expect(configDict.pushIntegrationName).toBe(undefined);
      expect(configDict.urlHandlerPresent).toBe(false);
      expect(configDict.useInMemoryStorageForInApps).toBe(false);
    });
  });

  describe('urlHandler', () => {
    it('should open the url when canOpenURL returns true and urlHandler returns false', async () => {
      // sets up event emitter
      const nativeEmitter = new NativeEventEmitter();
      nativeEmitter.removeAllListeners(IterableEventName.handleUrlCalled);
      // sets up config file and urlHandler function
      // urlHandler set to return false
      const config = new IterableConfig();
      config.logReactNativeSdkCalls = false;
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

    it('should not open the url when canOpenURL returns false and urlHandler returns false', async () => {
      // sets up event emitter
      const nativeEmitter = new NativeEventEmitter();
      nativeEmitter.removeAllListeners(IterableEventName.handleUrlCalled);
      // sets up config file and urlHandler function
      // urlHandler set to return false
      const config = new IterableConfig();
      config.logReactNativeSdkCalls = false;
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

    it('should not open the url when canOpenURL returns true and urlHandler returns true', async () => {
      // sets up event emitter
      const nativeEmitter = new NativeEventEmitter();
      nativeEmitter.removeAllListeners(IterableEventName.handleUrlCalled);
      // sets up config file and urlHandler function
      // urlHandler set to return true
      const config = new IterableConfig();
      config.logReactNativeSdkCalls = false;
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
  });

  describe('customActionHandler', () => {
    it('should be called with the correct action and context', () => {
      // sets up event emitter
      const nativeEmitter = new NativeEventEmitter();
      nativeEmitter.removeAllListeners(
        IterableEventName.handleCustomActionCalled
      );
      // sets up config file and customActionHandler function
      // customActionHandler set to return true
      const config = new IterableConfig();
      config.logReactNativeSdkCalls = false;
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
  });

  describe('handleAppLink', () => {
    it('should call IterableAPI.handleAppLink', () => {
      // GIVEN a link
      const link = 'https://somewhere.com/link/something';
      // WHEN Iterable.handleAppLink is called
      Iterable.handleAppLink(link);
      // THEN corresponding function is called on RNITerableAPI
      expect(MockRNIterableAPI.handleAppLink).toBeCalledWith(link);
    });
  });

  describe('updateSubscriptions', () => {
    it('should call IterableAPI.updateSubscriptions with the correct parameters', () => {
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

  describe('initialize', () => {
    it('should call IterableAPI.initializeWithApiKey and save the config', async () => {
      // GIVEN an API key and config
      const apiKey = 'test-api-key';
      const config = new IterableConfig();
      config.logReactNativeSdkCalls = false;
      config.logLevel = IterableLogLevel.debug;
      // WHEN Iterable.initialize is called
      const result = await Iterable.initialize(apiKey, config);
      // THEN corresponding function is called on RNIterableAPI and config is saved
      expect(MockRNIterableAPI.initializeWithApiKey).toBeCalledWith(
        apiKey,
        config.toDict(),
        expect.any(String)
      );
      expect(Iterable.savedConfig).toBe(config);
      expect(result).toBe(true);
    });

    it('should give the default config if no config is provided', async () => {
      // GIVEN an API key
      const apiKey = 'test-api-key';
      // WHEN Iterable.initialize is called
      const result = await Iterable.initialize(apiKey);
      // THEN corresponding function is called on RNIterableAPI and config is saved
      expect(Iterable.savedConfig).toStrictEqual(new IterableConfig());
      expect(result).toBe(true);
    });
  });

  describe('initialize2', () => {
    it('should call IterableAPI.initialize2WithApiKey with an endpoint and save the config', async () => {
      // GIVEN an API key, config, and endpoint
      const apiKey = 'test-api-key';
      const config = new IterableConfig();
      config.logReactNativeSdkCalls = false;
      const apiEndPoint = 'https://api.staging.iterable.com';
      // WHEN Iterable.initialize2 is called
      const result = await Iterable.initialize2(apiKey, config, apiEndPoint);
      // THEN corresponding function is called on RNIterableAPI and config is saved
      expect(MockRNIterableAPI.initialize2WithApiKey).toBeCalledWith(
        apiKey,
        config.toDict(),
        expect.any(String),
        apiEndPoint
      );
      expect(Iterable.savedConfig).toBe(config);
      expect(result).toBe(true);
    });

    it('should give the default config if no config is provided', async () => {
      // GIVEN an API key
      const apiKey = 'test-api-key';
      const apiEndPoint = 'https://api.staging.iterable.com';
      // WHEN Iterable.initialize is called
      const result = await Iterable.initialize2(apiKey, undefined, apiEndPoint);
      // THEN corresponding function is called on RNIterableAPI and config is saved
      expect(Iterable.savedConfig).toStrictEqual(new IterableConfig());
      expect(result).toBe(true);
    });
  });

  describe('wakeApp', () => {
    it('should call IterableAPI.wakeApp on Android', () => {
      // GIVEN Android platform
      const originalPlatform = Platform.OS;
      Object.defineProperty(Platform, 'OS', {
        value: 'android',
        writable: true,
      });
      // WHEN Iterable.wakeApp is called
      Iterable.wakeApp();
      // THEN corresponding function is called on RNIterableAPI
      expect(MockRNIterableAPI.wakeApp).toBeCalled();
      // Restore original platform
      Object.defineProperty(Platform, 'OS', {
        value: originalPlatform,
        writable: true,
      });
    });

    it('should not call IterableAPI.wakeApp on iOS', () => {
      // GIVEN iOS platform
      const originalPlatform = Platform.OS;
      Object.defineProperty(Platform, 'OS', {
        value: 'ios',
        writable: true,
      });
      // WHEN Iterable.wakeApp is called
      Iterable.wakeApp();
      // THEN corresponding function is not called on RNIterableAPI
      expect(MockRNIterableAPI.wakeApp).not.toBeCalled();
      // Restore original platform
      Object.defineProperty(Platform, 'OS', {
        value: originalPlatform,
        writable: true,
      });
    });
  });

  describe('trackInAppOpen', () => {
    it('should call IterableAPI.trackInAppOpen with the correct parameters', () => {
      // GIVEN an in-app message and location
      const message = new IterableInAppMessage(
        '1234',
        4567,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date(),
        new Date(),
        false,
        undefined,
        undefined,
        false,
        0
      );
      const location = IterableInAppLocation.inApp;
      // WHEN Iterable.trackInAppOpen is called
      Iterable.trackInAppOpen(message, location);
      // THEN corresponding function is called on RNIterableAPI
      expect(MockRNIterableAPI.trackInAppOpen).toBeCalledWith(
        message.messageId,
        location
      );
    });
  });

  describe('trackInAppClick', () => {
    it('should call IterableAPI.trackInAppClick with the correct parameters', () => {
      // GIVEN an in-app message, location, and clicked URL
      const message = new IterableInAppMessage(
        '1234',
        4567,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date(),
        new Date(),
        false,
        undefined,
        undefined,
        false,
        0
      );
      const location = IterableInAppLocation.inApp;
      const clickedUrl = 'https://www.example.com';
      // WHEN Iterable.trackInAppClick is called
      Iterable.trackInAppClick(message, location, clickedUrl);
      // THEN corresponding function is called on RNIterableAPI
      expect(MockRNIterableAPI.trackInAppClick).toBeCalledWith(
        message.messageId,
        location,
        clickedUrl
      );
    });
  });

  describe('trackInAppClose', () => {
    it('should call IterableAPI.trackInAppClose with the correct parameters', () => {
      // GIVEN an in-app message, location, and source (no URL)
      const message = new IterableInAppMessage(
        '1234',
        4567,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date(),
        new Date(),
        false,
        undefined,
        undefined,
        false,
        0
      );
      const location = IterableInAppLocation.inApp;
      const source = IterableInAppCloseSource.back;
      // WHEN Iterable.trackInAppClose is called
      Iterable.trackInAppClose(message, location, source);
      // THEN corresponding function is called on RNIterableAPI
      expect(MockRNIterableAPI.trackInAppClose).toBeCalledWith(
        message.messageId,
        location,
        source,
        undefined
      );
    });

    it('should call IterableAPI.trackInAppClose with a clicked URL when provided', () => {
      // GIVEN an in-app message, location, source, and clicked URL
      const message = new IterableInAppMessage(
        '1234',
        4567,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date(),
        new Date(),
        false,
        undefined,
        undefined,
        false,
        0
      );
      const location = IterableInAppLocation.inApp;
      const source = IterableInAppCloseSource.back;
      const clickedUrl = 'https://www.example.com';
      // WHEN Iterable.trackInAppClose is called
      Iterable.trackInAppClose(message, location, source, clickedUrl);
      // THEN corresponding function is called on RNIterableAPI
      expect(MockRNIterableAPI.trackInAppClose).toBeCalledWith(
        message.messageId,
        location,
        source,
        clickedUrl
      );
    });
  });

  describe('inAppConsume', () => {
    it('should call IterableAPI.inAppConsume with the correct parameters', () => {
      // GIVEN an in-app message, location, and delete source
      const message = new IterableInAppMessage(
        '1234',
        4567,
        new IterableInAppTrigger(IterableInAppTriggerType.immediate),
        new Date(),
        new Date(),
        false,
        undefined,
        undefined,
        false,
        0
      );
      const location = IterableInAppLocation.inApp;
      const source = IterableInAppDeleteSource.deleteButton;
      // WHEN Iterable.inAppConsume is called
      Iterable.inAppConsume(message, location, source);
      // THEN corresponding function is called on RNIterableAPI
      expect(MockRNIterableAPI.inAppConsume).toBeCalledWith(
        message.messageId,
        location,
        source
      );
    });
  });

  describe('getVersionFromPackageJson', () => {
    it('should return the version from the package.json file', () => {
      // GIVEN no parameters
      // WHEN Iterable.getVersionFromPackageJson is called
      const version = Iterable.getVersionFromPackageJson();
      // THEN a version string is returned
      expect(typeof version).toBe('string');
      expect(version.length).toBeGreaterThan(0);
    });
  });

  describe('setupEventHandlers', () => {
    it('should call inAppHandler when handleInAppCalled event is emitted', () => {
      // sets up event emitter
      const nativeEmitter = new NativeEventEmitter();
      nativeEmitter.removeAllListeners(IterableEventName.handleInAppCalled);
      // sets up config file and inAppHandler function
      const config = new IterableConfig();
      config.logReactNativeSdkCalls = false;
      config.inAppHandler = jest.fn((_message: IterableInAppMessage) => {
        return IterableInAppShowResponse.show;
      });
      // initialize Iterable object
      Iterable.initialize('apiKey', config);
      // GIVEN message dictionary
      const messageDict = {
        messageId: '1234',
        campaignId: 4567,
        trigger: { type: 0 },
        createdAt: new Date().toISOString(),
        expiresAt: new Date().toISOString(),
        saveToInbox: false,
        inboxMetadata: undefined,
        customPayload: undefined,
        read: false,
        priorityLevel: 0,
      };
      // WHEN handleInAppCalled event is emitted
      nativeEmitter.emit(IterableEventName.handleInAppCalled, messageDict);
      // THEN inAppHandler is called and setInAppShowResponse is called
      expect(config.inAppHandler).toBeCalledWith(
        expect.any(IterableInAppMessage)
      );
      expect(MockRNIterableAPI.setInAppShowResponse).toBeCalledWith(
        IterableInAppShowResponse.show
      );
    });

    describe('authHandler', () => {
      it('should call authHandler when handleAuthCalled event is emitted', async () => {
        // sets up event emitter
        const nativeEmitter = new NativeEventEmitter();
        nativeEmitter.removeAllListeners(IterableEventName.handleAuthCalled);
        nativeEmitter.removeAllListeners(
          IterableEventName.handleAuthSuccessCalled
        );
        nativeEmitter.removeAllListeners(
          IterableEventName.handleAuthFailureCalled
        );
        // sets up config file and authHandler function
        const config = new IterableConfig();
        config.logReactNativeSdkCalls = false;
        const successCallback = jest.fn();
        const failureCallback = jest.fn();
        const authResponse = new IterableAuthResponse();
        authResponse.authToken = 'test-token';
        authResponse.successCallback = successCallback;
        authResponse.failureCallback = failureCallback;
        config.authHandler = jest.fn(() => {
          return Promise.resolve(authResponse);
        });
        // initialize Iterable object
        Iterable.initialize('apiKey', config);
        // GIVEN auth handler returns AuthResponse
        // WHEN handleAuthCalled event is emitted
        nativeEmitter.emit(IterableEventName.handleAuthCalled);
        // WHEN handleAuthSuccessCalled event is emitted
        nativeEmitter.emit(IterableEventName.handleAuthSuccessCalled);
        // THEN passAlongAuthToken is called with the token and success callback is called after timeout
        return await TestHelper.delayed(1100, () => {
          expect(MockRNIterableAPI.passAlongAuthToken).toBeCalledWith(
            'test-token'
          );
          expect(successCallback).toBeCalled();
          expect(failureCallback).not.toBeCalled();
        });
      });

      it('should call authHandler when handleAuthFailureCalled event is emitted', async () => {
        // sets up event emitter
        const nativeEmitter = new NativeEventEmitter();
        nativeEmitter.removeAllListeners(IterableEventName.handleAuthCalled);
        nativeEmitter.removeAllListeners(
          IterableEventName.handleAuthSuccessCalled
        );
        nativeEmitter.removeAllListeners(
          IterableEventName.handleAuthFailureCalled
        );
        // sets up config file and authHandler function
        const config = new IterableConfig();
        config.logReactNativeSdkCalls = false;
        const successCallback = jest.fn();
        const failureCallback = jest.fn();
        const authResponse = new IterableAuthResponse();
        authResponse.authToken = 'test-token';
        authResponse.successCallback = successCallback;
        authResponse.failureCallback = failureCallback;
        config.authHandler = jest.fn(() => {
          // Why are we resolving when this is a failure?
          return Promise.resolve(authResponse);
        });
        // initialize Iterable object
        Iterable.initialize('apiKey', config);
        // GIVEN auth handler returns AuthResponse
        // WHEN handleAuthCalled event is emitted
        nativeEmitter.emit(IterableEventName.handleAuthCalled);
        // WHEN handleAuthFailureCalled event is emitted
        nativeEmitter.emit(IterableEventName.handleAuthFailureCalled);
        // THEN passAlongAuthToken is called with the token and failure callback is called after timeout
        return await TestHelper.delayed(1100, () => {
          expect(MockRNIterableAPI.passAlongAuthToken).toBeCalledWith(
            'test-token'
          );
          expect(failureCallback).toBeCalled();
          expect(successCallback).not.toBeCalled();
        });
      });

      it('should call authHandler when handleAuthCalled event is emitted and returns a string token', async () => {
        // sets up event emitter
        const nativeEmitter = new NativeEventEmitter();
        nativeEmitter.removeAllListeners(IterableEventName.handleAuthCalled);
        // sets up config file and authHandler function
        const config = new IterableConfig();
        config.logReactNativeSdkCalls = false;
        config.authHandler = jest.fn(() => {
          return Promise.resolve('string-token');
        });
        // initialize Iterable object
        Iterable.initialize('apiKey', config);
        // GIVEN auth handler returns string token
        // WHEN handleAuthCalled event is emitted
        nativeEmitter.emit(IterableEventName.handleAuthCalled);
        // THEN passAlongAuthToken is called with the string token
        return await TestHelper.delayed(100, () => {
          expect(MockRNIterableAPI.passAlongAuthToken).toBeCalledWith(
            'string-token'
          );
        });
      });

      it('should call authHandler when handleAuthCalled event is emitted and returns an unexpected response', () => {
        // sets up event emitter
        const nativeEmitter = new NativeEventEmitter();
        nativeEmitter.removeAllListeners(IterableEventName.handleAuthCalled);
        // sets up config file and authHandler function
        const config = new IterableConfig();
        config.logReactNativeSdkCalls = false;
        config.authHandler = jest.fn(() => {
          return Promise.resolve({ unexpected: 'object' } as unknown as
            | string
            | IterableAuthResponse);
        });
        // initialize Iterable object
        Iterable.initialize('apiKey', config);
        // GIVEN auth handler returns unexpected response
        // WHEN handleAuthCalled event is emitted
        nativeEmitter.emit(IterableEventName.handleAuthCalled);
        // THEN error is logged (we can't easily test console.log, but we can verify no crash)
        expect(MockRNIterableAPI.passAlongAuthToken).not.toBeCalled();
      });

      it('should call authHandler when handleAuthCalled event is emitted and rejects the promise', () => {
        // sets up event emitter
        const nativeEmitter = new NativeEventEmitter();
        nativeEmitter.removeAllListeners(IterableEventName.handleAuthCalled);
        // sets up config file and authHandler function
        const config = new IterableConfig();
        config.logReactNativeSdkCalls = false;
        config.authHandler = jest.fn(() => {
          return Promise.reject(new Error('Auth failed'));
        });
        // initialize Iterable object
        Iterable.initialize('apiKey', config);
        // GIVEN auth handler rejects promise
        // WHEN handleAuthCalled event is emitted
        nativeEmitter.emit(IterableEventName.handleAuthCalled);
        // THEN error is logged (we can't easily test console.log, but we can verify no crash)
        expect(MockRNIterableAPI.passAlongAuthToken).not.toBeCalled();
      });
    });
  });

  describe('authManager', () => {
    describe('pauseAuthRetries', () => {
      it('should call RNIterableAPI.pauseAuthRetries with true when pauseRetry is true', () => {
        // GIVEN pauseRetry is true
        const pauseRetry = true;

        // WHEN pauseAuthRetries is called
        Iterable.authManager.pauseAuthRetries(pauseRetry);

        // THEN RNIterableAPI.pauseAuthRetries is called with true
        expect(MockRNIterableAPI.pauseAuthRetries).toBeCalledWith(true);
      });

      it('should call RNIterableAPI.pauseAuthRetries with false when pauseRetry is false', () => {
        // GIVEN pauseRetry is false
        const pauseRetry = false;

        // WHEN pauseAuthRetries is called
        Iterable.authManager.pauseAuthRetries(pauseRetry);

        // THEN RNIterableAPI.pauseAuthRetries is called with false
        expect(MockRNIterableAPI.pauseAuthRetries).toBeCalledWith(false);
      });

      it('should return the result from RNIterableAPI.pauseAuthRetries', () => {
        // GIVEN RNIterableAPI.pauseAuthRetries returns a value
        const expectedResult = 'pause-result';
        MockRNIterableAPI.pauseAuthRetries = jest
          .fn()
          .mockReturnValue(expectedResult);

        // WHEN pauseAuthRetries is called
        const result = Iterable.authManager.pauseAuthRetries(true);

        // THEN the result is returned
        expect(result).toBe(expectedResult);
      });
    });

    describe('passAlongAuthToken', () => {
      it('should call RNIterableAPI.passAlongAuthToken with a valid string token', async () => {
        // GIVEN a valid auth token
        const authToken = 'valid-jwt-token';
        const expectedResponse = new IterableAuthResponse();
        expectedResponse.authToken = 'new-token';
        MockRNIterableAPI.passAlongAuthToken = jest
          .fn()
          .mockResolvedValue(expectedResponse);

        // WHEN passAlongAuthToken is called
        const result = await Iterable.authManager.passAlongAuthToken(authToken);

        // THEN RNIterableAPI.passAlongAuthToken is called with the token
        expect(MockRNIterableAPI.passAlongAuthToken).toBeCalledWith(authToken);
        expect(result).toBe(expectedResponse);
      });

      it('should call RNIterableAPI.passAlongAuthToken with null token', async () => {
        // GIVEN a null auth token
        const authToken = null;
        const expectedResponse = 'success';
        MockRNIterableAPI.passAlongAuthToken = jest
          .fn()
          .mockResolvedValue(expectedResponse);

        // WHEN passAlongAuthToken is called
        const result = await Iterable.authManager.passAlongAuthToken(authToken);

        // THEN RNIterableAPI.passAlongAuthToken is called with null
        expect(MockRNIterableAPI.passAlongAuthToken).toBeCalledWith(null);
        expect(result).toBe(expectedResponse);
      });

      it('should call RNIterableAPI.passAlongAuthToken with undefined token', async () => {
        // GIVEN an undefined auth token
        const authToken = undefined;
        const expectedResponse = undefined;
        MockRNIterableAPI.passAlongAuthToken = jest
          .fn()
          .mockResolvedValue(expectedResponse);

        // WHEN passAlongAuthToken is called
        const result = await Iterable.authManager.passAlongAuthToken(authToken);

        // THEN RNIterableAPI.passAlongAuthToken is called with undefined
        expect(MockRNIterableAPI.passAlongAuthToken).toBeCalledWith(undefined);
        expect(result).toBe(expectedResponse);
      });

      it('should call RNIterableAPI.passAlongAuthToken with empty string token', async () => {
        // GIVEN an empty string auth token
        const authToken = '';
        const expectedResponse = new IterableAuthResponse();
        MockRNIterableAPI.passAlongAuthToken = jest
          .fn()
          .mockResolvedValue(expectedResponse);

        // WHEN passAlongAuthToken is called
        const result = await Iterable.authManager.passAlongAuthToken(authToken);

        // THEN RNIterableAPI.passAlongAuthToken is called with empty string
        expect(MockRNIterableAPI.passAlongAuthToken).toBeCalledWith('');
        expect(result).toBe(expectedResponse);
      });

      it('should return IterableAuthResponse when API returns IterableAuthResponse', async () => {
        // GIVEN API returns IterableAuthResponse
        const authToken = 'test-token';
        const expectedResponse = new IterableAuthResponse();
        expectedResponse.authToken = 'new-token';
        expectedResponse.successCallback = jest.fn();
        expectedResponse.failureCallback = jest.fn();
        MockRNIterableAPI.passAlongAuthToken = jest
          .fn()
          .mockResolvedValue(expectedResponse);

        // WHEN passAlongAuthToken is called
        const result = await Iterable.authManager.passAlongAuthToken(authToken);

        // THEN the result is the expected IterableAuthResponse
        expect(result).toBe(expectedResponse);
        expect(result).toBeInstanceOf(IterableAuthResponse);
      });

      it('should return string when API returns string', async () => {
        // GIVEN API returns string
        const authToken = 'test-token';
        const expectedResponse = 'success-string';
        MockRNIterableAPI.passAlongAuthToken = jest
          .fn()
          .mockResolvedValue(expectedResponse);

        // WHEN passAlongAuthToken is called
        const result = await Iterable.authManager.passAlongAuthToken(authToken);

        // THEN the result is the expected string
        expect(result).toBe(expectedResponse);
        expect(typeof result).toBe('string');
      });

      it('should return undefined when API returns undefined', async () => {
        // GIVEN API returns undefined
        const authToken = 'test-token';
        const expectedResponse = undefined;
        MockRNIterableAPI.passAlongAuthToken = jest
          .fn()
          .mockResolvedValue(expectedResponse);

        // WHEN passAlongAuthToken is called
        const result = await Iterable.authManager.passAlongAuthToken(authToken);

        // THEN the result is undefined
        expect(result).toBeUndefined();
      });

      it('should handle API rejection and propagate the error', async () => {
        // GIVEN API rejects with an error
        const authToken = 'test-token';
        const expectedError = new Error('API Error');
        MockRNIterableAPI.passAlongAuthToken = jest
          .fn()
          .mockRejectedValue(expectedError);

        // WHEN passAlongAuthToken is called
        // THEN the error is propagated
        await expect(
          Iterable.authManager.passAlongAuthToken(authToken)
        ).rejects.toThrow('API Error');
      });

      it('should handle API rejection with network error', async () => {
        // GIVEN API rejects with a network error
        const authToken = 'test-token';
        const networkError = new Error('Network request failed');
        MockRNIterableAPI.passAlongAuthToken = jest
          .fn()
          .mockRejectedValue(networkError);

        // WHEN passAlongAuthToken is called
        // THEN the network error is propagated
        await expect(
          Iterable.authManager.passAlongAuthToken(authToken)
        ).rejects.toThrow('Network request failed');
      });

      it('should handle API rejection with timeout error', async () => {
        // GIVEN API rejects with a timeout error
        const authToken = 'test-token';
        const timeoutError = new Error('Request timeout');
        MockRNIterableAPI.passAlongAuthToken = jest
          .fn()
          .mockRejectedValue(timeoutError);

        // WHEN passAlongAuthToken is called
        // THEN the timeout error is propagated
        await expect(
          Iterable.authManager.passAlongAuthToken(authToken)
        ).rejects.toThrow('Request timeout');
      });
    });

    describe('integration', () => {
      it('should work with both methods in sequence', async () => {
        // GIVEN a sequence of operations
        const authToken = 'test-token';
        const expectedResponse = new IterableAuthResponse();
        MockRNIterableAPI.pauseAuthRetries = jest
          .fn()
          .mockReturnValue('paused');
        MockRNIterableAPI.passAlongAuthToken = jest
          .fn()
          .mockResolvedValue(expectedResponse);

        // WHEN calling both methods in sequence
        const pauseResult = Iterable.authManager.pauseAuthRetries(true);
        const tokenResult =
          await Iterable.authManager.passAlongAuthToken(authToken);

        // THEN both operations should work correctly
        expect(pauseResult).toBe('paused');
        expect(tokenResult).toBe(expectedResponse);
        expect(MockRNIterableAPI.pauseAuthRetries).toBeCalledWith(true);
        expect(MockRNIterableAPI.passAlongAuthToken).toBeCalledWith(authToken);
      });

      it('should handle rapid successive calls', async () => {
        // GIVEN rapid successive calls
        const authToken1 = 'token1';
        const authToken2 = 'token2';
        const response1 = new IterableAuthResponse();
        const response2 = 'success';
        MockRNIterableAPI.passAlongAuthToken = jest
          .fn()
          .mockResolvedValueOnce(response1)
          .mockResolvedValueOnce(response2);

        // WHEN making rapid successive calls
        const promise1 = Iterable.authManager.passAlongAuthToken(authToken1);
        const promise2 = Iterable.authManager.passAlongAuthToken(authToken2);
        const [result1, result2] = await Promise.all([promise1, promise2]);

        // THEN both calls should work correctly
        expect(result1).toBe(response1);
        expect(result2).toBe(response2);
        expect(MockRNIterableAPI.passAlongAuthToken).toHaveBeenCalledTimes(2);
        expect(MockRNIterableAPI.passAlongAuthToken).toHaveBeenNthCalledWith(
          1,
          authToken1
        );
        expect(MockRNIterableAPI.passAlongAuthToken).toHaveBeenNthCalledWith(
          2,
          authToken2
        );
      });
    });
  });

  describe('embeddedManager', () => {
    it('should be disabled by default', () => {
      const config = new IterableConfig();
      expect(config.enableEmbeddedMessaging).toBe(false);
      expect(Iterable.embeddedManager.isEnabled).toBe(false);
    });

    it('should enable embeddedManager when config is set', async () => {
      const config = new IterableConfig();
      config.enableEmbeddedMessaging = true;
      await Iterable.initialize('test-key', config);
      expect(Iterable.embeddedManager.isEnabled).toBe(true);
    });
  });

  describe('embedded messaging callbacks', () => {
    describe('onEmbeddedMessageUpdate', () => {
      it('should call onEmbeddedMessageUpdate when handleEmbeddedMessageUpdateCalled event is emitted', () => {
        // sets up event emitter
        const nativeEmitter = new NativeEventEmitter();
        nativeEmitter.removeAllListeners(
          IterableEventName.handleEmbeddedMessageUpdateCalled
        );
        // sets up config file and onEmbeddedMessageUpdate callback
        const config = new IterableConfig();
        config.logReactNativeSdkCalls = false;
        config.onEmbeddedMessageUpdate = jest.fn();
        // initialize Iterable object
        Iterable.initialize('apiKey', config);
        // WHEN handleEmbeddedMessageUpdateCalled event is emitted
        nativeEmitter.emit(
          IterableEventName.handleEmbeddedMessageUpdateCalled
        );
        // THEN onEmbeddedMessageUpdate callback is called
        expect(config.onEmbeddedMessageUpdate).toHaveBeenCalled();
        expect(config.onEmbeddedMessageUpdate).toHaveBeenCalledTimes(1);
      });

      it('should not set up listener if onEmbeddedMessageUpdate is not provided', () => {
        // sets up event emitter
        const nativeEmitter = new NativeEventEmitter();
        nativeEmitter.removeAllListeners(
          IterableEventName.handleEmbeddedMessageUpdateCalled
        );
        // sets up config without onEmbeddedMessageUpdate callback
        const config = new IterableConfig();
        config.logReactNativeSdkCalls = false;
        // initialize Iterable object
        Iterable.initialize('apiKey', config);
        // WHEN handleEmbeddedMessageUpdateCalled event is emitted
        // THEN no error should occur (no listener was set up)
        expect(() => {
          nativeEmitter.emit(
            IterableEventName.handleEmbeddedMessageUpdateCalled
          );
        }).not.toThrow();
      });

      it('should call onEmbeddedMessageUpdate multiple times when event is emitted multiple times', () => {
        // sets up event emitter
        const nativeEmitter = new NativeEventEmitter();
        nativeEmitter.removeAllListeners(
          IterableEventName.handleEmbeddedMessageUpdateCalled
        );
        // sets up config with callback
        const config = new IterableConfig();
        config.logReactNativeSdkCalls = false;
        config.onEmbeddedMessageUpdate = jest.fn();
        // initialize Iterable object
        Iterable.initialize('apiKey', config);
        // WHEN handleEmbeddedMessageUpdateCalled event is emitted multiple times
        nativeEmitter.emit(
          IterableEventName.handleEmbeddedMessageUpdateCalled
        );
        nativeEmitter.emit(
          IterableEventName.handleEmbeddedMessageUpdateCalled
        );
        nativeEmitter.emit(
          IterableEventName.handleEmbeddedMessageUpdateCalled
        );
        // THEN onEmbeddedMessageUpdate callback is called three times
        expect(config.onEmbeddedMessageUpdate).toHaveBeenCalledTimes(3);
      });

      it('should include onEmbeddedMessageUpdatePresent flag in config dict when callback is provided', () => {
        // GIVEN a config with onEmbeddedMessageUpdate callback
        const config = new IterableConfig();
        config.onEmbeddedMessageUpdate = jest.fn();
        // WHEN toDict is called
        const configDict = config.toDict();
        // THEN onEmbeddedMessageUpdatePresent is true
        expect(configDict.onEmbeddedMessageUpdatePresent).toBe(true);
      });

      it('should set onEmbeddedMessageUpdatePresent flag to false when callback is not provided', () => {
        // GIVEN a config without onEmbeddedMessageUpdate callback
        const config = new IterableConfig();
        // WHEN toDict is called
        const configDict = config.toDict();
        // THEN onEmbeddedMessageUpdatePresent is false
        expect(configDict.onEmbeddedMessageUpdatePresent).toBe(false);
      });
    });

    describe('onEmbeddedMessagingDisabled', () => {
      it('should call onEmbeddedMessagingDisabled when handleEmbeddedMessagingDisabledCalled event is emitted', () => {
        // sets up event emitter
        const nativeEmitter = new NativeEventEmitter();
        nativeEmitter.removeAllListeners(
          IterableEventName.handleEmbeddedMessagingDisabledCalled
        );
        // sets up config file and onEmbeddedMessagingDisabled callback
        const config = new IterableConfig();
        config.logReactNativeSdkCalls = false;
        config.onEmbeddedMessagingDisabled = jest.fn();
        // initialize Iterable object
        Iterable.initialize('apiKey', config);
        // WHEN handleEmbeddedMessagingDisabledCalled event is emitted
        nativeEmitter.emit(
          IterableEventName.handleEmbeddedMessagingDisabledCalled
        );
        // THEN onEmbeddedMessagingDisabled callback is called
        expect(config.onEmbeddedMessagingDisabled).toHaveBeenCalled();
        expect(config.onEmbeddedMessagingDisabled).toHaveBeenCalledTimes(1);
      });

      it('should not set up listener if onEmbeddedMessagingDisabled is not provided', () => {
        // sets up event emitter
        const nativeEmitter = new NativeEventEmitter();
        nativeEmitter.removeAllListeners(
          IterableEventName.handleEmbeddedMessagingDisabledCalled
        );
        // sets up config without onEmbeddedMessagingDisabled callback
        const config = new IterableConfig();
        config.logReactNativeSdkCalls = false;
        // initialize Iterable object
        Iterable.initialize('apiKey', config);
        // WHEN handleEmbeddedMessagingDisabledCalled event is emitted
        // THEN no error should occur (no listener was set up)
        expect(() => {
          nativeEmitter.emit(
            IterableEventName.handleEmbeddedMessagingDisabledCalled
          );
        }).not.toThrow();
      });

      it('should call onEmbeddedMessagingDisabled when embedded messaging becomes unavailable', () => {
        // sets up event emitter
        const nativeEmitter = new NativeEventEmitter();
        nativeEmitter.removeAllListeners(
          IterableEventName.handleEmbeddedMessagingDisabledCalled
        );
        // sets up config with callback
        const config = new IterableConfig();
        config.logReactNativeSdkCalls = false;
        config.onEmbeddedMessagingDisabled = jest.fn();
        // initialize Iterable object
        Iterable.initialize('apiKey', config);
        // WHEN handleEmbeddedMessagingDisabledCalled event is emitted
        nativeEmitter.emit(
          IterableEventName.handleEmbeddedMessagingDisabledCalled
        );
        // THEN onEmbeddedMessagingDisabled callback is called
        expect(config.onEmbeddedMessagingDisabled).toHaveBeenCalled();
      });

      it('should include onEmbeddedMessagingDisabledPresent flag in config dict when callback is provided', () => {
        // GIVEN a config with onEmbeddedMessagingDisabled callback
        const config = new IterableConfig();
        config.onEmbeddedMessagingDisabled = jest.fn();
        // WHEN toDict is called
        const configDict = config.toDict();
        // THEN onEmbeddedMessagingDisabledPresent is true
        expect(configDict.onEmbeddedMessagingDisabledPresent).toBe(true);
      });

      it('should set onEmbeddedMessagingDisabledPresent flag to false when callback is not provided', () => {
        // GIVEN a config without onEmbeddedMessagingDisabled callback
        const config = new IterableConfig();
        // WHEN toDict is called
        const configDict = config.toDict();
        // THEN onEmbeddedMessagingDisabledPresent is false
        expect(configDict.onEmbeddedMessagingDisabledPresent).toBe(false);
      });
    });

    describe('both embedded callbacks', () => {
      it('should call both callbacks independently when both are provided', () => {
        // sets up event emitter
        const nativeEmitter = new NativeEventEmitter();
        nativeEmitter.removeAllListeners(
          IterableEventName.handleEmbeddedMessageUpdateCalled
        );
        nativeEmitter.removeAllListeners(
          IterableEventName.handleEmbeddedMessagingDisabledCalled
        );
        // sets up config with both callbacks
        const config = new IterableConfig();
        config.logReactNativeSdkCalls = false;
        config.onEmbeddedMessageUpdate = jest.fn();
        config.onEmbeddedMessagingDisabled = jest.fn();
        // initialize Iterable object
        Iterable.initialize('apiKey', config);
        // WHEN handleEmbeddedMessageUpdateCalled event is emitted
        nativeEmitter.emit(
          IterableEventName.handleEmbeddedMessageUpdateCalled
        );
        // THEN only onEmbeddedMessageUpdate is called
        expect(config.onEmbeddedMessageUpdate).toHaveBeenCalled();
        expect(config.onEmbeddedMessagingDisabled).not.toHaveBeenCalled();
        // Reset mocks
        jest.clearAllMocks();
        // WHEN handleEmbeddedMessagingDisabledCalled event is emitted
        nativeEmitter.emit(
          IterableEventName.handleEmbeddedMessagingDisabledCalled
        );
        // THEN only onEmbeddedMessagingDisabled is called
        expect(config.onEmbeddedMessagingDisabled).toHaveBeenCalled();
        expect(config.onEmbeddedMessageUpdate).not.toHaveBeenCalled();
      });

      it('should set both presence flags in config dict when both callbacks are provided', () => {
        // GIVEN a config with both callbacks
        const config = new IterableConfig();
        config.onEmbeddedMessageUpdate = jest.fn();
        config.onEmbeddedMessagingDisabled = jest.fn();
        // WHEN toDict is called
        const configDict = config.toDict();
        // THEN both presence flags are true
        expect(configDict.onEmbeddedMessageUpdatePresent).toBe(true);
        expect(configDict.onEmbeddedMessagingDisabledPresent).toBe(true);
      });
    });
  });
});
