import React, { useEffect, useRef } from 'react';
import { Search, UploadCloud, Code2 } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';
import type { ExportFormat } from '../../types';

export const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, settings, setExportFormat, setUploadModalOpen } =
    useStudioStore();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global Cmd+K or Ctrl+K shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formats: { id: ExportFormat; label: string }[] = [
    { id: 'tsx', label: 'React TSX' },
    { id: 'svg', label: 'Raw SVG' },
    { id: 'jsx', label: 'Tailwind' },
  ];

  return (
    <header className="h-14 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <Code2 size={18} />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-base tracking-tight text-zinc-100">
            IconCraft
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
            v1.0 open-source
          </span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative group">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors"
          />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search icons by name or tag... (⌘K)"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-14 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-emerald-500/30 transition-all"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-mono text-zinc-500 bg-zinc-800/60 border border-zinc-700/40 rounded px-1.5 py-0.5">
            ⌘K
          </div>
        </div>
      </div>

      {/* Format Selector & Actions */}
      <div className="flex items-center gap-2">
        {/* Export format pill */}
        <div className="hidden md:flex items-center bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 text-xs">
          {formats.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setExportFormat(fmt.id)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                settings.exportFormat === fmt.id
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        {/* Drop/Import button */}
        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium transition-colors cursor-pointer"
        >
          <UploadCloud size={14} />
          <span className="hidden sm:inline">Import SVG</span>
        </button>

        {/* GitHub link */}
        <a
          href="https://github.com/lucide-icons/lucide"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
          title="View on GitHub"
        >
          <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>
    </header>
  );
};
