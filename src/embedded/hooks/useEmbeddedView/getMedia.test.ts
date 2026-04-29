import { getMedia } from './getMedia';
import { IterableEmbeddedViewType } from '../../enums';
import type { IterableEmbeddedMessage } from '../../types/IterableEmbeddedMessage';

const minimalMessage: IterableEmbeddedMessage = {
  metadata: { messageId: 'msg-1', placementId: 1 },
};

describe('getMedia', () => {
  describe('viewType Notification', () => {
    it('returns no media regardless of message content', () => {
      const result = getMedia(IterableEmbeddedViewType.Notification, minimalMessage);

      expect(result).toEqual({ url: null, caption: null, shouldShow: false });
    });

    it('returns no media even when message has mediaUrl and caption', () => {
      const message: IterableEmbeddedMessage = {
        ...minimalMessage,
        elements: {
          mediaUrl: 'https://example.com/image.png',
          mediaUrlCaption: 'Example caption',
        },
      };

      const result = getMedia(IterableEmbeddedViewType.Notification, message);

      expect(result).toEqual({ url: null, caption: null, shouldShow: false });
    });
  });

  describe('viewType Card', () => {
    it('returns url and caption from message.elements, shouldShow true when url is non-empty', () => {
      const message: IterableEmbeddedMessage = {
        ...minimalMessage,
        elements: {
          mediaUrl: 'https://example.com/photo.jpg',
          mediaUrlCaption: 'A nice photo',
        },
      };

      const result = getMedia(IterableEmbeddedViewType.Card, message);

      expect(result).toEqual({
        url: 'https://example.com/photo.jpg',
        caption: 'A nice photo',
        shouldShow: true,
      });
    });

    it('returns url only (caption null) when message has no mediaUrlCaption', () => {
      const message: IterableEmbeddedMessage = {
        ...minimalMessage,
        elements: { mediaUrl: 'https://example.com/img.png' },
      };

      const result = getMedia(IterableEmbeddedViewType.Card, message);

      expect(result).toEqual({
        url: 'https://example.com/img.png',
        caption: null,
        shouldShow: true,
      });
    });

    it('returns shouldShow false when mediaUrl is empty string', () => {
      const message: IterableEmbeddedMessage = {
        ...minimalMessage,
        elements: { mediaUrl: '', mediaUrlCaption: 'Caption' },
      };

      const result = getMedia(IterableEmbeddedViewType.Card, message);

      expect(result.url).toBe('');
      expect(result.caption).toBe('Caption');
      expect(result.shouldShow).toBe(false);
    });

    it('returns null url/caption and shouldShow false when message has no elements', () => {
      const result = getMedia(IterableEmbeddedViewType.Card, minimalMessage);

      expect(result).toEqual({ url: null, caption: null, shouldShow: false });
    });

    it('returns null url/caption when elements exist but mediaUrl is undefined', () => {
      const message: IterableEmbeddedMessage = {
        ...minimalMessage,
        elements: { title: 'Title', body: 'Body' },
      };

      const result = getMedia(IterableEmbeddedViewType.Card, message);

      expect(result).toEqual({ url: null, caption: null, shouldShow: false });
    });
  });

  describe('viewType Banner', () => {
    it('returns url and caption from message.elements, shouldShow true when url is non-empty', () => {
      const message: IterableEmbeddedMessage = {
        ...minimalMessage,
        elements: {
          mediaUrl: 'https://example.com/banner.png',
          mediaUrlCaption: 'Banner caption',
        },
      };

      const result = getMedia(IterableEmbeddedViewType.Banner, message);

      expect(result).toEqual({
        url: 'https://example.com/banner.png',
        caption: 'Banner caption',
        shouldShow: true,
      });
    });

    it('returns null url/caption and shouldShow false when message has no elements', () => {
      const result = getMedia(IterableEmbeddedViewType.Banner, minimalMessage);

      expect(result).toEqual({ url: null, caption: null, shouldShow: false });
    });
  });

  describe('return shape', () => {
    it('returns an object with url, caption, and shouldShow', () => {
      const result = getMedia(IterableEmbeddedViewType.Card, minimalMessage);

      expect(Object.keys(result)).toHaveLength(3);
      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('caption');
      expect(result).toHaveProperty('shouldShow');
      expect(typeof result.shouldShow).toBe('boolean');
      expect(result.url === null || typeof result.url === 'string').toBe(true);
      expect(result.caption === null || typeof result.caption === 'string').toBe(true);
    });
  });
});
