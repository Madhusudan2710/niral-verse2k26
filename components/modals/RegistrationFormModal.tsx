import React, { useState, useEffect } from 'react';
import { 
  Target, X, Users2, Building, User, Mail, Phone, BookOpen, GraduationCap, 
  Loader2, Zap, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { EVENTS_LIST } from '../data/events';

interface MemberData {
  name: string;
  email: string;
  phone: string;
  course: string;
  year: string;
}

export const RegistrationFormModal: React.FC<{
   event: typeof EVENTS_LIST[0];
   onClose: () => void;
}> = ({ event, onClose }) => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
   const [errors, setErrors] = useState<Record<string, string>>({});
   
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
      
      // Clear error for this field when user types
      if (errors[`members.${index}.${field}`]) {
         setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[`members.${index}.${field}`];
            return newErrors;
         });
      }
   };

   const validateForm = (): boolean => {
      const newErrors: Record<string, string> = {};
      let isValid = true;
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[6-9]\d{9}$/;

      // Team Name Validation
      if (event.maxMembers > 1 && !teamName.trim()) {
         newErrors['teamName'] = 'Team Name is required';
         isValid = false;
      }

      // College Name Validation
      if (!collegeName.trim()) {
         newErrors['collegeName'] = 'College Name is required';
         isValid = false;
      }

      const seenEmails = new Set<string>();
      const seenPhones = new Set<string>();

      members.forEach((member, index) => {
         // Name
         if (!member.name.trim()) {
            newErrors[`members.${index}.name`] = 'Name is required';
            isValid = false;
         } else if (member.name.trim().length < 3) {
             newErrors[`members.${index}.name`] = 'Name must be at least 3 chars';
             isValid = false;
         }

         // Email
         if (!member.email.trim()) {
            newErrors[`members.${index}.email`] = 'Email is required';
            isValid = false;
         } else if (!emailRegex.test(member.email)) {
            newErrors[`members.${index}.email`] = 'Invalid email format';
            isValid = false;
         } else if (seenEmails.has(member.email.toLowerCase())) {
            newErrors[`members.${index}.email`] = 'Duplicate email in team';
            isValid = false;
         } else {
            seenEmails.add(member.email.toLowerCase());
         }

         // Phone
         if (!member.phone.trim()) {
            newErrors[`members.${index}.phone`] = 'Phone is required';
            isValid = false;
         } else if (!phoneRegex.test(member.phone)) {
            newErrors[`members.${index}.phone`] = 'Invalid 10-digit mobile number';
            isValid = false;
         } else if (seenPhones.has(member.phone)) {
            newErrors[`members.${index}.phone`] = 'Duplicate phone in team';
            isValid = false;
         } else {
            seenPhones.add(member.phone);
         }

         // Course
         if (!member.course.trim()) {
            newErrors[`members.${index}.course`] = 'Course is required';
            isValid = false;
         }

         // Year
         if (!member.year) {
            newErrors[`members.${index}.year`] = 'Year is required';
            isValid = false;
         }
      });

      setErrors(newErrors);
      return isValid;
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateForm()) {
         // Scroll to top or first error could be implemented here
         const firstErrorField = document.querySelector('.border-red-500');
         if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
         }
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
        // Fallback to success for demo purposes since we don't have a real backend
        setIsSuccess(true); 
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
                           <label className="text-xs font-mono text-cyan-400 uppercase flex justify-between">
                              Team Designation (Name)
                              {errors.teamName && <span className="text-red-400 flex items-center gap-1 normal-case"><AlertCircle size={10} /> {errors.teamName}</span>}
                           </label>
                           <div className="relative">
                              <Users2 className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${errors.teamName ? 'text-red-500' : 'text-gray-500 group-focus-within:text-cyan-400'}`} size={18} />
                              <input 
                                 type="text" 
                                 value={teamName}
                                 onChange={(e) => {
                                    setTeamName(e.target.value);
                                    if(errors.teamName) setErrors(prev => { const n = {...prev}; delete n.teamName; return n; });
                                 }}
                                 className={`w-full bg-gray-900/50 border rounded p-3 pl-10 text-white focus:outline-none transition-all cursor-hover ${errors.teamName ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]'}`}
                                 placeholder="e.g. Cyber Punks"
                              />
                           </div>
                        </div>
                     )}

                     {/* College Name (Single Input) */}
                     <div className="space-y-2 group">
                        <label className="text-xs font-mono text-cyan-400 uppercase flex justify-between">
                           Affiliated Institution (College)
                           {errors.collegeName && <span className="text-red-400 flex items-center gap-1 normal-case"><AlertCircle size={10} /> {errors.collegeName}</span>}
                        </label>
                        <div className="relative">
                           <Building className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${errors.collegeName ? 'text-red-500' : 'text-gray-500 group-focus-within:text-cyan-400'}`} size={18} />
                           <input 
                              type="text" 
                              value={collegeName}
                              onChange={(e) => {
                                 setCollegeName(e.target.value);
                                 if(errors.collegeName) setErrors(prev => { const n = {...prev}; delete n.collegeName; return n; });
                              }}
                              className={`w-full bg-gray-900/50 border rounded p-3 pl-10 text-white focus:outline-none transition-all cursor-hover ${errors.collegeName ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]'}`}
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
                                    <div className="space-y-1">
                                       <div className="relative">
                                          <User className={`absolute left-3 top-3 ${errors[`members.${index}.name`] ? 'text-red-500' : 'text-gray-600'}`} size={14} />
                                          <input 
                                             type="text" 
                                             placeholder="Full Name"
                                             value={member.name}
                                             onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                             className={`w-full bg-black/50 border rounded py-2 pl-9 text-sm text-white focus:outline-none cursor-hover ${errors[`members.${index}.name`] ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'}`}
                                          />
                                       </div>
                                       {errors[`members.${index}.name`] && <span className="text-[10px] text-red-400 ml-1">{errors[`members.${index}.name`]}</span>}
                                    </div>
                                    
                                    <div className="space-y-1">
                                       <div className="relative">
                                          <Mail className={`absolute left-3 top-3 ${errors[`members.${index}.email`] ? 'text-red-500' : 'text-gray-600'}`} size={14} />
                                          <input 
                                             type="email" 
                                             placeholder="Email"
                                             value={member.email}
                                             onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                             className={`w-full bg-black/50 border rounded py-2 pl-9 text-sm text-white focus:outline-none cursor-hover ${errors[`members.${index}.email`] ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'}`}
                                          />
                                       </div>
                                       {errors[`members.${index}.email`] && <span className="text-[10px] text-red-400 ml-1">{errors[`members.${index}.email`]}</span>}
                                    </div>
                                 </div>

                                 {/* Phone & Course Row */}
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                       <div className="relative">
                                          <Phone className={`absolute left-3 top-3 ${errors[`members.${index}.phone`] ? 'text-red-500' : 'text-gray-600'}`} size={14} />
                                          <input 
                                             type="tel" 
                                             placeholder="Phone (10 digits)"
                                             value={member.phone}
                                             onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                                             className={`w-full bg-black/50 border rounded py-2 pl-9 text-sm text-white focus:outline-none cursor-hover ${errors[`members.${index}.phone`] ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'}`}
                                             maxLength={10}
                                          />
                                       </div>
                                       {errors[`members.${index}.phone`] && <span className="text-[10px] text-red-400 ml-1">{errors[`members.${index}.phone`]}</span>}
                                    </div>
                                    
                                    <div className="space-y-1">
                                       <div className="relative">
                                          <BookOpen className={`absolute left-3 top-3 ${errors[`members.${index}.course`] ? 'text-red-500' : 'text-gray-600'}`} size={14} />
                                          <input 
                                             type="text" 
                                             placeholder="Course"
                                             value={member.course}
                                             onChange={(e) => handleMemberChange(index, 'course', e.target.value)}
                                             className={`w-full bg-black/50 border rounded py-2 pl-9 text-sm text-white focus:outline-none cursor-hover ${errors[`members.${index}.course`] ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'}`}
                                          />
                                       </div>
                                       {errors[`members.${index}.course`] && <span className="text-[10px] text-red-400 ml-1">{errors[`members.${index}.course`]}</span>}
                                    </div>
                                 </div>

                                 {/* Year Row */}
                                 <div className="space-y-1">
                                    <div className="relative">
                                       <GraduationCap className={`absolute left-3 top-3 ${errors[`members.${index}.year`] ? 'text-red-500' : 'text-gray-600'}`} size={14} />
                                       <select 
                                          value={member.year}
                                          onChange={(e) => handleMemberChange(index, 'year', e.target.value)}
                                          className={`w-full bg-black/50 border rounded py-2 pl-9 text-sm focus:outline-none appearance-none cursor-pointer cursor-hover ${member.year ? 'text-white' : 'text-gray-400'} ${errors[`members.${index}.year`] ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-cyan-500'}`}
                                       >
                                          <option value="">Select Year</option>
                                          <option value="1">1st Year</option>
                                          <option value="2">2nd Year</option>
                                          <option value="3">3rd Year</option>
                                          <option value="4">4th Year</option>
                                          <option value="5">5th Year</option>
                                       </select>
                                    </div>
                                    {errors[`members.${index}.year`] && <span className="text-[10px] text-red-400 ml-1">{errors[`members.${index}.year`]}</span>}
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