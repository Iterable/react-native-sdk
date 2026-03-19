import { render } from '@testing-library/react-native';

import { EmbeddedSessionDevWarning } from './EmbeddedSessionDevWarning';

describe('EmbeddedSessionDevWarning', () => {
  it('renders nothing when not visible', () => {
    const { queryByRole } = render(
      <EmbeddedSessionDevWarning visible={false} componentName="X" />
    );
    expect(queryByRole('alert')).toBeNull();
  });

  it('renders warning text when visible', () => {
    const { getByText } = render(
      <EmbeddedSessionDevWarning visible componentName="IterableEmbeddedBanner" />
    );
    expect(getByText(/IterableEmbeddedBanner/)).toBeTruthy();
    expect(getByText(/EmbeddedSessionManager/)).toBeTruthy();
  });
});
