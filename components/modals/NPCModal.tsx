import React from 'react';
import { X, ShieldAlert, Terminal } from 'lucide-react';
import { EVENTS_LIST } from '../data/events';

export const NPCModal: React.FC<{ 
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