import { IterableRetryBackoff } from './IterableRetryBackoff';

describe('IterableRetryBackoff', () => {
  it('contains the expected members', () => {
    expect(IterableRetryBackoff.linear).toBe('LINEAR');
    expect(IterableRetryBackoff.exponential).toBe('EXPONENTIAL');
  });
});