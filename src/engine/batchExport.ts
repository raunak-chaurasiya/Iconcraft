import JSZip from 'jszip';
import type { IconItem, CustomizerSettings } from '../types';
import { generateExportCode } from './codegen';

/**
 * Generates a clean consolidated import statement for all selected Lucide icons
 */
export function generateConsolidatedImport(icons: IconItem[]): string {
  const standardIcons = icons.filter((i) => !i.isCustom).map((i) => i.componentName);
  const customIcons = icons.filter((i) => i.isCustom).map((i) => i.componentName);

  const lines: string[] = [];

  if (standardIcons.length > 0) {
    lines.push(`import { ${Array.from(new Set(standardIcons)).join(', ')} } from 'lucide-react';`);
  }

  if (customIcons.length > 0) {
    customIcons.forEach((name) => {
      lines.push(`import { ${name} } from './icons/${name}';`);
    });
  }

  return lines.join('\n');
}

/**
 * Generates a batch JSX block for all selected icons
 */
export function generateConsolidatedJsx(icons: IconItem[], settings: CustomizerSettings): string {
  return icons
    .map((icon) => {
      if (settings.exportFormat === 'jsx') {
        return `<${icon.componentName} className="w-[${settings.size}px] h-[${settings.size}px] ${settings.color === 'currentColor' ? 'text-current' : ''}" strokeWidth={${settings.strokeWidth}} />`;
      }
      return `<${icon.componentName} size={${settings.size}} strokeWidth={${settings.strokeWidth}} />`;
    })
    .join('\n');
}

/**
 * Compiles and downloads a .zip file containing all selected icons
 */
export async function downloadIconsZip(
  icons: IconItem[],
  settings: CustomizerSettings
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder('iconcraft-bundle') || zip;

  icons.forEach((icon) => {
    const code = generateExportCode(icon, settings);
    const ext = settings.exportFormat === 'svg' ? 'svg' : 'tsx';
    const filename = `${icon.id}.${ext}`;
    folder.file(filename, code);
  });

  // Also include a README index
  const indexContent = `// IconCraft Studio Bundle
// Icons count: ${icons.length}
// Export format: ${settings.exportFormat}
// Settings: stroke ${settings.strokeWidth}px, size ${settings.size}px, cap ${settings.strokeLinecap}

${generateConsolidatedImport(icons)}
`;
  folder.file('index.ts', indexContent);

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);

  const a = document.createElement('a');
  a.href = url;
  a.download = `iconcraft-icons-${settings.exportFormat}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
