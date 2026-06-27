import { render } from '@testing-library/react-native';

import { IterableInboxEmptyState } from './IterableInboxEmptyState';

describe('IterableInboxEmptyState', () => {
  const baseProps = {
    customizations: {},
    tabBarHeight: 50,
    tabBarPadding: 10,
    navTitleHeight: 44,
    contentWidth: 300,
    height: 600,
    isPortrait: true,
  };

  it('renders the default empty state in portrait orientation', () => {
    // GIVEN default props
    // WHEN the component is rendered
    const { getByText } = render(<IterableInboxEmptyState {...baseProps} />);

    // THEN the default title and body are displayed
    expect(getByText('No saved messages')).toBeTruthy();
    expect(getByText('Check again later!')).toBeTruthy();
  });

  it('renders customized title and body text', () => {
    // GIVEN customizations with empty state text
    const customizations = {
      noMessagesTitle: 'All caught up!',
      noMessagesBody: 'Nothing to see here.',
    };

    // WHEN the component is rendered with customizations
    const { getByText } = render(
      <IterableInboxEmptyState {...baseProps} customizations={customizations} />
    );

    // THEN the customized text is displayed
    expect(getByText('All caught up!')).toBeTruthy();
    expect(getByText('Nothing to see here.')).toBeTruthy();
  });

  it('renders in landscape orientation without crashing', () => {
    // GIVEN landscape orientation
    // WHEN the component is rendered
    const { getByText } = render(
      <IterableInboxEmptyState {...baseProps} isPortrait={false} />
    );

    // THEN the default title is still displayed
    expect(getByText('No saved messages')).toBeTruthy();
  });
});
