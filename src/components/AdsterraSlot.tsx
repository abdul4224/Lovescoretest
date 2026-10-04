import React, { useEffect, useRef, useState } from 'react';

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
  const [shouldLoad, setShouldLoad] = useState<boolean>(false);

  useEffect(() => {
    // If window load deferment is set, wait for page idle
    const loadTimeout = deferUntilWindowLoad ? 1200 : 200;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setShouldLoad(true);
          }, loadTimeout);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [deferUntilWindowLoad]);

  return (
    <div 
      ref={adRef} 
      className={`adsterra-slot-container flex justify-center items-center my-6 overflow-hidden transition-all duration-300 ${className}`}
      style={{ minHeight: `${minHeight}px` }}
      aria-label={`Sponsored Partner Advertisement Slot - ${slot}`}
      role="region"
    >
      {shouldLoad ? (
        <div id={`ad-slot-${slot}`} className="w-full text-center min-h-[250px] flex items-center justify-center">
          <span className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold">
            Advertisement
          </span>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700 text-xs py-4">
          <span className="animate-pulse">Loading Sponsor...</span>
        </div>
      )}
    </div>
  );
};
