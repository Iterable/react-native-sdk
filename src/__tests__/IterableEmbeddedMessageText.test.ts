import { IterableEmbeddedMessageText } from '../embedded/classes/IterableEmbeddedMessageText';
import { Iterable } from '../core/classes/Iterable';

describe('IterableEmbeddedMessageText', () => {
  it('should create an instance from a dictionary with all properties', () => {
    Iterable.logger.log('iterableEmbeddedMessageText_fromDict_all_properties');

    const dict = {
      id: 'text-123',
      text: 'Hello World!',
      type: 'heading',
    };

    const text = IterableEmbeddedMessageText.fromDict(dict);

    expect(text).toBeInstanceOf(IterableEmbeddedMessageText);
    expect(text.id).toBe('text-123');
    expect(text.text).toBe('Hello World!');
    expect(text.type).toBe('heading');
  });

  it('should create an instance from a dictionary with only required properties', () => {
    Iterable.logger.log('iterableEmbeddedMessageText_fromDict_required_only');

    const dict = {
      id: 'text-123',
    };

    const text = IterableEmbeddedMessageText.fromDict(dict);

    expect(text).toBeInstanceOf(IterableEmbeddedMessageText);
    expect(text.id).toBe('text-123');
    expect(text.text).toBeUndefined();
    expect(text.type).toBeUndefined();
  });

  it('should throw an error if id is missing in fromDict', () => {
    Iterable.logger.log('iterableEmbeddedMessageText_fromDict_missing_id');

    const dict = {
      text: 'Hello World!',
      type: 'heading',
    };

    expect(() => IterableEmbeddedMessageText.fromDict(dict)).toThrow(
      'id is required'
    );
  });
});
