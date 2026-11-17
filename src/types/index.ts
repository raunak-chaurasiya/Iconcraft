export type ExportFormat = 'tsx' | 'svg' | 'jsx';

export interface CustomizerSettings {
  strokeWidth: number;
  size: number;
  strokeLinecap: 'round' | 'square';
  color: string;
  exportFormat: ExportFormat;
}

export interface IconItem {
  id: string;
  name: string;
  category: string;
  tags: string[];
  componentName: string;
  isCustom?: boolean;
  rawSvg?: string; // For uploaded custom SVGs
}

export interface ToastState {
  id: string;
  title: string;
  codeSnippet: string;
}
