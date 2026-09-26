/**
 * LoveScoreTest.com - Free Relationship & Couple Tools Hub
 * Modern, High-Performance, SEO-Optimized Client-Side Web Application
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { CatalogPage } from './components/pages/CatalogPage';
import { AboutPage } from './components/pages/AboutPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';
import { ContactPage } from './components/pages/ContactPage';
import { ToolDetailView } from './components/tools/ToolDetailView';
import { SearchModal } from './components/SearchModal';
import { SocialShareModal } from './components/SocialShareModal';
import { ALL_TOOLS } from './data/toolsData';
import { ShareData } from './types';
import { AdsterraSlot } from './components/AdsterraSlot';

export default function App() {
  // Theme state: defaults to light theme for crisp contrast
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lovescore_theme');
      if (saved) return saved === 'dark';
    }
    return false;
  });

  // Helper to extract clean route from window.location
  const getInitialRoute = (): string => {
    if (typeof window === 'undefined') return 'home';

    // 1. Check if redirected from GitHub Pages 404 (e.g. ?/tool/love-calculator or ?/catalog&category=Love%20Tests)
    if (window.location.search.startsWith('?/')) {
      const decodedSearch = window.location.search
        .slice(1)
        .split('&')
        .map((s) => s.replace(/~and~/g, '&'))
        .join('?')
        .replace(/^\/+/, '');
      if (decodedSearch) return decodedSearch;
    }

    // 2. Check hash route (e.g. #/tool/love-calculator)
    if (window.location.hash) {
      const cleanHash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
      if (cleanHash) return cleanHash;
    }

    // 3. Check direct pathname + search (e.g. /tool/love-calculator or /catalog?category=Love%20Tests)
    const pathname = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '').replace(/\.html$/, '');
    const search = window.location.search && !window.location.search.startsWith('?/') ? window.location.search : '';
    const fullRoute = pathname + search;

    if (fullRoute && fullRoute !== 'index' && fullRoute !== 'home') {
      return fullRoute;
    }

    return 'home';
  };

  // Routing state
  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);

  // Search modal state
  const [searchOpen, setSearchOpen] = useState(false);

  // Social share modal state
  const [shareData, setShareData] = useState<ShareData | null>(null);

  // Sync dark theme class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lovescore_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lovescore_theme', 'light');
    }
  }, [isDark]);

  // Listen to hash and popstate changes for routing
  useEffect(() => {
    const handleLocationChange = () => {
      const route = getInitialRoute();
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Keyboard shortcut listener for ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (route: string) => {
    const cleanRoute = route.replace(/^#\/?/, '').replace(/^\/+/, '');
    const newPath = cleanRoute === 'home' || cleanRoute === '' ? '/' : `/${cleanRoute}`;
    window.history.pushState({}, '', newPath);
    setCurrentRoute(cleanRoute || 'home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleOpenShare = (data: ShareData) => {
    setShareData(data);
  };

  // Route parser
  const renderContent = () => {
    // Check if tool detail route: e.g. "tool/love-calculator"
    if (currentRoute.startsWith('tool/')) {
      const slug = currentRoute.replace('tool/', '').split('?')[0].replace(/\/+$/, '');
      const tool = ALL_TOOLS.find((t) => t.slug === slug);
      if (tool) {
        return (
          <ToolDetailView
            tool={tool}
            onNavigate={handleNavigate}
            onShare={handleOpenShare}
          />
        );
      }
    }

    // Check catalog with query parameters: e.g. "catalog?category=Love%20Tests"
    if (currentRoute.startsWith('catalog') || currentRoute.startsWith('all-tools')) {
      const queryPart = currentRoute.includes('?') ? currentRoute.split('?')[1] : '';
      const params = new URLSearchParams(queryPart);
      const categoryParam = params.get('category');
      const phaseParam = params.get('phase') ? parseInt(params.get('phase')!, 10) : null;

      return (
        <CatalogPage
          initialCategory={categoryParam}
          initialPhase={phaseParam}
          onNavigate={handleNavigate}
        />
      );
    }

    // Static pages
    const baseRoute = currentRoute.split('?')[0].replace(/\/+$/, '');
    switch (baseRoute) {
      case 'about':
        return <AboutPage />;
      case 'privacy':
      case 'privacy-policy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      case '':
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onShare={handleOpenShare}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors selection:bg-pink-500 selection:text-white">
      {/* Top Navigation Header */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Page Content */}
      <div className="relative">
        {currentRoute.startsWith('tool/') && (
          <>
            <aside
              className="hidden md:block fixed top-28 left-0 xl:left-6 2xl:left-[max(1rem,calc(50%-760px))] z-30 w-[160px]"
              aria-label="Left advertisement"
            >
              <div className="w-[160px] overflow-hidden rounded-xl border border-slate-200 bg-white/90 p-0 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
                <AdsterraSlot slot="sidebar_left" className="!my-0 !w-[160px] !px-0" />
              </div>
            </aside>

            <aside
              className="hidden md:block fixed top-28 right-0 xl:right-6 2xl:right-[max(1rem,calc(50%-760px))] z-30 w-[160px]"
              aria-label="Right advertisement"
            >
              <div className="w-[160px] overflow-hidden rounded-xl border border-slate-200 bg-white/90 p-0 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
                <AdsterraSlot slot="sidebar_right" className="!my-0 !w-[160px] !px-0" />
              </div>
            </aside>
          </>
        )}

        <main className="flex-grow">
          {renderContent()}
        </main>
      </div>

      {/* Site Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Quick Search Modal (âŒ˜K) */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectTool={(slug) => handleNavigate(`tool/${slug}`)}
      />

      {/* Global Social Sharing Modal */}
      {shareData && (
        <SocialShareModal
          isOpen={!!shareData}
          onClose={() => setShareData(null)}
          shareData={shareData}
        />
      )}
    </div>
  );
}

