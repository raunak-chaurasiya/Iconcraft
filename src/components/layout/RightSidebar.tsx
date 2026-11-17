import React from 'react';
import { useStudioStore } from '../../store/useStudioStore';
import { Sliders, RotateCcw, Palette, CircleDot, Square, Eye } from 'lucide-react';
import { ContextPreview } from '../preview/ContextPreview';

const SIZES = [16, 20, 24, 32, 48];
const COLORS = [
  { label: 'CurrentColor', value: 'currentColor', class: 'bg-transparent border-dashed' },
  { label: 'White', value: '#FFFFFF', class: 'bg-white' },
  { label: 'Zinc', value: '#A1A1AA', class: 'bg-zinc-400' },
  { label: 'Emerald', value: '#10B981', class: 'bg-emerald-500' },
  { label: 'Blue', value: '#3B82F6', class: 'bg-blue-500' },
  { label: 'Violet', value: '#8B5CF6', class: 'bg-violet-500' },
  { label: 'Amber', value: '#F59E0B', class: 'bg-amber-500' },
  { label: 'Rose', value: '#F43F5E', class: 'bg-rose-500' },
];

export const RightSidebar: React.FC = () => {
  const { settings, updateSettings, resetSettings, sidebarTab, setSidebarTab } = useStudioStore();

  return (
    <aside className="w-80 border-l border-zinc-800/80 bg-zinc-950 flex flex-col h-[calc(100vh-3.5rem)] select-none shrink-0 overflow-y-auto p-4 space-y-5">
      {/* Top Tab Switcher */}
      <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800">
        <button
          onClick={() => setSidebarTab('controls')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            sidebarTab === 'controls'
              ? 'bg-zinc-800 text-zinc-100 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Sliders size={13} />
          <span>Controls</span>
        </button>
        <button
          onClick={() => setSidebarTab('preview')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            sidebarTab === 'preview'
              ? 'bg-zinc-800 text-emerald-400 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Eye size={13} />
          <span>In-UI Preview</span>
        </button>
      </div>

      {sidebarTab === 'preview' ? (
        <ContextPreview />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <span className="text-xs font-semibold text-zinc-300">Live Customizer</span>
            <button
              onClick={resetSettings}
              title="Reset to defaults"
              className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          </div>

          {/* Stroke Width */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-medium">Stroke Width</span>
              <span className="font-mono text-zinc-200 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-[11px]">
                {settings.strokeWidth}px
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.25"
              value={settings.strokeWidth}
              onChange={(e) => updateSettings({ strokeWidth: parseFloat(e.target.value) })}
              className="w-full accent-emerald-500 bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>0.5px</span>
              <span>1.5px</span>
              <span>3.0px</span>
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-medium">Icon Size</span>
              <span className="font-mono text-zinc-200 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-[11px]">
                {settings.size}px
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => updateSettings({ size })}
                  className={`py-1.5 text-xs font-mono rounded-md border transition-all cursor-pointer ${
                    settings.size === size
                      ? 'bg-zinc-800 border-zinc-600 text-zinc-100 font-semibold'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Corner / Line Cap Toggle */}
          <div className="space-y-2.5">
            <div className="text-xs text-zinc-400 font-medium">Line Cap & Join</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSettings({ strokeLinecap: 'round' })}
                className={`flex items-center justify-center gap-1.5 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
                  settings.strokeLinecap === 'round'
                    ? 'bg-zinc-800 border-zinc-600 text-zinc-100 font-medium'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <CircleDot size={13} />
                <span>Round</span>
              </button>
              <button
                onClick={() => updateSettings({ strokeLinecap: 'square' })}
                className={`flex items-center justify-center gap-1.5 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
                  settings.strokeLinecap === 'square'
                    ? 'bg-zinc-800 border-zinc-600 text-zinc-100 font-medium'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <Square size={13} />
                <span>Square</span>
              </button>
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-zinc-400 font-medium">
                <Palette size={13} />
                <span>Color</span>
              </div>
              <span className="font-mono text-[11px] text-zinc-400">
                {settings.color}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {COLORS.map((c) => {
                const isSelected = settings.color === c.value;
                return (
                  <button
                    key={c.value}
                    onClick={() => updateSettings({ color: c.value })}
                    className={`h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${c.class} ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-zinc-800 hover:scale-105'
                    }`}
                    title={c.label}
                  >
                    {c.value === 'currentColor' && (
                      <span className="text-[10px] font-mono text-zinc-400">auto</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tip */}
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-[11px] text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200">💡 Context Preview:</strong> Click the &quot;In-UI Preview&quot; tab above or click the eye icon on any card to see this icon inside real buttons, inputs, and navbars.
          </div>
        </div>
      )}
    </aside>
  );
};
