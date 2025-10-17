import { useEffect, useState } from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import {
  IterableAction,
  IterableActionContext,
  IterableActionSource,
} from '../../core';
// expo throws an error if this is not imported directly due to circular
// dependencies
import { Iterable } from '../../core/classes/Iterable';
import {
  IterableHtmlInAppContent,
  IterableInAppCloseSource,
  IterableInAppLocation,
} from '../../inApp';
import { ITERABLE_INBOX_COLORS } from '../constants';
import { type IterableInboxRowViewModel } from '../types';
import { HeaderBackButton } from './HeaderBackButton';

export const iterableMessageDisplayTestIds = {
  container: 'iterable-message-display-container',
  returnButton: 'iterable-message-display-return-button',
  messageTitle: 'iterable-message-display-message-title',
  webview: 'iterable-message-display-webview',
};

/**
 * Props for the IterableInboxMessageDisplay component.
 */
export interface IterableInboxMessageDisplayProps {
  /**
   * The view model for the inbox row.
   */
  rowViewModel: IterableInboxRowViewModel;

  /**
   * A promise that resolves to the HTML content of the in-app message.
   */
  inAppContentPromise: Promise<IterableHtmlInAppContent>;

  /**
   * Function to return to the inbox, with an optional callback to be executed after returning.
   * @param callback - Optional callback to be executed after returning to the inbox.
   */
  returnToInbox: (callback?: () => void) => void;

  /**
   * Function to delete a row from the inbox.
   * @param id - The ID of the row to be deleted.
   */
  deleteRow: (id: string) => void;

  /**
   * The width of the content.
   */
  contentWidth: number;

  /**
   * Boolean indicating if the device is in portrait mode.
   */
  isPortrait: boolean;
}

/**
 * Component to display an Iterable inbox message.
 */
export const IterableInboxMessageDisplay = ({
  rowViewModel,
  inAppContentPromise,
  returnToInbox,
  deleteRow,
  contentWidth,
  isPortrait,
}: IterableInboxMessageDisplayProps) => {
  const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title;
  const [inAppContent, setInAppContent] =
    useState<IterableHtmlInAppContent | null>(null);

  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
    },

    header: {
      flexDirection: 'row',
      height: Platform.OS === 'ios' ? 44 : 56,
      justifyContent: 'center',
      width: '100%',
    },

    messageDisplayContainer: {
      backgroundColor: ITERABLE_INBOX_COLORS.CONTAINER_BACKGROUND,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'flex-start',
      width: contentWidth,
    },

    messageTitle: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      width: 0.5 * contentWidth,
    },

    messageTitleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 0,
      width: '75%',
    },

    messageTitleText: {
      backgroundColor: ITERABLE_INBOX_COLORS.CONTAINER_BACKGROUND,
      fontSize: 20,
      fontWeight: 'bold',
    },

    returnButtonContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginLeft: 0,
      marginTop: 0,
      width: '25%',
      ...(isPortrait ? {} : { marginLeft: 80 }),
    },
  });

  const JS = `
      const links = document.querySelectorAll('a')

      links.forEach(link => {
         link.class = link.href

         link.href = "javascript:void(0)"

         link.addEventListener("click", () => {
            window.ReactNativeWebView.postMessage(link.class)
         })
      })
   `;

  useEffect(() => {
    let mounted = true;
    inAppContentPromise.then((value) => {
      if (mounted) {
        setInAppContent(value);
      }
    });
    return () => {
      mounted = false;
    };
  });

  function handleInAppLinkAction(event: WebViewMessageEvent) {
    const URL = event.nativeEvent.data;

    const action = new IterableAction('openUrl', URL, '');
    const source = IterableActionSource.inApp;
    const context = new IterableActionContext(action, source);

    Iterable.trackInAppClick(
      rowViewModel.inAppMessage,
      IterableInAppLocation.inbox,
      URL
    );
    Iterable.trackInAppClose(
      rowViewModel.inAppMessage,
      IterableInAppLocation.inbox,
      IterableInAppCloseSource.link,
      URL
    );

    //handle delete action
    if (URL === 'iterable://delete') {
      returnToInbox(() => deleteRow(rowViewModel.inAppMessage.messageId));
      //handle dismiss action
    } else if (URL === 'iterable://dismiss') {
      returnToInbox();
      //handle external link
    } else if (URL.slice(0, 4) === 'http') {
      returnToInbox(() => Linking.openURL(URL));
      //handle custom action
    } else if (URL.slice(0, 9) === 'action://') {
      action.type = URL.replace('action://', '');
      returnToInbox(() => {
        if (Iterable.savedConfig.customActionHandler) {
          Iterable.savedConfig.customActionHandler(action, context);
        }
      });
      //handle deep link or error link
    } else {
      returnToInbox(() => {
        if (Iterable.savedConfig.urlHandler) {
          Iterable.savedConfig.urlHandler(URL, context);
        }
      });
    }
  }

  return (
    <View
      testID={iterableMessageDisplayTestIds.container}
      style={styles.messageDisplayContainer}
    >
      <View style={styles.header}>
        <View style={styles.returnButtonContainer}>
          <HeaderBackButton
            testID={iterableMessageDisplayTestIds.returnButton}
            label="Inbox"
            onPress={() => {
              returnToInbox();
              Iterable.trackInAppClose(
                rowViewModel.inAppMessage,
                IterableInAppLocation.inbox,
                IterableInAppCloseSource.back
              );
            }}
          />
        </View>
        <View style={styles.messageTitleContainer}>
          <View style={styles.messageTitle}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.messageTitleText}
              testID={iterableMessageDisplayTestIds.messageTitle}
            >
              {messageTitle}
            </Text>
          </View>
        </View>
      </View>
      {inAppContent && (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <WebView
            testID={iterableMessageDisplayTestIds.webview}
            originWhiteList={['*']}
            source={{ html: inAppContent.html }}
            style={{ width: contentWidth }}
            onMessage={(event) => handleInAppLinkAction(event)}
            injectedJavaScript={JS}
          />
        </ScrollView>
      )}
    </View>
  );
};
