import { useContext, useEffect } from 'react';

import { EmbeddedSessionContext } from '../context/EmbeddedSessionContext';

/**
 * Logs a dev warning when an embedded UI component is not under
 * `EmbeddedSessionManager`.
 */
export function useWarnIfOutsideEmbeddedSession(componentName: string): void {
  const isInsideEmbeddedSession = useContext(EmbeddedSessionContext);

  useEffect(() => {
    if (!isInsideEmbeddedSession) {
      console.warn(
        `[Iterable] ${componentName} should be rendered inside <EmbeddedSessionManager> so embedded session tracking works correctly.`
      );
    }
  }, [componentName, isInsideEmbeddedSession]);
}
