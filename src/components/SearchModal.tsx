import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Heart, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { ALL_TOOLS } from '../data/toolsData';
import { ToolItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTool,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? ALL_TOOLS.filter((t) => {
        const q = query.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      }).slice(0, 8)
    : ALL_TOOLS.filter((t) => t.isAvailable).slice(0, 6);

  const handlePick = (slug: string) => {
    onSelectTool(slug);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center p-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-pink-500 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 100 tools (e.g., 'quiz', 'crush', 'anniversary', 'love language')..."
            className="w-full text-sm sm:text-base text-slate-900 dark:text-white bg-transparent focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {query.trim() ? `Search Results (${results.length})` : 'Popular & Featured Tools'}
          </div>

          {results.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handlePick(tool.slug)}
              className="w-full p-3 rounded-2xl flex items-center justify-between text-left hover:bg-pink-50/70 dark:hover:bg-slate-800/80 transition-colors group cursor-pointer"
            >
              <div className="pr-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 px-2 py-0.5 rounded-full bg-pink-100/70 dark:bg-pink-950/60">
                    {tool.category}
                  </span>
                  {tool.isAvailable ? (
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Ready
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400">
                      Phase {tool.phase}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {tool.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                  {tool.description}
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </button>
          ))}

          {results.length === 0 && (
            <div className="text-center py-10 text-xs text-slate-400">
              No matching tools found. Try searching for "love", "quiz", or "compatibility".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Tip: Press ESC to close</span>
          <span>100 Tools Directory</span>
        </div>
      </div>
    </div>
  );
};
