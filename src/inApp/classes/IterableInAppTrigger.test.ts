import { IterableInAppTrigger } from './IterableInAppTrigger';
import { IterableInAppTriggerType } from '../enums/IterableInAppTriggerType';

describe('IterableInAppTrigger', () => {
  describe('constructor', () => {
    it('creates an instance with the given type', () => {
      const trigger = new IterableInAppTrigger(IterableInAppTriggerType.immediate);
      expect(trigger.type).toBe(IterableInAppTriggerType.immediate);
    });
  });

  describe('fromDict', () => {
    it('creates an instance from a dict with the default trigger type (immediate)', () => {
      const trigger = IterableInAppTrigger.fromDict({
        type: IterableInAppTriggerType.immediate,
      });

      expect(trigger.type).toBe(IterableInAppTriggerType.immediate);
    });

    it('creates an instance from a dict with the event trigger type', () => {
      const trigger = IterableInAppTrigger.fromDict({
        type: IterableInAppTriggerType.event,
      });

      expect(trigger.type).toBe(IterableInAppTriggerType.event);
    });

    it('creates an instance from a dict with the never trigger type', () => {
      const trigger = IterableInAppTrigger.fromDict({
        type: IterableInAppTriggerType.never,
      });

      expect(trigger.type).toBe(IterableInAppTriggerType.never);
    });

    it('preserves an unknown trigger type value', () => {
      // The SDK forwards unknown trigger types unchanged; this covers the
      // "unknown trigger type" branch where the value is not one of the
      // declared enum members.
      const unknownType = 999 as IterableInAppTriggerType;
      const trigger = IterableInAppTrigger.fromDict({ type: unknownType });

      expect(trigger.type).toBe(unknownType);
    });
  });
});