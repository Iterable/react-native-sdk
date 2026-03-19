import type { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react-native';

import { EmbeddedSessionContext } from '../context/EmbeddedSessionContext';
import { useWarnIfOutsideEmbeddedSession } from './useWarnIfOutsideEmbeddedSession';

describe('useWarnIfOutsideEmbeddedSession', () => {
  it('logs a warning when not under EmbeddedSessionManager', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    renderHook(() => useWarnIfOutsideEmbeddedSession('TestComponent'));

    await act(async () => {
      await Promise.resolve();
    });

    expect(warnSpy).toHaveBeenCalledTimes(1);
    const firstArg = warnSpy.mock.calls[0]?.[0];
    expect(firstArg).toBeDefined();
    const message = String(firstArg);
    expect(message).toContain('TestComponent');
    expect(message).toContain('EmbeddedSessionManager');

    warnSpy.mockRestore();
  });

  it('does not log when under EmbeddedSessionManager', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const wrapper = ({ children }: { children: ReactNode }) => (
      <EmbeddedSessionContext.Provider value={true}>
        {children}
      </EmbeddedSessionContext.Provider>
    );

    renderHook(() => useWarnIfOutsideEmbeddedSession('TestComponent'), {
      wrapper,
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(warnSpy).not.toHaveBeenCalled();

    warnSpy.mockRestore();
  });
});
