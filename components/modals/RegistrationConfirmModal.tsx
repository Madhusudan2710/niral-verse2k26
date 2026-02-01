import React from 'react';
import { Briefcase } from 'lucide-react';

export const RegistrationConfirmModal: React.FC<{ 
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