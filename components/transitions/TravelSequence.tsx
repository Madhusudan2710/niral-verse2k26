import React, { useEffect } from 'react';
import { Bike } from 'lucide-react';

export const TravelSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    // End sequence after 3 seconds
    const finishTimer = setTimeout(() => {
       onComplete();
    }, 3000);

    return () => {
       clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[2000] bg-black flex flex-col items-center justify-center font-mono overflow-hidden">
       
       {/* Background Moving Grid (Parallax Effect) */}
       <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[length:40px_100%] animate-[slideLeft_0.5s_linear_infinite]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-900/20 to-transparent" />
       </div>

       {/* Main Animation Container */}
       <div className="relative z-10 flex flex-col items-center w-full max-w-md">
          
          {/* Cyber Bike Animation */}
          <div className="relative mb-12">
             
             {/* Wind / Speed Lines */}
             <div className="absolute top-0 bottom-0 -left-20 -right-20 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-24 h-0.5 bg-gradient-to-l from-cyan-400 to-transparent opacity-0 animate-[wind_1s_infinite]" />
                <div className="absolute top-3/4 right-10 w-16 h-0.5 bg-gradient-to-l from-cyan-400 to-transparent opacity-0 animate-[wind_1.2s_infinite_0.2s]" />
                <div className="absolute top-1/2 right-5 w-32 h-0.5 bg-gradient-to-l from-white to-transparent opacity-0 animate-[wind_0.8s_infinite_0.4s]" />
             </div>

             {/* The Character (Bike) */}
             <div className="relative z-10 text-cyan-400 filter drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">
                {/* Bouncing animation to simulate riding */}
                <div className="animate-bounce" style={{ animationDuration: '0.6s' }}>
                    <Bike size={96} strokeWidth={1.5} />
                </div>
             </div>

             {/* Road Line */}
             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[slideRight_1s_linear_infinite]" />
             </div>
          </div>

          {/* Location Status */}
          <div className="mt-4 flex items-center space-x-2 text-gray-400 text-xs font-mono bg-white/5 px-4 py-2 rounded-full border border-white/5">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
             <span className="tracking-widest">LOCATING EVENT COORDINATES...</span>
          </div>

       </div>

       <style>{`
          @keyframes slideLeft {
             0% { background-position: 0 0; }
             100% { background-position: -40px 0; }
          }
          @keyframes slideRight {
             0% { transform: translateX(-100%); }
             100% { transform: translateX(100%); }
          }
          @keyframes wind {
             0% { transform: translateX(100px); opacity: 0; }
             20% { opacity: 0.8; }
             100% { transform: translateX(-200px); opacity: 0; }
          }
       `}</style>
    </div>
  );
};