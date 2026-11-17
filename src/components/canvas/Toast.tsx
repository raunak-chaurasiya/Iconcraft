import React, { useEffect } from 'react';
import { useStudioStore } from '../../store/useStudioStore';
import { Check, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useStudioStore();

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      clearToast();
    }, 2200);

    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-900/95 backdrop-blur-md border border-zinc-700/80 shadow-2xl shadow-black/80 text-xs">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">
          <Check size={13} />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-100">{toast.title}</span>
          <span className="text-zinc-500 font-mono">copied to clipboard!</span>
        </div>
        <button
          onClick={clearToast}
          className="text-zinc-500 hover:text-zinc-300 transition-colors ml-2"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
