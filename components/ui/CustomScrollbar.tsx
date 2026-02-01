import React, { useEffect, useState } from 'react';

export const CustomScrollbar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollHeight <= clientHeight) {
         setProgress(0);
         return;
      }
      const windowHeight = scrollHeight - clientHeight;
      const currentProgress = scrollTop / windowHeight;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 h-24 w-1 bg-white/10 rounded-full z-50 backdrop-blur-sm border border-white/5 hidden md:block overflow-hidden">
      <div 
        className="w-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-100 ease-out"
        style={{ height: `${Math.min(Math.max(progress * 100, 0), 100)}%` }}
      />
    </div>
  );
};