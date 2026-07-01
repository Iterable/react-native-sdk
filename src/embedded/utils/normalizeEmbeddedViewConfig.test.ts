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

  describe('partial config objects', () => {
    it('handles a config with only borderWidth set', () => {
      // GIVEN a partial config containing only borderWidth
      const result = normalizeEmbeddedViewConfig({ borderWidth: 5 });

      // THEN borderWidth is preserved and no other numeric keys are introduced
      expect(result?.borderWidth).toBe(5);
      expect(result?.borderCornerRadius).toBeUndefined();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('handles a config with only borderCornerRadius set', () => {
      // GIVEN a partial config containing only borderCornerRadius
      const result = normalizeEmbeddedViewConfig({ borderCornerRadius: 9 });

      expect(result?.borderCornerRadius).toBe(9);
      expect(result?.borderWidth).toBeUndefined();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('handles a config where borderWidth is explicitly null (coerceNumericField null branch)', () => {
      // GIVEN a partial config where borderWidth is explicitly null
      const result = normalizeEmbeddedViewConfig({
        borderWidth: null,
      } as never);

      // THEN the null value is treated as absent and the key is dropped
      expect(result?.borderWidth).toBeUndefined();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('handles a config where borderCornerRadius is explicitly null', () => {
      const result = normalizeEmbeddedViewConfig({
        borderCornerRadius: null,
      } as never);

      expect(result?.borderCornerRadius).toBeUndefined();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('handles a config with borderWidth null and a valid borderCornerRadius', () => {
      // GIVEN a mixed partial config
      const result = normalizeEmbeddedViewConfig({
        borderWidth: null,
        borderCornerRadius: 12,
      } as never);

      // THEN the null field is dropped while the valid number is preserved
      expect(result?.borderWidth).toBeUndefined();
      expect(result?.borderCornerRadius).toBe(12);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('handles a config with no numeric keys (only non-numeric fields)', () => {
      // GIVEN a config with only non-numeric fields
      const result = normalizeEmbeddedViewConfig({
        backgroundColor: '#fff',
        borderColor: '#000',
      } as never);

      // THEN the non-numeric fields are passed through unchanged
      expect(result?.backgroundColor).toBe('#fff');
      expect(result?.borderColor).toBe('#000');
      expect(result?.borderWidth).toBeUndefined();
      expect(result?.borderCornerRadius).toBeUndefined();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('handles an empty config object', () => {
      // GIVEN an empty config object
      const result = normalizeEmbeddedViewConfig({});

      // THEN the result is an empty object (no numeric keys to coerce)
      expect(result).toEqual({});
      expect(warnSpy).not.toHaveBeenCalled();
    });
  });
});
