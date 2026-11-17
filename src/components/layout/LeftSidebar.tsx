import React, { useMemo } from 'react';
import { CATEGORIES, ALL_LUCIDE_ICONS } from '../../engine/catalog';
import { useStudioStore } from '../../store/useStudioStore';
import * as LucideIcons from 'lucide-react';
import { Sparkles, Trash2 } from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const { activeCategory, setActiveCategory, customIcons, clearCustomIcons } = useStudioStore();

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: ALL_LUCIDE_ICONS.length + customIcons.length,
      custom: customIcons.length,
    };
    ALL_LUCIDE_ICONS.forEach((icon) => {
      counts[icon.category] = (counts[icon.category] || 0) + 1;
    });
    return counts;
  }, [customIcons]);

  return (
    <aside className="w-64 border-r border-zinc-800/80 bg-zinc-950 flex flex-col h-[calc(100vh-3.5rem)] select-none shrink-0 overflow-y-auto">
      {/* Custom Uploads Pinned Header */}
      <div className="p-3">
        <div
          onClick={() => setActiveCategory('custom')}
          className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
            activeCategory === 'custom'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-emerald-400" />
            <span className="text-xs font-semibold">My Custom SVGs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
              {customIcons.length}
            </span>
            {customIcons.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Clear all uploaded custom SVGs?')) {
                    clearCustomIcons();
                  }
                }}
                title="Clear all"
                className="p-1 hover:text-rose-400 text-zinc-500 transition-colors"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-3 pb-2 pt-1">
        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 px-2 py-1 font-semibold">
          Categories ({ALL_LUCIDE_ICONS.length} Icons)
        </div>
        <div className="space-y-0.5 mt-1">
          {CATEGORIES.filter((c) => c.id !== 'custom').map((category) => {
            const IconComponent =
              // @ts-expect-error dynamic lucide component access
              (LucideIcons[category.iconName] as React.ElementType) || LucideIcons.Folder;

            const isActive = activeCategory === category.id;
            const count = categoryCounts[category.id] || 0;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 text-zinc-100 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate pr-1">
                  <IconComponent size={15} className={isActive ? 'text-zinc-100' : 'text-zinc-500'} />
                  <span className="truncate">{category.name}</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto p-3 border-t border-zinc-800/80 text-[11px] text-zinc-500">
        <div className="flex items-center justify-between">
          <span>Active Library</span>
          <span className="font-mono text-emerald-400 font-semibold">2,089 Icons</span>
        </div>
      </div>
    </aside>
  );
};
