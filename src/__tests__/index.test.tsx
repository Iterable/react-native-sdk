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

  describe('exported enum values', () => {
    it('IterableActionSource contains expected members', () => {
      expect(IterableActionSource.push).toBe(0);
      expect(IterableActionSource.appLink).toBe(1);
      expect(IterableActionSource.inApp).toBe(2);
      expect(IterableActionSource.embedded).toBe(3);
    });

    it('IterableInAppCloseSource contains expected members', () => {
      expect(IterableInAppCloseSource.back).toBe(0);
      expect(IterableInAppCloseSource.link).toBe(1);
      expect(IterableInAppCloseSource.unknown).toBe(100);
    });

    it('IterableInAppLocation contains expected members', () => {
      expect(IterableInAppLocation.inApp).toBe(0);
      expect(IterableInAppLocation.inbox).toBe(1);
    });

    it('IterableInAppShowResponse contains expected members', () => {
      expect(IterableInAppShowResponse.show).toBe(0);
      expect(IterableInAppShowResponse.skip).toBe(1);
    });

    it('IterableInAppTriggerType contains expected members', () => {
      expect(IterableInAppTriggerType.immediate).toBe(0);
      expect(IterableInAppTriggerType.event).toBe(1);
      expect(IterableInAppTriggerType.never).toBe(2);
    });

    it('IterableDataRegion contains expected members', () => {
      expect(IterableDataRegion.US).toBe(0);
      expect(IterableDataRegion.EU).toBe(1);
    });

    it('IterableLogLevel contains expected members', () => {
      expect(IterableLogLevel.error).toBe(3);
      expect(IterableLogLevel.debug).toBe(1);
      expect(IterableLogLevel.info).toBe(2);
    });

    it('IterablePushPlatform contains expected members', () => {
      expect(IterablePushPlatform.sandbox).toBe(0);
      expect(IterablePushPlatform.production).toBe(1);
      expect(IterablePushPlatform.auto).toBe(2);
    });

    it('IterableRetryBackoff contains expected members', () => {
      expect(IterableRetryBackoff.linear).toBe('LINEAR');
      expect(IterableRetryBackoff.exponential).toBe('EXPONENTIAL');
    });

    it('IterableEmbeddedViewType contains expected members', () => {
      expect(IterableEmbeddedViewType.Banner).toBe(0);
      expect(IterableEmbeddedViewType.Card).toBe(1);
      expect(IterableEmbeddedViewType.Notification).toBe(2);
    });
  });

  describe('exported hooks are functions', () => {
    it('useAppStateListener is a function', () => {
      expect(typeof useAppStateListener).toBe('function');
    });

    it('useDeviceOrientation is a function', () => {
      expect(typeof useDeviceOrientation).toBe('function');
    });
  });

  describe('exported components are valid React components', () => {
    it('IterableInbox is a valid React component', () => {
      expect(IterableInbox).toBeDefined();
      // React components are functions or classes (forwardRef objects expose a render fn)
      const type = typeof IterableInbox;
      expect(
        type === 'function' ||
        type === 'object' ||
        type === 'symbol'
      ).toBe(true);
    });

    it('IterableInboxEmptyState is a valid React component', () => {
      expect(IterableInboxEmptyState).toBeDefined();
      const type = typeof IterableInboxEmptyState;
      expect(
        type === 'function' ||
        type === 'object' ||
        type === 'symbol'
      ).toBe(true);
    });

    it('IterableInboxMessageCell is a valid React component', () => {
      expect(IterableInboxMessageCell).toBeDefined();
      const type = typeof IterableInboxMessageCell;
      expect(
        type === 'function' ||
        type === 'object' ||
        type === 'symbol'
      ).toBe(true);
    });

    it('IterableEmbeddedView is a valid React component', () => {
      expect(IterableEmbeddedView).toBeDefined();
      const type = typeof IterableEmbeddedView;
      expect(
        type === 'function' ||
        type === 'object' ||
        type === 'symbol'
      ).toBe(true);
    });
  });
});
