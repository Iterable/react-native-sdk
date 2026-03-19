import type { PropsWithChildren, ReactNode } from 'react';
import { useContext, useEffect } from 'react';

import { Iterable } from '../../core/classes/Iterable';
import { EmbeddedSessionContext } from '../context/EmbeddedSessionContext';

export interface EmbeddedSessionManagerProps {
  children?: ReactNode;
  /**
   * Is the current screen in focus?
   *
   * When `false`, this wrapper does not start an embedded session (e.g. host
   * screen not focused). Defaults to `true`.
   *
   * This is not necessary to use.  It is only useful if you want to avoid
   * starting the session when the screen is hidden but still technically there.
   */
  isActive?: boolean;
}

/**
 * Wraps embedded content and tracks an embedded session for its lifecycle.
 *
 * If nested, only the top-most wrapper starts and ends the session.
 */
export const EmbeddedSessionManager = ({
  children,
  isActive = true,
}: PropsWithChildren<EmbeddedSessionManagerProps>) => {
  const hasActiveParentSession = useContext(EmbeddedSessionContext);

  useEffect(() => {
    if (hasActiveParentSession || !isActive) {
      return;
    }

    Iterable.embeddedManager.startSession();

    return () => {
      Iterable.embeddedManager.endSession();
    };
  }, [hasActiveParentSession, isActive]);

  return (
    <EmbeddedSessionContext.Provider value={true}>
      {children}
    </EmbeddedSessionContext.Provider>
  );
};
