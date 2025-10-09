export const generateUUID = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g: any = typeof global !== 'undefined' ? (global as any) : undefined;

  if (g?.crypto?.getRandomValues) {
    const bytes = new Uint8Array(16);
    g.crypto.getRandomValues(bytes);

    // RFC 4122 compliance
    bytes[6] = (bytes[6] ?? 0 & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] ?? 0 & 0x3f) | 0x80; // variant 10

    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join(
      ''
    );
    return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20)}`;
  }

  // Fallback using Math.random (not cryptographically strong)
  const hexDigits = '0123456789abcdef';
  const s: string[] = Array(36);
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.charAt(Math.floor(Math.random() * 16));
  }
  s[14] = '4';
  s[19] = hexDigits.charAt((parseInt(s[19] ?? '0', 16) & 0x3) | 0x8);
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
};
