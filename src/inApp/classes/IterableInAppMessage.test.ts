import { IterableInAppMessage } from './IterableInAppMessage';
import { IterableInAppTrigger } from './IterableInAppTrigger';
import { IterableInAppTriggerType } from '../enums/IterableInAppTriggerType';
import type { IterableInAppMessageRaw } from '../types/IterableInAppMessageRaw';

describe('IterableInAppMessage.fromDict', () => {
  const baseDict: IterableInAppMessageRaw = {
    messageId: 'msg-1',
    campaignId: 123,
    trigger: new IterableInAppTrigger(IterableInAppTriggerType.immediate),
    priorityLevel: 5,
  };

  describe('timestamp conversion branches', () => {
    it('converts a numeric createdAt timestamp', () => {
      // GIVEN a raw dict with a numeric createdAt timestamp (ms since epoch)
      const createdAtMs = 1_600_000_000_000;
      const dict: IterableInAppMessageRaw = {
        ...baseDict,
        createdAt: createdAtMs,
      };

      // WHEN fromDict is called
      const message = IterableInAppMessage.fromDict(dict);

      // THEN the createdAt branch executes and the value is the epoch-ms
      // representation produced by Date.setUTCMilliseconds(createdAtMs).
      // The implementation stores the numeric return of setUTCMilliseconds
      // via @ts-ignore, so we assert against the equivalent Date value.
      const expected = new Date(0).setUTCMilliseconds(createdAtMs);
      expect(message.createdAt).toBe(expected);
    });

    it('converts a numeric expiresAt timestamp', () => {
      // GIVEN a raw dict with a numeric expiresAt timestamp (ms since epoch)
      const expiresAtMs = 1_700_000_000_000;
      const dict: IterableInAppMessageRaw = {
        ...baseDict,
        expiresAt: expiresAtMs,
      };

      // WHEN fromDict is called
      const message = IterableInAppMessage.fromDict(dict);

      // THEN the expiresAt branch executes and the value is the epoch-ms
      // representation produced by Date.setUTCMilliseconds(expiresAtMs).
      const expected = new Date(0).setUTCMilliseconds(expiresAtMs);
      expect(message.expiresAt).toBe(expected);
    });

    it('converts both createdAt and expiresAt numeric timestamps', () => {
      // GIVEN a raw dict with both numeric timestamps
      const createdAtMs = 1_600_000_000_000;
      const expiresAtMs = 1_700_000_000_000;
      const dict: IterableInAppMessageRaw = {
        ...baseDict,
        createdAt: createdAtMs,
        expiresAt: expiresAtMs,
      };

      // WHEN fromDict is called
      const message = IterableInAppMessage.fromDict(dict);

      // THEN both branches execute and the values match the conversion output
      const expectedCreated = new Date(0).setUTCMilliseconds(createdAtMs);
      const expectedExpires = new Date(0).setUTCMilliseconds(expiresAtMs);
      expect(message.createdAt).toBe(expectedCreated);
      expect(message.expiresAt).toBe(expectedExpires);
    });

    it('leaves createdAt and expiresAt undefined when not provided', () => {
      // GIVEN a raw dict with no timestamps
      const dict: IterableInAppMessageRaw = { ...baseDict };

      // WHEN fromDict is called
      const message = IterableInAppMessage.fromDict(dict);

      // THEN the conversion branches are skipped and the values stay undefined
      expect(message.createdAt).toBeUndefined();
      expect(message.expiresAt).toBeUndefined();
    });
  });

  describe('inboxMetadata handling', () => {
    it('parses inboxMetadata when present', () => {
      const dict: IterableInAppMessageRaw = {
        ...baseDict,
        inboxMetadata: {
          title: 'title',
          subtitle: 'subtitle',
          icon: 'icon',
        },
      };

      const message = IterableInAppMessage.fromDict(dict);

      expect(message.inboxMetadata).toBeDefined();
      expect(message.inboxMetadata?.title).toBe('title');
      expect(message.inboxMetadata?.subtitle).toBe('subtitle');
      expect(message.inboxMetadata?.icon).toBe('icon');
    });

    it('leaves inboxMetadata undefined when absent', () => {
      const dict: IterableInAppMessageRaw = { ...baseDict };

      const message = IterableInAppMessage.fromDict(dict);

      expect(message.inboxMetadata).toBeUndefined();
    });
  });
});