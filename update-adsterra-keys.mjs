import fs from 'fs';

// ============================================================================
// 1. UPDATE src/components/AdsterraSlot.tsx
// ============================================================================
const adsterraComponentCode = `import React, { useEffect, useRef, useState } from 'react';

export interface AdsterraSlotProps {
  slot: string;
  className?: string;
  minHeight?: number;
  deferUntilWindowLoad?: boolean;
}

const AD_CONFIGS: Record<string, { key: string; width: number; height: number }> = {
  // 160x600 Wide Skyscraper (Sidebars)
  sidebar_left: { key: 'e93dd0260f8f170aa495d6679fe95416', width: 160, height: 600 },
  sidebar_right: { key: 'e93dd0260f8f170aa495d6679fe95416', width: 160, height: 600 },
  
  // 160x300 Half Skyscraper
  sidebar_short: { key: '476617950b05b1908ee70df562525708', width: 160, height: 300 },

  // 728x90 Leaderboard (Desktop Header / Catalog Top)
  top_leaderboard: { key: '08591617b0d54beb48cfca5ec87f584a', width: 728, height: 90 },
  leaderboard: { key: '08591617b0d54beb48cfca5ec87f584a', width: 728, height: 90 },

  // 468x60 Classic Banner
  mid_banner: { key: 'd5f020e9e540f361ac1b564c9757eda0', width: 468, height: 60 },

  // 320x50 Mobile Top / Bottom Banner
  mobile_banner: { key: 'b766108613a3854f274726cf98fc10e2', width: 320, height: 50 },

  // 300x250 Medium Rectangle (Tool Bottom & Default)
  tool_bottom: { key: '358664223067c01ff85de9714367fe2e', width: 300, height: 250 },
  rectangle: { key: '358664223067c01ff85de9714367fe2e', width: 300, height: 250 },
  default: { key: '358664223067c01ff85de9714367fe2e', width: 300, height: 250 }
};

export const AdsterraSlot: React.FC<AdsterraSlotProps> = ({ 
  slot, 
  className = '', 
  minHeight,
  deferUntilWindowLoad = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const config = AD_CONFIGS[slot] || AD_CONFIGS.default;
  const targetMinHeight = minHeight || config.height;

  useEffect(() => {
    if (loaded) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          const delay = deferUntilWindowLoad ? 600 : 50;
          setTimeout(() => setLoaded(true), delay);
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded, deferUntilWindowLoad]);

  useEffect(() => {
    if (!loaded || !containerRef.current) return;
    const container = containerRef.current;

    // Avoid duplicate iframes
    if (container.querySelector('iframe')) return;

    const iframe = document.createElement('iframe');
    iframe.width = String(config.width);
    iframe.height = String(config.height);
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    iframe.title = \`Advertisement \${slot}\`;

    container.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(\`<!DOCTYPE html>
<html>
<head>
  <base target="_blank">
  <style>
    * { margin:0; padding:0; box-sizing: border-box; }
    body { display:flex; justify-content:center; align-items:center; background:transparent; overflow:hidden; }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '\${config.key}',
      'format' : 'iframe',
      'height' : \${config.height},
      'width' : \${config.width},
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://www.highrevenueformat.com/\${config.key}/invoke.js"></script>
</body>
</html>\`);
      doc.close();
    }
  }, [loaded, config, slot]);

  return (
    <div 
      ref={containerRef} 
      className={\`adsterra-ad-container flex flex-col justify-center items-center my-4 overflow-hidden \${className}\`}
      style={{ minHeight: \`\${targetMinHeight}px\`, minWidth: \`\${config.width}px\` }}
      aria-label={\`Sponsored Partner Advertisement - \${slot}\`}
      role="region"
    />
  );
};
`;
fs.writeFileSync('src/components/AdsterraSlot.tsx', adsterraComponentCode, 'utf8');
console.log('✅ Updated src/components/AdsterraSlot.tsx with new highrevenueformat keys');

// ============================================================================
// 2. UPDATE ad-slots.js (For static HTML article pages)
// ============================================================================
const adSlotsJsCode = `(function() {
  var AD_CONFIGS = {
    sidebar_left: { key: 'e93dd0260f8f170aa495d6679fe95416', width: 160, height: 600 },
    sidebar_right: { key: 'e93dd0260f8f170aa495d6679fe95416', width: 160, height: 600 },
    top_leaderboard: { key: '08591617b0d54beb48cfca5ec87f584a', width: 728, height: 90 },
    mid_banner: { key: 'd5f020e9e540f361ac1b564c9757eda0', width: 468, height: 60 },
    mobile_banner: { key: 'b766108613a3854f274726cf98fc10e2', width: 320, height: 50 },
    rectangle: { key: '358664223067c01ff85de9714367fe2e', width: 300, height: 250 },
    default: { key: '358664223067c01ff85de9714367fe2e', width: 300, height: 250 }
  };

  function injectAd(targetEl) {
    var slot = targetEl.getAttribute('data-slot') || 'default';
    var config = AD_CONFIGS[slot] || AD_CONFIGS.default;

    var iframe = document.createElement('iframe');
    iframe.width = config.width;
    iframe.height = config.height;
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    iframe.title = 'Advertisement ' + slot;

    targetEl.innerHTML = '';
    targetEl.appendChild(iframe);

    var doc = iframe.contentWindow ? iframe.contentWindow.document : iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write('<!DOCTYPE html><html><head><base target="_blank"><style>*{margin:0;padding:0;box-sizing:border-box;}body{display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions={\\'key\\':\\'' + config.key + '\\',\\'format\\':\\'iframe\\',\\'height\\':' + config.height + ',\\'width\\':' + config.width + ',\\'params\\':{}};</script><script type="text/javascript" src="https://www.highrevenueformat.com/' + config.key + '/invoke.js"></script></body></html>');
      doc.close();
    }
  }

  function initAds() {
    var adPlaceholders = document.querySelectorAll('.ad-slot-render');
    adPlaceholders.forEach(injectAd);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }
})();
`;
fs.writeFileSync('ad-slots.js', adSlotsJsCode, 'utf8');
console.log('✅ Updated ad-slots.js');

// ============================================================================
// 3. INJECT AD CONTAINERS IN ALL ARTICLE HTML PAGES
// ============================================================================
const articleFiles = [
  'deep-questions-for-couples.html',
  'flames-game-rules-calculator.html',
  '5-love-languages-test-guide.html',
  'zodiac-compatibility-chart.html',
  'would-you-rather-questions-for-couples.html',
  'truth-or-dare-questions-for-couples.html',
  'never-have-i-ever-questions-for-couples.html'
];

articleFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Inject Ad Slot if not present
    if (!content.includes('ad-slot-render')) {
      const adHtml = \`
    <!-- HighRevenueFormat 300x250 Adsterra Slot -->
    <div class="my-8 flex justify-center items-center">
      <div class="ad-slot-render flex justify-center items-center min-h-[250px] min-w-[300px]" data-slot="rectangle"></div>
    </div>
\`;
      content = content.replace(/(<\/article>|<section class="space-y-4">)/, \`\${adHtml}\$1\`);
      if (!content.includes('ad-slots.js')) {
        content = content.replace('</body>', '<script src="/ad-slots.js" defer></script>\n</body>');
      }
      fs.writeFileSync(file, content, 'utf8');
      console.log('✅ Injected Adsterra banner into ' + file);
    }
  }
});
