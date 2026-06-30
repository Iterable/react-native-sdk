import { IterableInboxMetadata } from './IterableInboxMetadata';

describe('IterableInboxMetadata', () => {
  describe('constructor', () => {
    it('creates an instance with all fields', () => {
      const metadata = new IterableInboxMetadata('title', 'subtitle', 'icon');
      expect(metadata.title).toBe('title');
      expect(metadata.subtitle).toBe('subtitle');
      expect(metadata.icon).toBe('icon');
    });

    it('creates an instance with all fields undefined', () => {
      const metadata = new IterableInboxMetadata(undefined, undefined, undefined);
      expect(metadata.title).toBeUndefined();
      expect(metadata.subtitle).toBeUndefined();
      expect(metadata.icon).toBeUndefined();
    });
  });

  describe('fromDict', () => {
    it('copies all fields when present', () => {
      const metadata = IterableInboxMetadata.fromDict({
        title: 'title',
        subtitle: 'subtitle',
        icon: 'icon',
      });

      expect(metadata.title).toBe('title');
      expect(metadata.subtitle).toBe('subtitle');
      expect(metadata.icon).toBe('icon');
    });

    it('handles missing title', () => {
      const metadata = IterableInboxMetadata.fromDict({
        title: undefined,
        subtitle: 'subtitle',
        icon: 'icon',
      });

      expect(metadata.title).toBeUndefined();
      expect(metadata.subtitle).toBe('subtitle');
      expect(metadata.icon).toBe('icon');
    });

    it('handles missing subtitle', () => {
      const metadata = IterableInboxMetadata.fromDict({
        title: 'title',
        subtitle: undefined,
        icon: 'icon',
      });

      expect(metadata.title).toBe('title');
      expect(metadata.subtitle).toBeUndefined();
      expect(metadata.icon).toBe('icon');
    });

    it('handles missing icon', () => {
      const metadata = IterableInboxMetadata.fromDict({
        title: 'title',
        subtitle: 'subtitle',
        icon: undefined,
      });

      expect(metadata.title).toBe('title');
      expect(metadata.subtitle).toBe('subtitle');
      expect(metadata.icon).toBeUndefined();
    });

    it('handles missing title and subtitle', () => {
      const metadata = IterableInboxMetadata.fromDict({
        title: undefined,
        subtitle: undefined,
        icon: 'icon',
      });

      expect(metadata.title).toBeUndefined();
      expect(metadata.subtitle).toBeUndefined();
      expect(metadata.icon).toBe('icon');
    });

    it('handles missing title, subtitle, and icon', () => {
      const metadata = IterableInboxMetadata.fromDict({
        title: undefined,
        subtitle: undefined,
        icon: undefined,
      });

      expect(metadata.title).toBeUndefined();
      expect(metadata.subtitle).toBeUndefined();
      expect(metadata.icon).toBeUndefined();
    });
  });
});