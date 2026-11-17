import React, { useMemo, useState, useEffect } from 'react';
import { useStudioStore } from '../../store/useStudioStore';
import { ALL_LUCIDE_ICONS } from '../../engine/catalog';
import { IconCard } from './IconCard';
import { SearchX, Sparkles, ChevronDown } from 'lucide-react';

const PAGE_SIZE = 120;

export const IconGrid: React.FC = () => {
  const { searchQuery, activeCategory, customIcons, setUploadModalOpen } = useStudioStore();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset pagination when search query or category changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, activeCategory]);

  const filteredIcons = useMemo(() => {
    let pool = [...customIcons, ...ALL_LUCIDE_ICONS];

    if (activeCategory === 'custom') {
      pool = customIcons;
    } else if (activeCategory !== 'all') {
      pool = ALL_LUCIDE_ICONS.filter((icon) => icon.category === activeCategory);
    }

    if (!searchQuery.trim()) {
      return pool;
    }

    const query = searchQuery.toLowerCase().trim();
    return pool.filter(
      (icon) =>
        icon.name.toLowerCase().includes(query) ||
        icon.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [searchQuery, activeCategory, customIcons]);

  const displayedIcons = useMemo(() => {
    return filteredIcons.slice(0, visibleCount);
  }, [filteredIcons, visibleCount]);

  const hasMore = visibleCount < filteredIcons.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="space-y-4">
      {/* Category header & count */}
      <div className="flex items-center justify-between text-xs text-zinc-500 pb-1 border-b border-zinc-800/60">
        <span className="font-mono">
          Showing <strong className="text-zinc-200">{displayedIcons.length}</strong> of{' '}
          <strong className="text-zinc-200">{filteredIcons.length}</strong> icons
        </span>
        {searchQuery && (
          <span className="font-mono text-emerald-400">
            Filtered by &quot;{searchQuery}&quot;
          </span>
        )}
      </div>

      {/* Grid */}
      {displayedIcons.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3">
            {displayedIcons.map((icon) => (
              <IconCard key={icon.id} icon={icon} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="pt-4 pb-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:border-zinc-700 hover:bg-zinc-850 hover:text-emerald-400 transition-all shadow-lg cursor-pointer"
              >
                <span>Load More Icons ({filteredIcons.length - visibleCount} remaining)</span>
                <ChevronDown size={14} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
          {activeCategory === 'custom' && customIcons.length === 0 ? (
            <>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Sparkles size={24} />
              </div>
              <h3 className="text-sm font-semibold text-zinc-200">No Custom SVGs Uploaded Yet</h3>
              <p className="text-xs text-zinc-500 max-w-sm mt-1">
                Drag and drop any SVG file exported from Figma or Illustrator to convert it into a matching 1-click React component.
              </p>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="mt-4 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium transition-colors cursor-pointer"
              >
                Import your first SVG
              </button>
            </>
          ) : (
            <>
              <SearchX size={36} className="text-zinc-600 mb-3" />
              <h3 className="text-sm font-semibold text-zinc-300">No icons found</h3>
              <p className="text-xs text-zinc-500 mt-1">
                Try searching for different keywords, aliases, or browse by category.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
