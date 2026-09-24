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

  // Routing state based on window.location.hash
  const [currentHash, setCurrentHash] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash.replace(/^\/?/, '') || 'home';
    }
    return 'home';
  });

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

  // Listen to hash changes for routing
  useEffect(() => {
  const handlePopState = () => {
    const cleanPath = window.location.pathname.replace(/^\//, '') || 'home';
    setCurrentHash(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  window.addEventListener('popstate', handlePopState);
  return () => window.removeEventListener('popstate', handlePopState);
}, []);

  // Keyboard shortcut listener for âŒ˜K or Ctrl+K
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
  const cleanRoute = route.replace(/^#\/?/, '');
  window.history.pushState({}, '', `/${cleanRoute}`);
  setCurrentHash(cleanRoute);
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
    if (currentHash.startsWith('tool/')) {
      const slug = currentHash.replace('tool/', '').split('?')[0];
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
    if (currentHash.startsWith('catalog')) {
      const queryPart = currentHash.includes('?') ? currentHash.split('?')[1] : '';
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
    switch (currentHash) {
      case 'about':
        return <AboutPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
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
        currentRoute={currentHash}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Page Content */}
      <div className="relative">
        {currentHash.startsWith('tool/') && (
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

