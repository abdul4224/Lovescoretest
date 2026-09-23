import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, Heart, ChevronRight, CheckCircle2, Clock, ArrowRight, Check } from 'lucide-react';
import { ALL_TOOLS, TOOL_CATEGORIES, TOOL_PHASES } from '../../data/toolsData';
import { ToolItem } from '../../types';
import { AdsterraSlot } from '../AdsterraSlot';

interface CatalogPageProps {
  initialCategory?: string | null;
  initialPhase?: number | null;
  onNavigate: (route: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialCategory,
  initialPhase,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedPhase, setSelectedPhase] = useState<number | 'All'>(initialPhase || 'All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'All' | 'Available' | 'Upcoming'>('All');

  // Filter tools
  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q));

      // Category
      const matchesCategory =
        selectedCategory === 'All' || tool.category === selectedCategory;

      // Phase
      const matchesPhase =
        selectedPhase === 'All' || tool.phase === selectedPhase;

      // Availability Status
      const matchesAvailability =
        availabilityFilter === 'All' ||
        (availabilityFilter === 'Available' && tool.isAvailable) ||
        (availabilityFilter === 'Upcoming' && !tool.isAvailable);

      return matchesSearch && matchesCategory && matchesPhase && matchesAvailability;
    });
  }, [searchQuery, selectedCategory, selectedPhase, availabilityFilter]);

  const activeCount = ALL_TOOLS.filter((t) => t.isAvailable).length;
  const upcomingCount = ALL_TOOLS.length - activeCount;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/70 border border-pink-200 dark:border-pink-900/60 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
          <span>The Verified 100 Tools Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore All 100 Relationship & Love Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
          From instant love calculators and 5 love languages to deep emotional attachment quizzes and couple milestone counters.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 md:p-6 shadow-sm mb-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search by tool name, topic (e.g. 'crush', 'anniversary', 'love language')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Availability Status Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
            Status:
          </span>
          <button
            type="button"
            onClick={() => setAvailabilityFilter('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              availabilityFilter === 'All'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All 100 Tools
          </button>
          <button
            type="button"
            onClick={() => setAvailabilityFilter('Available')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              availabilityFilter === 'Available'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Available Now ({activeCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setAvailabilityFilter('Upcoming')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              availabilityFilter === 'Upcoming'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Roadmap / Planned ({upcomingCount})</span>
          </button>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedPhase('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedPhase === 'All'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Phases
          </button>
          {TOOL_PHASES.map((p) => (
            <button
              type="button"
              key={p.phase}
              onClick={() => setSelectedPhase(p.phase)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedPhase === p.phase
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Phase {p.phase}: {p.name}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Categories
          </button>
          {TOOL_CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AdsterraSlot slot="homepage_incontent" />

      {/* Results Header Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-6 gap-2">
        <span>
          Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredTools.length}</strong> of 100 tools
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{activeCount} Available to Play Now</span>
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 dark:text-slate-400 font-medium">
            {upcomingCount} Scheduled on Phase Roadmap
          </span>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onNavigate(`tool/${tool.slug}`)}
              className={`rounded-3xl p-6 border transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                tool.isAvailable
                  ? 'bg-white dark:bg-slate-900 border-pink-200 dark:border-slate-800 hover:border-pink-500'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300 px-2.5 py-0.5 rounded-full bg-pink-100/80 dark:bg-pink-950/60">
                    {tool.category}
                  </span>

                  {tool.isAvailable ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Available Now
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                      <Clock className="w-3 h-3 text-slate-500" /> Roadmap Phase {tool.phase}
                    </span>
                  )}
                </div>

                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors leading-snug">
                  {tool.title}
                </h3>

                <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed line-clamp-3">
                  {tool.description}
                </p>
              </div>

              {/* Tags and CTA footer */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  #{tool.tags[0]}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-pink-600 dark:text-pink-400 group-hover:translate-x-0.5 transition-transform">
                  <span>{tool.isAvailable ? 'Launch Tool' : 'View Methodology'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
            No tools matched your search "{searchQuery}".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedPhase('All');
              setAvailabilityFilter('All');
            }}
            className="mt-4 px-5 py-2.5 rounded-xl bg-pink-600 text-white text-xs font-bold hover:bg-pink-700 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};


