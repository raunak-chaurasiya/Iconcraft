import React, { forwardRef } from 'react';
import type { IconProps, CustomIconNode } from './types';

export function createIcon(displayName: string, iconNode: CustomIconNode) {
  const Component = forwardRef<SVGSVGElement, IconProps>(
    (
      {
        color = 'currentColor',
        size = 24,
        strokeWidth = 2,
        strokeLinecap = 'round',
        strokeLinejoin = 'round',
        className = '',
        children,
        ...rest
      },
      ref
    ) => {
      return (
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          className={`iconcraft-icon iconcraft-${displayName.toLowerCase()} ${className}`}
          {...rest}
        >
          {iconNode.map(([tag, attrs], index) =>
            React.createElement(tag, { key: index, ...attrs })
          )}
          {children}
        </svg>
      );
    }
  );

  Component.displayName = displayName;
  return Component;
}
