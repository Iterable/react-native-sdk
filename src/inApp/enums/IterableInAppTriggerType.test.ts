import { IterableInAppTriggerType } from './IterableInAppTriggerType';

describe('IterableInAppTriggerType', () => {
  it('contains the expected members', () => {
    expect(IterableInAppTriggerType.immediate).toBe(0);
    expect(IterableInAppTriggerType.event).toBe(1);
    expect(IterableInAppTriggerType.never).toBe(2);
  });
});