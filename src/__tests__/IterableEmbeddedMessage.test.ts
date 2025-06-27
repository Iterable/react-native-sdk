import { IterableEmbeddedMessage } from '../embedded/classes/IterableEmbeddedMessage';
import { Iterable } from '../core/classes/Iterable';

describe('IterableEmbeddedMessage', () => {
  it('should create an instance with all properties', () => {
    Iterable.logger.log('iterableEmbeddedMessage_fromDict_all_properties');

    const dict = {
      metadata: {
        messageId: 'msg-123',
        placementId: 1,
        campaignId: 456,
        isProof: false,
      },
      elements: {
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
        ],
        text: [
          {
            id: 'text-1',
            text: 'Some cool text',
            type: 'body',
          },
        ],
      },
      payload: {
        customKey: 'customValue',
        anotherKey: 123,
      },
    };

    const message = new IterableEmbeddedMessage(dict);

    expect(message).toBeInstanceOf(IterableEmbeddedMessage);

    // Check metadata
    expect(message.metadata).toBeInstanceOf(Object);
    expect(message.metadata.messageId).toBe('msg-123');
    expect(message.metadata.placementId).toBe(1);
    expect(message.metadata.campaignId).toBe(456);
    expect(message.metadata.isProof).toBe(false);

    // Check elements
    expect(message.elements).toBeInstanceOf(Object);
    expect(message.elements?.title).toBe('Awesome Title');
    expect(message.elements?.body).toBe('Radical Body Text');
    expect(message.elements?.mediaUrl).toBe('https://example.com/image.jpg');
    expect(message.elements?.mediaUrlCaption).toBe(
      'Check out this sick image!'
    );

    // Check payload
    expect(message.payload).toEqual({
      customKey: 'customValue',
      anotherKey: 123,
    });
  });

  it('should create an instance with only required metadata', () => {
    Iterable.logger.log('iterableEmbeddedMessage_fromDict_required_only');

    const dict = {
      metadata: {
        messageId: 'msg-123',
        placementId: 1,
        isProof: false,
      },
    };

    const message = new IterableEmbeddedMessage(dict);

    expect(message).toBeInstanceOf(IterableEmbeddedMessage);
    expect(message.metadata).toBeInstanceOf(Object);
    expect(message.metadata.messageId).toBe('msg-123');
    expect(message.metadata.placementId).toBe(1);
    expect(message.metadata.campaignId).toBeUndefined();
    expect(message.metadata.isProof).toBe(false);
    expect(message.elements).toBeUndefined();
    expect(message.payload).toBeUndefined();
  });

  it('should throw an error if metadata is missing', () => {
    Iterable.logger.log('iterableEmbeddedMessage_fromDict_missing_metadata');

    const dict = {
      elements: {
        title: 'Some Title',
        body: 'Some Body',
      },
    };

    // @ts-expect-error - metadata is purposely missing
    expect(() => new IterableEmbeddedMessage(dict)).toThrow(
      'metadata is required'
    );
  });

  it('should create an instance with elements but no payload', () => {
    Iterable.logger.log('iterableEmbeddedMessage_fromDict_elements_only');

    const dict = {
      metadata: {
        messageId: 'msg-123',
        placementId: 1,
        isProof: false,
      },
      elements: {
        title: 'Elements Only',
        body: 'No payload here',
      },
    };

    const message = new IterableEmbeddedMessage(dict);

    expect(message).toBeInstanceOf(IterableEmbeddedMessage);
    expect(message.metadata).toBeInstanceOf(Object);
    expect(message.elements).toBeInstanceOf(Object);
    expect(message.elements?.title).toBe('Elements Only');
    expect(message.elements?.body).toBe('No payload here');
    expect(message.payload).toBeUndefined();
  });

  it('should create an instance with payload but no elements', () => {
    Iterable.logger.log('iterableEmbeddedMessage_fromDict_payload_only');

    const dict = {
      metadata: {
        messageId: 'msg-123',
        placementId: 1,
        isProof: false,
      },
      payload: {
        someData: 'someValue',
      },
    };

    const message = new IterableEmbeddedMessage(dict);

    expect(message).toBeInstanceOf(IterableEmbeddedMessage);
    expect(message.metadata).toBeInstanceOf(Object);
    expect(message.elements).toBeUndefined();
    expect(message.payload).toEqual({
      someData: 'someValue',
    });
  });
});
