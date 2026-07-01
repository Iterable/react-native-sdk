import { IterableInAppLocation } from './IterableInAppLocation';

describe('IterableInAppLocation', () => {
  it('contains the expected members', () => {
    expect(IterableInAppLocation.inApp).toBe(0);
    expect(IterableInAppLocation.inbox).toBe(1);
  });
});