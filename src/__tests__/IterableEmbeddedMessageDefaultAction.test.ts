import { IterableEmbeddedMessageDefaultAction } from '../embedded/classes/IterableEmbeddedMessageDefaultAction';
import { Iterable } from '../core/classes/Iterable';

describe('IterableEmbeddedMessageDefaultAction', () => {
  it('should create an instance with the correct properties', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageDefaultAction_fromDict_valid_dictionary'
    );

    const dict = { type: 'openUrl', data: 'https://example.com' };
    const action = IterableEmbeddedMessageDefaultAction.fromDict(dict);
    expect(action).toBeInstanceOf(IterableEmbeddedMessageDefaultAction);
    expect(action.type).toBe('openUrl');
    expect(action.data).toBe('https://example.com');
  });

  it('should create an instance from a dictionary with data omitted', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageDefaultAction_fromDict_valid_dictionary_with_data_omitted'
    );

    const dict = { type: 'action://join', data: '' };
    const action = IterableEmbeddedMessageDefaultAction.fromDict(dict);
    expect(action).toBeInstanceOf(IterableEmbeddedMessageDefaultAction);
    expect(action.type).toBe('action://join');
    expect(action.data).toBe('');
  });

  it('should throw an error if type is missing in fromDict', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageDefaultAction_fromDict_invalid_dictionary_missing_type'
    );

    const dict = { data: 'foo' };

    expect(() => IterableEmbeddedMessageDefaultAction.fromDict(dict)).toThrow(
      'type is required'
    );
  });
});
