import React from 'react';
import { WidgetContainerProps } from '../../types/WidgetContainerProps';
import { WidgetContainerImpl } from '../../implementation/widgetContainer';

/**
 * WidgetContainer provides a consistent wrapper for dashboard widgets
 *
 * Features:
 * - Paper wrapper with consistent styling
 * - Optional title with refresh button
 * - Loading state with progress bar
 * - Footer section for timestamps or additional info
 * - Follows the PlatformLoad widget pattern
 *
 * @example
 * ```tsx
 * <WidgetContainer
 *   title="My Widget"
 *   isLoading={false}
 *   onRefresh={() => console.log('Refreshing...')}
 *   lastUpdate={new Date()}
 * >
 *   <MyWidgetContent />
 * </WidgetContainer>
 * ```
 */
export const WidgetContainer: React.FC<WidgetContainerProps> = (props) => {
  return <WidgetContainerImpl {...props} />;
};
