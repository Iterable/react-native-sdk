import { IterableEmbeddedMessageMetadata } from '../embedded/classes/IterableEmbeddedMessageMetadata';
import { Iterable } from '../core';

describe('IterableEmbeddedMessage', () => {
  test('should create an instance of IterableEmbeddedMessageMetadata from a dictionary', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageMetadata_fromDict_valid_dictionary'
    );

    const dict = {
      messageId: '123',
      placementId: 456,
      campaignId: 789,
      isProof: false,
    };

    const result = new IterableEmbeddedMessageMetadata(dict);

    expect(result).toBeInstanceOf(IterableEmbeddedMessageMetadata);
    expect(result.messageId).toBe('123');
    expect(result.placementId).toBe(456);
    expect(result.campaignId).toBe(789);
    expect(result.isProof).toBe(false);
  });

  test('should handle optional fields', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageMetadata_fromDict_optional_fields_omitted'
    );

    const dict = {
      messageId: '123',
      placementId: 456,
    };

    const result = new IterableEmbeddedMessageMetadata(dict);

    expect(result).toBeInstanceOf(IterableEmbeddedMessageMetadata);
    expect(result.messageId).toBe('123');
    expect(result.placementId).toBe(456);
    expect(result.campaignId).toBeUndefined();
    expect(result.isProof).toBe(false);
  });

  test('should throw an error if messageId is not provided', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageMetadata_fromDict_missing_messageId'
    );

    const dict = {
      placementId: 456,
    };

    expect(() => {
      // @ts-expect-error - messageId is purposely missing
      new IterableEmbeddedMessageMetadata(dict);
    }).toThrow('messageId and placementId are required');
  });
});
