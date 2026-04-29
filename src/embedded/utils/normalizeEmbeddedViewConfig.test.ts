import { normalizeEmbeddedViewConfig } from './normalizeEmbeddedViewConfig';

describe('normalizeEmbeddedViewConfig', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('returns null or undefined unchanged', () => {
    expect(normalizeEmbeddedViewConfig(null)).toBeNull();
    expect(normalizeEmbeddedViewConfig(undefined)).toBeUndefined();
  });

  it('parses numeric strings for borderWidth and borderCornerRadius', () => {
    const input = {
      borderWidth: '45',
      borderCornerRadius: '12.5',
      backgroundColor: '#fff',
    };

    // Runtime JSON / native payloads may use strings for numeric fields.
    const result = normalizeEmbeddedViewConfig(input as never);

    expect(result).toEqual({
      borderWidth: 45,
      borderCornerRadius: 12.5,
      backgroundColor: '#fff',
    });
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('trims whitespace before parsing numeric strings', () => {
    const result = normalizeEmbeddedViewConfig({
      borderWidth: '  8  ',
    } as never);

    expect(result?.borderWidth).toBe(8);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('leaves valid numbers unchanged', () => {
    const result = normalizeEmbeddedViewConfig({
      borderWidth: 3,
      borderCornerRadius: 0,
    });

    expect(result?.borderWidth).toBe(3);
    expect(result?.borderCornerRadius).toBe(0);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('drops non-parsable strings and warns', () => {
    const result = normalizeEmbeddedViewConfig({
      borderWidth: 'nope',
      borderCornerRadius: '10',
    } as never);

    expect(result?.borderWidth).toBeUndefined();
    expect(result?.borderCornerRadius).toBe(10);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toContain('borderWidth');
  });

  it('drops empty strings and warns', () => {
    const result = normalizeEmbeddedViewConfig({
      borderWidth: '   ',
    } as never);

    expect(result?.borderWidth).toBeUndefined();
    expect(warnSpy).toHaveBeenCalled();
  });

  it('drops NaN and Infinity numbers and warns', () => {
    const result = normalizeEmbeddedViewConfig({
      borderWidth: Number.NaN,
      borderCornerRadius: Number.POSITIVE_INFINITY,
    } as never);

    expect(result?.borderWidth).toBeUndefined();
    expect(result?.borderCornerRadius).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledTimes(2);
  });

  it('drops invalid types and warns', () => {
    const result = normalizeEmbeddedViewConfig({
      borderWidth: true,
    } as never);

    expect(result?.borderWidth).toBeUndefined();
    expect(warnSpy).toHaveBeenCalled();
  });

  it('does not mutate the original config object', () => {
    const original = { borderWidth: '7' as const };
    const snapshot = { ...original };

    normalizeEmbeddedViewConfig(original as never);

    expect(original).toEqual(snapshot);
  });
});
