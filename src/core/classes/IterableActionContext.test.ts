import { IterableAction } from './IterableAction';
import { IterableActionContext } from './IterableActionContext';
import { IterableActionSource } from '../enums/IterableActionSource';

describe('IterableActionContext', () => {
  describe('constructor', () => {
    it('creates an instance with action and source', () => {
      const action = new IterableAction('openUrl', 'https://example.com');
      const context = new IterableActionContext(action, IterableActionSource.push);

      expect(context.action).toBe(action);
      expect(context.source).toBe(IterableActionSource.push);
    });
  });

  describe('fromDict', () => {
    it('creates a full instance from a complete dict', () => {
      const dict = new IterableActionContext(
        new IterableAction('openUrl', 'https://example.com', 'tap'),
        IterableActionSource.inApp
      );

      const context = IterableActionContext.fromDict(dict);

      expect(context.source).toBe(IterableActionSource.inApp);
      expect(context.action.type).toBe('openUrl');
      expect(context.action.data).toBe('https://example.com');
      expect(context.action.userInput).toBe('tap');
    });

    it('handles a partial action dict with only type', () => {
      // Simulate a payload where the nested action only has `type` defined.
      const dict = {
        action: { type: 'openUrl' } as IterableAction,
        source: IterableActionSource.appLink,
      } as IterableActionContext;

      const context = IterableActionContext.fromDict(dict);

      expect(context.source).toBe(IterableActionSource.appLink);
      expect(context.action.type).toBe('openUrl');
      expect(context.action.data).toBeUndefined();
      expect(context.action.userInput).toBeUndefined();
    });

    it('handles a partial action dict with type and data only', () => {
      const dict = {
        action: { type: 'openUrl', data: 'https://example.com' } as IterableAction,
        source: IterableActionSource.embedded,
      } as IterableActionContext;

      const context = IterableActionContext.fromDict(dict);

      expect(context.source).toBe(IterableActionSource.embedded);
      expect(context.action.type).toBe('openUrl');
      expect(context.action.data).toBe('https://example.com');
      expect(context.action.userInput).toBeUndefined();
    });
  });
});