import { IterableEmbeddedManager } from '../../embedded/classes/IterableEmbeddedManager';
import { IterableInAppManager } from '../../inApp/classes/IterableInAppManager';
import { IterableAuthManager } from '../classes/IterableAuthManager';
import { IterableConfig } from '../classes/IterableConfig';
import { IterableLogger } from '../classes/IterableLogger';

export const defaultConfig = new IterableConfig();
export const defaultLogger = new IterableLogger(defaultConfig);
export const defaultInAppManager = new IterableInAppManager(defaultLogger);
export const defaultAuthManager = new IterableAuthManager(defaultLogger);
export const defaultEmbeddedManager = new IterableEmbeddedManager(
  defaultLogger,
  defaultConfig
);
