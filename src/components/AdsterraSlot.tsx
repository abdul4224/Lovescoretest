import React, { useEffect, useRef, useState } from 'react';

interface AdsterraSlotProps {
  slot: string;
  className?: string;
  minHeight?: number;
}

export const AdsterraSlot: React.FC<AdsterraSlotProps> = ({ 
  slot, 
  className = '', 
  minHeight = 250 
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Lazy load ads only when user is about to reach the ad container (200px margin)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={adRef} 
      className={`adsterra-container flex justify-center items-center my-6 overflow-hidden ${className}`}
      style={{ minHeight: `${minHeight}px` }}
      aria-label={`Advertisement Slot ${slot}`}
    >
      {isVisible ? (
        <div id={`ad-container-${slot}`} className="w-full text-center">
          {/* Ad script will inject smoothly here without blocking main thread */}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center text-slate-300 dark:text-slate-700 text-xs py-4">
          <span>Sponsored</span>
        </div>
      )}
    </div>
  );
};
