import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const GrainOverlay: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-[9000] opacity-[0.05] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    // Initial positioning hidden
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });
    gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15; // Follower lag factor

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const fXSet = gsap.quickSetter(follower, "x", "px");
    const fYSet = gsap.quickSetter(follower, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
       mouse.x = e.clientX;
       mouse.y = e.clientY;
       
       // Instant move for dot
       xSet(mouse.x);
       ySet(mouse.y);

       // Reveal on first move
       gsap.to(cursor, { scale: 1, duration: 0.3, overwrite: 'auto' });
       gsap.to(follower, { scale: 1, duration: 0.3, overwrite: 'auto' });
    };

    const loop = () => {
      // Smooth follow logic
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      fXSet(pos.x);
      fYSet(pos.y);
    };

    window.addEventListener("mousemove", onMouseMove);
    gsap.ticker.add(loop);

    // Interaction Effects
    const handleMouseEnter = (e: Event) => {
        const target = e.target as HTMLElement;
        const isMagnetic = target.classList.contains('magnetic');
        
        // Scale dot down, scale follower up and change blend mode
        gsap.to(cursor, { scale: 0.5, opacity: 0, duration: 0.3 });
        gsap.to(follower, { 
            scale: 2.5, 
            backgroundColor: "rgba(0, 240, 255, 0.15)", 
            borderColor: "rgba(0, 240, 255, 0)",
            backdropFilter: "blur(2px)",
            duration: 0.3 
        });

        if (isMagnetic) {
          // Additional magnetic logic could go here
        }
    };

    const handleMouseLeave = () => {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(follower, { 
            scale: 1, 
            backgroundColor: "transparent", 
            borderColor: "rgba(0, 240, 255, 0.5)",
            backdropFilter: "blur(0px)",
            duration: 0.3 
        });
    };

    const addListeners = () => {
        const targets = document.querySelectorAll('button, a, input, [role="button"], .interactive, .cursor-hover');
        targets.forEach(el => {
            // Remove previous to avoid dupes if re-running
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
            
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });
    };

    addListeners();

    // Watch for DOM changes to attach listeners to new elements (like modals)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(loop);
      observer.disconnect();
      const targets = document.querySelectorAll('button, a, input, [role="button"], .interactive, .cursor-hover');
      targets.forEach(el => {
         el.removeEventListener('mouseenter', handleMouseEnter);
         el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Inner dot: reduced from w-2 h-2 to w-1.5 h-1.5 */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block" />
      {/* Outer ring: reduced from w-12 h-12 to w-8 h-8 */}
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-cyan-500/50 rounded-full pointer-events-none z-[9999] hidden md:block transition-colors duration-300" />
    </>
  );
};