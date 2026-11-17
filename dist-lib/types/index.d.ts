import React from 'react';
import type { IconProps } from './types';
export * from './types';
export * from './createIcon';
export * from 'lucide-react';
export interface DynamicIconProps extends IconProps {
    name: string;
}
/**
 * Dynamic Icon component for rendering any icon by string name
 * e.g. <Icon name="Home" size={24} strokeWidth={1.5} />
 */
export declare const Icon: React.ForwardRefExoticComponent<Omit<DynamicIconProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
