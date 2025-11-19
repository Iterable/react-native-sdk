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

