import { useMemo } from 'react';
import { IterableEmbeddedViewType } from '../../enums';
import type { IterableEmbeddedComponentProps } from '../../types/IterableEmbeddedComponentProps';
import { getStyles } from './getStyles';

/**
 * This hook is used to manage the lifecycle of an embedded view.
 *
 * @param viewType - The type of view to render.
 * @param props - The props for the embedded view.
 * @returns The embedded view.
 *
 * @example
 * const { parsedStyles } = useEmbeddedView(IterableEmbeddedViewType.Notification, {
 *   message,
 *   config,
 *   onButtonClick,
 *   onMessageClick,
 * });
 *
 * return (
 *   <View>
 *     <Text>{parsedStyles.backgroundColor}</Text>
 *   </View>
 * );
 */
export const useEmbeddedView = (
  /** The type of view to render. */
  viewType: IterableEmbeddedViewType,
  /** The props for the embedded view. */
  {
    config,
  }: IterableEmbeddedComponentProps
) => {
  const parsedStyles = useMemo(() => {
    return getStyles(viewType, config);
  }, [viewType, config]);

  return {
    parsedStyles,
  };
};
