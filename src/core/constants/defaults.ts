import { IterableInAppManager } from '../../inApp/classes/IterableInAppManager';
import { IterableConfig } from '../classes/IterableConfig';
import { IterableLogger } from '../classes/IterableLogger';

export const defaultConfig = new IterableConfig();
export const defaultLogger = new IterableLogger(defaultConfig);
export const defaultInAppManager = new IterableInAppManager(defaultLogger);
