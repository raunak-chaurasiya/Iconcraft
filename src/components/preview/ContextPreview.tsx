import React, { useState } from 'react';
import { useStudioStore } from '../../store/useStudioStore';
import { ALL_LUCIDE_ICONS } from '../../engine/catalog';
import * as LucideIcons from 'lucide-react';
import { Copy, Sun, Moon } from 'lucide-react';
import { generateExportCode } from '../../engine/codegen';

export const ContextPreview: React.FC = () => {
  const { selectedIcon, settings, showToast } = useStudioStore();
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');

  // If no icon selected, default to the first one in the library
  const currentIcon = selectedIcon || ALL_LUCIDE_ICONS[0];

  const IconComponent =
    // @ts-expect-error dynamic component access
    (LucideIcons[currentIcon.componentName] as React.ElementType) || LucideIcons.Sparkles;

  const renderIcon = (size: number, extraStroke?: number) => {
    const stroke = extraStroke ?? settings.strokeWidth;
    if (currentIcon.isCustom && currentIcon.rawSvg) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap={settings.strokeLinecap}
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: currentIcon.rawSvg }}
        />
      );
    }
    return (
      <IconComponent
        size={size}
        strokeWidth={stroke}
        strokeLinecap={settings.strokeLinecap}
      />
    );
  };

  const handleCopy = async () => {
    const code = generateExportCode(currentIcon, settings);
    await navigator.clipboard.writeText(code);
    showToast(`Copied ${currentIcon.componentName}`, code);
  };

  return (
    <div className="space-y-5 select-none">
      {/* Active Icon Header */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            {renderIcon(22)}
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-100">{currentIcon.name}</h4>
            <span className="text-[10px] font-mono text-zinc-500">
              &lt;{currentIcon.componentName} /&gt;
            </span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
          title="Copy component code"
        >
          <Copy size={12} />
          <span>Copy</span>
        </button>
      </div>

      {/* Surface Theme Toggle (Dark vs Light) */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-400">Surface Theme</span>
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs">
          <button
            onClick={() => setPreviewTheme('dark')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              previewTheme === 'dark'
                ? 'bg-zinc-800 text-zinc-100 font-medium'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Moon size={12} />
            <span>Dark</span>
          </button>
          <button
            onClick={() => setPreviewTheme('light')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              previewTheme === 'light'
                ? 'bg-zinc-200 text-zinc-900 font-medium'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Sun size={12} />
            <span>Light</span>
          </button>
        </div>
      </div>

      {/* Real-World UI Mockup Container */}
      <div
        className={`p-4 rounded-xl border transition-colors space-y-4 ${
          previewTheme === 'dark'
            ? 'bg-zinc-900/50 border-zinc-800 text-zinc-100'
            : 'bg-zinc-100 border-zinc-300 text-zinc-900 shadow-inner'
        }`}
      >
        {/* 1. Button Mockups */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 font-semibold">
            Buttons
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Primary Action Button */}
            <button
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer ${
                previewTheme === 'dark'
                  ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {renderIcon(15)}
              <span>Primary Action</span>
            </button>

            {/* Outline Button */}
            <button
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                previewTheme === 'dark'
                  ? 'border-zinc-700 bg-zinc-800/80 text-zinc-200 hover:bg-zinc-800'
                  : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <span>Explore</span>
              {renderIcon(14)}
            </button>

            {/* Icon-Only Button */}
            <button
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                previewTheme === 'dark'
                  ? 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-zinc-100'
                  : 'border-zinc-300 bg-white text-zinc-700 hover:text-zinc-950'
              }`}
            >
              {renderIcon(16)}
            </button>
          </div>
        </div>

        {/* 2. Input Field Mockup */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 font-semibold">
            Form Input Field
          </div>
          <div
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs ${
              previewTheme === 'dark'
                ? 'bg-zinc-950 border-zinc-700 text-zinc-300'
                : 'bg-white border-zinc-300 text-zinc-800'
            }`}
          >
            <div className="opacity-60">{renderIcon(15)}</div>
            <span className="opacity-40">Filter items or enter query...</span>
          </div>
        </div>

        {/* 3. Navigation Sidebar Item */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 font-semibold">
            Sidebar Nav Item
          </div>
          <div
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${
              previewTheme === 'dark'
                ? 'bg-zinc-800/90 text-zinc-100 border border-zinc-700/60'
                : 'bg-zinc-200 text-zinc-950 border border-zinc-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="text-emerald-500">{renderIcon(16)}</div>
              <span className="font-semibold">{currentIcon.name}</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
              Active
            </span>
          </div>
        </div>

        {/* 4. Alert / Notification Card */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 font-semibold">
            Alert Badge
          </div>
          <div
            className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs ${
              previewTheme === 'dark'
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            <div className="text-emerald-500 shrink-0">{renderIcon(16)}</div>
            <span className="text-[11px] leading-tight">
              Action verified. Icon rendered smoothly with current stroke weight.
            </span>
          </div>
        </div>
      </div>

      {/* Size Scale Matrix */}
      <div className="space-y-2 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
          <span>Optical Size Scale</span>
          <span className="text-[10px] font-mono text-zinc-500">16px to 48px</span>
        </div>
        <div className="flex items-end justify-between pt-2 px-2 text-zinc-300">
          <div className="flex flex-col items-center gap-1.5">
            {renderIcon(16)}
            <span className="text-[10px] font-mono text-zinc-500">16</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            {renderIcon(20)}
            <span className="text-[10px] font-mono text-zinc-500">20</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            {renderIcon(24)}
            <span className="text-[10px] font-mono text-emerald-400 font-bold">24</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            {renderIcon(32)}
            <span className="text-[10px] font-mono text-zinc-500">32</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            {renderIcon(40)}
            <span className="text-[10px] font-mono text-zinc-500">40</span>
          </div>
        </div>
      </div>
    </div>
  );
};
