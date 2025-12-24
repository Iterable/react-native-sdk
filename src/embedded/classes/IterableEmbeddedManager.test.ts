import { MockRNIterableAPI } from '../../__mocks__/MockRNIterableAPI';
import { IterableAction } from '../../core/classes/IterableAction';
import { IterableConfig } from '../../core/classes/IterableConfig';
import { IterableLogger } from '../../core/classes/IterableLogger';
import type { IterableEmbeddedMessage } from '../types/IterableEmbeddedMessage';
import { IterableEmbeddedManager } from './IterableEmbeddedManager';

// Mock the RNIterableAPI module
jest.mock('../../api', () => ({
  __esModule: true,
  default: MockRNIterableAPI,
}));

// Mock the callUrlHandler utility
jest.mock('../../core/utils/callUrlHandler', () => ({
  callUrlHandler: jest.fn(),
}));

// Mock the IterableLogger
jest.mock('../../core/classes/IterableLogger', () => ({
  IterableLogger: {
    log: jest.fn(),
  },
}));

describe('IterableEmbeddedManager', () => {
  let embeddedManager: IterableEmbeddedManager;
  let config: IterableConfig;

  // Mock embedded message for testing
  const mockEmbeddedMessage: IterableEmbeddedMessage = {
    metadata: {
      messageId: 'test-message-id',
      campaignId: 12345,
      placementId: 1,
    },
    elements: {
      title: 'Test Message',
      body: 'Test body',
    },
    payload: { customKey: 'customValue' },
  };

  beforeEach(() => {
    config = new IterableConfig();
    embeddedManager = new IterableEmbeddedManager(config);
    jest.clearAllMocks();
  });

  describe('isEnabled', () => {
    it('should be false by default', () => {
      expect(embeddedManager.isEnabled).toBe(false);
    });

    it('should return true after being enabled', () => {
      embeddedManager.setEnabled(true);
      expect(embeddedManager.isEnabled).toBe(true);
    });

    it('should return false after being disabled', () => {
      embeddedManager.setEnabled(false);
      expect(embeddedManager.isEnabled).toBe(false);
    });
  });

  describe('setEnabled', () => {
    it('should enable the embedded manager', () => {
      embeddedManager.setEnabled(true);
      expect(embeddedManager.isEnabled).toBe(true);
    });

    it('should disable the embedded manager', () => {
      embeddedManager.setEnabled(false);
      expect(embeddedManager.isEnabled).toBe(false);
    });

    it('should toggle enabled state multiple times', () => {
      embeddedManager.setEnabled(true);
      expect(embeddedManager.isEnabled).toBe(true);

      embeddedManager.setEnabled(false);
      expect(embeddedManager.isEnabled).toBe(false);

      embeddedManager.setEnabled(true);
      expect(embeddedManager.isEnabled).toBe(true);
    });

    it('should handle setting the same state multiple times', () => {
      embeddedManager.setEnabled(true);
      embeddedManager.setEnabled(true);
      expect(embeddedManager.isEnabled).toBe(true);

      embeddedManager.setEnabled(false);
      embeddedManager.setEnabled(false);
      expect(embeddedManager.isEnabled).toBe(false);
    });
  });

  describe('syncMessages', () => {
    it('should call IterableApi.syncEmbeddedMessages', async () => {
      // WHEN syncMessages is called
      const result = await embeddedManager.syncMessages();

      // THEN IterableApi.syncEmbeddedMessages is called
      expect(MockRNIterableAPI.syncEmbeddedMessages).toHaveBeenCalledTimes(1);

      // AND the result is returned
      expect(result).toBeUndefined();
    });
  });

  describe('getPlacementIds', () => {
    it('should call IterableApi.getEmbeddedPlacementIds', async () => {
      // WHEN getPlacementIds is called
      const result = await embeddedManager.getPlacementIds();

      // THEN IterableApi.getEmbeddedPlacementIds is called
      expect(MockRNIterableAPI.getEmbeddedPlacementIds).toHaveBeenCalledTimes(
        1
      );

      // AND the result is returned
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('getMessages', () => {
    it('should call IterableApi.getEmbeddedMessages with placement IDs', async () => {
      // GIVEN placement IDs
      const placementIds = [1, 2];

      // WHEN getMessages is called
      const result = await embeddedManager.getMessages(placementIds);

      // THEN IterableApi.getEmbeddedMessages is called with placement IDs
      expect(MockRNIterableAPI.getEmbeddedMessages).toHaveBeenCalledTimes(1);
      expect(MockRNIterableAPI.getEmbeddedMessages).toHaveBeenCalledWith(
        placementIds
      );

      // AND the result contains embedded messages
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        metadata: {
          messageId: 'msg-1',
          campaignId: 123,
          placementId: 1,
        },
        elements: {
          title: 'Test Message 1',
          body: 'Test body 1',
        },
        payload: { customKey: 'customValue' },
      });
      expect(result[1]).toEqual({
        metadata: {
          messageId: 'msg-2',
          campaignId: 456,
          placementId: 2,
        },
        elements: {
          title: 'Test Message 2',
          body: 'Test body 2',
        },
        payload: null,
      });
    });

    it('should call IterableApi.getEmbeddedMessages with null placement IDs', async () => {
      // WHEN getMessages is called with null
      const result = await embeddedManager.getMessages(null);

      // THEN IterableApi.getEmbeddedMessages is called with null
      expect(MockRNIterableAPI.getEmbeddedMessages).toHaveBeenCalledTimes(1);
      expect(MockRNIterableAPI.getEmbeddedMessages).toHaveBeenCalledWith(null);

      // AND the result is returned
      expect(result).toBeDefined();
    });
  });

  describe('startSession', () => {
    it('should call IterableApi.startEmbeddedSession', () => {
      // WHEN startSession is called
      embeddedManager.startSession();

      // THEN IterableApi.startEmbeddedSession is called
      expect(MockRNIterableAPI.startEmbeddedSession).toHaveBeenCalledTimes(1);
    });
  });

  describe('endSession', () => {
    it('should call IterableApi.endEmbeddedSession', () => {
      // WHEN endSession is called
      embeddedManager.endSession();

      // THEN IterableApi.endEmbeddedSession is called
      expect(MockRNIterableAPI.endEmbeddedSession).toHaveBeenCalledTimes(1);
    });
  });

  describe('startImpression', () => {
    it('should call IterableApi.startEmbeddedImpression with messageId and placementId', () => {
      // GIVEN a message ID and placement ID
      const messageId = 'message-123';
      const placementId = 456;

      // WHEN startImpression is called
      embeddedManager.startImpression(messageId, placementId);

      // THEN IterableApi.startEmbeddedImpression is called with the correct parameters
      expect(MockRNIterableAPI.startEmbeddedImpression).toHaveBeenCalledTimes(
        1
      );
      expect(MockRNIterableAPI.startEmbeddedImpression).toHaveBeenCalledWith(
        messageId,
        placementId
      );
    });

    it('should handle multiple impression starts', () => {
      // GIVEN multiple messages
      const messageId1 = 'message-1';
      const placementId1 = 100;
      const messageId2 = 'message-2';
      const placementId2 = 200;

      // WHEN startImpression is called multiple times
      embeddedManager.startImpression(messageId1, placementId1);
      embeddedManager.startImpression(messageId2, placementId2);

      // THEN IterableApi.startEmbeddedImpression is called twice
      expect(MockRNIterableAPI.startEmbeddedImpression).toHaveBeenCalledTimes(
        2
      );
      expect(MockRNIterableAPI.startEmbeddedImpression).toHaveBeenNthCalledWith(
        1,
        messageId1,
        placementId1
      );
      expect(MockRNIterableAPI.startEmbeddedImpression).toHaveBeenNthCalledWith(
        2,
        messageId2,
        placementId2
      );
    });
  });

  describe('pauseImpression', () => {
    it('should call IterableApi.pauseEmbeddedImpression with messageId', () => {
      // GIVEN a message ID
      const messageId = 'message-123';

      // WHEN pauseImpression is called
      embeddedManager.pauseImpression(messageId);

      // THEN IterableApi.pauseEmbeddedImpression is called with the correct parameter
      expect(MockRNIterableAPI.pauseEmbeddedImpression).toHaveBeenCalledTimes(
        1
      );
      expect(MockRNIterableAPI.pauseEmbeddedImpression).toHaveBeenCalledWith(
        messageId
      );
    });

    it('should handle multiple impression pauses', () => {
      // GIVEN multiple message IDs
      const messageId1 = 'message-1';
      const messageId2 = 'message-2';

      // WHEN pauseImpression is called multiple times
      embeddedManager.pauseImpression(messageId1);
      embeddedManager.pauseImpression(messageId2);

      // THEN IterableApi.pauseEmbeddedImpression is called twice
      expect(MockRNIterableAPI.pauseEmbeddedImpression).toHaveBeenCalledTimes(
        2
      );
      expect(MockRNIterableAPI.pauseEmbeddedImpression).toHaveBeenNthCalledWith(
        1,
        messageId1
      );
      expect(MockRNIterableAPI.pauseEmbeddedImpression).toHaveBeenNthCalledWith(
        2,
        messageId2
      );
    });
  });

  describe('trackClick', () => {
    it('should call IterableApi.trackEmbeddedClick with message, buttonId and clickedUrl', () => {
      // GIVEN a message, button ID and clicked URL
      const buttonId = 'button-1';
      const clickedUrl = 'https://example.com';

      // WHEN trackClick is called
      embeddedManager.trackClick(mockEmbeddedMessage, buttonId, clickedUrl);

      // THEN IterableApi.trackEmbeddedClick is called with the correct parameters
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledTimes(1);
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledWith(
        mockEmbeddedMessage,
        buttonId,
        clickedUrl
      );
    });

    it('should handle null buttonId', () => {
      // GIVEN a message with null buttonId
      const buttonId = null;
      const clickedUrl = 'https://example.com';

      // WHEN trackClick is called
      embeddedManager.trackClick(mockEmbeddedMessage, buttonId, clickedUrl);

      // THEN IterableApi.trackEmbeddedClick is called with null buttonId
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledTimes(1);
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledWith(
        mockEmbeddedMessage,
        null,
        clickedUrl
      );
    });

    it('should handle null clickedUrl', () => {
      // GIVEN a message with null clickedUrl
      const buttonId = 'button-1';
      const clickedUrl = null;

      // WHEN trackClick is called
      embeddedManager.trackClick(mockEmbeddedMessage, buttonId, clickedUrl);

      // THEN IterableApi.trackEmbeddedClick is called with null clickedUrl
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledTimes(1);
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledWith(
        mockEmbeddedMessage,
        buttonId,
        null
      );
    });

    it('should handle multiple trackClick calls', () => {
      // GIVEN multiple click events
      const buttonId1 = 'button-1';
      const clickedUrl1 = 'https://example.com/1';
      const buttonId2 = 'button-2';
      const clickedUrl2 = 'https://example.com/2';

      // WHEN trackClick is called multiple times
      embeddedManager.trackClick(mockEmbeddedMessage, buttonId1, clickedUrl1);
      embeddedManager.trackClick(mockEmbeddedMessage, buttonId2, clickedUrl2);

      // THEN IterableApi.trackEmbeddedClick is called twice
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledTimes(2);
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenNthCalledWith(
        1,
        mockEmbeddedMessage,
        buttonId1,
        clickedUrl1
      );
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenNthCalledWith(
        2,
        mockEmbeddedMessage,
        buttonId2,
        clickedUrl2
      );
    });
  });

  describe('handleClick', () => {
    // Import the mocked callUrlHandler
    const { callUrlHandler } = require('../../core/utils/callUrlHandler');

    beforeEach(() => {
      // Add trackEmbeddedClick mock if not already present
      MockRNIterableAPI.trackEmbeddedClick = jest.fn();
    });

    it('should return early and log when no clickedUrl is provided', () => {
      // GIVEN no action is provided
      const buttonId = 'button-1';

      // WHEN handleClick is called without an action
      embeddedManager.handleClick(mockEmbeddedMessage, buttonId, null);

      // THEN it should log the error
      expect(IterableLogger.log).toHaveBeenCalledWith(
        'Iterable.embeddedManager.handleClick:',
        'A url or action is required to handle an embedded click',
        undefined
      );

      // AND trackClick should not be called
      expect(MockRNIterableAPI.trackEmbeddedClick).not.toHaveBeenCalled();
    });

    it('should return early and log when action has empty data and empty type', () => {
      // GIVEN an action with empty data and type
      const buttonId = 'button-1';
      const action = new IterableAction('', '', '');

      // WHEN handleClick is called
      embeddedManager.handleClick(mockEmbeddedMessage, buttonId, action);

      // THEN it should log the error (with empty string since that's what we get from action)
      expect(IterableLogger.log).toHaveBeenCalledWith(
        'Iterable.embeddedManager.handleClick:',
        'A url or action is required to handle an embedded click',
        ''
      );

      // AND trackClick should not be called
      expect(MockRNIterableAPI.trackEmbeddedClick).not.toHaveBeenCalled();
    });

    it('should handle action:// prefix and call customActionHandler', () => {
      // GIVEN an action with action:// prefix and a custom action handler
      const buttonId = 'button-1';
      const action = new IterableAction('', 'action://myAction', '');
      const customActionHandler = jest.fn();
      config.customActionHandler = customActionHandler;

      // WHEN handleClick is called
      embeddedManager.handleClick(mockEmbeddedMessage, buttonId, action);

      // THEN it should log the click
      expect(IterableLogger.log).toHaveBeenCalledWith(
        'Iterable.embeddedManager.handleClick',
        mockEmbeddedMessage,
        buttonId,
        'action://myAction'
      );

      // AND trackClick should be called
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledWith(
        mockEmbeddedMessage,
        buttonId,
        'action://myAction'
      );

      // AND customActionHandler should be called with the correct action
      expect(customActionHandler).toHaveBeenCalledTimes(1);
      const calledAction = customActionHandler.mock.calls[0][0];
      const calledContext = customActionHandler.mock.calls[0][1];
      expect(calledAction.type).toBe('myAction');
      expect(calledContext.source).toBe(3); // IterableActionSource.embedded
    });

    it('should handle itbl:// prefix and call customActionHandler', () => {
      // GIVEN an action with itbl:// prefix and a custom action handler
      const buttonId = 'button-1';
      const action = new IterableAction('', 'itbl://legacyAction', '');
      const customActionHandler = jest.fn();
      config.customActionHandler = customActionHandler;

      // WHEN handleClick is called
      embeddedManager.handleClick(mockEmbeddedMessage, buttonId, action);

      // THEN it should log the click
      expect(IterableLogger.log).toHaveBeenCalledWith(
        'Iterable.embeddedManager.handleClick',
        mockEmbeddedMessage,
        buttonId,
        'itbl://legacyAction'
      );

      // AND trackClick should be called
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledWith(
        mockEmbeddedMessage,
        buttonId,
        'itbl://legacyAction'
      );

      // AND customActionHandler should be called
      expect(customActionHandler).toHaveBeenCalledTimes(1);
      const calledAction = customActionHandler.mock.calls[0][0];
      expect(calledAction.type).toBe('legacyAction');
    });

    it('should not call customActionHandler if action prefix exists but handler is not configured', () => {
      // GIVEN an action with action:// prefix but no custom action handler
      const buttonId = 'button-1';
      const action = new IterableAction('', 'action://myAction', '');

      // WHEN handleClick is called
      embeddedManager.handleClick(mockEmbeddedMessage, buttonId, action);

      // THEN trackClick should be called
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledWith(
        mockEmbeddedMessage,
        buttonId,
        'action://myAction'
      );

      // AND customActionHandler should not error (it's undefined)
      // Just verify trackClick was called
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledTimes(1);
    });

    it('should handle regular URL and call urlHandler', () => {
      // GIVEN a regular URL action and a URL handler
      const buttonId = 'button-1';
      const action = new IterableAction('', 'https://example.com', '');
      const urlHandler = jest.fn().mockReturnValue(true);
      config.urlHandler = urlHandler;

      // WHEN handleClick is called
      embeddedManager.handleClick(mockEmbeddedMessage, buttonId, action);

      // THEN it should log the click
      expect(IterableLogger.log).toHaveBeenCalledWith(
        'Iterable.embeddedManager.handleClick',
        mockEmbeddedMessage,
        buttonId,
        'https://example.com'
      );

      // AND trackClick should be called
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledWith(
        mockEmbeddedMessage,
        buttonId,
        'https://example.com'
      );

      // AND callUrlHandler should be called
      expect(callUrlHandler).toHaveBeenCalledTimes(1);
      expect(callUrlHandler).toHaveBeenCalledWith(
        config,
        'https://example.com',
        expect.objectContaining({
          action: expect.objectContaining({
            type: 'openUrl',
            data: 'https://example.com',
          }),
          source: 3, // IterableActionSource.embedded
        })
      );
    });

    it('should handle regular URL without urlHandler configured', () => {
      // GIVEN a regular URL action without a URL handler
      const buttonId = 'button-1';
      const action = new IterableAction('', 'https://example.com', '');

      // WHEN handleClick is called
      embeddedManager.handleClick(mockEmbeddedMessage, buttonId, action);

      // THEN trackClick should be called
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledWith(
        mockEmbeddedMessage,
        buttonId,
        'https://example.com'
      );

      // AND callUrlHandler should be called
      expect(callUrlHandler).toHaveBeenCalledTimes(1);
    });

    it('should prefer action.data over action.type when data is available', () => {
      // GIVEN an action with both data and type
      const buttonId = 'button-1';
      const action = new IterableAction('someType', 'https://example.com', '');

      // WHEN handleClick is called
      embeddedManager.handleClick(mockEmbeddedMessage, buttonId, action);

      // THEN it should use data as clickedUrl
      expect(IterableLogger.log).toHaveBeenCalledWith(
        'Iterable.embeddedManager.handleClick',
        mockEmbeddedMessage,
        buttonId,
        'https://example.com'
      );

      // AND trackClick should be called with the data
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledWith(
        mockEmbeddedMessage,
        buttonId,
        'https://example.com'
      );
    });

    it('should use action.type when data is empty', () => {
      // GIVEN an action with empty data but valid type
      const buttonId = 'button-1';
      const action = new IterableAction('https://example.com', '', '');

      // WHEN handleClick is called
      embeddedManager.handleClick(mockEmbeddedMessage, buttonId, action);

      // THEN it should use type as clickedUrl
      expect(IterableLogger.log).toHaveBeenCalledWith(
        'Iterable.embeddedManager.handleClick',
        mockEmbeddedMessage,
        buttonId,
        'https://example.com'
      );

      // AND trackClick should be called with the type
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledWith(
        mockEmbeddedMessage,
        buttonId,
        'https://example.com'
      );
    });

    it('should handle null buttonId', () => {
      // GIVEN an action with null buttonId
      const buttonId = null;
      const action = new IterableAction('', 'https://example.com', '');

      // WHEN handleClick is called
      embeddedManager.handleClick(mockEmbeddedMessage, buttonId, action);

      // THEN trackClick should be called with null buttonId
      expect(MockRNIterableAPI.trackEmbeddedClick).toHaveBeenCalledWith(
        mockEmbeddedMessage,
        null,
        'https://example.com'
      );
    });

    it('should handle action with undefined action parameter', () => {
      // GIVEN no action parameter
      const buttonId = 'button-1';

      // WHEN handleClick is called with undefined action
      embeddedManager.handleClick(mockEmbeddedMessage, buttonId, undefined);

      // THEN it should log the error and not track
      expect(IterableLogger.log).toHaveBeenCalledWith(
        'Iterable.embeddedManager.handleClick:',
        'A url or action is required to handle an embedded click',
        undefined
      );
      expect(MockRNIterableAPI.trackEmbeddedClick).not.toHaveBeenCalled();
    });
  });

  describe('constructor', () => {
    it('should initialize with embedded messaging enabled when config flag is true', () => {
      // GIVEN a config with embedded messaging enabled
      const configWithEnabled = new IterableConfig();
      configWithEnabled.enableEmbeddedMessaging = true;

      // WHEN creating a new embedded manager
      const manager = new IterableEmbeddedManager(configWithEnabled);

      // THEN isEnabled should be true
      expect(manager.isEnabled).toBe(true);
    });

    it('should initialize with embedded messaging disabled when config flag is false', () => {
      // GIVEN a config with embedded messaging disabled
      const configWithDisabled = new IterableConfig();
      configWithDisabled.enableEmbeddedMessaging = false;

      // WHEN creating a new embedded manager
      const manager = new IterableEmbeddedManager(configWithDisabled);

      // THEN isEnabled should be false
      expect(manager.isEnabled).toBe(false);
    });

    it('should initialize with embedded messaging disabled when config flag is undefined', () => {
      // GIVEN a config without the flag set
      const configWithUndefined = new IterableConfig();

      // WHEN creating a new embedded manager
      const manager = new IterableEmbeddedManager(configWithUndefined);

      // THEN isEnabled should be false (default)
      expect(manager.isEnabled).toBe(false);
    });
  });
});

