import {
  Iterable,
  IterableAction,
  IterableActionContext,
  IterableActionSource,
  IterableAttributionInfo,
  IterableAuthFailureReason,
  IterableAuthResponse,
  IterableAuthResponseResult,
  IterableCommerceItem,
  IterableConfig,
  IterableDataRegion,
  IterableEdgeInsets,
  IterableEmbeddedManager,
  IterableEmbeddedView,
  IterableEmbeddedViewType,
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
  IterableInbox,
  IterableInboxDataModel,
  IterableInboxEmptyState,
  IterableInboxMessageCell,
  IterableInboxMetadata,
  IterableLogLevel,
  IterableLogger,
  IterablePushPlatform,
  IterableRetryBackoff,
  useAppStateListener,
  useDeviceOrientation,
} from '../index';

describe('public SDK surface', () => {
  it('exports the static facade', () => {
    expect(Iterable).toBeDefined();
    expect(typeof Iterable.initialize).toBe('function');
  });

  it('exports core model classes', () => {
    expect(IterableAction).toBeDefined();
    expect(IterableActionContext).toBeDefined();
    expect(IterableAttributionInfo).toBeDefined();
    expect(IterableAuthResponse).toBeDefined();
    expect(IterableCommerceItem).toBeDefined();
    expect(IterableConfig).toBeDefined();
    expect(IterableEdgeInsets).toBeDefined();
    expect(IterableLogger).toBeDefined();
  });

  it('exports core enums', () => {
    expect(IterableActionSource).toBeDefined();
    expect(IterableAuthFailureReason).toBeDefined();
    expect(IterableAuthResponseResult).toBeDefined();
    expect(IterableDataRegion).toBeDefined();
    expect(IterableLogLevel).toBeDefined();
    expect(IterablePushPlatform).toBeDefined();
    expect(IterableRetryBackoff).toBeDefined();
  });

  it('exports in-app model classes and enums', () => {
    expect(IterableHtmlInAppContent).toBeDefined();
    expect(IterableInAppManager).toBeDefined();
    expect(IterableInAppMessage).toBeDefined();
    expect(IterableInAppTrigger).toBeDefined();
    expect(IterableInboxMetadata).toBeDefined();
    expect(IterableInAppCloseSource).toBeDefined();
    expect(IterableInAppContentType).toBeDefined();
    expect(IterableInAppDeleteSource).toBeDefined();
    expect(IterableInAppLocation).toBeDefined();
    expect(IterableInAppShowResponse).toBeDefined();
    expect(IterableInAppTriggerType).toBeDefined();
  });

  it('exports inbox components and types', () => {
    expect(IterableInbox).toBeDefined();
    expect(IterableInboxDataModel).toBeDefined();
    expect(IterableInboxEmptyState).toBeDefined();
    expect(IterableInboxMessageCell).toBeDefined();
  });

  it('exports embedded messaging surface', () => {
    expect(IterableEmbeddedManager).toBeDefined();
    expect(IterableEmbeddedView).toBeDefined();
    expect(IterableEmbeddedViewType).toBeDefined();
  });

  it('exports hooks', () => {
    expect(useAppStateListener).toBeDefined();
    expect(useDeviceOrientation).toBeDefined();
  });
});
