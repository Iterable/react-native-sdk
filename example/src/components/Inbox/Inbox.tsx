import {
  IterableInbox,
  type IterableInboxProps,
} from '@iterable/react-native-sdk';

import { useIterableApp } from '../../hooks';
import { iterableInboxCustomization } from './Inbox.constants';

export const Inbox = (props: IterableInboxProps) => {
  const { returnToInboxTrigger } = useIterableApp();

  return (
    <IterableInbox
      returnToInboxTrigger={returnToInboxTrigger}
      customizations={iterableInboxCustomization}
      {...props}
    />
  );
};

export default Inbox;
