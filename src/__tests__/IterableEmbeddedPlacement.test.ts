import { IterableEmbeddedPlacement } from '../embedded/classes/IterableEmbeddedPlacement';
import { IterableEmbeddedMessage } from '../embedded/classes/IterableEmbeddedMessage';
import { Iterable } from '../core/classes/Iterable';

describe('IterableEmbeddedPlacement', () => {
  it('should create an instance with placementId and messages', () => {
    Iterable.logger.log('iterableEmbeddedPlacement_fromDict_with_messages');

    const dict = {
      placementId: 123,
      messages: [
        {
          metadata: {
            messageId: 'msg-1',
            placementId: 123,
            isProof: false,
          },
          elements: {
            title: 'First Message',
            body: 'Body of first message',
          },
        },
        {
          metadata: {
            messageId: 'msg-2',
            placementId: 123,
            isProof: false,
          },
          elements: {
            title: 'Second Message',
            body: 'Body of second message',
          },
        },
      ],
    };

    const placement = IterableEmbeddedPlacement.fromDict(dict);

    expect(placement).toBeInstanceOf(IterableEmbeddedPlacement);
    expect(placement.placementId).toBe(123);
    expect(placement.messages).toBeDefined();
    expect(placement.messages!.length).toBe(2);
    const messages = placement.messages as [
      IterableEmbeddedMessage,
      IterableEmbeddedMessage,
    ];
    expect(messages[0]).toBeInstanceOf(IterableEmbeddedMessage);
    expect(messages[1]).toBeInstanceOf(IterableEmbeddedMessage);
    expect(messages[0].metadata.messageId).toBe('msg-1');
    expect(messages[1].metadata.messageId).toBe('msg-2');
  });

  it('should create an instance with only placementId', () => {
    Iterable.logger.log('iterableEmbeddedPlacement_fromDict_placementId_only');

    const dict = {
      placementId: 456,
    };

    const placement = IterableEmbeddedPlacement.fromDict(dict);

    expect(placement).toBeInstanceOf(IterableEmbeddedPlacement);
    expect(placement.placementId).toBe(456);
    expect(placement.messages).toBeUndefined();
  });

  it('should throw an error if placementId is missing', () => {
    Iterable.logger.log(
      'iterableEmbeddedPlacement_fromDict_missing_placementId'
    );

    const dict = {
      messages: [
        {
          metadata: {
            messageId: 'msg-1',
            placementId: 123,
            isProof: false,
          },
        },
      ],
    };

    expect(() => IterableEmbeddedPlacement.fromDict(dict)).toThrow(
      'placementId is required'
    );
  });

  it('should handle empty messages array', () => {
    Iterable.logger.log('iterableEmbeddedPlacement_fromDict_empty_messages');

    const dict = {
      placementId: 789,
      messages: [],
    };

    const placement = IterableEmbeddedPlacement.fromDict(dict);

    expect(placement).toBeInstanceOf(IterableEmbeddedPlacement);
    expect(placement.placementId).toBe(789);
    expect(placement.messages).toBeDefined();
    expect(placement.messages!.length).toBe(0);
  });
});
