import type { CustomizerSettings, IconItem } from '../types';

export function generateExportCode(icon: IconItem, settings: CustomizerSettings): string {
  const { strokeWidth, size, strokeLinecap, color, exportFormat } = settings;

  if (exportFormat === 'tsx') {
    if (icon.isCustom && icon.rawSvg) {
      // Custom uploaded SVG -> Standalone production-ready React TSX component
      return `import React from 'react';

export interface ${icon.componentName}Props extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number;
  color?: string;
}

export function ${icon.componentName}({
  size = ${size},
  strokeWidth = ${strokeWidth},
  color = '${color === 'currentColor' ? 'currentColor' : color}',
  className = '',
  ...props
}: ${icon.componentName}Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="${strokeLinecap}"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      ${icon.rawSvg}
    </svg>
  );
}`;
    }

    // Standard Lucide icon import & snippet
    return `import { ${icon.componentName} } from 'lucide-react';

<${icon.componentName}
  size={${size}}
  strokeWidth={${strokeWidth}}
  ${strokeLinecap !== 'round' ? `strokeLinecap="${strokeLinecap}"\n  ` : ''}${color !== 'currentColor' ? `color="${color}"\n  ` : ''}/>`;
  }

  if (exportFormat === 'svg') {
    if (icon.isCustom && icon.rawSvg) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="round">
  ${icon.rawSvg}
</svg>`;
    }

    return `<!-- ${icon.name} icon (${size}x${size}, stroke: ${strokeWidth}px) -->
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="round">
  <!-- Use in HTML or Figma -->
</svg>`;
  }

  if (exportFormat === 'jsx') {
    // Tailwind JSX friendly format
    return `<${icon.componentName}
  className="w-[${size}px] h-[${size}px] ${color === 'currentColor' ? 'text-current' : ''}"
  strokeWidth={${strokeWidth}}
/>`;
  }

  return '';
}
