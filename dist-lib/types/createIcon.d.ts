import React from 'react';
import type { IconProps, CustomIconNode } from './types';
export declare function createIcon(displayName: string, iconNode: CustomIconNode): React.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
