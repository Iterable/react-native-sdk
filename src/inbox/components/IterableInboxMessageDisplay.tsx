import { useEffect, useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import {
  Iterable,
  IterableAction,
  IterableActionContext,
  IterableActionSource,
  IterableEdgeInsets,
} from '../../core';
import {
  IterableHtmlInAppContent,
  IterableInAppCloseSource,
  IterableInAppLocation,
} from '../../inApp';

import { type IterableInboxRowViewModel } from '../types';

// TODO: Comment
export interface IterableInboxMessageDisplayProps {
  rowViewModel: IterableInboxRowViewModel;
  inAppContentPromise: Promise<IterableHtmlInAppContent>;
  returnToInbox: (
    /** Callback to be executed after returning to the inbox */
    callback?: () => void
  ) => void;
  deleteRow: (
    /** Id of the row to be deleted */
    id: string
  ) => void;
  contentWidth: number;
  isPortrait: boolean;
}

// TODO: Comment
export const IterableInboxMessageDisplay = ({
  rowViewModel,
  inAppContentPromise,
  returnToInbox,
  deleteRow,
  contentWidth,
  isPortrait,
}: IterableInboxMessageDisplayProps) => {
  const messageTitle = rowViewModel.inAppMessage.inboxMetadata?.title;
  const [inAppContent, setInAppContent] = useState<IterableHtmlInAppContent>(
    new IterableHtmlInAppContent(new IterableEdgeInsets(0, 0, 0, 0), '')
  );

  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },

    messageDisplayContainer: {
      backgroundColor: 'whitesmoke',
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
      backgroundColor: 'whitesmoke',
      fontSize: 20,
      fontWeight: 'bold',
    },

    returnButton: {
      alignItems: 'center',
      flexDirection: 'row',
    },

    returnButtonContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginLeft: 0,
      marginTop: 0,
      width: '25%',
    },

    returnButtonIcon: {
      color: 'deepskyblue',
      fontSize: 40,
      paddingLeft: 0,
    },

    returnButtonText: {
      color: 'deepskyblue',
      fontSize: 20,
    },
  });

  const {
    header,
    returnButton,
    returnButtonIcon,
    returnButtonText,
    messageTitleContainer,
    messageTitleText,
    messageDisplayContainer,
  } = styles;
  let { returnButtonContainer } = styles;

  // orientation dependent styling
  returnButtonContainer = !isPortrait
    ? { ...returnButtonContainer, marginLeft: 80 }
    : returnButtonContainer;

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
    <View style={messageDisplayContainer}>
      <View style={header}>
        <View style={returnButtonContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              returnToInbox();
              Iterable.trackInAppClose(
                rowViewModel.inAppMessage,
                IterableInAppLocation.inbox,
                IterableInAppCloseSource.back
              );
            }}
          >
            <View style={returnButton}>
              <Icon name="chevron-back-outline" style={returnButtonIcon} />
              <Text style={returnButtonText}>Inbox</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={messageTitleContainer}>
          <View style={styles.messageTitle}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={messageTitleText}
            >
              {messageTitle}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <WebView
          originWhiteList={['*']}
          source={{ html: inAppContent.html }}
          style={{ width: contentWidth }}
          onMessage={(event) => handleInAppLinkAction(event)}
          injectedJavaScript={JS}
        />
      </ScrollView>
    </View>
  );
};
