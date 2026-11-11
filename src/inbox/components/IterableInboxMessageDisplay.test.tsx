import { View } from 'react-native';
import {
  act,
  fireEvent,
  render,
  type RenderResult,
  waitFor,
} from '@testing-library/react-native';

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

  async function renderWithContent(): Promise<RenderResult> {
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

  /** Global setup mocks `WebView` as `View`; pick the node wired with `onMessage`. */
  function postWebViewMessage(utils: RenderResult, url: string) {
    const candidates = utils.UNSAFE_getAllByType(View);
    const webView = candidates.find(
      (node) => typeof node.props.onMessage === 'function'
    );
    expect(webView).toBeDefined();
    const onMessage = webView!.props.onMessage as (
      e: { nativeEvent: { data: string } }
    ) => void;
    onMessage({ nativeEvent: { data: url } });
  }

  it('should open http(s) in the system browser and return to the inbox', async () => {
    const utils = await renderWithContent();
    const url = 'https://example.com/path';

    postWebViewMessage(utils, url);

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
    const utils = await renderWithContent();

    postWebViewMessage(utils, 'iterable://delete');

    expect(deleteRow).toHaveBeenCalledWith(messageId);
    expect(returnToInbox).toHaveBeenCalled();
    expect(urlHandler).not.toHaveBeenCalled();
    expect(customActionHandler).not.toHaveBeenCalled();
    expect(MockLinking.openURL).not.toHaveBeenCalled();
  });

  it('should return to the inbox for iterable://dismiss without deleting', async () => {
    const utils = await renderWithContent();

    postWebViewMessage(utils, 'iterable://dismiss');

    expect(returnToInbox).toHaveBeenCalled();
    expect(deleteRow).not.toHaveBeenCalled();
    expect(urlHandler).not.toHaveBeenCalled();
    expect(customActionHandler).not.toHaveBeenCalled();
  });

  it('should invoke customActionHandler with the action type for action:// URLs', async () => {
    const utils = await renderWithContent();
    const url = 'action://foo';

    postWebViewMessage(utils, url);

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

  it('should close the message for unknown iterable:// URLs without calling any handler', async () => {
    const utils = await renderWithContent();
    const url = 'iterable://foo';

    postWebViewMessage(utils, url);

    expect(returnToInbox).toHaveBeenCalledTimes(1);
    expect(trackInAppClickSpy).toHaveBeenCalledTimes(1);
    expect(trackInAppCloseSpy).toHaveBeenCalledTimes(1);
    expect(trackInAppCloseSpy).toHaveBeenCalledWith(
      rowViewModel.inAppMessage,
      IterableInAppLocation.inbox,
      IterableInAppCloseSource.link,
      url
    );
    expect(urlHandler).not.toHaveBeenCalled();
    expect(customActionHandler).not.toHaveBeenCalled();
    expect(MockLinking.openURL).not.toHaveBeenCalled();
    expect(deleteRow).not.toHaveBeenCalled();
  });

  it('should pass other URLs to urlHandler', async () => {
    const utils = await renderWithContent();
    const url = 'myapp://screen';

    postWebViewMessage(utils, url);

    await waitFor(() => {
      expect(urlHandler).toHaveBeenCalledWith(url, expect.any(IterableActionContext));
    });
    expect(returnToInbox).toHaveBeenCalled();
    expect(MockLinking.openURL).not.toHaveBeenCalled();
  });

  it('should forward click tracking to the native bridge', async () => {
    trackInAppClickSpy.mockRestore();
    trackInAppCloseSpy.mockRestore();

    const utils = await renderWithContent();
    const url = 'https://example.com/x';

    postWebViewMessage(utils, url);

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
