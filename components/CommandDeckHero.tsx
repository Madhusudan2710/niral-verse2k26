import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  ShieldCheck, MapPin, Terminal, Calendar, Wifi, Clock, 
  GraduationCap, Building, Info, Map
} from 'lucide-react';

interface CommandDeckHeroProps {
  onInitiateDrop: () => void;
}

// --- Digital Rain Background Effect ---
const DigitalRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < interval) return;

      lastTime = currentTime - (deltaTime % interval);

      ctx.fillStyle = 'rgba(0, 5, 8, 0.05)'; // Fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        
        // Random colors: mostly cyan, some orange/white
        const randomColor = Math.random();
        if (randomColor > 0.98) ctx.fillStyle = '#FFF'; 
        else if (randomColor > 0.95) ctx.fillStyle = '#ED985F'; 
        else ctx.fillStyle = '#00F0FF';

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen" />;
};

// --- Glowing Circuit Connector Lines (Left Blue / Right Orange) ---
const CircuitLines: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="grad-orange-wing" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="#ffaa40" stopOpacity="0.2" />
             <stop offset="50%" stopColor="#ff5500" />
             <stop offset="100%" stopColor="#ffaa40" />
          </linearGradient>
           <linearGradient id="grad-blue-wing" x1="100%" y1="0%" x2="0%" y2="0%">
             <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
             <stop offset="50%" stopColor="#0055ff" />
             <stop offset="100%" stopColor="#00f0ff" />
          </linearGradient>
        </defs>

        {/* 
            UPDATED PATHS: Connecting Center to Upper Panels Only
            Coordinate system is 0-100 (percentage-like behavior)
        */}

        {/* LEFT WING (Cyan) - Connecting to Top Left Panel */}
        {/* Main Thick Line */}
        <path 
          d="M 42 54 L 32 54 L 18 32" 
          stroke="url(#grad-blue-wing)" 
          strokeWidth="0.3" 
          fill="none" 
          filter="url(#glow-blue)" 
          className="opacity-90"
        />
        {/* Secondary Detail Line */}
        <path 
          d="M 43 55.5 L 31 55.5 L 25 46" 
          stroke="#00f0ff" 
          strokeWidth="0.1" 
          fill="none" 
          className="opacity-40"
        />

        {/* RIGHT WING (Orange) - Connecting to Top Right Panel */}
        {/* Main Thick Line */}
        <path 
          d="M 58 54 L 68 54 L 82 32" 
          stroke="url(#grad-orange-wing)" 
          strokeWidth="0.3" 
          fill="none" 
          filter="url(#glow-orange)" 
          className="opacity-90"
        />
        {/* Secondary Detail Line */}
        <path 
          d="M 57 55.5 L 69 55.5 L 75 46" 
          stroke="#ffaa40" 
          strokeWidth="0.1" 
          fill="none" 
          className="opacity-40"
        />
        
        {/* Connection Points - Left (Cyan) */}
        <circle cx="42" cy="54" r="0.4" fill="#00f0ff" filter="url(#glow-blue)" />
        <circle cx="32" cy="54" r="0.3" fill="#00f0ff" filter="url(#glow-blue)" />
        <circle cx="18" cy="32" r="0.5" fill="#00f0ff" filter="url(#glow-blue)" />

        {/* Connection Points - Right (Orange) */}
        <circle cx="58" cy="54" r="0.4" fill="#ffaa40" filter="url(#glow-orange)" />
        <circle cx="68" cy="54" r="0.3" fill="#ffaa40" filter="url(#glow-orange)" />
        <circle cx="82" cy="32" r="0.5" fill="#ffaa40" filter="url(#glow-orange)" />

      </svg>
    </div>
  );
};

// --- Holographic Glass Panel ---
const HudPanel: React.FC<{
  className?: string;
  children: React.ReactNode;
  delay?: number;
  variant?: 'cyan' | 'orange';
}> = ({ className, children, delay = 0, variant = 'cyan' }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(panelRef.current, 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, delay: delay, ease: "back.out(1.2)" }
    );
  }, [delay]);

  // Dynamic styles based on variant
  const borderColor = variant === 'orange' ? 'border-orange-500' : 'border-cyan-400';
  const sideAccentGradient = variant === 'orange' ? 'from-transparent via-orange-500 to-transparent' : 'from-transparent via-cyan-500 to-transparent';
  const borderStyle = variant === 'orange' ? 'rgba(255, 170, 64, 0.4)' : 'rgba(0, 240, 255, 0.3)';
  const shadowColor = variant === 'orange' ? 'rgba(255, 170, 64, 0.05)' : 'rgba(0, 240, 255, 0.05)';
  const hoverShadow = variant === 'orange' ? 'hover:shadow-[0_0_50px_rgba(255,170,64,0.3)]' : 'hover:shadow-[0_0_50px_rgba(0,240,255,0.3)]';

  return (
    <div 
      ref={panelRef}
      className={`relative group rounded-xl overflow-hidden transition-all duration-500 ${hoverShadow} w-full ${className}`}
      style={{ 
        background: 'rgba(10, 25, 47, 0.4)', 
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${borderStyle}`,
        boxShadow: `0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 20px ${shadowColor}`,
      }}
    >
      {/* Top Gloss Reflection */}
      <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none opacity-50" />
      
      {/* Side Accents */}
      <div className={`absolute top-1/4 left-0 w-[2px] h-1/2 bg-gradient-to-b ${sideAccentGradient} opacity-50`} />
      <div className={`absolute top-1/4 right-0 w-[2px] h-1/2 bg-gradient-to-b ${sideAccentGradient} opacity-50`} />

      {/* Corner Brackets */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${borderColor} rounded-tl-md opacity-80`} />
      <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${borderColor} rounded-tr-md opacity-80`} />
      <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${borderColor} rounded-bl-md opacity-80`} />
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${borderColor} rounded-br-md opacity-80`} />

      <div className="relative z-10 p-6 md:p-7 h-full flex flex-col justify-between">
          {children}
      </div>
    </div>
  );
};

export const CommandDeckHero: React.FC<CommandDeckHeroProps> = ({ onInitiateDrop }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target Date: 17 Feb 2026, 09:00 AM
    const targetDate = new Date('2026-02-17T09:00:00'); 

    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
       const tl = gsap.timeline();
       
       tl.from(titleRef.current, {
          scale: 2,
          opacity: 0,
          filter: "blur(20px)",
          duration: 1.5,
          ease: "expo.out"
       })
       .from(btnRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)"
       }, "-=0.8");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-[#020408] flex items-center justify-center font-sans select-none"
      style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
    >
      
      {/* Layer 0: Digital Rain Background (Reduced Opacity) */}
      <DigitalRain />
      
      {/* Layer 1: Vignette & Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)] z-0 pointer-events-none" />
      
      {/* Grid Floor Effect - Softened Significantly */}
      <div className="absolute bottom-0 inset-x-0 h-2/3 bg-transparent z-0 pointer-events-none opacity-[0.05]"
           style={{ 
             backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 240, 255, .3) 25%, rgba(0, 240, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 240, 255, .3) 75%, rgba(0, 240, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 240, 255, .3) 25%, rgba(0, 240, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 240, 255, .3) 75%, rgba(0, 240, 255, .3) 76%, transparent 77%, transparent)', 
             backgroundSize: '50px 50px',
             transform: 'rotateX(60deg) scale(2.5)',
             transformOrigin: 'bottom center',
             maskImage: 'linear-gradient(to top, black 20%, transparent 80%)',
             WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 80%)'
           }}
      />

      {/* Layer 2: Circuit Connector Lines */}
      <CircuitLines />

      {/* Layer 3: Main Layout Grid (Symmetrical System) */}
      <div className="relative z-20 w-full max-w-[1500px] h-full mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-12 px-6">
        
        {/* Left Column: Panels anchored to right side (center-facing) */}
        <div className="hidden md:flex flex-col gap-12 items-end justify-center h-full pb-12 perspective-group">
            {/* Top Left Panel: College Info */}
            <div className="w-[340px] transition-transform duration-500 hover:scale-105 hover:z-50"
                 style={{ transform: 'rotateY(25deg) rotateX(5deg)', transformOrigin: 'center right' }}>
                <HudPanel delay={0.2} variant="cyan">
                    <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-2">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">HOST INSTITUTION</span>
                            <div className="text-lg font-orbitron font-bold text-white tracking-wide mt-2 leading-tight">
                                Hindustan College of Arts & Science 
                            </div>
                        </div>
                        <Building size={20} className="text-cyan-400 mt-1" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <div className="text-xs font-mono text-cyan-100/80 flex items-start gap-3">
                                <GraduationCap size={16} className="mt-0.5 text-cyan-400" />
                                <span>Affiliated to University of Madras</span>
                            </div>
                            <div className="text-xs font-mono text-cyan-100/80 flex items-start gap-3">
                                <ShieldCheck size={16} className="mt-0.5 text-green-400" />
                                <span>NAAC 'A' Grade (2f) Status by UGC</span>
                            </div>
                            <div className="text-xs font-mono text-cyan-100/80 flex items-start gap-3">
                                <Clock size={16} className="mt-0.5 text-cyan-400" />
                                <span>Christian Minority Institution</span>
                            </div>
                        </div>
                        
                        <div className="mt-2 pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-gray-400">
                             <MapPin size={14} className="text-cyan-400" /> Padur, Chennai – 603103
                        </div>
                    </div>
                </HudPanel>
            </div>

            {/* Bottom Left Panel: Conducted By */}
            <div className="w-[380px] transition-transform duration-500 hover:scale-105 hover:z-50"
                 style={{ transform: 'rotateY(25deg) rotateX(-5deg)', transformOrigin: 'center right' }}>
                <HudPanel delay={0.6} variant="cyan">
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                        <span className="text-xs text-cyan-300 uppercase tracking-widest font-mono flex items-center gap-2 drop-shadow-[0_0_5px_cyan]">
                            <GraduationCap size={16}/> | CONDUCTED BY |
                        </span>
                    </div>
                    <div className="font-mono text-base text-cyan-100/90 leading-relaxed bg-black/20 p-6 rounded h-32 flex flex-col justify-center items-center text-center border border-white/5 relative overflow-hidden group">
                         <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors" />
                         <p className="font-bold text-white mb-2 tracking-wide relative z-10">DEPARTMENT OF<br/>COMPUTER APPLICATIONS</p>
                         <p className="text-cyan-400 font-orbitron tracking-widest text-sm relative z-10 border-t border-cyan-500/30 pt-2 mt-1 w-full">BCA (SUNSTONE)</p>
                    </div>
                </HudPanel>
            </div>
        </div>

        {/* Center Column: Command (Title & Button) */}
        <div className="flex flex-col items-center justify-center z-30 pt-10">
            <div ref={titleRef} className="text-center relative mb-10">
                <div className="absolute inset-0 bg-black/60 blur-xl rounded-full opacity-60" />

                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black font-orbitron tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,240,255,0.6)] relative z-10 leading-none mix-blend-screen flex flex-col items-center gap-2">
                    <span className="tracking-widest">NIRAL - VERSE</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffaa40] to-[#ff5500] drop-shadow-[0_0_30px_rgba(255,100,0,0.6)]">
                        2K26
                    </span>
                </h1>

                <p className="mt-6 text-cyan-100/70 font-mono text-sm md:text-base uppercase tracking-widest max-w-2xl mx-auto leading-relaxed text-center hidden md:block drop-shadow-md relative z-10">
                    Annual Tech Fest – Hindustan College of Arts & Science <span className="text-orange-400 text-sm ml-1">(SUNSTONE)</span>
                </p>
            </div>

            <div className="relative group perspective-500 mt-8" ref={btnRef}>
                <button 
                    onClick={onInitiateDrop}
                    className="relative w-96 h-20 transform transition-all duration-300 group-hover:scale-105 group-hover:translate-y-[-2px]"
                >
                    {/* Button Frame - Orange */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/40 via-blue-500/40 to-cyan-600/40 backdrop-blur-md border-t border-b border-orange-500/50 skew-x-[-12deg] shadow-[0_0_30px_rgba(255,170,64,0.3)] group-hover:shadow-[0_0_50px_rgba(255,170,64,0.6)] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-cyan-500/20 to-transparent" />
                    </div>
                    
                    {/* Side Decor - Orange */}
                    <div className="absolute left-[-15px] top-0 h-full w-6 bg-gray-900/80 skew-x-[-12deg] border-l border-orange-500/50" />
                    <div className="absolute right-[-15px] top-0 h-full w-6 bg-gray-900/80 skew-x-[-12deg] border-r border-orange-500/50" />

                    <div className="absolute inset-0 flex items-center justify-center gap-3 text-white font-orbitron font-bold tracking-[0.2em] text-lg z-10 drop-shadow-md">
                        INITIATE REGISTRATION 
                        <span className="text-white group-hover:translate-y-1 transition-transform">↓</span>
                    </div>
                </button>
            </div>
        </div>

        {/* Right Column: Panels anchored to left side (center-facing) */}
        <div className="hidden md:flex flex-col gap-12 items-start justify-center h-full pb-12 perspective-group">
            {/* Top Right Panel: Date & Schedule (Orange) */}
            <div className="w-[340px] transition-transform duration-500 hover:scale-105 hover:z-50"
                 style={{ transform: 'rotateY(-25deg) rotateX(5deg)', transformOrigin: 'center left' }}>
                <HudPanel delay={0.4} variant="orange">
                    <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-2 flex-row-reverse">
                        <div className="flex flex-col text-right">
                            <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">TARGET DATE</span>
                            <div className="text-2xl font-orbitron font-bold text-white tracking-wider drop-shadow-md mt-1">17_FEB_2026</div>
                        </div>
                        <Calendar size={20} className="text-orange-400 mt-1" />
                    </div>
                    <div className="space-y-4 text-right">
                        <div className="flex flex-col items-end">
                            <span className="text-xs text-gray-400 font-mono uppercase">SCHEDULE</span>
                            <div className="text-base font-mono text-orange-400 font-bold mt-1">09:00 AM – 03:00 PM</div>
                        </div>
                        <div className="flex flex-col items-end mt-4">
                            <span className="text-xs text-gray-400 font-mono uppercase mb-2">VENUE</span>
                            <div className="text-xs font-bold text-white font-mono tracking-widest bg-orange-500/10 px-4 py-2 rounded border border-orange-500/20">
                            HCAS CAMPUS, CHENNAI
                            </div>
                        </div>
                    </div>
                </HudPanel>
            </div>

            {/* Bottom Right Panel: Countdown Timer */}
            <div className="w-[380px] transition-transform duration-500 hover:scale-105 hover:z-50 text-right"
                 style={{ transform: 'rotateY(-25deg) rotateX(-5deg)', transformOrigin: 'center left' }}>
                <HudPanel delay={0.8} variant="orange">
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2 flex-row-reverse">
                        <span className="text-xs text-orange-300 uppercase tracking-widest font-mono flex items-center gap-2 flex-row-reverse drop-shadow-[0_0_5px_orange]">
                            <Clock size={16}/> | COUNTDOWN TO NIRAL-VERSE |
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3 text-center py-5">
                         <div className="flex flex-col items-center bg-white/5 p-3 rounded border border-white/5">
                            <span className="text-2xl font-orbitron font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</span>
                            <span className="text-[10px] text-gray-400 uppercase font-mono mt-1">DAYS</span>
                         </div>
                         <div className="flex flex-col items-center bg-white/5 p-3 rounded border border-white/5">
                            <span className="text-2xl font-orbitron font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="text-[10px] text-gray-400 uppercase font-mono mt-1">HRS</span>
                         </div>
                         <div className="flex flex-col items-center bg-white/5 p-3 rounded border border-white/5">
                            <span className="text-2xl font-orbitron font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="text-[10px] text-gray-400 uppercase font-mono mt-1">MIN</span>
                         </div>
                         <div className="flex flex-col items-center bg-white/5 p-3 rounded border border-white/5 relative overflow-hidden">
                             <div className="absolute inset-0 bg-orange-500/10 animate-pulse" />
                            <span className="text-2xl font-orbitron font-bold text-orange-400 relative z-10">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className="text-[10px] text-orange-300 uppercase relative z-10 font-mono mt-1">SEC</span>
                         </div>
                    </div>
                </HudPanel>
            </div>
        </div>

      </div>

      {/* Mobile Footer */}
      <div className="absolute inset-x-0 bottom-4 text-center md:hidden px-4 z-50 pointer-events-none">
          <p className="text-xs text-cyan-600 font-mono bg-black/50 inline-block px-3 py-1 rounded backdrop-blur">
             OPTIMIZED FOR DESKTOP INTERFACE
          </p>
      </div>
    </div>
  );
};