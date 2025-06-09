import { IterableEmbeddedMessageElementsButton } from '../embedded/classes/IterableEmbeddedMessageElementsButton';
import { IterableEmbeddedMessageElementsButtonAction } from '../embedded/classes/IterableEmbeddedMessageElementsButtonAction';
import { Iterable } from '../core/classes/Iterable';

describe('IterableEmbeddedMessageButton', () => {
  it('should create an instance with all properties including button action', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageButton_fromDict_all_properties'
    );

    const dict = {
      id: 'button-123',
      title: 'Click Me!',
      action: { type: 'openUrl', data: 'https://example.com' },
    };

    const button = IterableEmbeddedMessageElementsButton.fromDict(dict);

    expect(button).toBeInstanceOf(IterableEmbeddedMessageElementsButton);
    expect(button.id).toBe('button-123');
    expect(button.title).toBe('Click Me!');
    expect(button.action).toBeInstanceOf(
      IterableEmbeddedMessageElementsButtonAction
    );
    expect(button.action?.type).toBe('openUrl');
    expect(button.action?.data).toBe('https://example.com');
  });

  it('should create an instance with only required properties', () => {
    Iterable.logger.log('iterableEmbeddedMessageButton_fromDict_required_only');

    const dict = { id: 'button-123' };

    const button = IterableEmbeddedMessageElementsButton.fromDict(dict);

    expect(button).toBeInstanceOf(IterableEmbeddedMessageElementsButton);
    expect(button.id).toBe('button-123');
    expect(button.title).toBeUndefined();
    expect(button.action).toBeUndefined();
  });

  it('should create an instance with title but no action', () => {
    Iterable.logger.log('iterableEmbeddedMessageButton_fromDict_title_only');

    const dict = {
      id: 'button-123',
      title: 'Click Me!',
    };

    const button = IterableEmbeddedMessageElementsButton.fromDict(dict);

    expect(button).toBeInstanceOf(IterableEmbeddedMessageElementsButton);
    expect(button.id).toBe('button-123');
    expect(button.title).toBe('Click Me!');
    expect(button.action).toBeUndefined();
  });

  it('should throw an error if id is missing in fromDict', () => {
    Iterable.logger.log('iterableEmbeddedMessageButton_fromDict_missing_id');

    const dict = {
      title: 'Click Me!',
      action: { type: 'openUrl', data: 'https://example.com' },
    };

    expect(() => IterableEmbeddedMessageElementsButton.fromDict(dict)).toThrow(
      'id is required'
    );
  });

  it('should handle button action with only type', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageButton_fromDict_action_type_only'
    );

    const dict = {
      id: 'button-123',
      action: { type: 'close' },
    };

    const button = IterableEmbeddedMessageElementsButton.fromDict(dict);

    expect(button).toBeInstanceOf(IterableEmbeddedMessageElementsButton);
    expect(button.id).toBe('button-123');
    expect(button.action).toBeInstanceOf(
      IterableEmbeddedMessageElementsButtonAction
    );
    expect(button.action?.type).toBe('close');
    expect(button.action?.data).toBeUndefined();
  });
});
