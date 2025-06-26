import { IterableEmbeddedMessageElements } from '../embedded/classes/IterableEmbeddedMessageElements';
import { IterableEmbeddedMessageElementsButton } from '../embedded/classes/IterableEmbeddedMessageElementsButton';
import { IterableEmbeddedMessageText } from '../embedded/classes/IterableEmbeddedMessageText';
import { Iterable } from '../core/classes/Iterable';

describe('IterableEmbeddedMessageElements', () => {
  it('should create an instance with all properties', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageElements_fromDict_all_properties'
    );

    const dict = {
      title: 'Awesome Title',
      body: 'Radical Body Text',
      mediaUrl: 'https://example.com/image.jpg',
      mediaUrlCaption: 'Check out this sick image!',
      defaultAction: {
        type: 'openUrl',
        data: 'https://example.com',
      },
      buttons: [
        {
          id: 'button-1',
          title: 'Click Me!',
          action: {
            type: 'openUrl',
            data: 'https://example.com/button1',
          },
        },
        {
          id: 'button-2',
          title: 'Close',
          action: {
            type: 'action://dismiss',
          },
        },
      ],
      text: [
        {
          id: 'text-1',
          text: 'Some cool text',
          type: 'body',
        },
        {
          id: 'text-2',
          text: 'More radical text',
          type: 'subtitle',
        },
      ],
    };

    const elements = new IterableEmbeddedMessageElements(dict);

    expect(elements).toBeInstanceOf(IterableEmbeddedMessageElements);
    expect(elements.title).toBe('Awesome Title');
    expect(elements.body).toBe('Radical Body Text');
    expect(elements.mediaUrl).toBe('https://example.com/image.jpg');
    expect(elements.mediaUrlCaption).toBe('Check out this sick image!');

    // Check defaultAction
    expect(elements.defaultAction).toBeInstanceOf(Object);
    expect(elements.defaultAction?.type).toBe('openUrl');
    expect(elements.defaultAction?.data).toBe('https://example.com');

    // Check buttons
    expect(elements.buttons).toHaveLength(2);
    const firstButton = elements
      .buttons![0] as IterableEmbeddedMessageElementsButton;
    expect(firstButton).toBeInstanceOf(IterableEmbeddedMessageElementsButton);
    expect(firstButton.id).toBe('button-1');
    expect(firstButton.title).toBe('Click Me!');
    expect(firstButton.action?.type).toBe('openUrl');
    expect(firstButton.action?.data).toBe('https://example.com/button1');

    const secondButton = elements
      .buttons![1] as IterableEmbeddedMessageElementsButton;
    expect(secondButton).toBeInstanceOf(IterableEmbeddedMessageElementsButton);
    expect(secondButton.id).toBe('button-2');
    expect(secondButton.title).toBe('Close');
    expect(secondButton.action?.type).toBe('action://dismiss');
    expect(secondButton.action?.data).toBeUndefined();

    // Check text elements
    expect(elements.text).toHaveLength(2);
    const firstText = elements.text![0] as IterableEmbeddedMessageText;
    expect(firstText).toBeInstanceOf(IterableEmbeddedMessageText);
    expect(firstText.id).toBe('text-1');
    expect(firstText.text).toBe('Some cool text');
    expect(firstText.type).toBe('body');

    const secondText = elements.text![1] as IterableEmbeddedMessageText;
    expect(secondText).toBeInstanceOf(IterableEmbeddedMessageText);
    expect(secondText.id).toBe('text-2');
    expect(secondText.text).toBe('More radical text');
    expect(secondText.type).toBe('subtitle');
  });

  it('should create an instance with title and body', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageElements_fromDict_title_and_body'
    );

    const dict = {
      title: 'Simple Title',
      body: 'Simple Body',
    };

    const elements = new IterableEmbeddedMessageElements(dict);

    expect(elements).toBeInstanceOf(IterableEmbeddedMessageElements);
    expect(elements.title).toBe('Simple Title');
    expect(elements.body).toBe('Simple Body');
    expect(elements.mediaUrl).toBeUndefined();
    expect(elements.mediaUrlCaption).toBeUndefined();
    expect(elements.defaultAction).toBeUndefined();
    expect(elements.buttons).toBeUndefined();
    expect(elements.text).toBeUndefined();
  });

  it('should create an instance with no title or body', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageElements_fromDict_no_title_or_body'
    );

    const dict = {};

    const elements = new IterableEmbeddedMessageElements(dict);

    expect(elements).toBeInstanceOf(IterableEmbeddedMessageElements);
    expect(elements.title).toBeUndefined();
    expect(elements.body).toBeUndefined();
    expect(elements.mediaUrl).toBeUndefined();
    expect(elements.mediaUrlCaption).toBeUndefined();
    expect(elements.defaultAction).toBeUndefined();
    expect(elements.buttons).toBeUndefined();
    expect(elements.text).toBeUndefined();
  });

  it('should create an instance with media properties', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageElements_fromDict_media_properties'
    );

    const dict = {
      title: 'Media Title',
      body: 'Media Body',
      mediaUrl: 'https://example.com/media.jpg',
      mediaUrlCaption: 'Check this out!',
    };

    const elements = new IterableEmbeddedMessageElements(dict);

    expect(elements).toBeInstanceOf(IterableEmbeddedMessageElements);
    expect(elements.title).toBe('Media Title');
    expect(elements.body).toBe('Media Body');
    expect(elements.mediaUrl).toBe('https://example.com/media.jpg');
    expect(elements.mediaUrlCaption).toBe('Check this out!');
    expect(elements.defaultAction).toBeUndefined();
    expect(elements.buttons).toBeUndefined();
    expect(elements.text).toBeUndefined();
  });

  it('should create an instance with defaultAction only', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageElements_fromDict_defaultAction_only'
    );

    const dict = {
      title: 'Action Title',
      body: 'Action Body',
      defaultAction: {
        type: 'openUrl',
        data: 'https://example.com',
      },
    };

    const elements = new IterableEmbeddedMessageElements(dict);

    expect(elements).toBeInstanceOf(IterableEmbeddedMessageElements);
    expect(elements.title).toBe('Action Title');
    expect(elements.body).toBe('Action Body');
    expect(elements.defaultAction).toBeInstanceOf(Object);
    expect(elements.defaultAction?.type).toBe('openUrl');
    expect(elements.defaultAction?.data).toBe('https://example.com');
    expect(elements.buttons).toBeUndefined();
    expect(elements.text).toBeUndefined();
  });

  it('should create an instance with empty arrays for buttons and text', () => {
    Iterable.logger.log(
      'iterableEmbeddedMessageElements_fromDict_empty_arrays'
    );

    const dict = {
      title: 'Empty Arrays Title',
      body: 'Empty Arrays Body',
      buttons: [],
      text: [],
    };

    const elements = new IterableEmbeddedMessageElements(dict);

    expect(elements).toBeInstanceOf(IterableEmbeddedMessageElements);
    expect(elements.title).toBe('Empty Arrays Title');
    expect(elements.body).toBe('Empty Arrays Body');
    expect(elements.buttons).toHaveLength(0);
    expect(elements.text).toHaveLength(0);
  });
});
