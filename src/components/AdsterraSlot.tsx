import React, { useEffect, useRef, useState } from 'react';

export type AdSlotType =
  | 'homepage_top'
  | 'homepage_incontent'
  | 'tool_top'
  | 'tool_bottom'
  | 'footer_banner';

interface AdsterraSlotProps {
  slot: AdSlotType;
  className?: string;
}

interface AdUnitConfig {
  key: string;
  width: number;
  height: number;
  invokeSrc: string;
}

/**
 * Real Adsterra "Banner" (atOptions/invoke.js) zone codes.
 * Centralized here so swapping a zone (e.g. re-sizing footer_banner)
 * is a one-line edit and never touches HomePage.tsx / ToolDetailView.tsx.
 *
 * NOTE: footer_banner currently uses a 160x600 skyscraper code because
 * that was the 6th code provided — it will render tall/narrow inside the
 * footer strip. Swap this entry (or with tool_bottom) once a wider
 * 728x90 / 320x50 footer-shaped zone is available from Adsterra.
 */
const AD_UNITS: Record<Exclude<AdSlotType, 'homepage_top'>, AdUnitConfig> & {
  homepage_top: { desktop: AdUnitConfig; mobile: AdUnitConfig };
} = {
  homepage_top: {
    desktop: {
      key: '08591617b0d54beb48cfca5ec87f584a',
      width: 728,
      height: 90,
      invokeSrc: 'https://www.highrevenueformat.com/08591617b0d54beb48cfca5ec87f584a/invoke.js',
    },
    mobile: {
      key: 'b766108613a3854f274726cf98fc10e2',
      width: 320,
      height: 50,
      invokeSrc: 'https://www.highrevenueformat.com/b766108613a3854f274726cf98fc10e2/invoke.js',
    },
  },
  homepage_incontent: {
    key: '358664223067c01ff85de9714367fe2e',
    width: 300,
    height: 250,
    invokeSrc: 'https://www.highrevenueformat.com/358664223067c01ff85de9714367fe2e/invoke.js',
  },
  tool_top: {
    key: 'd5f020e9e540f361ac1b564c9757eda0',
    width: 468,
    height: 60,
    invokeSrc: 'https://www.highrevenueformat.com/d5f020e9e540f361ac1b564c9757eda0/invoke.js',
  },
  tool_bottom: {
    key: '476617950b05b1908ee70df562525708',
    width: 160,
    height: 300,
    invokeSrc: 'https://www.highrevenueformat.com/476617950b05b1908ee70df562525708/invoke.js',
  },
  footer_banner: {
    key: 'e93dd0260f8f170aa495d6679fe95416',
    width: 160,
    height: 600,
    invokeSrc: 'https://www.highrevenueformat.com/e93dd0260f8f170aa495d6679fe95416/invoke.js',
  },
};

/**
 * Builds the isolated HTML document loaded inside the ad iframe.
 * Adsterra's invoke.js can call document.write() — running it inside a
 * sandboxed iframe (instead of injecting the <script> directly into the
 * live page) means that write() only ever touches this throwaway iframe
 * document, never the real React app DOM.
 */
const buildAdIframeDoc = (unit: AdUnitConfig): string => `<!doctype html>
<html><head><meta charset="utf-8" /><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent;display:flex;align-items:center;justify-content:center;}</style></head>
<body>
<script>
  atOptions = {
    'key': '${unit.key}',
    'format': 'iframe',
    'height': ${unit.height},
    'width': ${unit.width},
    'params': {}
  };
<\/script>
<script src="${unit.invokeSrc}"><\/script>
</body></html>`;

/**
 * Reusable Adsterra Ad Slot Component
 *
 * - Renders a CLS-resistant reserved-space placeholder until the slot
 *   scrolls near the viewport, then lazy-loads the real Adsterra unit.
 * - The ad itself loads inside a sandboxed iframe so Adsterra's script
 *   (which may use document.write) can never affect the host page.
 * - Ads never disguise as buttons, never cover interactive tools, and
 *   adhere strictly to user trust.
 */
export const AdsterraSlot: React.FC<AdsterraSlotProps> = ({ slot, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [activeUnit, setActiveUnit] = useState<AdUnitConfig | null>(null);

  const getSlotConfig = () => {
    switch (slot) {
      case 'homepage_top':
        return {
          minHeight: 'min-h-[90px] md:min-h-[100px]',
        };
      case 'homepage_incontent':
        return {
          minHeight: 'min-h-[250px]',
        };
      case 'tool_top':
        return {
          minHeight: 'min-h-[80px]',
        };
      case 'tool_bottom':
        return {
          minHeight: 'min-h-[120px]',
        };
      case 'footer_banner':
        return {
          minHeight: 'min-h-[90px]',
        };
    }
  };

  const config = getSlotConfig();

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const unit =
            slot === 'homepage_top'
              ? window.matchMedia('(min-width: 768px)').matches
                ? AD_UNITS.homepage_top.desktop
                : AD_UNITS.homepage_top.mobile
              : (AD_UNITS[slot] as AdUnitConfig);

          setActiveUnit(unit);
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [slot]);

  return (
    <div
      className={`w-full my-6 mx-auto max-w-4xl px-4 transition-all duration-200 ${className}`}
      aria-label="Advertisement Section"
    >
      <div
        ref={containerRef}
        className={`w-full rounded-2xl border border-slate-200/80 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm text-center flex flex-col items-center justify-center relative overflow-hidden ${config.minHeight} ${shouldLoad ? '' : 'p-4'}`}
      >
        <span className="absolute top-2 right-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 z-10">
          Advertisement
        </span>

        {shouldLoad && activeUnit ? (
          <iframe
            title="Advertisement"
            srcDoc={buildAdIframeDoc(activeUnit)}
            width={activeUnit.width}
            height={activeUnit.height}
            style={{ border: 'none', maxWidth: '100%' }}
            scrolling="no"
            loading="lazy"
            sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
          />
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-500 py-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
              <span>Advertisement</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
