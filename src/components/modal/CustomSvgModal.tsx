import React, { useState } from 'react';
import { useStudioStore } from '../../store/useStudioStore';
import { normalizeSvg } from '../../engine/normalizer';
import { X, Sparkles, AlertCircle, Check } from 'lucide-react';

export const CustomSvgModal: React.FC = () => {
  const { isUploadModalOpen, setUploadModalOpen, addCustomIcon, showToast } = useStudioStore();
  const [svgName, setSvgName] = useState('');
  const [rawSvgInput, setRawSvgInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isUploadModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!rawSvgInput.trim()) {
      setError('Please paste your SVG markup.');
      return;
    }

    const result = normalizeSvg(rawSvgInput);
    if (!result.success) {
      setError(result.error || 'Failed to parse SVG.');
      return;
    }

    const cleanName = (svgName.trim() || 'CustomIcon')
      .replace(/[^a-zA-Z0-9-_]/g, '')
      .replace(/^./, (c) => c.toUpperCase());
    const componentName = `${cleanName}Icon`;

    addCustomIcon({
      id: `custom-${Date.now()}`,
      name: cleanName,
      componentName,
      category: 'custom',
      tags: ['custom', 'imported'],
      isCustom: true,
      rawSvg: result.innerMarkup,
    });

    showToast(`Standardized ${cleanName}`, `<${componentName} size={24} /> ready!`);
    setUploadModalOpen(false);
    setSvgName('');
    setRawSvgInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-emerald-400" />
            <h3 className="text-sm font-bold text-zinc-100">Import Custom SVG</h3>
          </div>
          <button
            onClick={() => setUploadModalOpen(false)}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Icon Name (e.g. MyBrand, UserBadge)
            </label>
            <input
              type="text"
              value={svgName}
              onChange={(e) => setSvgName(e.target.value)}
              placeholder="e.g. RocketLaunch"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Paste Raw SVG Markup
            </label>
            <textarea
              rows={6}
              value={rawSvgInput}
              onChange={(e) => {
                setRawSvgInput(e.target.value);
                setError(null);
              }}
              placeholder='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> ... </svg>'
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs font-mono text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-zinc-500">
              Auto-sanitizes & standardizes viewBox to 0 0 24 24
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 text-zinc-950 text-xs font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                <Check size={14} />
                <span>Sanitize & Convert</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
