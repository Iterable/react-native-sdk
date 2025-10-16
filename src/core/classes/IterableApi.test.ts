import { Platform } from 'react-native';

import { MockRNIterableAPI } from '../../__mocks__/MockRNIterableAPI';
import { IterableApi } from './IterableApi';
import { IterableConfig } from './IterableConfig';
import { IterableAttributionInfo } from './IterableAttributionInfo';
import { IterableCommerceItem } from './IterableCommerceItem';
import { IterableInAppMessage } from '../../inApp/classes/IterableInAppMessage';
import { IterableInAppTrigger } from '../../inApp/classes/IterableInAppTrigger';
import { IterableInAppTriggerType } from '../../inApp/enums/IterableInAppTriggerType';
import { IterableInAppLocation } from '../../inApp/enums/IterableInAppLocation';
import { IterableInAppCloseSource } from '../../inApp/enums/IterableInAppCloseSource';
import { IterableInAppDeleteSource } from '../../inApp/enums/IterableInAppDeleteSource';
import { IterableInAppShowResponse } from '../../inApp/enums/IterableInAppShowResponse';
import { type IterableInboxImpressionRowInfo } from '../../inbox/types/IterableInboxImpressionRowInfo';

// Mock the RNIterableAPI module
jest.mock('../../api', () => ({
  __esModule: true,
  default: MockRNIterableAPI,
}));

describe('IterableApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ====================================================== //
  // ===================== INITIALIZE ===================== //
  // ====================================================== //

  describe('initializeWithApiKey', () => {
    it('should call RNIterableAPI.initializeWithApiKey with correct parameters', async () => {
      // GIVEN an API key, config, and version
      const apiKey = 'test-api-key';
      const config = new IterableConfig();
      const version = '1.0.0';

      // WHEN initializeWithApiKey is called
      const result = await IterableApi.initializeWithApiKey(apiKey, {
        config,
        version,
      });

      // THEN RNIterableAPI.initializeWithApiKey is called with correct parameters
      expect(MockRNIterableAPI.initializeWithApiKey).toBeCalledWith(
        apiKey,
        config.toDict(),
        version
      );
      expect(result).toBe(true);
    });

    it('should use default config when not provided', async () => {
      // GIVEN an API key and version
      const apiKey = 'test-api-key';
      const version = '1.0.0';

      // WHEN initializeWithApiKey is called without config
      const result = await IterableApi.initializeWithApiKey(apiKey, {
        config: new IterableConfig(),
        version,
      });

      // THEN RNIterableAPI.initializeWithApiKey is called with default config
      expect(MockRNIterableAPI.initializeWithApiKey).toBeCalledWith(
        apiKey,
        expect.any(Object),
        version
      );
      expect(result).toBe(true);
    });
  });

  describe('initialize2WithApiKey', () => {
    it('should call RNIterableAPI.initialize2WithApiKey with correct parameters', async () => {
      // GIVEN an API key, config, version, and endpoint
      const apiKey = 'test-api-key';
      const config = new IterableConfig();
      const version = '1.0.0';
      const apiEndPoint = 'https://api.staging.iterable.com';

      // WHEN initialize2WithApiKey is called
      const result = await IterableApi.initialize2WithApiKey(apiKey, {
        config,
        version,
        apiEndPoint,
      });

      // THEN RNIterableAPI.initialize2WithApiKey is called with correct parameters
      expect(MockRNIterableAPI.initialize2WithApiKey).toBeCalledWith(
        apiKey,
        config.toDict(),
        version,
        apiEndPoint
      );
      expect(result).toBe(true);
    });

    it('should use default config when not provided', async () => {
      // GIVEN an API key, version, and endpoint
      const apiKey = 'test-api-key';
      const version = '1.0.0';
      const apiEndPoint = 'https://api.staging.iterable.com';

      // WHEN initialize2WithApiKey is called without config
      const result = await IterableApi.initialize2WithApiKey(apiKey, {
        version,
        apiEndPoint,
        config: new IterableConfig(),
      });

      // THEN RNIterableAPI.initialize2WithApiKey is called with default config
      expect(MockRNIterableAPI.initialize2WithApiKey).toBeCalledWith(
        apiKey,
        expect.any(Object),
        version,
        apiEndPoint
      );
      expect(result).toBe(true);
    });
  });

  // ====================================================== //
  // ===================== USER MANAGEMENT ================ //
  // ====================================================== //

  describe('setEmail', () => {
    it('should call RNIterableAPI.setEmail with email only', () => {
      // GIVEN an email
      const email = 'user@example.com';

      // WHEN setEmail is called
      IterableApi.setEmail(email);

      // THEN RNIterableAPI.setEmail is called with email
      expect(MockRNIterableAPI.setEmail).toBeCalledWith(email, undefined);
    });

    it('should call RNIterableAPI.setEmail with email and auth token', () => {
      // GIVEN an email and auth token
      const email = 'user@example.com';
      const authToken = 'jwt-token';

      // WHEN setEmail is called
      IterableApi.setEmail(email, authToken);

      // THEN RNIterableAPI.setEmail is called with email and auth token
      expect(MockRNIterableAPI.setEmail).toBeCalledWith(email, authToken);
    });

    it('should call RNIterableAPI.setEmail with null email', () => {
      // GIVEN null email
      const email = null;

      // WHEN setEmail is called
      IterableApi.setEmail(email);

      // THEN RNIterableAPI.setEmail is called with null email
      expect(MockRNIterableAPI.setEmail).toBeCalledWith(null, undefined);
    });
  });

  describe('getEmail', () => {
    it('should return the email from RNIterableAPI', async () => {
      // GIVEN a mock email
      const expectedEmail = 'user@example.com';
      MockRNIterableAPI.email = expectedEmail;

      // WHEN getEmail is called
      const result = await IterableApi.getEmail();

      // THEN the email is returned
      expect(result).toBe(expectedEmail);
    });
  });

  describe('setUserId', () => {
    it('should call RNIterableAPI.setUserId with userId only', () => {
      // GIVEN a userId
      const userId = 'user123';

      // WHEN setUserId is called
      IterableApi.setUserId(userId);

      // THEN RNIterableAPI.setUserId is called with userId
      expect(MockRNIterableAPI.setUserId).toBeCalledWith(userId, undefined);
    });

    it('should call RNIterableAPI.setUserId with userId and auth token', () => {
      // GIVEN a userId and auth token
      const userId = 'user123';
      const authToken = 'jwt-token';

      // WHEN setUserId is called
      IterableApi.setUserId(userId, authToken);

      // THEN RNIterableAPI.setUserId is called with userId and auth token
      expect(MockRNIterableAPI.setUserId).toBeCalledWith(userId, authToken);
    });

    it('should call RNIterableAPI.setUserId with null userId', () => {
      // GIVEN null userId
      const userId = null;

      // WHEN setUserId is called
      IterableApi.setUserId(userId);

      // THEN RNIterableAPI.setUserId is called with null userId
      expect(MockRNIterableAPI.setUserId).toBeCalledWith(null, undefined);
    });

    it('should call RNIterableAPI.setUserId with undefined userId', () => {
      // GIVEN undefined userId
      const userId = undefined;

      // WHEN setUserId is called
      IterableApi.setUserId(userId);

      // THEN RNIterableAPI.setUserId is called with undefined userId
      expect(MockRNIterableAPI.setUserId).toBeCalledWith(undefined, undefined);
    });
  });

  describe('getUserId', () => {
    it('should return the userId from RNIterableAPI', async () => {
      // GIVEN a mock userId
      const expectedUserId = 'user123';
      MockRNIterableAPI.userId = expectedUserId;

      // WHEN getUserId is called
      const result = await IterableApi.getUserId();

      // THEN the userId is returned
      expect(result).toBe(expectedUserId);
    });
  });

  describe('disableDeviceForCurrentUser', () => {
    it('should call RNIterableAPI.disableDeviceForCurrentUser', () => {
      // GIVEN no parameters
      // WHEN disableDeviceForCurrentUser is called
      IterableApi.disableDeviceForCurrentUser();

      // THEN RNIterableAPI.disableDeviceForCurrentUser is called
      expect(MockRNIterableAPI.disableDeviceForCurrentUser).toBeCalled();
    });
  });

  describe('updateUser', () => {
    it('should call RNIterableAPI.updateUser with data fields and merge flag', () => {
      // GIVEN data fields and merge flag
      const dataFields = { name: 'John', age: 30 };
      const mergeNestedObjects = true;

      // WHEN updateUser is called
      IterableApi.updateUser(dataFields, mergeNestedObjects);

      // THEN RNIterableAPI.updateUser is called with correct parameters
      expect(MockRNIterableAPI.updateUser).toBeCalledWith(
        dataFields,
        mergeNestedObjects
      );
    });

    it('should call RNIterableAPI.updateUser with mergeNestedObjects false', () => {
      // GIVEN data fields and merge flag set to false
      const dataFields = { name: 'Jane' };
      const mergeNestedObjects = false;

      // WHEN updateUser is called
      IterableApi.updateUser(dataFields, mergeNestedObjects);

      // THEN RNIterableAPI.updateUser is called with correct parameters
      expect(MockRNIterableAPI.updateUser).toBeCalledWith(
        dataFields,
        mergeNestedObjects
      );
    });
  });

  describe('updateEmail', () => {
    it('should call RNIterableAPI.updateEmail with email only', () => {
      // GIVEN a new email
      const email = 'newuser@example.com';

      // WHEN updateEmail is called
      IterableApi.updateEmail(email);

      // THEN RNIterableAPI.updateEmail is called with email
      expect(MockRNIterableAPI.updateEmail).toBeCalledWith(email, undefined);
    });

    it('should call RNIterableAPI.updateEmail with email and auth token', () => {
      // GIVEN a new email and auth token
      const email = 'newuser@example.com';
      const authToken = 'new-jwt-token';

      // WHEN updateEmail is called
      IterableApi.updateEmail(email, authToken);

      // THEN RNIterableAPI.updateEmail is called with email and auth token
      expect(MockRNIterableAPI.updateEmail).toBeCalledWith(email, authToken);
    });

    it('should call RNIterableAPI.updateEmail with null auth token', () => {
      // GIVEN a new email and null auth token
      const email = 'newuser@example.com';
      const authToken = null;

      // WHEN updateEmail is called
      IterableApi.updateEmail(email, authToken);

      // THEN RNIterableAPI.updateEmail is called with email and null auth token
      expect(MockRNIterableAPI.updateEmail).toBeCalledWith(email, null);
    });
  });

  // ====================================================== //
  // ===================== TRACKING ====================== //
  // ====================================================== //

  describe('trackPushOpenWithCampaignId', () => {
    it('should call RNIterableAPI.trackPushOpenWithCampaignId with all parameters', () => {
      // GIVEN push open parameters
      const params = {
        campaignId: 123,
        templateId: 456,
        messageId: 'msg123',
        appAlreadyRunning: false,
        dataFields: { source: 'push' },
      };

      // WHEN trackPushOpenWithCampaignId is called
      IterableApi.trackPushOpenWithCampaignId(params);

      // THEN RNIterableAPI.trackPushOpenWithCampaignId is called with correct parameters
      expect(MockRNIterableAPI.trackPushOpenWithCampaignId).toBeCalledWith(
        params.campaignId,
        params.templateId,
        params.messageId,
        params.appAlreadyRunning,
        params.dataFields
      );
    });

    it('should call RNIterableAPI.trackPushOpenWithCampaignId without dataFields', () => {
      // GIVEN push open parameters without dataFields
      const params = {
        campaignId: 123,
        templateId: 456,
        messageId: 'msg123',
        appAlreadyRunning: true,
      };

      // WHEN trackPushOpenWithCampaignId is called
      IterableApi.trackPushOpenWithCampaignId(params);

      // THEN RNIterableAPI.trackPushOpenWithCampaignId is called with correct parameters
      expect(MockRNIterableAPI.trackPushOpenWithCampaignId).toBeCalledWith(
        params.campaignId,
        params.templateId,
        params.messageId,
        params.appAlreadyRunning,
        undefined
      );
    });

    it('should call RNIterableAPI.trackPushOpenWithCampaignId with null messageId', () => {
      // GIVEN push open parameters with null messageId
      const params = {
        campaignId: 123,
        templateId: 456,
        messageId: null,
        appAlreadyRunning: false,
      };

      // WHEN trackPushOpenWithCampaignId is called
      IterableApi.trackPushOpenWithCampaignId(params);

      // THEN RNIterableAPI.trackPushOpenWithCampaignId is called with correct parameters
      expect(MockRNIterableAPI.trackPushOpenWithCampaignId).toBeCalledWith(
        params.campaignId,
        params.templateId,
        null,
        params.appAlreadyRunning,
        undefined
      );
    });
  });

  describe('trackPurchase', () => {
    it('should call RNIterableAPI.trackPurchase with all parameters', () => {
      // GIVEN purchase parameters
      const total = 99.99;
      const items = [
        new IterableCommerceItem('item1', 'Product 1', 49.99, 1),
        new IterableCommerceItem('item2', 'Product 2', 49.99, 1),
      ];
      const dataFields = { currency: 'USD', discount: 10 };

      // WHEN trackPurchase is called
      IterableApi.trackPurchase({ total, items, dataFields });

      // THEN RNIterableAPI.trackPurchase is called with correct parameters
      expect(MockRNIterableAPI.trackPurchase).toBeCalledWith(
        total,
        items,
        dataFields
      );
    });

    it('should call RNIterableAPI.trackPurchase without dataFields', () => {
      // GIVEN purchase parameters without dataFields
      const total = 50.0;
      const items = [new IterableCommerceItem('item1', 'Product 1', 50.0, 1)];

      // WHEN trackPurchase is called
      IterableApi.trackPurchase({ total, items });

      // THEN RNIterableAPI.trackPurchase is called with correct parameters
      expect(MockRNIterableAPI.trackPurchase).toBeCalledWith(
        total,
        items,
        undefined
      );
    });
  });

  describe('trackInAppOpen', () => {
    it('should call RNIterableAPI.trackInAppOpen with message and location', () => {
      // GIVEN an in-app message and location
      const message = new IterableInAppMessage(
        'msg123',
        456,
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

      // WHEN trackInAppOpen is called
      IterableApi.trackInAppOpen({ message, location });

      // THEN RNIterableAPI.trackInAppOpen is called with correct parameters
      expect(MockRNIterableAPI.trackInAppOpen).toBeCalledWith(
        message.messageId,
        location
      );
    });
  });

  describe('trackInAppClick', () => {
    it('should call RNIterableAPI.trackInAppClick with message, location, and clickedUrl', () => {
      // GIVEN an in-app message, location, and clicked URL
      const message = new IterableInAppMessage(
        'msg123',
        456,
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
      const clickedUrl = 'https://example.com';

      // WHEN trackInAppClick is called
      IterableApi.trackInAppClick({ message, location, clickedUrl });

      // THEN RNIterableAPI.trackInAppClick is called with correct parameters
      expect(MockRNIterableAPI.trackInAppClick).toBeCalledWith(
        message.messageId,
        location,
        clickedUrl
      );
    });
  });

  describe('trackInAppClose', () => {
    it('should call RNIterableAPI.trackInAppClose with message, location, and source', () => {
      // GIVEN an in-app message, location, and source
      const message = new IterableInAppMessage(
        'msg123',
        456,
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

      // WHEN trackInAppClose is called
      IterableApi.trackInAppClose({ message, location, source });

      // THEN RNIterableAPI.trackInAppClose is called with correct parameters
      expect(MockRNIterableAPI.trackInAppClose).toBeCalledWith(
        message.messageId,
        location,
        source,
        undefined
      );
    });

    it('should call RNIterableAPI.trackInAppClose with clickedUrl when provided', () => {
      // GIVEN an in-app message, location, source, and clicked URL
      const message = new IterableInAppMessage(
        'msg123',
        456,
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
      const source = IterableInAppCloseSource.link;
      const clickedUrl = 'https://example.com';

      // WHEN trackInAppClose is called
      IterableApi.trackInAppClose({ message, location, source, clickedUrl });

      // THEN RNIterableAPI.trackInAppClose is called with correct parameters
      expect(MockRNIterableAPI.trackInAppClose).toBeCalledWith(
        message.messageId,
        location,
        source,
        clickedUrl
      );
    });
  });

  describe('trackEvent', () => {
    it('should call RNIterableAPI.trackEvent with name and dataFields', () => {
      // GIVEN event name and data fields
      const name = 'customEvent';
      const dataFields = { category: 'user_action', value: 100 };

      // WHEN trackEvent is called
      IterableApi.trackEvent({ name, dataFields });

      // THEN RNIterableAPI.trackEvent is called with correct parameters
      expect(MockRNIterableAPI.trackEvent).toBeCalledWith(name, dataFields);
    });

    it('should call RNIterableAPI.trackEvent with name only', () => {
      // GIVEN event name only
      const name = 'simpleEvent';

      // WHEN trackEvent is called
      IterableApi.trackEvent({ name });

      // THEN RNIterableAPI.trackEvent is called with correct parameters
      expect(MockRNIterableAPI.trackEvent).toBeCalledWith(name, undefined);
    });
  });

  // ====================================================== //
  // ======================= AUTH ======================= //
  // ====================================================== //

  describe('pauseAuthRetries', () => {
    it('should call RNIterableAPI.pauseAuthRetries with true', () => {
      // GIVEN pauseRetry is true
      const pauseRetry = true;

      // WHEN pauseAuthRetries is called
      IterableApi.pauseAuthRetries(pauseRetry);

      // THEN RNIterableAPI.pauseAuthRetries is called with true
      expect(MockRNIterableAPI.pauseAuthRetries).toBeCalledWith(true);
    });

    it('should call RNIterableAPI.pauseAuthRetries with false', () => {
      // GIVEN pauseRetry is false
      const pauseRetry = false;

      // WHEN pauseAuthRetries is called
      IterableApi.pauseAuthRetries(pauseRetry);

      // THEN RNIterableAPI.pauseAuthRetries is called with false
      expect(MockRNIterableAPI.pauseAuthRetries).toBeCalledWith(false);
    });
  });

  describe('passAlongAuthToken', () => {
    it('should call RNIterableAPI.passAlongAuthToken with valid token', () => {
      // GIVEN a valid auth token
      const authToken = 'valid-jwt-token';

      // WHEN passAlongAuthToken is called
      IterableApi.passAlongAuthToken(authToken);

      // THEN RNIterableAPI.passAlongAuthToken is called with the token
      expect(MockRNIterableAPI.passAlongAuthToken).toBeCalledWith(authToken);
    });

    it('should call RNIterableAPI.passAlongAuthToken with null token', () => {
      // GIVEN a null auth token
      const authToken = null;

      // WHEN passAlongAuthToken is called
      IterableApi.passAlongAuthToken(authToken);

      // THEN RNIterableAPI.passAlongAuthToken is called with null
      expect(MockRNIterableAPI.passAlongAuthToken).toBeCalledWith(null);
    });

    it('should call RNIterableAPI.passAlongAuthToken with undefined token', () => {
      // GIVEN an undefined auth token
      const authToken = undefined;

      // WHEN passAlongAuthToken is called
      IterableApi.passAlongAuthToken(authToken);

      // THEN RNIterableAPI.passAlongAuthToken is called with undefined
      expect(MockRNIterableAPI.passAlongAuthToken).toBeCalledWith(undefined);
    });
  });

  // ====================================================== //
  // ======================= IN-APP ======================= //
  // ====================================================== //

  describe('inAppConsume', () => {
    it('should call RNIterableAPI.inAppConsume with message, location, and source', () => {
      // GIVEN an in-app message, location, and delete source
      const message = new IterableInAppMessage(
        'msg123',
        456,
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

      // WHEN inAppConsume is called
      IterableApi.inAppConsume(message, location, source);

      // THEN RNIterableAPI.inAppConsume is called with correct parameters
      expect(MockRNIterableAPI.inAppConsume).toBeCalledWith(
        message.messageId,
        location,
        source
      );
    });
  });

  describe('getInAppMessages', () => {
    it('should return in-app messages from RNIterableAPI', async () => {
      // GIVEN mock in-app messages
      const mockMessages = [
        new IterableInAppMessage(
          'msg1',
          123,
          new IterableInAppTrigger(IterableInAppTriggerType.immediate),
          new Date(),
          new Date(),
          false,
          undefined,
          undefined,
          false,
          0
        ),
        new IterableInAppMessage(
          'msg2',
          456,
          new IterableInAppTrigger(IterableInAppTriggerType.event),
          new Date(),
          new Date(),
          true,
          undefined,
          undefined,
          false,
          0
        ),
      ];
      MockRNIterableAPI.messages = mockMessages;

      // WHEN getInAppMessages is called
      const result = await IterableApi.getInAppMessages();

      // THEN the messages are returned
      expect(result).toBe(mockMessages);
    });
  });

  describe('getInboxMessages', () => {
    it('should return inbox messages from RNIterableAPI', async () => {
      // GIVEN mock inbox messages
      const mockMessages = [
        new IterableInAppMessage(
          'msg1',
          123,
          new IterableInAppTrigger(IterableInAppTriggerType.immediate),
          new Date(),
          new Date(),
          true, // saveToInbox
          undefined,
          undefined,
          false,
          0
        ),
      ];
      MockRNIterableAPI.messages = mockMessages;

      // WHEN getInboxMessages is called
      const result = await IterableApi.getInboxMessages();

      // THEN the messages are returned
      expect(result).toBe(mockMessages);
    });
  });

  describe('showMessage', () => {
    it('should call RNIterableAPI.showMessage with messageId and consume flag', async () => {
      // GIVEN a message ID and consume flag
      const messageId = 'msg123';
      const consume = true;
      const expectedUrl = 'https://example.com';
      MockRNIterableAPI.clickedUrl = expectedUrl;

      // WHEN showMessage is called
      const result = await IterableApi.showMessage(messageId, consume);

      // THEN RNIterableAPI.showMessage is called with correct parameters
      expect(MockRNIterableAPI.showMessage).toBeCalledWith(messageId, consume);
      expect(result).toBe(expectedUrl);
    });

    it('should call RNIterableAPI.showMessage with consume set to false', async () => {
      // GIVEN a message ID and consume flag set to false
      const messageId = 'msg123';
      const consume = false;

      // WHEN showMessage is called
      await IterableApi.showMessage(messageId, consume);

      // THEN RNIterableAPI.showMessage is called with consume set to false
      expect(MockRNIterableAPI.showMessage).toBeCalledWith(messageId, false);
    });
  });

  describe('removeMessage', () => {
    it('should call RNIterableAPI.removeMessage with messageId, location, and source', () => {
      // GIVEN a message ID, location, and source
      const messageId = 'msg123';
      const location = 1; // IterableInAppLocation.inApp
      const source = 2; // IterableInAppDeleteSource.deleteButton

      // WHEN removeMessage is called
      IterableApi.removeMessage(messageId, location, source);

      // THEN RNIterableAPI.removeMessage is called with correct parameters
      expect(MockRNIterableAPI.removeMessage).toBeCalledWith(
        messageId,
        location,
        source
      );
    });
  });

  describe('setReadForMessage', () => {
    it('should call RNIterableAPI.setReadForMessage with messageId and read status', () => {
      // GIVEN a message ID and read status
      const messageId = 'msg123';
      const read = true;

      // WHEN setReadForMessage is called
      IterableApi.setReadForMessage(messageId, read);

      // THEN RNIterableAPI.setReadForMessage is called with correct parameters
      expect(MockRNIterableAPI.setReadForMessage).toBeCalledWith(
        messageId,
        read
      );
    });

    it('should call RNIterableAPI.setReadForMessage with read set to false', () => {
      // GIVEN a message ID and read status set to false
      const messageId = 'msg123';
      const read = false;

      // WHEN setReadForMessage is called
      IterableApi.setReadForMessage(messageId, read);

      // THEN RNIterableAPI.setReadForMessage is called with read set to false
      expect(MockRNIterableAPI.setReadForMessage).toBeCalledWith(
        messageId,
        false
      );
    });
  });

  describe('setAutoDisplayPaused', () => {
    it('should call RNIterableAPI.setAutoDisplayPaused with true', () => {
      // GIVEN autoDisplayPaused is true
      const autoDisplayPaused = true;

      // WHEN setAutoDisplayPaused is called
      IterableApi.setAutoDisplayPaused(autoDisplayPaused);

      // THEN RNIterableAPI.setAutoDisplayPaused is called with true
      expect(MockRNIterableAPI.setAutoDisplayPaused).toBeCalledWith(true);
    });

    it('should call RNIterableAPI.setAutoDisplayPaused with false', () => {
      // GIVEN autoDisplayPaused is false
      const autoDisplayPaused = false;

      // WHEN setAutoDisplayPaused is called
      IterableApi.setAutoDisplayPaused(autoDisplayPaused);

      // THEN RNIterableAPI.setAutoDisplayPaused is called with false
      expect(MockRNIterableAPI.setAutoDisplayPaused).toBeCalledWith(false);
    });
  });

  describe('getHtmlInAppContentForMessage', () => {
    it('should call RNIterableAPI.getHtmlInAppContentForMessage with messageId', async () => {
      // GIVEN a message ID
      const messageId = 'msg123';
      const mockContent = { html: '<div>Test content</div>' };
      MockRNIterableAPI.getHtmlInAppContentForMessage = jest
        .fn()
        .mockResolvedValue(mockContent);

      // WHEN getHtmlInAppContentForMessage is called
      const result = await IterableApi.getHtmlInAppContentForMessage(messageId);

      // THEN RNIterableAPI.getHtmlInAppContentForMessage is called with messageId
      expect(MockRNIterableAPI.getHtmlInAppContentForMessage).toBeCalledWith(
        messageId
      );
      expect(result).toBe(mockContent);
    });
  });

  describe('setInAppShowResponse', () => {
    it('should call RNIterableAPI.setInAppShowResponse with response', () => {
      // GIVEN an in-app show response
      const response = IterableInAppShowResponse.show;

      // WHEN setInAppShowResponse is called
      IterableApi.setInAppShowResponse(response);

      // THEN RNIterableAPI.setInAppShowResponse is called with response
      expect(MockRNIterableAPI.setInAppShowResponse).toBeCalledWith(response);
    });
  });

  describe('startSession', () => {
    it('should call RNIterableAPI.startSession with visible rows', () => {
      // GIVEN visible rows
      const visibleRows: IterableInboxImpressionRowInfo[] = [
        { messageId: 'msg1', silentInbox: true },
        { messageId: 'msg2', silentInbox: false },
      ];

      // WHEN startSession is called
      IterableApi.startSession(visibleRows);

      // THEN RNIterableAPI.startSession is called with visible rows
      expect(MockRNIterableAPI.startSession).toBeCalledWith(visibleRows);
    });
  });

  describe('endSession', () => {
    it('should call RNIterableAPI.endSession', () => {
      // GIVEN no parameters
      // WHEN endSession is called
      IterableApi.endSession();

      // THEN RNIterableAPI.endSession is called
      expect(MockRNIterableAPI.endSession).toBeCalled();
    });
  });

  describe('updateVisibleRows', () => {
    it('should call RNIterableAPI.updateVisibleRows with visible rows', () => {
      // GIVEN visible rows
      const visibleRows: IterableInboxImpressionRowInfo[] = [
        { messageId: 'msg1', silentInbox: true },
      ];

      // WHEN updateVisibleRows is called
      IterableApi.updateVisibleRows(visibleRows);

      // THEN RNIterableAPI.updateVisibleRows is called with visible rows
      expect(MockRNIterableAPI.updateVisibleRows).toBeCalledWith(visibleRows);
    });

    it('should call RNIterableAPI.updateVisibleRows with empty array when no rows provided', () => {
      // GIVEN no visible rows
      // WHEN updateVisibleRows is called without parameters
      IterableApi.updateVisibleRows();

      // THEN RNIterableAPI.updateVisibleRows is called with empty array
      expect(MockRNIterableAPI.updateVisibleRows).toBeCalledWith([]);
    });
  });

  // ====================================================== //
  // ======================= MOSC ======================= //
  // ====================================================== //

  describe('updateCart', () => {
    it('should call RNIterableAPI.updateCart with items', () => {
      // GIVEN cart items
      const items = [
        new IterableCommerceItem('item1', 'Product 1', 25.99, 2),
        new IterableCommerceItem('item2', 'Product 2', 15.99, 1),
      ];

      // WHEN updateCart is called
      IterableApi.updateCart(items);

      // THEN RNIterableAPI.updateCart is called with items
      expect(MockRNIterableAPI.updateCart).toBeCalledWith(items);
    });
  });

  describe('wakeApp', () => {
    it('should call RNIterableAPI.wakeApp on Android', () => {
      // GIVEN Android platform
      const originalPlatform = Platform.OS;
      Object.defineProperty(Platform, 'OS', {
        value: 'android',
        writable: true,
      });

      // WHEN wakeApp is called
      IterableApi.wakeApp();

      // THEN RNIterableAPI.wakeApp is called
      expect(MockRNIterableAPI.wakeApp).toBeCalled();

      // Restore original platform
      Object.defineProperty(Platform, 'OS', {
        value: originalPlatform,
        writable: true,
      });
    });

    it('should not call RNIterableAPI.wakeApp on iOS', () => {
      // GIVEN iOS platform
      const originalPlatform = Platform.OS;
      Object.defineProperty(Platform, 'OS', {
        value: 'ios',
        writable: true,
      });

      // WHEN wakeApp is called
      IterableApi.wakeApp();

      // THEN RNIterableAPI.wakeApp is not called
      expect(MockRNIterableAPI.wakeApp).not.toBeCalled();

      // Restore original platform
      Object.defineProperty(Platform, 'OS', {
        value: originalPlatform,
        writable: true,
      });
    });
  });

  describe('handleAppLink', () => {
    it('should call RNIterableAPI.handleAppLink with link', () => {
      // GIVEN a link
      const link = 'https://example.com/deep-link';

      // WHEN handleAppLink is called
      IterableApi.handleAppLink(link);

      // THEN RNIterableAPI.handleAppLink is called with link
      expect(MockRNIterableAPI.handleAppLink).toBeCalledWith(link);
    });
  });

  describe('updateSubscriptions', () => {
    it('should call RNIterableAPI.updateSubscriptions with all parameters', () => {
      // GIVEN subscription parameters
      const params = {
        emailListIds: [1, 2, 3],
        unsubscribedChannelIds: [4, 5],
        unsubscribedMessageTypeIds: [6, 7, 8],
        subscribedMessageTypeIds: [9, 10],
        campaignId: 11,
        templateId: 12,
      };

      // WHEN updateSubscriptions is called
      IterableApi.updateSubscriptions(params);

      // THEN RNIterableAPI.updateSubscriptions is called with correct parameters
      expect(MockRNIterableAPI.updateSubscriptions).toBeCalledWith(
        params.emailListIds,
        params.unsubscribedChannelIds,
        params.unsubscribedMessageTypeIds,
        params.subscribedMessageTypeIds,
        params.campaignId,
        params.templateId
      );
    });

    it('should call RNIterableAPI.updateSubscriptions with null arrays', () => {
      // GIVEN subscription parameters with null arrays
      const params = {
        emailListIds: null,
        unsubscribedChannelIds: null,
        unsubscribedMessageTypeIds: null,
        subscribedMessageTypeIds: null,
        campaignId: 11,
        templateId: 12,
      };

      // WHEN updateSubscriptions is called
      IterableApi.updateSubscriptions(params);

      // THEN RNIterableAPI.updateSubscriptions is called with null arrays
      expect(MockRNIterableAPI.updateSubscriptions).toBeCalledWith(
        null,
        null,
        null,
        null,
        params.campaignId,
        params.templateId
      );
    });
  });

  describe('getLastPushPayload', () => {
    it('should return the last push payload from RNIterableAPI', async () => {
      // GIVEN a mock push payload
      const mockPayload = {
        campaignId: 123,
        templateId: 456,
        messageId: 'msg123',
        customData: { key: 'value' },
      };
      MockRNIterableAPI.lastPushPayload = mockPayload;

      // WHEN getLastPushPayload is called
      const result = await IterableApi.getLastPushPayload();

      // THEN the push payload is returned
      expect(result).toBe(mockPayload);
    });
  });

  describe('getAttributionInfo', () => {
    it('should return IterableAttributionInfo when attribution info exists', async () => {
      // GIVEN mock attribution info
      const mockAttributionDict = {
        campaignId: 123,
        templateId: 456,
        messageId: 'msg123',
      };
      MockRNIterableAPI.getAttributionInfo = jest
        .fn()
        .mockResolvedValue(mockAttributionDict);

      // WHEN getAttributionInfo is called
      const result = await IterableApi.getAttributionInfo();

      // THEN IterableAttributionInfo is returned
      expect(result).toBeInstanceOf(IterableAttributionInfo);
      expect(result?.campaignId).toBe(123);
      expect(result?.templateId).toBe(456);
      expect(result?.messageId).toBe('msg123');
    });

    it('should return undefined when attribution info is null', async () => {
      // GIVEN null attribution info
      MockRNIterableAPI.getAttributionInfo = jest.fn().mockResolvedValue(null);

      // WHEN getAttributionInfo is called
      const result = await IterableApi.getAttributionInfo();

      // THEN undefined is returned
      expect(result).toBeUndefined();
    });
  });

  describe('setAttributionInfo', () => {
    it('should call RNIterableAPI.setAttributionInfo with attribution info', () => {
      // GIVEN attribution info
      const attributionInfo = new IterableAttributionInfo(123, 456, 'msg123');

      // WHEN setAttributionInfo is called
      IterableApi.setAttributionInfo(attributionInfo);

      // THEN RNIterableAPI.setAttributionInfo is called with attribution info
      expect(MockRNIterableAPI.setAttributionInfo).toBeCalledWith(
        attributionInfo
      );
    });

    it('should call RNIterableAPI.setAttributionInfo with undefined', () => {
      // GIVEN undefined attribution info
      const attributionInfo = undefined;

      // WHEN setAttributionInfo is called
      IterableApi.setAttributionInfo(attributionInfo);

      // THEN RNIterableAPI.setAttributionInfo is called with undefined
      expect(MockRNIterableAPI.setAttributionInfo).toBeCalledWith(undefined);
    });
  });
});
