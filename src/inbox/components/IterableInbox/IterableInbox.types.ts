import type { IterableInboxCustomizations } from "../../types";
import type { IterableInboxMessageListProps } from "../IterableInboxMessageList";

/**
 * Props for the IterableInbox component.
 */
export interface IterableInboxProps
  extends Partial<
    Pick<IterableInboxMessageListProps, 'messageListItemLayout'>
  > {
  /**
   * Flag which, when switched, returns a user to their inbox from _within_ the
   * inbox component (from the details of the particular message to the message
   * list) if the inbox is already in view.
   *
   * @remarks
   * Let's say you have bottom tabs in your app, and one of them is the inbox.
   * If you click on a message, you may want to be able to return to the inbox
   * by clicking on the bottom tab inbox icon.
   *
   * If this prop is included and correctly set up, clicking on the bottom inbox
   * tab when a message is in focus will return the user to the inbox.
   *
   * If this prop is **NOT** included, clicking on the bottom inbox tab when a
   * message is in focus will have no effect.
   *
   * @example
   * ```tsx
   *  import { NavigationContainer } from '@react-navigation/native';
   *  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
   *  import { IterableInbox} from '@iterable/react-native-sdk/js/Iterable';
   *
   *  const Tab = createBottomTabNavigator();
   *
   *  const MyNavigation = () => {
   *    const [isInbox, setIsInbox] = useState<boolean>(false);
   *    const [returnToInboxTrigger, setReturnToInboxTrigger] = useState<boolean>(false);
   *
   *    return (
   *      <NavigationContainer>
   *        <Tab.Navigator>
   *          <Tab.Screen
   *            name="Home"
   *            component={Home}
   *            listeners={{tabPress: () => setIsInbox(false)}}
   *          />
   *          <Tab.Screen
   *            name="Inbox"
   *            listeners={{
   *              tabPress: () => {
   *                // if this is true, then the inbox is already displayed, so
   *                // go back to the message list if it is not already in view
   *                if (isInbox) {
   *                  setReturnToInboxTrigger(!returnToInboxTrigger);
   *                }
   *                setIsInbox(true);
   *              }
   *            }}
   *          >
   *            {() => (
   *              <IterableInbox
   *                returnToInboxTrigger={returnToInboxTrigger}
   *              />
   *            )}
   *          </Tab.Screen>
   *          <Tab.Screen
   *            name="Settings"
   *            component={Settings}
   *            listeners={{tabPress: () => setIsInbox(false)}}
   *          />
   *        </Tab.Navigator>
   *      </NavigationContainer>
   *    );
   *  }
   * ```
   */
  returnToInboxTrigger?: boolean;
  /** Customization for the look and feel of the inbox. */
  customizations?: IterableInboxCustomizations;
  /**
   * The height of the tab bar.
   *
   * If your app uses custom tab bar dimensions, provide this value to make sure that the inbox component lays out as expected.
   */
  tabBarHeight?: number;
  /**
   * The padding of the tab bar.
   *
   * If your app uses custom tab bar dimensions, provide this value to make sure that the inbox component lays out as expected.
   */
  tabBarPadding?: number;
  /**
   * Is safe area mode enabled?
   *
   * @remarks
   * This indicates whether or not the inbox should be displayed inside a React
   * Native [`SafeAreaView`](https://reactnative.dev/docs/safeareaview).
   *
   * If the parent of the inbox component is already inside a `SafeAreaView`, set
   * this to `false` as another `SafeAreaView` is not needed.
   *
   * @example
   * ```tsx
   *  // Safe area mode should be `true` as it is NOT already inside a `SafeAreaView`
   *  const MyInbox = () => <IterableInbox safeAreaMode={true} />;
   *
   *  // Safe area mode should be `false` as it is already inside a `SafeAreaView`
   *  const MyInbox = () => (
   *    <SafeAreaView>
   *      <IterableInbox safeAreaMode={false} />
   *    </SafeAreaView>
   *  );
   * ```
   */
  safeAreaMode?: boolean;
  /** Should the navigation title be shown? */
  showNavTitle?: boolean;
}
