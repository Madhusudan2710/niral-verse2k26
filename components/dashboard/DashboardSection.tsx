import React, { useState, useEffect } from 'react';
import { 
  Calendar, Cpu, Gamepad2, ArrowLeft, Music 
} from 'lucide-react';
import { EVENTS_LIST } from '../data/events';
import { CustomScrollbar } from '../ui/CustomScrollbar';
import { TravelSequence } from '../transitions/TravelSequence';
import { NPCModal } from '../modals/NPCModal';
import { RegistrationConfirmModal } from '../modals/RegistrationConfirmModal';
import { RegistrationFormModal } from '../modals/RegistrationFormModal';
import { EventZone } from '../events/EventZone';
import { EventListItem } from '../events/EventListItem';

export const DashboardSection: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const [isTraveling, setIsTraveling] = useState(false);
  
  // Persist Category Selection
  const [selectedCategory, setSelectedCategory] = useState<'Technical' | 'Non-Technical' | null>(() => {
      try {
          return sessionStorage.getItem('niral_category') as 'Technical' | 'Non-Technical' | null;
      } catch { return null; }
  });

  // Persist Active Event
  const [activeEventId, setActiveEventId] = useState<string | null>(() => {
      try {
          return sessionStorage.getItem('niral_event_id');
      } catch { return null; }
  });

  const [showNpc, setShowNpc] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const activeEvent = EVENTS_LIST.find(e => e.id === activeEventId);
  const filteredEvents = EVENTS_LIST.filter(e => e.category === selectedCategory);

  // Helper to update state and storage
  const updateCategory = (cat: 'Technical' | 'Non-Technical' | null) => {
      setSelectedCategory(cat);
      if (cat) sessionStorage.setItem('niral_category', cat);
      else sessionStorage.removeItem('niral_category');
  };

  const updateEventId = (id: string | null) => {
      setActiveEventId(id);
      if (id) sessionStorage.setItem('niral_event_id', id);
      else sessionStorage.removeItem('niral_event_id');
  };

  const handleEventClick = (eventId: string) => {
    updateEventId(eventId);
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
     updateEventId(null);
  };

  const handleBackToCategories = () => {
     updateCategory(null);
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
                        onClick={() => updateCategory('Technical')}
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
                        onClick={() => updateCategory('Non-Technical')}
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