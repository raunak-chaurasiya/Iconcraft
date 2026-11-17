import React from 'react';
import { useStudioStore } from '../../store/useStudioStore';
import {
  generateConsolidatedImport,
  generateConsolidatedJsx,
  downloadIconsZip,
} from '../../engine/batchExport';
import * as LucideIcons from 'lucide-react';
import {
  Layers,
  Copy,
  Download,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  FileCode,
} from 'lucide-react';

export const IconTray: React.FC = () => {
  const {
    trayIcons,
    removeFromTray,
    clearTray,
    isTrayOpen,
    setTrayOpen,
    settings,
    showToast,
  } = useStudioStore();

  if (trayIcons.length === 0) return null;

  const handleCopyImports = async () => {
    const code = generateConsolidatedImport(trayIcons);
    await navigator.clipboard.writeText(code);
    showToast(`Copied ${trayIcons.length} imports`, code);
  };

  const handleCopyJsx = async () => {
    const code = generateConsolidatedJsx(trayIcons, settings);
    await navigator.clipboard.writeText(code);
    showToast(`Copied ${trayIcons.length} components`, code);
  };

  const handleDownloadZip = async () => {
    await downloadIconsZip(trayIcons, settings);
    showToast('Downloaded ZIP', `Exported ${trayIcons.length} icons into zip bundle`);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[calc(100%-2rem)] animate-in slide-in-from-bottom-6 fade-in duration-200">
      <div className="rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-zinc-700/80 shadow-2xl shadow-black/90 p-3 select-none">
        {/* Tray Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400">
              <Layers size={13} />
            </div>
            <span className="text-xs font-bold text-zinc-100">Icon Collection</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {trayIcons.length} {trayIcons.length === 1 ? 'icon' : 'icons'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Action Buttons */}
            <button
              onClick={handleCopyImports}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/60 text-xs font-medium transition-colors cursor-pointer"
              title="Copy consolidated import statement"
            >
              <Copy size={12} className="text-emerald-400" />
              <span>Copy Imports</span>
            </button>

            <button
              onClick={handleCopyJsx}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/60 text-xs font-medium transition-colors cursor-pointer"
              title="Copy all JSX tags"
            >
              <FileCode size={12} className="text-blue-400" />
              <span>Copy JSX</span>
            </button>

            <button
              onClick={handleDownloadZip}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-colors shadow-sm cursor-pointer"
              title="Download icons as a ZIP bundle"
            >
              <Download size={13} />
              <span>Export ZIP</span>
            </button>

            <button
              onClick={clearTray}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-zinc-900 transition-colors"
              title="Clear all"
            >
              <Trash2 size={13} />
            </button>

            <button
              onClick={() => setTrayOpen(!isTrayOpen)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
              title={isTrayOpen ? 'Collapse tray' : 'Expand tray'}
            >
              {isTrayOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          </div>
        </div>

        {/* Selected Icons Horizontal Scroll Chips (Expandable) */}
        {isTrayOpen && (
          <div className="pt-2.5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {trayIcons.map((icon) => {
              const IconComponent =
                // @ts-expect-error dynamic lucide component access
                (LucideIcons[icon.componentName] as React.ElementType) || LucideIcons.Sparkles;

              return (
                <div
                  key={icon.id}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 transition-colors shrink-0 group"
                >
                  <div className="w-5 h-5 flex items-center justify-center text-emerald-400">
                    {icon.isCustom && icon.rawSvg ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        dangerouslySetInnerHTML={{ __html: icon.rawSvg }}
                      />
                    ) : (
                      <IconComponent size={16} strokeWidth={2} />
                    )}
                  </div>
                  <span className="text-xs font-mono">{icon.name}</span>
                  <button
                    onClick={() => removeFromTray(icon.id)}
                    className="p-0.5 rounded text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
