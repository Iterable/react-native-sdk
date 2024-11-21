/**
 * Events that can be emitted by the Iterable SDK
 */
export enum IterableEventName {
  /** Event that fires when a URL is clicked */
  handleUrlCalled = 'handleUrlCalled',
  /** Event that fires when a custom action is called */
  handleCustomActionCalled = 'handleCustomActionCalled',
  /**
   * TODO: Rename at some point
   * Event that fires when an in-app message is shown
   */
  handleInAppCalled = 'handleInAppCalled',
  /** Event that fires when a user attempts to authenticate */
  handleAuthCalled = 'handleAuthCalled',
  /** Event that fires when the Iterable inbox is updated */
  receivedIterableInboxChanged = 'receivedIterableInboxChanged',
  /** Event that fires when authentication with Iterable succeeds */
  handleAuthSuccessCalled = 'handleAuthSuccessCalled',
  /** Event that fires when authentication with Iterable fails */
  handleAuthFailureCalled = 'handleAuthFailureCalled',
}
