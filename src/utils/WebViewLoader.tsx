/* eslint-disable @typescript-eslint/no-var-requires,
@typescript-eslint/no-require-imports, react-native/no-inline-styles, react-native/no-color-literals */
/**
 * Utility for dynamically loading react-native-webview
 * This allows the SDK to work without requiring react-native-webview as a dependency
 * when WebView functionality is not needed.
 */

import { View, Text } from 'react-native';

/**
 * Error thrown when react-native-webview is not available but is required
 */
export class WebViewNotAvailableError extends Error {
  constructor() {
    super(
      'react-native-webview is required but not installed. Please install it using: npm install react-native-webview or yarn add react-native-webview'
    );
    this.name = 'WebViewNotAvailableError';
  }
}

/**
 * Dynamically loads the WebView component from react-native-webview
 * @returns The WebView component
 * @throws \{WebViewNotAvailableError\} When react-native-webview is not installed
 */
export function loadWebView(): React.ComponentType<{
  originWhiteList?: string[];
  source?: { html: string };
  style?: object;
  onMessage?: (event: { nativeEvent: { data: string } }) => void;
  injectedJavaScript?: string;
}> {
  try {
    // Try to require react-native-webview dynamically
    const { WebView } = require('react-native-webview');
    return WebView;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new WebViewNotAvailableError();
  }
}

/**
 * Dynamically loads the WebViewMessageEvent type from react-native-webview
 * @returns The WebViewMessageEvent type
 * @throws \{WebViewNotAvailableError\} When react-native-webview is not installed
 */
export function loadWebViewMessageEventType(): {
  nativeEvent: { data: string };
} {
  try {
    // Try to require the type from react-native-webview
    const { WebViewMessageEvent } = require('react-native-webview');
    return WebViewMessageEvent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new WebViewNotAvailableError();
  }
}

/**
 * Checks if react-native-webview is available without throwing an error
 * @returns true if react-native-webview is available, false otherwise
 */
export function isWebViewAvailable(): boolean {
  try {
    require('react-native-webview');
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
}

/**
 * Fallback WebView component that shows an error message
 * Used when react-native-webview is not available
 */
interface FallbackWebViewProps {
  style?: object;
}

export const FallbackWebView = ({ style }: FallbackWebViewProps) => {
  return (
    <View
      style={[
        style,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        },
      ]}
    >
      <View
        style={{
          padding: 20,
          backgroundColor: '#fff',
          borderRadius: 8,
          margin: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          WebView Not Available
        </Text>
        <Text style={{ fontSize: 14, textAlign: 'center', color: '#666' }}>
          react-native-webview is required to display this content.
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'center',
            color: '#999',
            marginTop: 10,
          }}
        >
          Please install: npm install react-native-webview
        </Text>
      </View>
    </View>
  );
};
