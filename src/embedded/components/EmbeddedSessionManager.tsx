import type { ReactNode } from 'react';
import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import type { ViewProps } from 'react-native';

import { Iterable } from '../../core/classes/Iterable';
import { EmbeddedSessionContext } from '../context/EmbeddedSessionContext';

interface EmbeddedSessionManagerProps extends ViewProps {
  children?: ReactNode;
}

/**
 * Wraps embedded content and tracks an embedded session for its lifecycle.
 *
 * If nested, only the top-most wrapper starts and ends the session.
 */
export const EmbeddedSessionManager = ({
  children,
  ...viewProps
}: EmbeddedSessionManagerProps) => {
  const hasActiveParentSession = useContext(EmbeddedSessionContext);

  useEffect(() => {
    if (hasActiveParentSession) {
      return;
    }

    Iterable.embeddedManager.syncMessages();
    Iterable.embeddedManager.startSession();

    return () => {
      Iterable.embeddedManager.endSession();
    };
  }, [hasActiveParentSession]);

  return (
    <EmbeddedSessionContext.Provider value={true}>
      <View {...viewProps}>{children}</View>
    </EmbeddedSessionContext.Provider>
  );
};
