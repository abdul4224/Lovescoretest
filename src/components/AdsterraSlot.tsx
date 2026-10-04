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
      className={`adsterra-slot-container flex flex-col justify-center items-center my-6 overflow-hidden rounded-xl bg-slate-50/50 dark:bg-slate-900/40 p-2 ${className}`}
      style={{ minHeight: `${minHeight}px` }}
      aria-label={`Advertisement Slot - ${slot}`}
      role="region"
    >
      <div id={`adsterra-${slot}`} className="w-full text-center flex items-center justify-center min-h-[250px]">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium">
          Advertisement
        </span>
      </div>
    </div>
  );
};
