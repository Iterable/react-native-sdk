import type { IterableEmbeddedViewConfig } from '../types/IterableEmbeddedViewConfig';

const NUMERIC_KEYS: (keyof Pick<
  IterableEmbeddedViewConfig,
  'borderWidth' | 'borderCornerRadius'
>)[] = ['borderWidth', 'borderCornerRadius'];

function coerceNumericField(
  key: 'borderWidth' | 'borderCornerRadius',
  value: unknown
): number | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value === 'number') {
    if (Number.isFinite(value)) {
      return value;
    }
    console.warn(
      `[IterableEmbeddedView] Ignoring ${String(key)}: expected a finite number, got ${String(value)}`
    );
    return undefined;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') {
      console.warn(
        `[IterableEmbeddedView] Ignoring ${String(key)}: empty string is not a valid number`
      );
      return undefined;
    }
    const n = parseFloat(trimmed);
    if (Number.isFinite(n)) {
      return n;
    }
    console.warn(
      `[IterableEmbeddedView] Ignoring ${String(key)}: could not parse string as a number: ${JSON.stringify(value)}`
    );
    return undefined;
  }
  console.warn(
    `[IterableEmbeddedView] Ignoring ${String(key)}: expected number or numeric string, got ${typeof value}`
  );
  return undefined;
}

/**
 * Returns a shallow copy of config with numeric fields coerced from strings when possible.
 * Values that cannot be coerced are omitted so style resolution can fall back to defaults.
 */
export function normalizeEmbeddedViewConfig(
  config: IterableEmbeddedViewConfig | null | undefined
): IterableEmbeddedViewConfig | null | undefined {
  if (config == null) {
    return config;
  }
  const next: IterableEmbeddedViewConfig = { ...config };
  const loose = config as Record<string, unknown>;
  for (const key of NUMERIC_KEYS) {
    const raw = loose[key as string];
    if (raw === undefined) {
      continue;
    }
    if (typeof raw === 'number' && Number.isFinite(raw)) {
      continue;
    }
    const coerced = coerceNumericField(key, raw);
    if (coerced === undefined) {
      delete next[key];
    } else {
      next[key] = coerced;
    }
  }
  return next;
}
