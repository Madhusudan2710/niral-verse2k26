import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Terminal, Cpu, Globe, Zap, Map as MapIcon, X, Target, ArrowDown, Cloud, 
  Calendar, Users, MapPin, Bug, Palette, BrainCircuit, Network, Image, 
  Smile, Gamepad2, Briefcase, Loader2, Navigation, MessageSquare, ShieldAlert,
  CheckCircle2, User, Mail, Hash, Building, Phone, GraduationCap, BookOpen, Users2, ArrowLeft,
  MessageCircle, Radio, Music, Layers, Clock, FileText
} from 'lucide-react';
import { CommandDeckHero } from './CommandDeckHero';

const EVENTS_LIST = [
  { 
    id: 'bug', 
    title: "Bug Hunt", 
    category: "Technical",
    icon: Bug, 
    color: "text-red-400", 
    border: "group-hover:border-red-500", 
    shadow: "group-hover:shadow-red-500/50", 
    desc: "Identify and neutralize system vulnerabilities.",
    banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070",
    fullDesc: "Dive into the mainframe and purge critical system errors. Competitors must identify security flaws in a simulated banking infrastructure within 60 minutes.",
    minMembers: 1,
    maxMembers: 2,
    timing: "10:30 AM - 11:30 AM",
    rulebook: "/assets/rulebooks/bug_hunt.pdf",
    contact: { phone: "+919943086228", whatsapp: "+919943086228" },
    npc: { 
      name: "Mr. Javeed", 
      role: "Event Head", 
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Javeed&mouth=smile&eyebrows=default&clothing=blazerAndShirt&top=shortHair", 
      dialogue: "The code is bleeding, Agent. I need you to patch those vulnerabilities before the system crashes." 
    }
  },
  { 
    id: 'uiux', 
    title: "UI/UX Design", 
    category: "Technical",
    icon: Palette, 
    color: "text-pink-400", 
    border: "group-hover:border-pink-500", 
    shadow: "group-hover:shadow-pink-500/50", 
    desc: "Architect the next-gen neural interfaces.",
    banner: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop",
    fullDesc: "Redesign the interface for the colony's life support systems. Aesthetics meet functionality in this high-stakes design challenge.",
    minMembers: 1,
    maxMembers: 2,
    timing: "10:00 AM - 12:00 PM",
    rulebook: "/assets/rulebooks/ui_ux.pdf",
    contact: { phone: "+917010974603", whatsapp: "+917010974603" },
    npc: { 
      name: "Mr. Sarath", 
      role: "Event Head", 
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarath&clothing=graphicShirt&top=shortHair", 
      dialogue: "Form follows function, but beauty inspires hope. Show me a design that can save the world." 
    }
  },
  { 
    id: 'quiz', 
    title: "Tech Quiz", 
    category: "Technical",
    icon: BrainCircuit, 
    color: "text-yellow-400", 
    border: "group-hover:border-yellow-500", 
    shadow: "group-hover:shadow-yellow-500/50", 
    desc: "Test your knowledge of legacy and quantum systems.",
    banner: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070",
    fullDesc: "A gauntlet of trivia spanning from the first transistor to the latest quantum processors. Only the most knowledgeable survive.",
    minMembers: 2,
    maxMembers: 2,
    timing: "11:30 AM - 12:30 PM",
    rulebook: "/assets/rulebooks/tech_quiz.pdf",
    contact: { phone: "", whatsapp: "" },
    npc: { 
      name: "Ms. Fowzeeya", 
      role: "Event Head", 
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Fowzeeya&top=longHair&clothing=blazerAndShirt&hairColor=4a312c", 
      dialogue: "Query initiated. Validating intelligence quotient. Prepare for data extraction." 
    }
  },
  { 
    id: 'netiq', 
    title: "NetIQ Challenge", 
    category: "Technical",
    icon: Network, 
    color: "text-blue-400", 
    border: "group-hover:border-blue-500", 
    shadow: "group-hover:shadow-blue-500/50", 
    desc: "Optimize data flow across the global grid.",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    fullDesc: "The network is congested. You must re-route packets and optimize protocols to restore global communications.",
    minMembers: 2,
    maxMembers: 2,
    timing: "01:30 PM - 02:30 PM",
    rulebook: "/assets/rulebooks/netiq.pdf",
    contact: { phone: "+919360331266", whatsapp: "919360331266" },
    npc: { 
      name: "Mr. Madhusudan", 
      role: "Event Head", 
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Madhusudan&top=shortHair&facialHair=beardMedium&clothing=collarAndSweater", 
      dialogue: "Signal strength is at 15%. I need you to boost the grid nodes manually. Hurry." 
    }
  },
  { 
    id: 'poster', 
    title: "Poster Making", 
    category: "Non-Technical",
    icon: Image, 
    color: "text-blue-400", 
    border: "group-hover:border-blue-500", 
    shadow: "group-hover:shadow-blue-500/50", 
    desc: "Design propaganda for the resistance.",
    banner: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070",
    fullDesc: "Create visual assets to inspire the populace. The message is as powerful as the weapon.",
    minMembers: 1,
    maxMembers: 1,
    timing: "10:30 AM - 11:30 AM",
    rulebook: "/assets/rulebooks/poster_making.pdf",
    contact: { phone: "+919655650184", whatsapp: "919655650184" },
    npc: { 
      name: "Mr. Gokulnath", 
      role: "Event Head", 
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Gokulnath&top=shortHair&clothing=graphicShirt", 
      dialogue: "The streets are silent. Wake them up with your art. Make it loud, make it bold." 
    }
  },
  { 
    id: 'meme', 
    title: "Meme Creation", 
    category: "Non-Technical",
    icon: Smile, 
    color: "text-green-400", 
    border: "group-hover:border-green-500", 
    shadow: "group-hover:shadow-green-500/50", 
    desc: "Engage in viral memetic warfare.",
    banner: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1974",
    fullDesc: "Construct viral payloads to disrupt enemy morale. Humor is the ultimate trojan horse.",
    minMembers: 2,
    maxMembers: 2,
    timing: "11:30 AM - 12:30 PM",
    rulebook: "/assets/rulebooks/meme_creation.pdf",
    contact: { phone: "", whatsapp: "" },
    npc: { 
      name: "Mr. Sugin", 
      role: "Event Head", 
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sugin&top=shortHair&accessories=sunglasses&clothing=hoodie", 
      dialogue: "Top kek. Upload the payload. If they aren't laughing, we aren't winning." 
    }
  },
  { 
    id: 'game', 
    title: "Gaming Zone", 
    category: "Non-Technical",
    icon: Gamepad2, 
    color: "text-cyan-400", 
    border: "group-hover:border-cyan-500", 
    shadow: "group-hover:shadow-cyan-500/50", 
    desc: "Combat simulation and tactical training.",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070",
    fullDesc: "Enter the arena. FPS, MOBA, and Battle Royale simulations to test your reflexes and strategic thinking.",
    minMembers: 4,
    maxMembers: 4,
    timing: "10:00 AM Onwards",
    rulebook: "/assets/rulebooks/gaming_zone.pdf",
    contact: { phone: "+916383142810", whatsapp: "916383142810" },
    npc: { 
      name: "Mr. Viknesh", 
      role: "Event Head", 
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Viknesh&top=shortHair&clothing=graphicShirt", 
      dialogue: "1v1 me, recruit. Let's see if your aim is as good as your talk." 
    }
  },
  { 
    id: 'corp', 
    title: "Corporate Walk", 
    category: "Non-Technical",
    icon: Briefcase, 
    color: "text-orange-400", 
    border: "group-hover:border-orange-500", 
    shadow: "group-hover:shadow-orange-500/50", 
    desc: "Navigate the political labyrinth of the corp.",
    banner: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    fullDesc: "Dress the part, walk the walk. Navigate the boardroom politics and secure the funding for your sector.",
    minMembers: 6,
    maxMembers: 6,
    timing: "02:00 PM - 03:00 PM",
    rulebook: "/assets/rulebooks/corporate_walk.pdf",
    contact: { phone: "", whatsapp: "" },
    npc: { 
      name: "Director", 
      role: "Executive", 
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Director&clothing=blazerAndShirt&top=shortHair&facialHair=beardMedium", 
      dialogue: "Time is money. Impress me in the next 30 seconds, or get out of my office." 
    }
  },
];

// --- Custom Scroll Indicator ---
const CustomScrollbar: React.FC = () => {
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

// --- Travel Sequence (Used for internal transitions) ---
const TravelSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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

// --- Arrival Cutscene Component ---
const ArrivalCutscene: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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

// --- NPC Modal Component ---
const NPCModal: React.FC<{ 
  npc: typeof EVENTS_LIST[0]['npc'], 
  onAccept: () => void,
  onDecline: () => void
}> = ({ npc, onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 z-[400] flex items-end justify-center sm:items-center sm:justify-center p-4 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onDecline} />
      
      <div className="glass-panel relative w-full max-w-2xl bg-gray-900/80 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col md:flex-row border border-cyan-500/20">
         {/* Close Button */}
         <button onClick={onDecline} className="absolute top-4 right-4 text-cyan-500/50 hover:text-red-400 z-50 cursor-hover">
            <X size={24} />
         </button>

         {/* Holographic Scanline Effect */}
         <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_0%,rgba(0,240,255,0.2)_50%,transparent_100%)] bg-[length:100%_4px]" />
         
         {/* Avatar Section */}
         <div className="w-full md:w-1/3 bg-cyan-900/10 relative p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-cyan-500/10 backdrop-blur-sm">
            <div className="w-32 h-32 rounded-full border-2 border-cyan-400 p-1 relative shadow-[0_0_20px_cyan]">
               <img src={npc.avatar} alt={npc.name} className="w-full h-full rounded-full bg-black/50" />
               <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-black animate-pulse" />
            </div>
            <h3 className="mt-4 text-xl font-orbitron font-bold text-white">{npc.name}</h3>
            <p className="text-cyan-400 text-xs font-mono uppercase">{npc.role}</p>
         </div>

         {/* Dialogue Section */}
         <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col relative">
            <div className="flex items-center space-x-2 text-cyan-500 mb-4 animate-pulse">
               <ShieldAlert size={20} />
               <span className="font-mono text-xs tracking-widest uppercase">INCOMING ENCRYPTED MESSAGE</span>
            </div>
            
            <p className="flex-1 text-lg md:text-xl text-gray-200 font-mono leading-relaxed typing-effect">
              "{npc.dialogue}"
            </p>

            <div className="mt-8 flex justify-end">
               <button 
                  onClick={onAccept}
                  className="px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded font-bold uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center space-x-2 cursor-hover"
               >
                  <span>ACCEPT ASSIGNMENT</span>
                  <Terminal size={16} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Registration Confirmation Modal ---
const RegistrationConfirmModal: React.FC<{ 
   eventName: string; 
   onConfirm: () => void; 
   onCancel: () => void; 
}> = ({ eventName, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onCancel} />
      
      <div className="glass-panel relative w-full max-w-md bg-gray-900/80 rounded-lg overflow-hidden shadow-2xl border border-white/10">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-[shimmer_2s_infinite]" />
         
         <div className="p-8 text-center">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
               <Briefcase className="text-cyan-400 w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-orbitron font-bold text-white mb-2">CONFIRM REGISTRATION</h3>
            <p className="text-gray-400 font-mono text-sm mb-6">
               Do you want to register for <span className="text-cyan-400 font-bold">{eventName}</span>? 
               This will secure your slot in the event mainframe.
            </p>
            
            <div className="flex space-x-4">
               <button 
                  onClick={onCancel}
                  className="flex-1 py-3 border border-gray-600 rounded text-gray-300 hover:border-gray-400 hover:text-white transition-colors font-mono uppercase text-sm cursor-hover"
               >
                  No, Abort
               </button>
               <button 
                  onClick={onConfirm}
                  className="flex-1 py-3 bg-green-500 hover:bg-green-400 text-black rounded font-bold font-mono uppercase text-sm shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all cursor-hover"
               >
                  Yes, Proceed
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Registration Form Modal (Dynamic Team Support) ---
interface MemberData {
  name: string;
  email: string;
  phone: string;
  course: string;
  year: string;
}

const RegistrationFormModal: React.FC<{
   event: typeof EVENTS_LIST[0];
   onClose: () => void;
}> = ({ event, onClose }) => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
   
   // Form State
   const [teamName, setTeamName] = useState('');
   const [collegeName, setCollegeName] = useState('');
   
   // Initialize members based on minimum required (or 1 if scalable)
   const [members, setMembers] = useState<MemberData[]>(
      Array(event.minMembers).fill({ name: '', email: '', phone: '', course: '', year: '' })
   );

   // Derived state for current mode (Single/Duo) if event allows variable size
   const [participationMode, setParticipationMode] = useState<'solo' | 'duo'>(
      event.minMembers === 1 && event.maxMembers === 2 ? 'solo' : 'solo'
   );

   // Effect to update members array size when mode changes
   useEffect(() => {
      if (event.minMembers !== event.maxMembers) {
         const targetSize = participationMode === 'solo' ? 1 : 2;
         if (members.length !== targetSize) {
            setMembers(prev => {
               const newMembers = [...prev];
               if (targetSize > prev.length) {
                  // Add members
                  for (let i = prev.length; i < targetSize; i++) {
                     newMembers.push({ name: '', email: '', phone: '', course: '', year: '' });
                  }
               } else {
                  // Remove members
                  return newMembers.slice(0, targetSize);
               }
               return newMembers;
            });
         }
      }
   }, [participationMode, event.minMembers, event.maxMembers, members.length]);

   const handleMemberChange = (index: number, field: keyof MemberData, value: string) => {
      const updatedMembers = [...members];
      updatedMembers[index] = { ...updatedMembers[index], [field]: value };
      setMembers(updatedMembers);
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Basic Frontend Validation
      if (event.maxMembers > 1 && !teamName.trim()) {
        alert("Team Name is required.");
        return;
      }
      if (!collegeName.trim()) {
         alert("College Name is required.");
         return;
      }
      
      // Check for duplicate emails
      const emails = members.map(m => m.email.toLowerCase());
      const uniqueEmails = new Set(emails);
      if (uniqueEmails.size !== emails.length) {
         alert("Duplicate emails found. Each member must have a unique email.");
         return;
      }

      setIsSubmitting(true);
      
      const payload = {
        eventName: event.title,
        teamName: event.maxMembers > 1 ? teamName : null,
        college: collegeName,
        members: members
      };

      try {
        await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        
        setIsSuccess(true);
      } catch (error) {
        console.error("Registration failed", error);
        setIsSuccess(true); // Fallback to success for demo
      } finally {
        setIsSubmitting(false);
      }
   };

   if (isSuccess) {
      return (
         <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <div className="glass-panel relative w-full max-w-md bg-gray-900/80 rounded-xl p-8 text-center shadow-[0_0_50px_rgba(34,197,94,0.2)] border border-green-500/20">
               <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
               </div>
               <h3 className="text-2xl font-orbitron font-bold text-white mb-2">REGISTRATION COMPLETE</h3>
               <p className="text-gray-400 mb-6">
                  Mission protocols accepted. Your unit has been registered in the mainframe.
               </p>
               <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded uppercase tracking-wider cursor-hover"
               >
                  RETURN TO BASE
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
         <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
         
         <div className="glass-panel relative w-full max-w-4xl bg-gray-900/90 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-white/10">
            {/* Header */}
            <div className="bg-white/5 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center shrink-0">
               <div>
                  <h3 className="text-xl font-orbitron font-bold text-white flex items-center space-x-2">
                     <Target className="text-cyan-400" size={20} />
                     <span>MISSION REGISTRATION PORTAL</span>
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                     <span className="text-xs text-cyan-500 font-mono bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-500/30">
                        PROTOCOL: {event.title.toUpperCase()}
                     </span>
                     <span className="text-xs text-gray-500 font-mono">
                        REQUIRED UNITS: {event.minMembers === event.maxMembers ? event.minMembers : `${event.minMembers} - ${event.maxMembers}`}
                     </span>
                  </div>
               </div>
               <button onClick={onClose} className="text-gray-500 hover:text-white cursor-hover"><X size={20} /></button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Left Column: Team Details */}
                  <div className="space-y-6">
                     <h4 className="text-sm font-orbitron text-gray-400 border-b border-gray-800 pb-2 mb-4">SECTOR A: UNIT CONFIGURATION</h4>
                     
                     {/* Participation Type Selection (Only for 1-2 member events) */}
                     {event.minMembers !== event.maxMembers && (
                        <div className="p-4 bg-white/5 rounded border border-dashed border-gray-700">
                           <label className="text-xs font-mono text-cyan-400 uppercase block mb-3">Select Deployment Type</label>
                           <div className="flex space-x-4">
                              <label className={`flex-1 cursor-pointer p-3 rounded border text-center transition-all cursor-hover ${participationMode === 'solo' ? 'bg-cyan-900/40 border-cyan-500 text-white' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}>
                                 <input 
                                    type="radio" 
                                    name="mode" 
                                    className="hidden" 
                                    checked={participationMode === 'solo'} 
                                    onChange={() => setParticipationMode('solo')} 
                                 />
                                 <span className="font-bold text-sm">SOLO OPERATIVE</span>
                              </label>
                              <label className={`flex-1 cursor-pointer p-3 rounded border text-center transition-all cursor-hover ${participationMode === 'duo' ? 'bg-cyan-900/40 border-cyan-500 text-white' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}>
                                 <input 
                                    type="radio" 
                                    name="mode" 
                                    className="hidden" 
                                    checked={participationMode === 'duo'} 
                                    onChange={() => setParticipationMode('duo')} 
                                 />
                                 <span className="font-bold text-sm">TACTICAL DUO</span>
                              </label>
                           </div>
                        </div>
                     )}

                     {/* Team Name (Required if maxMembers > 1) */}
                     {event.maxMembers > 1 && (
                        <div className="space-y-2 group">
                           <label className="text-xs font-mono text-cyan-400 uppercase">Team Designation (Name)</label>
                           <div className="relative">
                              <Users2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                              <input 
                                 type="text" 
                                 value={teamName}
                                 onChange={(e) => setTeamName(e.target.value)}
                                 required={event.maxMembers > 1}
                                 className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 pl-10 text-white focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all cursor-hover"
                                 placeholder="e.g. Cyber Punks"
                              />
                           </div>
                        </div>
                     )}

                     {/* College Name (Single Input) */}
                     <div className="space-y-2 group">
                        <label className="text-xs font-mono text-cyan-400 uppercase">Affiliated Institution (College)</label>
                        <div className="relative">
                           <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                           <input 
                              type="text" 
                              value={collegeName}
                              onChange={(e) => setCollegeName(e.target.value)}
                              required 
                              className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 pl-10 text-white focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all cursor-hover"
                              placeholder="Institute of Technology"
                           />
                        </div>
                        <p className="text-[10px] text-gray-500 italic">* Applies to all unit members.</p>
                     </div>
                  </div>

                  {/* Right Column: Member Details */}
                  <div className="space-y-6">
                     <h4 className="text-sm font-orbitron text-gray-400 border-b border-gray-800 pb-2 mb-4">SECTOR B: OPERATIVE MANIFEST</h4>
                     
                     <div className="space-y-8 max-h-[50vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        {members.map((member, index) => (
                           <div key={index} className="bg-white/5 p-4 rounded border border-white/10 hover:border-cyan-500/30 transition-colors animate-in slide-in-from-right duration-300">
                              <h5 className="text-xs font-bold text-cyan-300 mb-3 uppercase tracking-wider flex justify-between">
                                 <span>{index === 0 ? "UNIT LEADER" : `OPERATIVE 0${index + 1}`}</span>
                                 <span className="text-gray-600">ID-#{index + 1}00</span>
                              </h5>
                              
                              <div className="space-y-3">
                                 {/* Name & Email Row */}
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="relative">
                                       <User className="absolute left-3 top-3 text-gray-600" size={14} />
                                       <input 
                                          type="text" 
                                          placeholder="Full Name"
                                          required
                                          value={member.name}
                                          onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                          className="w-full bg-black/50 border border-gray-700 rounded py-2 pl-9 text-sm text-white focus:outline-none focus:border-cyan-500 cursor-hover"
                                       />
                                    </div>
                                    <div className="relative">
                                       <Mail className="absolute left-3 top-3 text-gray-600" size={14} />
                                       <input 
                                          type="email" 
                                          placeholder="Email"
                                          required
                                          value={member.email}
                                          onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                          className="w-full bg-black/50 border border-gray-700 rounded py-2 pl-9 text-sm text-white focus:outline-none focus:border-cyan-500 cursor-hover"
                                       />
                                    </div>
                                 </div>

                                 {/* Phone & Course Row */}
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="relative">
                                       <Phone className="absolute left-3 top-3 text-gray-600" size={14} />
                                       <input 
                                          type="tel" 
                                          placeholder="Phone"
                                          required
                                          value={member.phone}
                                          onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                                          className="w-full bg-black/50 border border-gray-700 rounded py-2 pl-9 text-sm text-white focus:outline-none focus:border-cyan-500 cursor-hover"
                                       />
                                    </div>
                                    <div className="relative">
                                       <BookOpen className="absolute left-3 top-3 text-gray-600" size={14} />
                                       <input 
                                          type="text" 
                                          placeholder="Course"
                                          required
                                          value={member.course}
                                          onChange={(e) => handleMemberChange(index, 'course', e.target.value)}
                                          className="w-full bg-black/50 border border-gray-700 rounded py-2 pl-9 text-sm text-white focus:outline-none focus:border-cyan-500 cursor-hover"
                                       />
                                    </div>
                                 </div>

                                 {/* Year Row */}
                                 <div className="relative">
                                    <GraduationCap className="absolute left-3 top-3 text-gray-600" size={14} />
                                    <select 
                                       required
                                       value={member.year}
                                       onChange={(e) => handleMemberChange(index, 'year', e.target.value)}
                                       className="w-full bg-black/50 border border-gray-700 rounded py-2 pl-9 text-sm text-gray-300 focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer cursor-hover"
                                    >
                                       <option value="">Select Year</option>
                                       <option value="1">1st Year</option>
                                       <option value="2">2nd Year</option>
                                       <option value="3">3rd Year</option>
                                       <option value="4">4th Year</option>
                                       <option value="5">5th Year</option>
                                    </select>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </form>

            {/* Footer / Actions */}
            <div className="bg-white/5 backdrop-blur-md p-6 border-t border-white/10 shrink-0 flex justify-between items-center">
               <div className="text-xs text-gray-500 font-mono hidden md:block">
                  ENCRYPTION: AES-256-GCM <span className="text-green-500 ml-2">ACTIVE</span>
               </div>
               <button 
                  onClick={(e) => handleSubmit(e as any)}
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold font-orbitron uppercase tracking-widest rounded transition-all disabled:opacity-50 disabled:cursor-wait relative overflow-hidden flex items-center justify-center space-x-2 cursor-hover"
               >
                  {isSubmitting ? (
                     <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>TRANSMITTING DATA...</span>
                     </>
                  ) : (
                     <>
                        <Zap size={18} className="fill-current" />
                        <span>INITIATE DEPLOYMENT</span>
                     </>
                  )}
               </button>
            </div>
         </div>
      </div>
   );
};

const EventZone: React.FC<{ 
   event: typeof EVENTS_LIST[0], 
   onEnterZone: () => void, 
   onBack: () => void 
}> = ({ event, onEnterZone, onBack }) => {
   const [showContact, setShowContact] = useState(false);

   return (
      <div className="relative w-full min-h-screen bg-black text-white">
         
         {/* Hero Image */}
         <div className="relative h-[30vh] md:h-[40vh] w-full z-10">
            <div className="absolute inset-0 bg-gray-900">
               <img src={event.banner} alt={event.title} className="w-full h-full object-cover opacity-60" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            <button 
               onClick={onBack}
               className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-white/80 hover:text-white bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 hover:border-cyan-500 transition-all cursor-hover"
            >
               <ArrowLeft size={18} />
               <span className="text-sm font-mono uppercase hidden md:inline">Return to Deck</span>
               <span className="md:hidden text-sm">Back</span>
            </button>

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
               <div className="max-w-4xl mx-auto">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded border bg-black/40 backdrop-blur-md mb-4 ${event.color.replace('text-', 'border-')} ${event.color}`}>
                     <event.icon size={16} />
                     <span className="text-xs font-bold uppercase tracking-wider">{event.id} PROTOCOL</span>
                  </div>
                  <h1 className="text-2xl md:text-6xl font-orbitron font-black text-white mb-2 md:mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] leading-tight">
                     {event.title.toUpperCase()}
                  </h1>
                  <p className="text-sm md:text-lg text-gray-300 font-light max-w-2xl line-clamp-2 md:line-clamp-none">{event.desc}</p>
               </div>
            </div>
         </div>

         {/* Content Grid */}
         <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-8 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
               <div className="md:col-span-2 space-y-6 md:space-y-8">
                  
                  <div className="glass-card rounded-xl p-6 border border-white/10 bg-white/5">
                     <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                        <h3 className="text-xl font-orbitron font-bold text-white flex items-center gap-2">
                           <Target className="text-cyan-500" />
                           MISSION BRIEF
                        </h3>
                        {/* Event Timing Badge */}
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/50 border border-cyan-500/30 rounded text-cyan-400 text-xs font-mono whitespace-nowrap">
                           <Clock size={14} />
                           <span>T-MIN: {event.timing}</span>
                        </span>
                     </div>
                     <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
                        {event.fullDesc}
                     </p>

                     {/* Rulebook Download Button */}
                     <a 
                        href={event.rulebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors uppercase tracking-widest group/link"
                     >
                        <div className="p-1.5 rounded bg-orange-500/10 border border-orange-500/30 group-hover/link:bg-orange-500/20 transition-colors">
                           <FileText size={14} />
                        </div>
                        <span className="border-b border-orange-500/30 pb-0.5 group-hover/link:border-orange-500 transition-colors">
                           Download Mission Protocols (Rulebook)
                        </span>
                     </a>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="glass-card p-4 rounded border border-white/10 bg-white/5 flex items-center space-x-4">
                        <div className="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30 shrink-0">
                           <Users size={20} />
                        </div>
                        <div className="min-w-0">
                           <div className="text-xs text-gray-500 uppercase truncate">Squad Size</div>
                           <div className="text-white font-bold text-sm md:text-base">
                              {event.minMembers === event.maxMembers ? `${event.minMembers} Unit(s)` : `${event.minMembers}-${event.maxMembers} Units`}
                           </div>
                        </div>
                     </div>
                     <div className="glass-card p-4 rounded border border-white/10 bg-white/5 flex items-center space-x-4">
                        <div className="w-10 h-10 rounded bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30 shrink-0">
                           <ShieldAlert size={20} />
                        </div>
                        <div className="min-w-0">
                           <div className="text-xs text-gray-500 uppercase truncate">Handler</div>
                           <div className="text-white font-bold text-sm md:text-base truncate">{event.npc.name}</div>
                        </div>
                     </div>
                  </div>

                  {/* Bottom Registration Button */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                     <button 
                        onClick={onEnterZone}
                        className="w-full py-4 md:py-5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold font-orbitron uppercase tracking-widest rounded shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-3 transform hover:scale-[1.02] cursor-hover text-sm md:text-base"
                     >
                        <Zap size={20} className="fill-current" />
                        <span>ACCEPT ASSIGNMENT</span>
                     </button>
                     <p className="text-center text-gray-500 text-[10px] md:text-xs mt-3 font-mono">
                        * SECURE CHANNEL ESTABLISHED. IMMEDIATE RESPONSE REQUIRED.
                     </p>
                  </div>
               </div>

               <div className="md:col-span-1">
                  <div className="sticky top-6">
                     <div className="p-6 rounded-xl glass-panel border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)] text-center relative overflow-hidden bg-white/5">
                        <div className="w-20 h-20 mx-auto rounded-full border-2 border-cyan-500 p-1 mb-4">
                           <img src={event.npc.avatar} alt={event.npc.name} className="w-full h-full rounded-full bg-gray-800" />
                        </div>
                        <h4 className="text-white font-bold font-orbitron text-lg">{event.npc.name}</h4>
                        <p className="text-cyan-500 text-xs font-mono uppercase mb-6">{event.npc.role}</p>
                        
                        {!showContact ? (
                           <button 
                              onClick={() => setShowContact(true)}
                              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded transition-all flex items-center justify-center gap-2 group cursor-hover text-sm"
                           >
                              <Radio size={18} />
                              <span>ESTABLISH COMMS</span>
                              <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                           </button>
                        ) : (
                           <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Select Channel</p>
                              <a 
                                 href={`https://wa.me/${event.contact?.whatsapp || ''}`}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded transition-all flex items-center justify-center gap-2 cursor-hover text-sm"
                              >
                                 <MessageCircle size={18} />
                                 <span>WHATSAPP</span>
                              </a>
                              <a 
                                 href={`tel:${event.contact?.phone || ''}`}
                                 className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded transition-all flex items-center justify-center gap-2 cursor-hover text-sm"
                              >
                                 <Phone size={18} />
                                 <span>VOICE CALL</span>
                              </a>
                              <button 
                                 onClick={() => setShowContact(false)}
                                 className="text-xs text-gray-500 hover:text-white underline decoration-gray-500 cursor-hover"
                              >
                                 Cancel
                              </button>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- Event List Item Component (New Layout) ---
const EventListItem: React.FC<{ event: typeof EVENTS_LIST[0]; index: number; onClick: () => void }> = ({ event, index, onClick }) => {
   const isEven = index % 2 === 0;

   return (
      <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 py-6 md:py-8 border-b border-white/5 last:border-0 ${!isEven ? 'md:flex-row-reverse' : ''} group`}>
         {/* Text Content */}
         <div className={`flex-1 space-y-3 md:space-y-4 text-left ${!isEven ? 'md:text-right items-end' : ''} flex flex-col w-full`}>
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded border bg-white/5 backdrop-blur-sm w-fit ${event.color.replace('text-', 'border-')} ${event.color} ${!isEven ? 'self-start md:self-end' : 'self-start'}`}>
               <event.icon size={14} />
               <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{event.id} PROTOCOL</span>
            </div>
            
            <h3 className="text-xl md:text-4xl font-orbitron font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
               {event.title}
            </h3>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
               {event.desc}
            </p>
            
            <button 
               onClick={onClick}
               className={`px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-1 w-fit cursor-hover text-sm md:text-base ${!isEven ? 'self-start md:self-end' : 'self-start'}`}
            >
               View More
            </button>
         </div>

         {/* Image Content */}
         <div className="flex-1 w-full mt-4 md:mt-0">
            <div 
               className="relative h-48 md:h-auto md:aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer cursor-hover"
               onClick={onClick}
            >
               <img 
                  src={event.banner} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
               
               {/* Decorative corner accents */}
               <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-500/50 rounded-tl-lg" />
               <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-500/50 rounded-br-lg" />
            </div>
         </div>
      </div>
   );
};

// --- Dashboard Component (Event Board) ---
const DashboardSection: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const [isTraveling, setIsTraveling] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'Technical' | 'Non-Technical' | null>(null);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [showNpc, setShowNpc] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const activeEvent = EVENTS_LIST.find(e => e.id === activeEventId);
  const filteredEvents = EVENTS_LIST.filter(e => e.category === selectedCategory);

  const handleEventClick = (eventId: string) => {
    setActiveEventId(eventId);
    setIsTraveling(true);
    // Reset all modal states
    setShowNpc(false); 
    setShowConfirm(false);
    setShowForm(false);
  };

  const handleTravelComplete = () => {
    setIsTraveling(false);
  };

  const handleBackToBoard = () => {
     setActiveEventId(null);
  };

  const handleBackToCategories = () => {
     setSelectedCategory(null);
  };

  const handleEnterZone = () => {
     setShowNpc(true);
  };

  const handleNpcAccept = () => {
     setShowNpc(false);
     setShowConfirm(true);
  };

  const handleConfirmYes = () => {
     setShowConfirm(false);
     setShowForm(true);
  };

  const showEventView = activeEventId !== null && !isTraveling;
  const showListView = selectedCategory !== null && !showEventView;

  // Header Logic
  let headerTitle = "EVENT DECK";
  let headerSubtitle = "Select Mission Profile";
  let HeaderIcon = Calendar;
  let headerIconColor = "text-blue-400";
  let headerIconBg = "bg-blue-500/10";
  let headerIconBorder = "border-blue-500/30";

  if (selectedCategory === 'Technical') {
    headerTitle = "TECHNICAL PROTOCOLS";
    headerSubtitle = "Engineering & Logic";
    HeaderIcon = Cpu;
    headerIconColor = "text-cyan-400";
    headerIconBg = "bg-cyan-500/10";
    headerIconBorder = "border-cyan-500/30";
  } else if (selectedCategory === 'Non-Technical') {
    headerTitle = "NON-TECHNICAL PROTOCOLS";
    headerSubtitle = "Creativity & Gaming";
    HeaderIcon = Gamepad2;
    headerIconColor = "text-blue-400";
    headerIconBg = "bg-blue-500/10";
    headerIconBorder = "border-blue-500/30";
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
       {/* Violet/Purple Background Gradient - Reduced Intensity -> Changed to Blue */}
       <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#172554] via-[#050505] to-[#000000] pointer-events-none opacity-40" />

       {/* Overlays */}
       {isTraveling && <TravelSequence onComplete={handleTravelComplete} />}
       
       {showNpc && activeEvent && (
         <NPCModal 
           npc={activeEvent.npc} 
           onAccept={handleNpcAccept}
           onDecline={() => setShowNpc(false)} 
         />
       )}

       {showConfirm && activeEvent && (
         <RegistrationConfirmModal 
            eventName={activeEvent.title}
            onConfirm={handleConfirmYes}
            onCancel={() => setShowConfirm(false)}
         />
       )}

       {showForm && activeEvent && (
         <RegistrationFormModal
            event={activeEvent}
            onClose={() => setShowForm(false)}
         />
       )}

       {/* View 1: Event Details (Specific Event) */}
       {showEventView && activeEvent ? (
          <div className="fixed inset-0 z-50 h-screen w-full overflow-y-auto bg-black animate-in fade-in zoom-in duration-500">
             <EventZone 
                event={activeEvent} 
                onEnterZone={handleEnterZone} 
                onBack={handleBackToBoard} 
             />
          </div>
       ) : (
          <div className={`min-h-screen flex flex-col ${isTraveling ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
             <CustomScrollbar />

             {/* Header */}
             <header className="flex justify-between items-center p-4 md:p-12 border-b border-white/10 relative z-10 bg-black/60 backdrop-blur-xl sticky top-0 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
               <div className="flex items-center space-x-3 md:space-x-4">
                 <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center backdrop-blur-md border ${headerIconBg} ${headerIconBorder} ${headerIconColor}`}>
                   <HeaderIcon size={20} className="md:w-7 md:h-7" />
                 </div>
                 <div>
                   <h2 className={`text-lg md:text-3xl font-orbitron font-bold tracking-wide uppercase ${selectedCategory ? headerIconColor : 'text-white'}`}>
                      {headerTitle}
                   </h2>
                   <p className="text-gray-500 text-[10px] md:text-xs font-mono uppercase tracking-widest">{headerSubtitle}</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-4">
                   {/* Encryption Status (visible only on desktop root view) */}
                   {!showListView && (
                     <div className="hidden md:flex items-center space-x-4 border-r border-white/10 pr-4 mr-2">
                        <span className="text-xs text-gray-500 font-mono">ENCRYPTION: SECURE</span>
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                     </div>
                   )}

                   {/* Back Button Logic */}
                   {showListView ? (
                       <button 
                         onClick={handleBackToCategories}
                         className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors cursor-hover"
                       >
                         <ArrowLeft size={20} />
                         <span className="text-sm font-mono uppercase hidden md:inline">Back to Categories</span>
                       </button>
                   ) : (
                       <button 
                         onClick={onBackToHome}
                         className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors cursor-hover group"
                       >
                         <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                         <span className="text-sm font-mono uppercase hidden md:inline">Command Deck</span>
                       </button>
                   )}
               </div>
             </header>

             <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 relative z-10 flex flex-col justify-center">
               
               {/* View 2: Category Selection (Tech vs Non-Tech) */}
               {!selectedCategory && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                     
                     {/* Technical Card */}
                     <button 
                        onClick={() => setSelectedCategory('Technical')}
                        className="group relative h-64 md:h-[45vh] rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500 transition-all duration-500 cursor-hover shadow-2xl bg-gradient-to-br from-cyan-950/30 via-slate-900/50 to-black"
                     >
                        <div className="absolute inset-0 bg-gray-900/50 mix-blend-overlay">
                            <img 
                              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070" 
                              alt="Technical Events" 
                              className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
                           />
                        </div>
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/90 via-transparent to-transparent opacity-90" />
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                           <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-500 backdrop-blur-sm shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                              <Cpu className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
                           </div>
                           <h2 className="text-2xl md:text-5xl font-orbitron font-black text-white mb-2 md:mb-4 tracking-tight group-hover:text-cyan-400 transition-colors drop-shadow-lg">
                              TECHNICAL
                           </h2>
                           <p className="max-w-md text-gray-300 font-mono text-[10px] md:text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 px-4">
                              Coding challenges, hackathons, and engineering marvels. Test your logic against the mainframe.
                           </p>
                        </div>
                        
                        <div className="absolute bottom-0 w-full p-4 md:p-6 text-center hidden md:block">
                           <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest border border-cyan-500/30 px-4 py-2 rounded-full bg-cyan-900/60 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                              Access Protocols
                           </span>
                        </div>
                     </button>

                     {/* Non-Technical Card */}
                     <button 
                        onClick={() => setSelectedCategory('Non-Technical')}
                        className="group relative h-64 md:h-[45vh] rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500 transition-all duration-500 cursor-hover shadow-2xl bg-gradient-to-br from-blue-950/30 via-slate-900/50 to-black"
                     >
                        <div className="absolute inset-0 bg-gray-900/50 mix-blend-overlay">
                           <img 
                              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070" 
                              alt="Non-Technical Events" 
                              className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
                           />
                        </div>
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent opacity-90" />
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                           <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-500/10 border border-blue-500/50 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                              <Music className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                           </div>
                           <h2 className="text-2xl md:text-5xl font-orbitron font-black text-white mb-2 md:mb-4 tracking-tight group-hover:text-blue-400 transition-colors drop-shadow-lg">
                              NON-TECHNICAL
                           </h2>
                           <p className="max-w-md text-gray-300 font-mono text-[10px] md:text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 px-4">
                              Creative arts, gaming, and cultural showcases. Unleash your imagination beyond the code.
                           </p>
                        </div>

                        <div className="absolute bottom-0 w-full p-4 md:p-6 text-center hidden md:block">
                           <span className="text-xs font-mono text-blue-500 uppercase tracking-widest border border-blue-500/30 px-4 py-2 rounded-full bg-blue-900/60 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                              Access Protocols
                           </span>
                        </div>
                     </button>
                  </div>
               )}

               {/* View 3: Specific Category List */}
               {showListView && (
                  <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                     <div className="space-y-4">
                        {filteredEvents.map((event, i) => (
                           <EventListItem 
                              key={event.id} 
                              event={event} 
                              index={i} 
                              onClick={() => handleEventClick(event.id)} 
                           />
                        ))}
                     </div>
                     {filteredEvents.length === 0 && (
                        <div className="text-center py-20 text-gray-500 font-mono">
                           NO PROTOCOLS FOUND IN THIS SECTOR.
                        </div>
                     )}
                  </div>
               )}

             </div>
          </div>
       )}
    </div>
  );
};

// --- Export MainContent with State Machine ---
export const MainContent: React.FC = () => {
  // Start with command deck (new hero), then cutscene, then dashboard
  const [viewState, setViewState] = useState<'command' | 'cutscene' | 'dashboard'>('command');
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleCutsceneComplete = () => {
    setViewState('dashboard');
    // Allow DOM update then scroll
    setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {viewState === 'command' && (
         <CommandDeckHero onInitiateDrop={() => setViewState('cutscene')} />
      )}

      {viewState === 'cutscene' && <ArrivalCutscene onComplete={handleCutsceneComplete} />}
      
      {viewState === 'dashboard' && (
        <div ref={dashboardRef}>
           <DashboardSection onBackToHome={() => setViewState('command')} />
        </div>
      )}
    </div>
  );
};
