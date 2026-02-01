import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const ArrivalCutscene: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      // Simple cutscene sequence
      tl.set(containerRef.current, { opacity: 1 })
        .to(textRef.current, { opacity: 1, duration: 1, ease: "power2.in" })
        .to(textRef.current, { opacity: 0, duration: 0.5, delay: 1 })
        .to(containerRef.current, { opacity: 0, duration: 0.5 });
      
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[1000] bg-black flex items-center justify-center pointer-events-none">
       <div ref={textRef} className="opacity-0 text-center">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-[0.2em] uppercase">
             Accessing Mainframe...
          </h2>
          <div className="mt-6 flex justify-center space-x-3">
             <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
             <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
             <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
       </div>
    </div>
  );
};