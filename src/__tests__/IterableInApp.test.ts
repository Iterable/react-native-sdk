import { NativeEventEmitter } from 'react-native';

import { MockRNIterableAPI } from '../__mocks__/MockRNIterableAPI';

import { Iterable } from '../Iterable';
import IterableConfig from '../IterableConfig';
import IterableInAppMessage from '../IterableInAppMessage';
import {
  IterableInAppLocation,
  IterableInAppTrigger,
  IterableInAppTriggerType,
  IterableInboxMetadata,
  IterableInAppCloseSource,
  IterableInAppShowResponse,
  IterableInAppDeleteSource,
} from '../IterableInAppClasses';
import { IterableLogger } from '../IterableLogger';
import { IterableEventName } from '../types';

describe('Iterable In App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Iterable.logger = new IterableLogger(new IterableConfig());
  });

  test('trackInAppOpen_params_methodCalledWithParams', () => {
    // GIVEN an in-app message and a location
    const msg: IterableInAppMessage = new IterableInAppMessage(
      'someMessageId',
      123,
      new IterableInAppTrigger(IterableInAppTriggerType.event),
      new Date(1234),
      new Date(123123),
      true,
      new IterableInboxMetadata('title', 'subtitle', 'iconURL'),
      { CustomPayloadKey: 'CustomPayloadValue' },
      false,
      300.5
    );
    const location: IterableInAppLocation = IterableInAppLocation.inApp;

    // WHEN Iterable.trackInAppOpen is called
    Iterable.trackInAppOpen(msg, location);

    // THEN corresponding method is called on MockIterableAPI with appropriate parameters
    expect(MockRNIterableAPI.trackInAppOpen).toBeCalledWith(
      msg.messageId,
      location
    );
  });

  test('trackInAppClick_params_methodCalledWithParams', () => {
    // GIVEN an in-app message, a location, and a url
    const msg: IterableInAppMessage = new IterableInAppMessage(
      'someMessageId',
      123,
      new IterableInAppTrigger(IterableInAppTriggerType.event),
      new Date(1234),
      new Date(123123),
      true,
      new IterableInboxMetadata('title', 'subtitle', 'iconURL'),
      { CustomPayloadKey: 'CustomPayloadValue' },
      false,
      300.5
    );
    const location: IterableInAppLocation = IterableInAppLocation.inApp;
    const url: string = 'URLClicked';

    // WHEN Iterable.trackInAppClick is called
    Iterable.trackInAppClick(msg, location, url);

    // THEN corresponding method is called on MockIterableAPI with appropriate parameters
    expect(MockRNIterableAPI.trackInAppClick).toBeCalledWith(
      msg.messageId,
      location,
      url
    );
  });

  test('trackInAppClose_params_methodCalledWithParams', () => {
    // GIVEN an in-app messsage, a location, a close source, and a url
    const msg: IterableInAppMessage = new IterableInAppMessage(
      'someMessageId',
      123,
      new IterableInAppTrigger(IterableInAppTriggerType.event),
      new Date(1234),
      new Date(123123),
      true,
      new IterableInboxMetadata('title', 'subtitle', 'iconURL'),
      { CustomPayloadKey: 'CustomPayloadValue' },
      false,
      300.5
    );
    const location: IterableInAppLocation = IterableInAppLocation.inbox;
    const source: IterableInAppCloseSource = IterableInAppCloseSource.link;
    const url: string = 'ClickedURL';

    // WHEN Iterable.trackInAppClose is called
    Iterable.trackInAppClose(msg, location, source, url);

    // THEN corresponding method is called on MockIterableAPI with appropriate parameters
    expect(MockRNIterableAPI.trackInAppClose).toBeCalledWith(
      msg.messageId,
      location,
      source,
      url
    );
  });

  test('inAppConsume_params_methodCalledWithParams', () => {
    // GIVEN an in-app messsage, a location, and a delete source
    const msg = new IterableInAppMessage(
      'asdf',
      1234,
      new IterableInAppTrigger(IterableInAppTriggerType.never),
      undefined,
      undefined,
      false,
      undefined,
      undefined,
      false,
      300.5
    );
    const location: IterableInAppLocation = IterableInAppLocation.inApp;
    const source: IterableInAppDeleteSource = IterableInAppDeleteSource.unknown;

    // WHEN Iterable.inAppConsume is called
    Iterable.inAppConsume(msg, location, source);

    // THEN corresponding method is called on MockIterableAPI with appropriate parameters
    expect(MockRNIterableAPI.inAppConsume).toBeCalledWith(
      msg.messageId,
      location,
      source
    );
  });

  test('inAppHandler_messageAndEventEmitted_methodCalledWithMessage', () => {
    // sets up event emitter
    const nativeEmitter = new NativeEventEmitter();
    nativeEmitter.removeAllListeners(IterableEventName.handleInAppCalled);

    // sets up config file and inAppHandler function
    const config = new IterableConfig();
    config.inAppHandler = jest.fn((_message: IterableInAppMessage) => {
      return IterableInAppShowResponse.show;
    });

    // initialize Iterable object

    Iterable.initialize('apiKey', config);

    // GIVEN an in-app message
    const messageDict = {
      messageId: 'message1',
      campaignId: 1234,
      trigger: { type: IterableInAppTriggerType.immediate },
      priorityLevel: 300.5,
    };
    const expectedMessage = new IterableInAppMessage(
      'message1',
      1234,
      new IterableInAppTrigger(IterableInAppTriggerType.immediate),
      undefined,
      undefined,
      false,
      undefined,
      undefined,
      false,
      300.5
    );

    // WHEN handleInAppCalled event is emitted
    nativeEmitter.emit(IterableEventName.handleInAppCalled, messageDict);

    // THEN inAppHandler and MockRNIterableAPI.setInAppShowResponse is called with message
    expect(config.inAppHandler).toBeCalledWith(expectedMessage);
    expect(MockRNIterableAPI.setInAppShowResponse).toBeCalledWith(
      IterableInAppShowResponse.show
    );
  });

  test('getMessages_noParams_returnsMessages', async () => {
    // GIVEN a list of in-app messages representing the local queue
    const messageDicts = [
      {
        messageId: 'message1',
        campaignId: 1234,
        trigger: { type: IterableInAppTriggerType.immediate },
      },
      {
        messageId: 'message2',
        campaignId: 2345,
        trigger: { type: IterableInAppTriggerType.never },
      },
    ];
    const messages = messageDicts.map((message) =>
      IterableInAppMessage.fromDict(message)
    );

    // WHEN the simulated local queue is set to the in-app messages
    MockRNIterableAPI.setMessages(messages);

    // THEN Iterable,inAppManager.getMessages returns the list of in-app messages
    return await Iterable.inAppManager
      .getMessages()
      .then((messagesObtained) => {
        expect(messagesObtained).toEqual(messages);
      });
  });

  test('showMessage_messageAndConsume_returnsClickedUrl', async () => {
    // GIVEN an in-app message and a clicked url
    const messageDict = {
      messageId: 'message1',
      campaignId: 1234,
      trigger: { type: IterableInAppTriggerType.immediate },
    };
    const message: IterableInAppMessage =
      IterableInAppMessage.fromDict(messageDict);
    const consume: boolean = true;
    const clickedUrl: string = 'testUrl';

    // WHEN the simulated clicked url is set to the clicked url
    MockRNIterableAPI.setClickedUrl(clickedUrl);

    // THEN Iterable,inAppManager.showMessage returns the simulated clicked url
    return await Iterable.inAppManager
      .showMessage(message, consume)
      .then((url) => {
        expect(url).toEqual(clickedUrl);
      });
  });

  test('removeMessage_params_methodCalledWithParams', () => {
    // GIVEN an in-app message
    const messageDict = {
      messageId: 'message1',
      campaignId: 1234,
      trigger: { type: IterableInAppTriggerType.immediate },
    };
    const message = IterableInAppMessage.fromDict(messageDict);
    const location: IterableInAppLocation = IterableInAppLocation.inApp;
    const source: IterableInAppDeleteSource =
      IterableInAppDeleteSource.deleteButton;

    // WHEN Iterable.inAppManager.removeMessage is called
    Iterable.inAppManager.removeMessage(message, location, source);

    // THEN corresponding method is called on MockIterableAPI with appropriate parameters
    expect(MockRNIterableAPI.removeMessage).toBeCalledWith(
      message.messageId,
      location,
      source
    );
  });

  test('setReadForMessage_params_methodCalledWithParams', () => {
    // GIVEN an in-app message
    const messageDict = {
      messageId: 'message1',
      campaignId: 1234,
      trigger: { type: IterableInAppTriggerType.immediate },
    };
    const message = IterableInAppMessage.fromDict(messageDict);
    const read: boolean = true;

    // WHEN Iterable.inAppManager.setReadForMessage is called
    Iterable.inAppManager.setReadForMessage(message, read);

    // THEN corresponding method is called on MockRNIterableAPI with appropriate parameters
    expect(MockRNIterableAPI.setReadForMessage).toBeCalledWith(
      message.messageId,
      read
    );
  });

  test('setAutoDisplayPaused_params_methodCalledWithParams', () => {
    // GIVEN paused flag
    const paused: boolean = true;

    // WHEN Iterable.inAppManager.setAutoDisplayPaused is called
    Iterable.inAppManager.setAutoDisplayPaused(paused);

    // THEN corresponding method is called on MockRNIterableAPI with appropriate parameters
    expect(MockRNIterableAPI.setAutoDisplayPaused).toBeCalledWith(paused);
  });
});
