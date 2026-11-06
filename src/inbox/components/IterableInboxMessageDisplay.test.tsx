import { act, fireEvent, render, waitFor } from '@testing-library/react-native';

import { MockLinking } from '../../__mocks__/MockLinking';
import { MockRNIterableAPI } from '../../__mocks__/MockRNIterableAPI';
import { Iterable } from '../../core/classes/Iterable';
import { IterableActionContext } from '../../core/classes/IterableActionContext';
import { IterableConfig } from '../../core/classes/IterableConfig';
import { IterableEdgeInsets } from '../../core/classes/IterableEdgeInsets';
import { IterableActionSource } from '../../core/enums/IterableActionSource';
import { IterableHtmlInAppContent } from '../../inApp/classes/IterableHtmlInAppContent';
import { IterableInAppMessage } from '../../inApp/classes/IterableInAppMessage';
import { IterableInAppTrigger } from '../../inApp/classes/IterableInAppTrigger';
import { IterableInboxMetadata } from '../../inApp/classes/IterableInboxMetadata';
import { IterableInAppTriggerType } from '../../inApp/enums/IterableInAppTriggerType';
import { IterableInAppCloseSource } from '../../inApp/enums/IterableInAppCloseSource';
import { IterableInAppLocation } from '../../inApp/enums/IterableInAppLocation';
import type { IterableInboxRowViewModel } from '../types';
import { IterableInboxMessageDisplay } from './IterableInboxMessageDisplay';

jest.mock('react-native-webview', () => {
  const React = require('react');
  const { View } = require('react-native');
  const WebView = (props: {
    onMessage?: (event: { nativeEvent: { data: string } }) => void;
  }) =>
    React.createElement(View, {
      testID: 'inbox-message-webview',
      onMessage: props.onMessage,
    });
  return { WebView };
});

describe('IterableInboxMessageDisplay', () => {
  const messageId = 'msg-1';

  const rowViewModel: IterableInboxRowViewModel = {
    title: 'T',
    read: false,
    inAppMessage: new IterableInAppMessage(
      messageId,
      1,
      new IterableInAppTrigger(IterableInAppTriggerType.never),
      undefined,
      undefined,
      true,
      new IterableInboxMetadata('Hello', undefined, undefined),
      undefined,
      false,
      0
    ),
  };

  const htmlContent = new IterableHtmlInAppContent(
    new IterableEdgeInsets(0, 0, 0, 0),
    '<html><body></body></html>'
  );

  let deleteRow: jest.Mock;
  let returnToInbox: jest.Mock;
  let urlHandler: jest.Mock;
  let customActionHandler: jest.Mock;
  let trackInAppClickSpy: jest.SpyInstance;
  let trackInAppCloseSpy: jest.SpyInstance;

  beforeEach(() => {
    deleteRow = jest.fn();
    returnToInbox = jest.fn((callback?: () => void) => {
      callback?.();
    });
    urlHandler = jest.fn();
    customActionHandler = jest.fn();

    const config = new IterableConfig();
    config.urlHandler = urlHandler;
    config.customActionHandler = customActionHandler;
    Iterable.savedConfig = config;

    trackInAppClickSpy = jest
      .spyOn(Iterable, 'trackInAppClick')
      .mockImplementation(() => {});
    trackInAppCloseSpy = jest
      .spyOn(Iterable, 'trackInAppClose')
      .mockImplementation(() => {});

    MockRNIterableAPI.trackInAppClick.mockClear();
    MockRNIterableAPI.trackInAppClose.mockClear();
    MockLinking.openURL.mockClear();
  });

  afterEach(() => {
    trackInAppClickSpy.mockRestore();
    trackInAppCloseSpy.mockRestore();
    Iterable.savedConfig = new IterableConfig();
  });

  async function renderWithContent() {
    const utils = render(
      <IterableInboxMessageDisplay
        rowViewModel={rowViewModel}
        inAppContentPromise={Promise.resolve(htmlContent)}
        returnToInbox={returnToInbox}
        deleteRow={deleteRow}
        contentWidth={320}
        isPortrait
      />
    );
    await act(async () => {
      await Promise.resolve();
    });
    return utils;
  }

  function postMessage(
    getByTestId: (id: string) => {
      props: { onMessage?: (e: { nativeEvent: { data: string } }) => void };
    },
    url: string
  ) {
    const webView = getByTestId('inbox-message-webview');
    const onMessage = webView.props.onMessage;
    expect(onMessage).toBeDefined();
    onMessage!({ nativeEvent: { data: url } });
  }

  it('should open http(s) in the system browser and return to the inbox', async () => {
    const { getByTestId } = await renderWithContent();
    const url = 'https://example.com/path';

    postMessage(getByTestId, url);

    expect(trackInAppClickSpy).toHaveBeenCalledWith(
      rowViewModel.inAppMessage,
      IterableInAppLocation.inbox,
      url
    );
    expect(trackInAppCloseSpy).toHaveBeenCalledWith(
      rowViewModel.inAppMessage,
      IterableInAppLocation.inbox,
      IterableInAppCloseSource.link,
      url
    );
    expect(returnToInbox).toHaveBeenCalled();
    expect(MockLinking.openURL).toHaveBeenCalledWith(url);
    expect(deleteRow).not.toHaveBeenCalled();
    expect(urlHandler).not.toHaveBeenCalled();
  });

  it('should delete the row and return to the inbox for iterable://delete', async () => {
    const { getByTestId } = await renderWithContent();

    postMessage(getByTestId, 'iterable://delete');

    expect(deleteRow).toHaveBeenCalledWith(messageId);
    expect(returnToInbox).toHaveBeenCalled();
    expect(urlHandler).not.toHaveBeenCalled();
    expect(MockLinking.openURL).not.toHaveBeenCalled();
  });

  it('should return to the inbox for iterable://dismiss without deleting', async () => {
    const { getByTestId } = await renderWithContent();

    postMessage(getByTestId, 'iterable://dismiss');

    expect(returnToInbox).toHaveBeenCalled();
    expect(deleteRow).not.toHaveBeenCalled();
    expect(urlHandler).not.toHaveBeenCalled();
  });

  it('should invoke customActionHandler with the action type for action:// URLs', async () => {
    const { getByTestId } = await renderWithContent();
    const url = 'action://foo';

    postMessage(getByTestId, url);

    await waitFor(() => {
      expect(customActionHandler).toHaveBeenCalled();
    });

    expect(customActionHandler).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'foo' }),
      expect.any(IterableActionContext)
    );
    const [, context] = customActionHandler.mock.calls[0];
    expect(context.source).toBe(IterableActionSource.inApp);
    expect(returnToInbox).toHaveBeenCalled();
    expect(urlHandler).not.toHaveBeenCalled();
  });

  it('should swallow unknown iterable:// URLs without calling urlHandler or returning to inbox', async () => {
    const { getByTestId } = await renderWithContent();

    postMessage(getByTestId, 'iterable://foo');

    expect(returnToInbox).not.toHaveBeenCalled();
    expect(urlHandler).not.toHaveBeenCalled();
    expect(MockLinking.openURL).not.toHaveBeenCalled();
    expect(deleteRow).not.toHaveBeenCalled();
  });

  it('should pass other URLs to urlHandler', async () => {
    const { getByTestId } = await renderWithContent();
    const url = 'myapp://screen';

    postMessage(getByTestId, url);

    await waitFor(() => {
      expect(urlHandler).toHaveBeenCalledWith(url, expect.any(IterableActionContext));
    });
    expect(returnToInbox).toHaveBeenCalled();
    expect(MockLinking.openURL).not.toHaveBeenCalled();
  });

  it('should forward click tracking to the native bridge', async () => {
    trackInAppClickSpy.mockRestore();
    trackInAppCloseSpy.mockRestore();

    const { getByTestId } = await renderWithContent();
    const url = 'https://example.com/x';

    postMessage(getByTestId, url);

    expect(MockRNIterableAPI.trackInAppClick).toHaveBeenCalledWith(
      messageId,
      IterableInAppLocation.inbox,
      url
    );
    expect(MockRNIterableAPI.trackInAppClose).toHaveBeenCalledWith(
      messageId,
      IterableInAppLocation.inbox,
      IterableInAppCloseSource.link,
      url
    );
  });

  it('should track close when the back button is pressed', async () => {
    trackInAppClickSpy.mockRestore();
    trackInAppCloseSpy.mockRestore();

    const { getByText } = await renderWithContent();

    fireEvent.press(getByText('Inbox'));

    expect(returnToInbox).toHaveBeenCalled();
    expect(MockRNIterableAPI.trackInAppClose).toHaveBeenCalledWith(
      messageId,
      IterableInAppLocation.inbox,
      IterableInAppCloseSource.back,
      undefined
    );
  });
});
