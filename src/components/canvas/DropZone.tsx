import React, { useState, useEffect } from 'react';
import { UploadCloud, Sparkles } from 'lucide-react';
import { normalizeSvg } from '../../engine/normalizer';
import { useStudioStore } from '../../store/useStudioStore';

export const DropZone: React.FC = () => {
  const { addCustomIcon, showToast } = useStudioStore();
  const [isWindowDragging, setIsWindowDragging] = useState(false);

  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter++;
      if (e.dataTransfer?.types.includes('Files')) {
        setIsWindowDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter === 0) {
        setIsWindowDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dragCounter = 0;
      setIsWindowDragging(false);

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  const processFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.name.endsWith('.svg') || file.type.includes('svg')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content) {
            handleRawSvg(content, file.name.replace(/\.svg$/i, ''));
          }
        };
        reader.readAsText(file);
      }
    });
  };

  const handleRawSvg = (rawContent: string, nameProposal: string) => {
    const result = normalizeSvg(rawContent);
    if (!result.success) {
      alert(`SVG Error: ${result.error}`);
      return;
    }

    const cleanName = nameProposal
      .replace(/[^a-zA-Z0-9-_]/g, '')
      .replace(/^./, (c) => c.toUpperCase());
    const componentName = `${cleanName}Icon`;

    addCustomIcon({
      id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: cleanName,
      componentName,
      category: 'custom',
      tags: ['custom', 'uploaded'],
      isCustom: true,
      rawSvg: result.innerMarkup,
    });

    showToast(`Standardized ${cleanName}`, `<${componentName} size={24} /> ready to use!`);
  };

  return (
    <>
      {/* Full Window Drag Overlay */}
      {isWindowDragging && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md border-4 border-dashed border-emerald-500/80 flex flex-col items-center justify-center pointer-events-none animate-in fade-in-50 duration-150">
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-700 flex flex-col items-center shadow-2xl">
            <UploadCloud size={48} className="text-emerald-400 animate-bounce" />
            <h3 className="mt-3 text-lg font-bold text-zinc-100">Drop SVG files here</h3>
            <p className="mt-1 text-xs text-zinc-400">
              Sanitizes, normalizes viewBox, and converts into 1-click React icons
            </p>
          </div>
        </div>
      )}

      {/* Top Banner Dropzone in Canvas */}
      <div className="mb-4">
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files) {
              processFiles(e.dataTransfer.files);
            }
          }}
          className="flex items-center justify-between p-3 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <input
            type="file"
            accept=".svg"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                processFiles(e.target.files);
              }
            }}
          />
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800/80 text-zinc-400 group-hover:text-emerald-400 transition-colors">
              <UploadCloud size={16} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200">
                <span>Drag & drop any SVG from Figma or desktop</span>
                <Sparkles size={12} className="text-emerald-400" />
              </div>
              <p className="text-[11px] text-zinc-500">
                Strips junk attributes, standardizes viewBox to 0 0 24 24, and injects currentColor.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60">
            Browse files
          </span>
        </label>
      </div>
    </>
  );
};
