import fs from 'fs';
import path from 'path';

// 1. UPDATE AdsterraSlot.tsx
const adSlotTsx = `import React, { useEffect, useRef, useState } from 'react';

interface AdsterraSlotProps {
  slot: string;
  className?: string;
  minHeight?: number;
  deferUntilWindowLoad?: boolean;
}

export const AdsterraSlot: React.FC<AdsterraSlotProps> = ({ 
  slot, 
  className = '', 
  minHeight = 250,
  deferUntilWindowLoad = false
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isRendered) return;
    const container = adRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isRendered) {
          setIsRendered(true);
          observer.disconnect();

          const scriptTag = document.createElement('script');
          scriptTag.type = 'text/javascript';
          scriptTag.src = '/ad-slots.js?slot=' + encodeURIComponent(slot);
          scriptTag.async = true;
          container.appendChild(scriptTag);
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [slot, isRendered, deferUntilWindowLoad]);

  return (
    <div 
      ref={adRef} 
      className={\`adsterra-slot-container flex flex-col justify-center items-center my-6 overflow-hidden rounded-xl bg-slate-50/50 dark:bg-slate-900/40 p-2 \${className}\`}
      style={{ minHeight: \`\${minHeight}px\` }}
      aria-label={\`Advertisement Slot - \${slot}\`}
      role="region"
    >
      <div id={\`adsterra-\${slot}\`} className="w-full text-center flex items-center justify-center min-h-[250px]">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium">
          Advertisement
        </span>
      </div>
    </div>
  );
};
`;
fs.writeFileSync('src/components/AdsterraSlot.tsx', adSlotTsx, 'utf8');
console.log('✅ Updated src/components/AdsterraSlot.tsx');

// 2. UPDATE ad-slots.js
const adSlotsJs = `(function() {
  var urlParams = new URLSearchParams(window.location.search);
  var currentScript = document.currentScript;
  var slot = "default";
  
  if (currentScript && currentScript.src) {
    try {
      var scriptUrl = new URL(currentScript.src, window.location.origin);
      slot = scriptUrl.searchParams.get("slot") || "default";
    } catch(e) {}
  }

  var target = document.getElementById("adsterra-" + slot) || (currentScript && currentScript.parentElement);
  if (!target) return;

  var adFrame = document.createElement("iframe");
  adFrame.style.width = "100%";
  adFrame.style.maxWidth = "728px";
  adFrame.style.height = "250px";
  adFrame.style.border = "none";
  adFrame.style.overflow = "hidden";
  adFrame.scrolling = "no";
  adFrame.title = "Advertisement " + slot;

  target.innerHTML = "";
  target.appendChild(adFrame);

  var frameDoc = adFrame.contentWindow ? adFrame.contentWindow.document : adFrame.contentDocument;
  if (frameDoc) {
    frameDoc.open();
    frameDoc.write(\`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;}</style></head><body><script type="text/javascript">atOptions={'key':'e86b0a880f8ebce4ceeb46ff53c846bf','format':'iframe','height':250,'width':300,'params':{}};</script><script type="text/javascript" src="//www.highperformanceformat.com/e86b0a880f8ebce4ceeb46ff53c846bf/invoke.js"></script></body></html>\`);
    frameDoc.close();
  }
})();
`;
fs.writeFileSync('ad-slots.js', adSlotsJs, 'utf8');
console.log('✅ Updated ad-slots.js');

// 3. UPDATE HomePage.tsx to display articles
let homeContent = fs.readFileSync('src/components/pages/HomePage.tsx', 'utf8');
if (!homeContent.includes('Featured Viral Articles')) {
  const articlesUI = `
      {/* Featured Viral Articles & Relationship Guides */}
      <section className="mt-16 mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 mb-2">
              <span>📖 Expert Guides & Game Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Relationship Articles & Question Banks
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Explore our trending conversation starters, psychology guides, and date-night games.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/deep-questions-for-couples.html" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-500 dark:hover:border-pink-500 shadow-sm hover:shadow-md transition">
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">🔥 Trending 150k+</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-pink-600 mt-2">120+ Deep Late-Night Questions for Couples</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Emotional vulnerability, romantic spark, and intimacy questions to ask late at night.</p>
            <span className="inline-block mt-4 text-xs font-bold text-pink-600 group-hover:translate-x-1 transition-transform">Read Full Article →</span>
          </a>

          <a href="/flames-game-rules-calculator.html" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-500 dark:hover:border-pink-500 shadow-sm hover:shadow-md transition">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">⭐ Viral Game</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 mt-2">FLAMES Love Game Rules & Calculator Guide</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">How FLAMES works: Friendship, Love, Affection, Marriage, Enmity, and Siblings.</p>
            <span className="inline-block mt-4 text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">Read Full Article →</span>
          </a>

          <a href="/5-love-languages-test-guide.html" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-500 dark:hover:border-pink-500 shadow-sm hover:shadow-md transition">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">💖 Psychology</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-600 mt-2">The 5 Love Languages Explained</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Words of Affirmation, Quality Time, Gifts, Acts of Service, and Physical Touch.</p>
            <span className="inline-block mt-4 text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">Read Full Article →</span>
          </a>

          <a href="/zodiac-compatibility-chart.html" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-500 dark:hover:border-pink-500 shadow-sm hover:shadow-md transition">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">✨ Astrology</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 mt-2">Zodiac Sign Love Compatibility Chart</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Elemental matches, chemistry percentages, and star sign romantic pairings.</p>
            <span className="inline-block mt-4 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">Read Full Article →</span>
          </a>

          <a href="/would-you-rather-questions-for-couples.html" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-500 dark:hover:border-pink-500 shadow-sm hover:shadow-md transition">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">🎉 Fun & Party</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 mt-2">100+ Would You Rather Questions</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Hilarious, romantic, and deep scenario questions for dating and married couples.</p>
            <span className="inline-block mt-4 text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">Read Full Article →</span>
          </a>

          <a href="/truth-or-dare-questions-for-couples.html" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-500 dark:hover:border-pink-500 shadow-sm hover:shadow-md transition">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">🔥 Date Night</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 mt-2">Romantic Truth or Dare for Couples</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Spicy, sweet, and intimate dares and truths to reignite couple spark.</p>
            <span className="inline-block mt-4 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">Read Full Article →</span>
          </a>
        </div>
      </section>
`;
  homeContent = homeContent.replace(/(<\/div>\s*<\/div>\s*\);\s*};?\s*export default HomePage;)/, `${articlesUI}\n$1`);
  fs.writeFileSync('src/components/pages/HomePage.tsx', homeContent, 'utf8');
  console.log('✅ Injected Articles section into HomePage.tsx');
}

// 4. UPDATE Footer.tsx
let footerContent = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');
if (!footerContent.includes('Relationship Guides')) {
  const footerArticles = `
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase mb-4">
              Relationship Guides
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="/deep-questions-for-couples.html" className="text-slate-600 dark:text-slate-400 hover:text-pink-600">120+ Deep Late Night Questions</a></li>
              <li><a href="/flames-game-rules-calculator.html" className="text-slate-600 dark:text-slate-400 hover:text-pink-600">FLAMES Game Online Rules</a></li>
              <li><a href="/5-love-languages-test-guide.html" className="text-slate-600 dark:text-slate-400 hover:text-pink-600">5 Love Languages Test Guide</a></li>
              <li><a href="/zodiac-compatibility-chart.html" className="text-slate-600 dark:text-slate-400 hover:text-pink-600">Zodiac Compatibility Chart</a></li>
              <li><a href="/would-you-rather-questions-for-couples.html" className="text-slate-600 dark:text-slate-400 hover:text-pink-600">Would You Rather Couples Game</a></li>
              <li><a href="/truth-or-dare-questions-for-couples.html" className="text-slate-600 dark:text-slate-400 hover:text-pink-600">Truth or Dare Couples Edition</a></li>
              <li><a href="/never-have-i-ever-questions-for-couples.html" className="text-slate-600 dark:text-slate-400 hover:text-pink-600">Never Have I Ever for Couples</a></li>
            </ul>
          </div>
`;
  footerContent = footerContent.replace(/(<div className="grid grid-cols-2[^"]*">)/, `$1\n${footerArticles}`);
  fs.writeFileSync('src/components/layout/Footer.tsx', footerContent, 'utf8');
  console.log('✅ Injected Articles links into Footer.tsx');
}
