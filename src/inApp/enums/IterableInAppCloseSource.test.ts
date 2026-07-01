import { IterableInAppCloseSource } from './IterableInAppCloseSource';

describe('IterableInAppCloseSource', () => {
  it('contains the expected members', () => {
    expect(IterableInAppCloseSource.back).toBe(0);
    expect(IterableInAppCloseSource.link).toBe(1);
    expect(IterableInAppCloseSource.unknown).toBe(100);
  });
});