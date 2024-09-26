import { IterableInbox, type IterableInboxProps } from '@iterable/react-native-sdk';
import { WebView } from 'react-native-webview';
import useIterableApp from '../hooks/useIterableApp';

const iterableInboxCustomization = {
  navTitle: 'Iterable',
  noMessagesTitle: 'No messages today',
  noMessagesBody: 'Come back later',

  unreadIndicatorContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  unreadIndicator: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: 'orange',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },

  unreadMessageIconContainer: {
    paddingLeft: 0,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  readMessageIconContainer: {
    paddingLeft: 35,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  messageContainer: {
    paddingLeft: 10,
    width: '65%',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  title: {
    fontSize: 22,
    paddingBottom: 10,
  },

  body: {
    fontSize: 15,
    color: 'lightgray',
    width: '65%',
    flexWrap: 'wrap',
    paddingBottom: 10,
  },

  createdAt: {
    fontSize: 12,
    color: 'lightgray',
  },

  messageRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    height: 200,
    borderStyle: 'solid',
    borderColor: 'red',
    borderTopWidth: 1,
  },
};

export default function CustomizedInbox(props: IterableInboxProps) {
  const { returnToInboxTrigger } = useIterableApp();
  return (
    <IterableInbox
      returnToInboxTrigger={returnToInboxTrigger}
      customizations={iterableInboxCustomization}
      {...props}
    />
  );
}
