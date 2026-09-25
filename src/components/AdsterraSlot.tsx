import React, { useMemo, useState, useEffect } from 'react';

export type AdSlotType =
  | 'homepage_top'
  | 'homepage_incontent'
  | 'tool_top'
  | 'tool_bottom'
  | 'footer_banner'
  | 'sidebar_left'
  | 'sidebar_right';

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

const AD_UNITS: Record<AdSlotType, AdUnitConfig | { desktop: AdUnitConfig; mobile: AdUnitConfig }> = {
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
    desktop: {
      key: 'd5f020e9e540f361ac1b564c9757eda0',
      width: 468,
      height: 60,
      invokeSrc: 'https://www.highrevenueformat.com/d5f020e9e540f361ac1b564c9757eda0/invoke.js',
    },
    mobile: {
      key: 'b766108613a3854f274726cf98fc10e2',
      width: 320,
      height: 50,
      invokeSrc: 'https://www.highrevenueformat.com/b766108613a3854f274726cf98fc10e2/invoke.js',
    },
  },
  tool_bottom: {
    desktop: {
      key: '08591617b0d54beb48cfca5ec87f584a',
      width: 728,
      height: 90,
      invokeSrc: 'https://www.highrevenueformat.com/08591617b0d54beb48cfca5ec87f584a/invoke.js',
    },
    mobile: {
      key: '358664223067c01ff85de9714367fe2e',
      width: 300,
      height: 250,
      invokeSrc: 'https://www.highrevenueformat.com/358664223067c01ff85de9714367fe2e/invoke.js',
    },
  },
  footer_banner: {
    desktop: {
      key: '08591617b0d54beb48cfca5ec87f584a',
      width: 728,
      height: 90,
      invokeSrc: 'https://www.highrevenueformat.com/08591617b0d54beb48cfca5ec87f584a/invoke.js',
    },
    mobile: {
      key: '358664223067c01ff85de9714367fe2e',
      width: 300,
      height: 250,
      invokeSrc: 'https://www.highrevenueformat.com/358664223067c01ff85de9714367fe2e/invoke.js',
    },
  },
  sidebar_left: {
    key: 'e93dd0260f8f170aa495d6679fe95416',
    width: 160,
    height: 600,
    invokeSrc: 'https://www.highrevenueformat.com/e93dd0260f8f170aa495d6679fe95416/invoke.js',
  },
  sidebar_right: {
    key: '476617950b05b1908ee70df562525708',
    width: 160,
    height: 300,
    invokeSrc: 'https://www.highrevenueformat.com/476617950b05b1908ee70df562525708/invoke.js',
  },
};

const generateSrcDoc = (unit: AdUnitConfig) => {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><base target="_blank"><style>*,*::before,*::after{box-sizing:border-box}html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:transparent;display:flex;align-items:center;justify-content:center}</style></head><body><script type="text/javascript">atOptions={'key':'${unit.key}','format':'iframe','height':${unit.height},'width':${unit.width},'params':{}};</script><script type="text/javascript" src="${unit.invokeSrc}" async defer></script></body></html>`;
};

export const AdsterraSlot: React.FC<AdsterraSlotProps> = ({ slot, className = '' }) => {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true;
  });

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const slotEntry = AD_UNITS[slot] || AD_UNITS.homepage_incontent;
  const unit: AdUnitConfig = 'desktop' in slotEntry
    ? (isDesktop ? slotEntry.desktop : slotEntry.mobile)
    : slotEntry;

  // Above the fold slots load eagerly; below-the-fold slots load when within 250px of viewport
  const isAboveTheFold = slot === 'homepage_top' || slot === 'tool_top' || slot === 'sidebar_left' || slot === 'sidebar_right';
  const [shouldLoad, setShouldLoad] = useState<boolean>(isAboveTheFold);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAboveTheFold || shouldLoad) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isAboveTheFold, shouldLoad]);

  const srcDoc = useMemo(
    () => generateSrcDoc(unit),
    [unit.key, unit.width, unit.height, unit.invokeSrc]
  );

  return (
    <div
      ref={containerRef}
      className={`w-full my-6 mx-auto flex justify-center ${className}`}
      aria-label="Advertisement"
    >
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-lg bg-transparent"
        style={{
          width: '100%',
          maxWidth: `${unit.width}px`,
          height: `${unit.height}px`,
          minHeight: `${unit.height}px`,
        }}
      >
        {shouldLoad ? (
          <iframe
            key={`${slot}-${unit.key}`}
            title={`Advertisement ${unit.width}x${unit.height}`}
            srcDoc={srcDoc}
            width={unit.width}
            height={unit.height}
            loading={isAboveTheFold ? 'eager' : 'lazy'}
            scrolling="no"
            className="w-full border-0 overflow-hidden block"
            style={{
              maxWidth: `${unit.width}px`,
              height: `${unit.height}px`,
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

