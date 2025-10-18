/**
 * This is the doc comment for file1.ts
 *
 * @packageDocumentation
 */

/**
 * React Native module for Iterable.
 */
export {
  Iterable,
  IterableAction,
  IterableActionContext,
  IterableAttributionInfo,
  IterableAuthManager,
  IterableAuthResponse,
  IterableCommerceItem,
  IterableConfig,
  IterableEdgeInsets,
  IterableLogger,
  IterableTrackingManager,
  IterableUserManager,
} from './core/classes';
export {
  IterableActionSource,
  IterableAuthFailureReason,
  IterableAuthResponseResult,
  IterableDataRegion,
  IterableEventName,
  IterableLogLevel,
  IterablePushPlatform,
  IterableRetryBackoff,
} from './core/enums';
export {
  useAppStateListener,
  useDeviceOrientation,
  type IterableDeviceOrientation,
} from './core/hooks';
export type {
  IterableAuthFailure,
  IterableEdgeInsetDetails,
  IterableRetryPolicy,
  IterableGenerateJwtTokenOpts,
} from './core/types';
export {
  IterableHtmlInAppContent,
  IterableInAppCloseSource,
  IterableInAppContentType,
  IterableInAppDeleteSource,
  IterableInAppLocation,
  IterableInAppManager,
  IterableInAppMessage,
  IterableInAppShowResponse,
  IterableInAppTrigger,
  IterableInAppTriggerType,
  IterableInboxMetadata,
  type IterableHtmlInAppContentRaw,
  type IterableInAppContent,
  type IterableInAppMessageRaw,
} from './inApp';
export {
  IterableInbox,
  IterableInboxDataModel,
  type IterableInboxCustomizations,
  type IterableInboxEmptyStateProps,
  type IterableInboxImpressionRowInfo,
  type IterableInboxMessageCellProps,
  type IterableInboxProps,
  type IterableInboxRowViewModel,
} from './inbox';
