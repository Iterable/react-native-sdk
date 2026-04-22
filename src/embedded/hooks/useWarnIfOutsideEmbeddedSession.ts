import { useContext, useEffect } from 'react';

import { EmbeddedSessionContext } from '../context/EmbeddedSessionContext';

/**
 * When the embedded UI component is not under `EmbeddedSessionManager`, logs
 * `console.warn` and returns `true` so callers can show on-screen dev text.
 */
export function useWarnIfOutsideEmbeddedSession(
  componentName: string
): boolean {
  const isInsideEmbeddedSession = useContext(EmbeddedSessionContext);
  const isOutsideEmbeddedSession = !isInsideEmbeddedSession;

  useEffect(() => {
    if (isOutsideEmbeddedSession) {
      console.warn(
        `[Iterable] ${componentName} should be rendered inside <EmbeddedSessionManager> so embedded session tracking works correctly.`
      );
    }
  }, [componentName, isOutsideEmbeddedSession]);

  return isOutsideEmbeddedSession;
}
