/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactElement } from 'react';
import { render } from '@testing-library/react-native';

import { EmbeddedSessionContext } from '../context/EmbeddedSessionContext';
import { IterableEmbeddedViewType } from '../enums/IterableEmbeddedViewType';
import { IterableEmbeddedView } from './IterableEmbeddedView';
import { IterableEmbeddedBanner } from './IterableEmbeddedBanner';
import { IterableEmbeddedCard } from './IterableEmbeddedCard';
import { IterableEmbeddedNotification } from './IterableEmbeddedNotification';

// Mock the child components
jest.mock('./IterableEmbeddedBanner', () => ({
  IterableEmbeddedBanner: jest.fn(() => null),
}));

jest.mock('./IterableEmbeddedCard', () => ({
  IterableEmbeddedCard: jest.fn(() => null),
}));

jest.mock('./IterableEmbeddedNotification', () => ({
  IterableEmbeddedNotification: jest.fn(() => null),
}));

function renderWithEmbeddedSession(ui: ReactElement) {
  return render(
    <EmbeddedSessionContext.Provider value={true}>{ui}</EmbeddedSessionContext.Provider>
  );
}

describe('IterableEmbeddedView', () => {
  const mockMessage = {
    metadata: {
      messageId: 'test-message-123',
      campaignId: 123456,
      placementId: 'test-placement',
    },
    elements: {
      title: 'Test Title',
      body: 'Test Body',
    },
  } as any;

  const mockConfig = {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  } as any;

  const mockOnButtonClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('View Type Rendering', () => {
    it('should render IterableEmbeddedCard when viewType is Card', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Card}
          message={mockMessage}
        />
      );

      expect(IterableEmbeddedCard).toHaveBeenCalledTimes(1);
      expect(IterableEmbeddedBanner).not.toHaveBeenCalled();
      expect(IterableEmbeddedNotification).not.toHaveBeenCalled();
    });

    it('should render IterableEmbeddedNotification when viewType is Notification', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Notification}
          message={mockMessage}
        />
      );

      expect(IterableEmbeddedNotification).toHaveBeenCalledTimes(1);
      expect(IterableEmbeddedCard).not.toHaveBeenCalled();
      expect(IterableEmbeddedBanner).not.toHaveBeenCalled();
    });

    it('should render IterableEmbeddedBanner when viewType is Banner', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Banner}
          message={mockMessage}
        />
      );

      expect(IterableEmbeddedBanner).toHaveBeenCalledTimes(1);
      expect(IterableEmbeddedCard).not.toHaveBeenCalled();
      expect(IterableEmbeddedNotification).not.toHaveBeenCalled();
    });

    it('should render null for invalid viewType', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={999 as IterableEmbeddedViewType}
          message={mockMessage}
        />
      );

      expect(IterableEmbeddedCard).not.toHaveBeenCalled();
      expect(IterableEmbeddedBanner).not.toHaveBeenCalled();
      expect(IterableEmbeddedNotification).not.toHaveBeenCalled();
    });

    it('should render null for undefined viewType', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={undefined as any}
          message={mockMessage}
        />
      );

      expect(IterableEmbeddedCard).not.toHaveBeenCalled();
      expect(IterableEmbeddedBanner).not.toHaveBeenCalled();
      expect(IterableEmbeddedNotification).not.toHaveBeenCalled();
    });
  });

  describe('Props Passing', () => {
    it('should pass message prop to Card component', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Card}
          message={mockMessage}
        />
      );

      const callArgs = (IterableEmbeddedCard as jest.Mock).mock.calls[0][0];
      expect(callArgs).toMatchObject({
        message: mockMessage,
      });
    });

    it('should pass message prop to Banner component', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Banner}
          message={mockMessage}
        />
      );

      const callArgs = (IterableEmbeddedBanner as jest.Mock).mock.calls[0][0];
      expect(callArgs).toMatchObject({
        message: mockMessage,
      });
    });

    it('should pass message prop to Notification component', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Notification}
          message={mockMessage}
        />
      );

      const callArgs = (IterableEmbeddedNotification as jest.Mock).mock
        .calls[0][0];
      expect(callArgs).toMatchObject({
        message: mockMessage,
      });
    });

    it('should pass config prop to child component', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Card}
          message={mockMessage}
          config={mockConfig}
        />
      );

      const callArgs = (IterableEmbeddedCard as jest.Mock).mock.calls[0][0];
      expect(callArgs).toMatchObject({
        message: mockMessage,
        config: mockConfig,
      });
    });

    it('should pass onButtonClick prop to child component', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Card}
          message={mockMessage}
          onButtonClick={mockOnButtonClick}
        />
      );

      const callArgs = (IterableEmbeddedCard as jest.Mock).mock.calls[0][0];
      expect(callArgs).toMatchObject({
        message: mockMessage,
        onButtonClick: mockOnButtonClick,
      });
    });

    it('should pass all props to child component', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Card}
          message={mockMessage}
          config={mockConfig}
          onButtonClick={mockOnButtonClick}
        />
      );

      const callArgs = (IterableEmbeddedCard as jest.Mock).mock.calls[0][0];
      expect(callArgs).toMatchObject({
        message: mockMessage,
        config: mockConfig,
        onButtonClick: mockOnButtonClick,
      });
    });
  });

  describe('Component Memoization', () => {
    it('should memoize component selection based on viewType', () => {
      const { rerender } = renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Card}
          message={mockMessage}
        />
      );

      expect(IterableEmbeddedCard).toHaveBeenCalledTimes(1);

      // Re-render with same viewType but different message
      const newMessage = {
        ...mockMessage,
        metadata: {
          ...mockMessage.metadata,
          messageId: 'different-id',
        },
      };

      rerender(
        <EmbeddedSessionContext.Provider value={true}>
          <IterableEmbeddedView
            viewType={IterableEmbeddedViewType.Card}
            message={newMessage}
          />
        </EmbeddedSessionContext.Provider>
      );

      // Should still render Card component (memoization means same component reference)
      // Card should be called again with new props
      expect(IterableEmbeddedCard).toHaveBeenCalledTimes(2);
      const lastCallArgs = (IterableEmbeddedCard as jest.Mock).mock.calls[1][0];
      expect(lastCallArgs).toMatchObject({
        message: newMessage,
      });
    });

    it('should update component when viewType changes', () => {
      const { rerender } = renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Card}
          message={mockMessage}
        />
      );

      expect(IterableEmbeddedCard).toHaveBeenCalledTimes(1);
      expect(IterableEmbeddedBanner).not.toHaveBeenCalled();

      // Re-render with different viewType
      rerender(
        <EmbeddedSessionContext.Provider value={true}>
          <IterableEmbeddedView
            viewType={IterableEmbeddedViewType.Banner}
            message={mockMessage}
          />
        </EmbeddedSessionContext.Provider>
      );

      expect(IterableEmbeddedBanner).toHaveBeenCalledTimes(1);
      // Card was called only once (from initial render)
      expect(IterableEmbeddedCard).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null config gracefully', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Card}
          message={mockMessage}
          config={null}
        />
      );

      const callArgs = (IterableEmbeddedCard as jest.Mock).mock.calls[0][0];
      expect(callArgs).toMatchObject({
        message: mockMessage,
        config: null,
      });
    });

    it('should handle undefined config gracefully', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Card}
          message={mockMessage}
          config={undefined}
        />
      );

      const callArgs = (IterableEmbeddedCard as jest.Mock).mock.calls[0][0];
      expect(callArgs).toMatchObject({
        message: mockMessage,
        config: undefined,
      });
    });

    it('should handle missing onButtonClick gracefully', () => {
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Card}
          message={mockMessage}
        />
      );

      expect(IterableEmbeddedCard).toHaveBeenCalledTimes(1);
      const callArgs = (IterableEmbeddedCard as jest.Mock).mock.calls[0][0];
      expect(callArgs).toMatchObject({
        message: mockMessage,
      });
    });

    it('should handle numeric viewType values correctly', () => {
      // Test with numeric value 0 (Banner)
      renderWithEmbeddedSession(<IterableEmbeddedView viewType={0} message={mockMessage} />);
      expect(IterableEmbeddedBanner).toHaveBeenCalledTimes(1);

      jest.clearAllMocks();

      // Test with numeric value 1 (Card)
      renderWithEmbeddedSession(<IterableEmbeddedView viewType={1} message={mockMessage} />);
      expect(IterableEmbeddedCard).toHaveBeenCalledTimes(1);

      jest.clearAllMocks();

      // Test with numeric value 2 (Notification)
      renderWithEmbeddedSession(<IterableEmbeddedView viewType={2} message={mockMessage} />);
      expect(IterableEmbeddedNotification).toHaveBeenCalledTimes(1);
    });
  });

  describe('Component Type Verification', () => {
    it('should render correct component type for each enum value', () => {
      // Verify Banner enum value
      const bannerResult = renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Banner}
          message={mockMessage}
        />
      );
      expect(IterableEmbeddedBanner).toHaveBeenCalledTimes(1);
      bannerResult.unmount();

      jest.clearAllMocks();

      // Verify Card enum value
      const cardResult = renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Card}
          message={mockMessage}
        />
      );
      expect(IterableEmbeddedCard).toHaveBeenCalledTimes(1);
      cardResult.unmount();

      jest.clearAllMocks();

      // Verify Notification enum value
      renderWithEmbeddedSession(
        <IterableEmbeddedView
          viewType={IterableEmbeddedViewType.Notification}
          message={mockMessage}
        />
      );
      expect(IterableEmbeddedNotification).toHaveBeenCalledTimes(1);
    });
  });
});
