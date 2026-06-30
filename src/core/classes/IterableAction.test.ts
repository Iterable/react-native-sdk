import { IterableAction } from './IterableAction';

describe('IterableAction', () => {
  describe('constructor', () => {
    it('creates an instance with type only', () => {
      const action = new IterableAction('openUrl');
      expect(action.type).toBe('openUrl');
      expect(action.data).toBeUndefined();
      expect(action.userInput).toBeUndefined();
    });

    it('creates an instance with type, data, and userInput', () => {
      const action = new IterableAction('openUrl', 'https://example.com', 'tap');
      expect(action.type).toBe('openUrl');
      expect(action.data).toBe('https://example.com');
      expect(action.userInput).toBe('tap');
    });
  });

  describe('fromDict', () => {
    it('copies all fields when present', () => {
      const dict = new IterableAction('openUrl', 'https://example.com', 'tap');
      const action = IterableAction.fromDict(dict);
      expect(action.type).toBe('openUrl');
      expect(action.data).toBe('https://example.com');
      expect(action.userInput).toBe('tap');
    });

    it('handles missing data and userInput', () => {
      // Simulate a payload where only type is defined — data and userInput are absent.
      const dict = {
        type: 'openUrl',
      } as IterableAction;

      const action = IterableAction.fromDict(dict);

      expect(action.type).toBe('openUrl');
      expect(action.data).toBeUndefined();
      expect(action.userInput).toBeUndefined();
    });

    it('handles only data missing', () => {
      const dict = {
        type: 'openUrl',
        userInput: 'tap',
      } as IterableAction;

      const action = IterableAction.fromDict(dict);

      expect(action.type).toBe('openUrl');
      expect(action.data).toBeUndefined();
      expect(action.userInput).toBe('tap');
    });

    it('handles only userInput missing', () => {
      const dict = {
        type: 'openUrl',
        data: 'https://example.com',
      } as IterableAction;

      const action = IterableAction.fromDict(dict);

      expect(action.type).toBe('openUrl');
      expect(action.data).toBe('https://example.com');
      expect(action.userInput).toBeUndefined();
    });
  });
});