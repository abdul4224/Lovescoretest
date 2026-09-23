import React, { useState } from 'react';
import { Heart, Search, Moon, Sun, Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { TOOL_CATEGORIES } from '../../data/toolsData';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-pink-100/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 focus:outline-none group text-left cursor-pointer"
            aria-label="LoveScoreTest Home"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-pink-500/25 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 md:w-6 md:h-6 fill-white" />
            </div>
            <div>
              <span className="text-lg md:text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center">
                LoveScore<span className="text-pink-600 dark:text-pink-400">Test</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-400 -mt-1">
                Couple & Love Tools
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                currentRoute === 'home'
                  ? 'text-pink-600 dark:text-pink-400 bg-pink-50/80 dark:bg-pink-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>

            {/* Direct links to top categories */}
            <button
              onClick={() => handleNav('catalog?category=Love%20Tests')}
              className="px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              Love Tests
            </button>

            <button
              onClick={() => handleNav('catalog?category=Compatibility')}
              className="px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              Compatibility
            </button>

            <button
              onClick={() => handleNav('catalog?category=Love%20Languages')}
              className="px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              Love Languages
            </button>

            <button
              onClick={() => handleNav('catalog?category=Couple%20Games')}
              className="px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              Couple Games
            </button>

            <button
              onClick={() => handleNav('catalog?category=Calculators')}
              className="px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              Calculators
            </button>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-all text-xs font-medium cursor-pointer"
              aria-label="Search tools"
            >
              <Search className="w-4 h-4 text-pink-500" />
              <span className="hidden sm:inline">Search 100 tools...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Catalog CTA */}
            <button
              onClick={() => handleNav('catalog')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-xs shadow-md shadow-pink-500/25 hover:opacity-95 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore 100 Tools</span>
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 py-4 px-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => handleNav('home')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('catalog')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-pink-600 dark:text-pink-400 bg-pink-50/70 dark:bg-pink-950/40"
            >
              ✨ All 100 Relationship Tools Catalog
            </button>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <span className="block px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Popular Categories
              </span>
              {TOOL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleNav(`catalog?category=${encodeURIComponent(cat)}`)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-around text-xs text-slate-500 py-1">
              <button onClick={() => handleNav('about')} className="hover:text-pink-500">About</button>
              <button onClick={() => handleNav('privacy')} className="hover:text-pink-500">Privacy</button>
              <button onClick={() => handleNav('terms')} className="hover:text-pink-500">Terms</button>
              <button onClick={() => handleNav('contact')} className="hover:text-pink-500">Contact</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
