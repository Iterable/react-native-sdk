import { MockRNIterableAPI } from '../../__mocks__/MockRNIterableAPI';
import { IterableConfig } from '../../core/classes/IterableConfig';
import { IterableEmbeddedManager } from './IterableEmbeddedManager';

// Mock the RNIterableAPI module
jest.mock('../../api', () => ({
  __esModule: true,
  default: MockRNIterableAPI,
}));

describe('IterableEmbeddedManager', () => {
  let embeddedManager: IterableEmbeddedManager;

  beforeEach(() => {
    embeddedManager = new IterableEmbeddedManager(new IterableConfig());
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
});

