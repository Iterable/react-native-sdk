import { MockRNIterableAPI } from '../../__mocks__/MockRNIterableAPI';
import { IterableApi } from '../../core/classes/IterableApi';
import { IterableHtmlInAppContent } from '../../inApp/classes/IterableHtmlInAppContent';
import { IterableInAppMessage } from '../../inApp/classes/IterableInAppMessage';
import { IterableInAppTrigger } from '../../inApp/classes/IterableInAppTrigger';
import { IterableInAppTriggerType } from '../../inApp/enums/IterableInAppTriggerType';
import { IterableInAppDeleteSource } from '../../inApp/enums/IterableInAppDeleteSource';
import { IterableInAppLocation } from '../../inApp/enums/IterableInAppLocation';
import { IterableInboxMetadata } from '../../inApp/classes/IterableInboxMetadata';
import { type IterableInboxImpressionRowInfo } from '../types/IterableInboxImpressionRowInfo';

import { IterableInboxDataModel } from './IterableInboxDataModel';

jest.mock('../../api', () => ({
  __esModule: true,
  default: MockRNIterableAPI,
}));

describe('IterableInboxDataModel', () => {
  let dateLocaleSpy: jest.SpyInstance;
  let timeLocaleSpy: jest.SpyInstance;

  const makeMessage = (
    messageId: string,
    createdAt: Date,
    overrides?: Partial<{
      saveToInbox: boolean;
      read: boolean;
      title: string;
    }>
  ): IterableInAppMessage =>
    new IterableInAppMessage(
      messageId,
      1,
      new IterableInAppTrigger(IterableInAppTriggerType.immediate),
      createdAt,
      undefined,
      overrides?.saveToInbox ?? true,
      new IterableInboxMetadata(
        overrides?.title ?? `title-${messageId}`,
        'sub',
        'https://example.com/icon.png'
      ),
      undefined,
      overrides?.read ?? false,
      0
    );

  beforeEach(() => {
    jest.clearAllMocks();
    dateLocaleSpy = jest
      .spyOn(Date.prototype, 'toLocaleDateString')
      .mockReturnValue('1/15/2024');
    timeLocaleSpy = jest
      .spyOn(Date.prototype, 'toLocaleTimeString')
      .mockReturnValue('3:00:00 PM');
  });

  afterEach(() => {
    dateLocaleSpy.mockRestore();
    timeLocaleSpy.mockRestore();
  });

  describe('refresh', () => {
    it('should map inbox messages through filter, comparator, and default sort (most recent first)', async () => {
      // GIVEN messages returned in arbitrary order and a filter that drops one id
      const older = makeMessage('older', new Date('2024-01-01T10:00:00.000Z'));
      const newer = makeMessage('newer', new Date('2024-02-01T10:00:00.000Z'));
      const hidden = makeMessage('hidden', new Date('2024-03-01T10:00:00.000Z'));

      const getInboxSpy = jest
        .spyOn(IterableApi, 'getInboxMessages')
        .mockResolvedValue([older, newer, hidden]);

      const model = new IterableInboxDataModel();
      model.set(
        (m) => m.messageId !== 'hidden',
        (a, b) => a.messageId.localeCompare(b.messageId)
      );

      // WHEN refresh runs
      const rows = await model.refresh();

      // THEN filter and comparator are applied and rows map inbox fields
      expect(getInboxSpy).toHaveBeenCalledTimes(1);
      expect(rows.map((r) => r.inAppMessage.messageId)).toEqual([
        'newer',
        'older',
      ]);
      expect(rows[0]?.title).toBe('title-newer');
      expect(rows[0]?.inAppMessage).toBe(newer);
    });

    it('should resolve to an empty array when getInboxMessages rejects', async () => {
      // GIVEN the inbox fetch fails
      jest
        .spyOn(IterableApi, 'getInboxMessages')
        .mockRejectedValue(new Error('network error'));

      const model = new IterableInboxDataModel();

      // WHEN refresh runs
      const rows = await model.refresh();

      // THEN the model returns an empty list
      expect(rows).toEqual([]);
    });
  });

  describe('getFormattedDate', () => {
    it('should use the default locale date and time string when no date mapper is set', () => {
      // GIVEN a message with a creation time
      const model = new IterableInboxDataModel();
      const message = makeMessage('m1', new Date('2024-06-15T12:00:00.000Z'));

      // WHEN the date is formatted
      const formatted = model.getFormattedDate(message);

      // THEN the default mapper combines locale date and time
      expect(formatted).toBe('1/15/2024 at 3:00:00 PM');
    });

    it('should use the custom date mapper when set', () => {
      // GIVEN a custom date mapper
      const model = new IterableInboxDataModel();
      model.set(undefined, undefined, () => 'custom-label');
      const message = makeMessage('m1', new Date('2024-06-15T12:00:00.000Z'));

      // WHEN the date is formatted
      const formatted = model.getFormattedDate(message);

      // THEN the custom mapper output is returned
      expect(formatted).toBe('custom-label');
    });
  });

  describe('IterableApi delegation', () => {
    it('should call IterableApi.setReadForMessage when marking a message read', () => {
      const spy = jest.spyOn(IterableApi, 'setReadForMessage').mockImplementation();
      const model = new IterableInboxDataModel();

      model.setMessageAsRead('msg-1');

      expect(spy).toHaveBeenCalledWith('msg-1', true);
    });

    it('should call IterableApi.removeMessage when deleting an inbox item', () => {
      const spy = jest.spyOn(IterableApi, 'removeMessage').mockImplementation();
      const model = new IterableInboxDataModel();
      const source = IterableInAppDeleteSource.inboxSwipe;

      model.deleteItemById('msg-2', source);

      expect(spy).toHaveBeenCalledWith(
        'msg-2',
        IterableInAppLocation.inbox,
        source
      );
    });

    it('should call IterableApi.getHtmlInAppContentForMessage and wrap the result', async () => {
      const raw = {
        edgeInsets: { top: 1, left: 2, bottom: 3, right: 4 },
        html: '<p>hello</p>',
      };
      const spy = jest
        .spyOn(IterableApi, 'getHtmlInAppContentForMessage')
        .mockResolvedValue(raw as never);

      const model = new IterableInboxDataModel();
      const content = await model.getHtmlContentForMessageId('html-msg');

      expect(spy).toHaveBeenCalledWith('html-msg');
      expect(content).toBeInstanceOf(IterableHtmlInAppContent);
      expect(content.html).toBe('<p>hello</p>');
    });

    it('should call IterableApi.startSession with visible rows', () => {
      const spy = jest.spyOn(IterableApi, 'startSession').mockImplementation();
      const model = new IterableInboxDataModel();
      const rows: IterableInboxImpressionRowInfo[] = [
        { messageId: 'a', silentInbox: false },
      ];

      model.startSession(rows);

      expect(spy).toHaveBeenCalledWith(rows);
    });

    it('should call IterableApi.updateVisibleRows before IterableApi.endSession', async () => {
      const updateSpy = jest
        .spyOn(IterableApi, 'updateVisibleRows')
        .mockImplementation();
      const endSpy = jest.spyOn(IterableApi, 'endSession').mockImplementation();
      const model = new IterableInboxDataModel();
      const rows: IterableInboxImpressionRowInfo[] = [
        { messageId: 'b', silentInbox: true },
      ];

      await model.endSession(rows);

      expect(updateSpy).toHaveBeenCalledWith(rows);
      expect(endSpy).toHaveBeenCalled();
      expect(updateSpy.mock.invocationCallOrder[0]).toBeLessThan(
        endSpy.mock.invocationCallOrder[0]!
      );
    });

    it('should call IterableApi.updateVisibleRows when updateVisibleRows is invoked', () => {
      const spy = jest
        .spyOn(IterableApi, 'updateVisibleRows')
        .mockImplementation();
      const model = new IterableInboxDataModel();
      const rows: IterableInboxImpressionRowInfo[] = [
        { messageId: 'c', silentInbox: false },
      ];

      model.updateVisibleRows(rows);

      expect(spy).toHaveBeenCalledWith(rows);
    });
  });
});
