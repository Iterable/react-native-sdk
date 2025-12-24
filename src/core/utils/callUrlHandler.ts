import { Linking } from 'react-native';
import type { IterableActionContext } from '../classes/IterableActionContext';
import { IterableLogger } from '../classes/IterableLogger';
import type { IterableConfig } from '../classes/IterableConfig';

/**
 * Calls the URL handler and attempts to open the URL if the handler returns false.
 *
 * @param config - The config to use.
 * @param url - The URL to call.
 * @param context - The context to use.
 */
export function callUrlHandler(
  config: IterableConfig,
  url: string,
  context: IterableActionContext
) {
  if (!config.urlHandler?.(url, context)) {
    Linking.canOpenURL(url)
      .then((canOpen) => {
        if (canOpen) {
          Linking.openURL(url);
        } else {
          IterableLogger?.log('Url cannot be opened: ' + url);
        }
      })
      .catch((reason) => {
        IterableLogger?.log('Error opening url: ' + reason);
      });
  }
}
