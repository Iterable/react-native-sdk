import { IterableLogLevel } from './IterableLogLevel';

describe('IterableLogLevel', () => {
  it('contains the expected members', () => {
    expect(IterableLogLevel.error).toBe(3);
    expect(IterableLogLevel.debug).toBe(1);
    expect(IterableLogLevel.info).toBe(2);
  });
});