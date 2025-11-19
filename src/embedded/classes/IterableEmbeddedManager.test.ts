import { MockRNIterableAPI } from '../../__mocks__/MockRNIterableAPI';
import { IterableEmbeddedManager } from './IterableEmbeddedManager';

// Mock the RNIterableAPI module
jest.mock('../../api', () => ({
  __esModule: true,
  default: MockRNIterableAPI,
}));

describe('IterableEmbeddedManager', () => {
  let embeddedManager: IterableEmbeddedManager;

  beforeEach(() => {
    embeddedManager = new IterableEmbeddedManager();
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

});

