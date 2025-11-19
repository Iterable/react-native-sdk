import { IterableEmbeddedManager } from './IterableEmbeddedManager';

describe('IterableEmbeddedManager', () => {
  let embeddedManager: IterableEmbeddedManager;

  beforeEach(() => {
    embeddedManager = new IterableEmbeddedManager();
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
});

