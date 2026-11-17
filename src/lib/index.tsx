import React, { forwardRef } from 'react';
import * as LucideIcons from 'lucide-react';
import type { IconProps } from './types';

export * from './types';
export * from './createIcon';

// Re-export all 2,000+ icons from the core library
export * from 'lucide-react';

export interface DynamicIconProps extends IconProps {
  name: string;
}

/**
 * Dynamic Icon component for rendering any icon by string name
 * e.g. <Icon name="Home" size={24} strokeWidth={1.5} />
 */
export const Icon = forwardRef<SVGSVGElement, DynamicIconProps>(
  ({ name, size = 24, strokeWidth = 2, color = 'currentColor', ...props }, ref) => {
    // @ts-expect-error dynamic component access
    const Component = (LucideIcons[name] as React.ElementType) || LucideIcons.HelpCircle;
    return <Component ref={ref} size={size} strokeWidth={strokeWidth} color={color} {...props} />;
  }
);

Icon.displayName = 'Icon';
