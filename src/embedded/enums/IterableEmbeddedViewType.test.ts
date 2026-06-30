import { IterableEmbeddedViewType } from './IterableEmbeddedViewType';

describe('IterableEmbeddedViewType', () => {
  it('contains the expected members', () => {
    expect(IterableEmbeddedViewType.Banner).toBe(0);
    expect(IterableEmbeddedViewType.Card).toBe(1);
    expect(IterableEmbeddedViewType.Notification).toBe(2);
  });
});