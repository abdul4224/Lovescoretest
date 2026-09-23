import React, { useEffect, useRef } from 'react';

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

const AD_UNITS = {
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
} as const;

const loadAd = (container: HTMLDivElement, unit: AdUnitConfig) => {
  container.innerHTML = '';

  const scriptConfig = document.createElement('script');
  scriptConfig.text = `
    atOptions = {
      'key': '${unit.key}',
      'format': 'iframe',
      'height': ${unit.height},
      'width': ${unit.width},
      'params': {}
    };
  `;

  const script = document.createElement('script');
  script.src = unit.invokeSrc;
  script.async = false;

  container.appendChild(scriptConfig);
  container.appendChild(script);
};

export const AdsterraSlot: React.FC<AdsterraSlotProps> = ({ slot, className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = adRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        const unit =
          slot === 'homepage_top'
            ? window.matchMedia('(min-width: 768px)').matches
              ? AD_UNITS.homepage_top.desktop
              : AD_UNITS.homepage_top.mobile
            : AD_UNITS[slot];

        loadAd(node, unit);
        observer.disconnect();
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [slot]);

  const unit =
    slot === 'homepage_top'
      ? window.matchMedia('(min-width: 768px)').matches
        ? AD_UNITS.homepage_top.desktop
        : AD_UNITS.homepage_top.mobile
      : AD_UNITS[slot];

  return (
    <div
      className={`w-full my-6 mx-auto flex justify-center ${className}`}
      aria-label="Advertisement"
    >
      <div
        ref={adRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width: '100%',
          maxWidth: `${unit.width}px`,
          minHeight: `${unit.height}px`,
        }}
      >
        <span className="absolute top-1 right-1 z-10 text-[9px] uppercase tracking-wider text-slate-400">
          Advertisement
        </span>
      </div>
    </div>
  );
};
