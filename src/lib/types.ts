import type { SVGProps } from 'react';
import type { IconNode as LucideIconNode } from 'lucide-react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
  color?: string;
  strokeLinecap?: 'round' | 'square' | 'inherit';
  strokeLinejoin?: 'round' | 'miter' | 'inherit';
}

export type CustomIconNode = LucideIconNode;
