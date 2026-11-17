import React, { useState } from 'react';
import type { IconItem } from '../../types';
import { useStudioStore } from '../../store/useStudioStore';
import { generateExportCode } from '../../engine/codegen';
import * as LucideIcons from 'lucide-react';
import { Check, Copy, Eye, Plus } from 'lucide-react';

interface IconCardProps {
  icon: IconItem;
}

export const IconCard: React.FC<IconCardProps> = ({ icon }) => {
  const {
    settings,
    showToast,
    setSelectedIcon,
    selectedIcon,
    trayIcons,
    toggleTrayIcon,
  } = useStudioStore();
  const [copied, setCopied] = useState(false);

  // Dynamic Lucide component resolution
  const IconComponent =
    (LucideIcons[icon.componentName] as React.ElementType) || LucideIcons.HelpCircle;

  const isSelected = selectedIcon?.id === icon.id;
  const isInTray = trayIcons.some((i) => i.id === icon.id);

  const handleClick = async (e: React.MouseEvent) => {
    // If Shift is pressed, toggle into tray instead of single copy
    if (e.shiftKey) {
      e.preventDefault();
      toggleTrayIcon(icon);
      return;
    }

    const code = generateExportCode(icon, settings);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      showToast(`Copied ${icon.componentName}`, code);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const handleInspect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIcon(icon);
  };

  const handleTrayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTrayIcon(icon);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-150 cursor-pointer select-none aspect-square ${copied
        ? 'bg-emerald-500/10 border-emerald-500/50 ring-2 ring-emerald-500/20 scale-95'
        : isInTray
          ? 'bg-zinc-900/90 border-emerald-500/60 ring-1 ring-emerald-500/40 shadow-sm'
          : isSelected
            ? 'bg-zinc-900 border-zinc-600 ring-1 ring-zinc-500/30'
            : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/40 hover:-translate-y-0.5'
        }`}
    >
      {/* Top Left: Add to Tray Button */}
      <button
        onClick={handleTrayToggle}
        title={isInTray ? 'Remove from Tray' : 'Add to Collection Tray'}
        className={`absolute top-2 left-2 p-1 rounded-md transition-all cursor-pointer ${isInTray
          ? 'bg-emerald-500 text-zinc-950 shadow-sm opacity-100'
          : 'bg-zinc-800/80 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-700 opacity-0 group-hover:opacity-100'
          }`}
      >
        {isInTray ? <Check size={11} strokeWidth={3} /> : <Plus size={11} strokeWidth={2.5} />}
      </button>

      {/* Top Right: Actions & Format Badge on Hover */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleInspect}
          title="Inspect in UI mockups"
          className="p-1 rounded bg-zinc-800/90 hover:bg-zinc-700 text-zinc-400 hover:text-emerald-400 border border-zinc-700/60 transition-colors cursor-pointer"
        >
          <Eye size={10} />
        </button>
        <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 bg-zinc-800/90 border border-zinc-700/60 rounded px-1.5 py-0.5 shadow-sm">
          <Copy size={9} />
          <span className="uppercase">{settings.exportFormat}</span>
        </div>
      </div>

      {/* Custom badge if user uploaded */}
      {icon.isCustom && !isInTray && (
        <div className="absolute bottom-2 left-2">
          <span className="text-[8px] font-mono font-semibold px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            CUSTOM
          </span>
        </div>
      )}

      {/* Render Icon (Lucide or Custom SVG) */}
      <div
        className="flex items-center justify-center transition-transform duration-150 group-hover:scale-110"
        style={{
          width: `${Math.max(settings.size, 32)}px`,
          height: `${Math.max(settings.size, 32)}px`,
          color: settings.color === 'currentColor' ? '#f4f4f5' : settings.color,
        }}
      >
        {copied ? (
          <Check size={28} className="text-emerald-400 animate-in zoom-in-50 duration-150" />
        ) : icon.isCustom && icon.rawSvg ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={settings.size}
            height={settings.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={settings.strokeWidth}
            strokeLinecap={settings.strokeLinecap}
            strokeLinejoin="round"
            dangerouslySetInnerHTML={{ __html: icon.rawSvg }}
          />
        ) : (
          <IconComponent
            size={settings.size}
            strokeWidth={settings.strokeWidth}
            strokeLinecap={settings.strokeLinecap}
            color={settings.color}
          />
        )}
      </div>

      {/* Icon Name Label */}
      <span
        className={`mt-3 text-[11px] font-mono tracking-tight text-center truncate max-w-full px-1 transition-colors ${copied ? 'text-emerald-400 font-semibold' : 'text-zinc-400 group-hover:text-zinc-200'
          }`}
      >
        {copied ? 'Copied!' : icon.name}
      </span>
    </div>
  );
};
