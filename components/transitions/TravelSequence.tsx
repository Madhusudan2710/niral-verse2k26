import React, { useEffect } from 'react';

export const TravelSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    // Play Engine Sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3');
    audio.volume = 0.6;
    audio.play().catch(e => console.warn("Audio play failed:", e));

    const timer = setTimeout(() => {
      const fade = setInterval(() => {
        if (audio.volume > 0.1) audio.volume -= 0.1;
        else {
          clearInterval(fade);
          audio.pause();
        }
      }, 100);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[300] bg-black overflow-hidden flex items-center justify-center animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-cover bg-center scale-150 animate-[rumble_0.1s_infinite] blur-md opacity-60"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=2000")' }} 
      />
      <div className="absolute inset-0 opacity-80 mix-blend-screen">
         <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_10deg,rgba(0,240,255,0.8)_15deg,transparent_20deg,transparent_40deg,rgba(255,255,255,0.5)_45deg,transparent_50deg)] animate-[spin_0.1s_linear_infinite]" />
         <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,transparent_10deg,rgba(0,240,255,0.8)_15deg,transparent_20deg,transparent_40deg,rgba(255,255,255,0.5)_45deg,transparent_50deg)] animate-[spin_0.15s_linear_infinite_reverse]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_90%)]" />
      <div className="relative z-10 text-center transform scale-150 animate-[pulse_0.2s_infinite]">
         <h1 className="text-8xl font-black italic font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-white drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]">WARPING</h1>
         <div className="flex justify-center space-x-2 mt-4">
            <div className="w-16 h-2 bg-cyan-400 rounded-full animate-[ping_0.5s_infinite]" />
            <div className="w-16 h-2 bg-blue-400 rounded-full animate-[ping_0.5s_infinite_0.1s]" />
            <div className="w-16 h-2 bg-white rounded-full animate-[ping_0.5s_infinite_0.2s]" />
         </div>
      </div>
      <style>{`
        @keyframes rumble {
          0% { transform: translate(0, 0) scale(1.5); }
          25% { transform: translate(-2px, 2px) scale(1.52); }
          50% { transform: translate(2px, -2px) scale(1.48); }
          75% { transform: translate(-2px, -2px) scale(1.52); }
          100% { transform: translate(0, 0) scale(1.5); }
        }
      `}</style>
    </div>
  );
};