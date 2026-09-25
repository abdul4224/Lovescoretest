import React from 'react';
import { Heart, Sparkles, Shield, Coffee, Globe, ArrowUpRight } from 'lucide-react';
import { TOOL_PHASES } from '../../data/toolsData';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 pt-14 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                LoveScore<span className="text-pink-600 dark:text-pink-400">Test</span>.com
              </span>
            </button>

            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              The internet’s premier free relationship tools hub. Built for real couples, curious hearts, and best friends to test compatibility, spark conversation, and celebrate love milestones.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-500" /> 100% Client-Side Private
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Always Free
              </span>
            </div>
          </div>

          {/* Popular Tools Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/tool/love-calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('tool/love-calculator');
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Love Calculator
                </a>
              </li>
              <li>
                <a
                  href="/tool/love-compatibility-test"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('tool/love-compatibility-test');
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Love Compatibility Test
                </a>
              </li>
              <li>
                <a
                  href="/tool/love-language-test"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('tool/love-language-test');
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Love Language Test
                </a>
              </li>
              <li>
                <a
                  href="/tool/couple-compatibility-quiz"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('tool/couple-compatibility-quiz');
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Couple Compatibility Quiz
                </a>
              </li>
              <li>
                <a
                  href="/tool/relationship-duration-calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('tool/relationship-duration-calculator');
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Relationship Duration
                </a>
              </li>
              <li>
                <a
                  href="/tool/days-together-calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('tool/days-together-calculator');
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Days Together Counter
                </a>
              </li>
            </ul>
          </div>

          {/* 100 Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              100 Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {TOOL_PHASES.slice(0, 5).map((phase) => (
                <li key={phase.phase}>
                  <a
                    href={`/catalog?phase=${phase.phase}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`catalog?phase=${phase.phase}`);
                    }}
                    className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-left block"
                  >
                    {phase.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('catalog');
                  }}
                  className="text-pink-600 dark:text-pink-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>View All 100 Tools</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Information & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('about');
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('privacy');
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('terms');
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('contact');
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Contact & Support
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  XML Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} LoveScoreTest.com. All rights reserved. Free love & couple tools for personal entertainment.
          </p>
          <p className="text-center md:text-right flex items-center justify-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for couples everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};
