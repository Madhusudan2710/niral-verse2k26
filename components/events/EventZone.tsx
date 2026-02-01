import React, { useState } from 'react';
import { 
  ArrowLeft, Clock, Target, FileText, Users, ShieldAlert, Zap, Radio, ArrowDown, 
  MessageCircle, Phone 
} from 'lucide-react';
import { EVENTS_LIST } from '../data/events';

export const EventZone: React.FC<{ 
   event: typeof EVENTS_LIST[0], 
   onEnterZone: () => void, 
   onBack: () => void 
}> = ({ event, onEnterZone, onBack }) => {
   const [showContact, setShowContact] = useState(false);

   const ContactOptions = () => (
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
   );

   return (
      <div className="relative w-full min-h-screen bg-black text-white">
         
         {/* Hero Image */}
         <div className="relative h-[30vh] md:h-[40vh] w-full z-10">
            <div className="absolute inset-0 bg-gray-900">
               <img src={event.banner} alt={event.title} className="w-full h-full object-cover opacity-60" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            {/* Back Button: Mobile (Left, Icon Only) / Desktop (Right, Icon + Text) */}
            <button 
               onClick={onBack}
               className="absolute top-6 left-6 md:left-auto md:right-6 z-20 flex items-center space-x-2 text-white/80 hover:text-white bg-black/40 px-3 py-3 md:px-4 md:py-2 rounded-full backdrop-blur-md border border-white/10 hover:border-cyan-500 transition-all cursor-hover"
            >
               <ArrowLeft size={18} />
               <span className="text-sm font-mono uppercase hidden md:inline">Return to Deck</span>
            </button>

            {/* Mobile Avatar: Top Right */}
            <div className="absolute top-6 right-6 md:hidden z-20">
               <div className="w-16 h-16 rounded-full border border-cyan-500 p-0.5 bg-black/40 backdrop-blur-md shadow-[0_0_10px_cyan]">
                  <img src={event.npc.avatar} alt={event.npc.name} className="w-full h-full rounded-full bg-gray-800" />
               </div>
            </div>

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

                  {/* Mobile Only: Contacts Section (Before Registration) */}
                  <div className="md:hidden glass-panel border border-cyan-500/30 p-6 rounded-xl bg-white/5">
                     <h4 className="text-white font-bold font-orbitron text-lg mb-1">{event.npc.name}</h4>
                     <p className="text-cyan-500 text-xs font-mono uppercase mb-4">{event.npc.role}</p>
                     
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
                        <ContactOptions />
                     )}
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

               {/* Desktop Only: NPC/Contact Card (Right Column) */}
               <div className="hidden md:block md:col-span-1">
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
                           <ContactOptions />
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};