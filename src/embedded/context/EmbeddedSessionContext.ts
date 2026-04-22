import { createContext } from 'react';

/**
 * `true` when the tree is under `EmbeddedSessionManager`.
 */
export const EmbeddedSessionContext = createContext(false);
