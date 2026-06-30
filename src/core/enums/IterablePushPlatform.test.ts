import { IterablePushPlatform } from './IterablePushPlatform';

describe('IterablePushPlatform', () => {
  it('contains the expected members', () => {
    expect(IterablePushPlatform.sandbox).toBe(0);
    expect(IterablePushPlatform.production).toBe(1);
    expect(IterablePushPlatform.auto).toBe(2);
  });
});