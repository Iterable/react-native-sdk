import { Iterable } from '../../../core/classes/Iterable';
import { IterableAction } from '../../../core/classes/IterableAction';
import { IterableActionContext } from '../../../core/classes/IterableActionContext';
import { IterableActionSource } from '../../../core/enums';
import { isIterableAction } from '../../../core/utils';
import type { IterableEmbeddedMessage } from '../../classes/IterableEmbeddedMessage';
import type { IterableEmbeddedMessageElementsButton } from '../../classes/IterableEmbeddedMessageElementsButton';

const getUrl = (button: IterableEmbeddedMessageElementsButton) => {
  const { data, type: actionType } = button.action ?? {};
  return data && data?.length > 0 ? data : actionType;
};

export const runButtonClick = (
  button: IterableEmbeddedMessageElementsButton,
  message: IterableEmbeddedMessage
) => {
  const url = getUrl(button);
  const source = IterableActionSource.embedded;

  Iterable.embeddedManager.trackClick(message, button.id, url ?? null);

  if (isIterableAction(url)) {
    const action = new IterableAction(
      (url ?? '').replace('action://', ''),
      button?.action?.data,
      ''
    );

    const context = new IterableActionContext(action, source);

    if (Iterable.savedConfig.customActionHandler) {
      Iterable.savedConfig.customActionHandler(action, context);
    }
  } else {
    const action = new IterableAction('openUrl', url, '');
    const context = new IterableActionContext(action, source);

    if (Iterable.savedConfig.urlHandler) {
      Iterable.savedConfig.urlHandler(url ?? '', context);
    }
  }
};
