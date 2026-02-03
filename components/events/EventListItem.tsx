import React, { useRef, useEffect, useState } from 'react';
import { EVENTS_LIST } from '../data/events';

export const EventListItem: React.FC<{ event: typeof EVENTS_LIST[0]; index: number; onClick: () => void }> = ({ event, index, onClick }) => {
   const isEven = index % 2 === 0;
   const elementRef = useRef<HTMLDivElement>(null);
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsVisible(true);
               observer.unobserve(entry.target);
            }
         },
         {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
         }
      );

      if (elementRef.current) {
         observer.observe(elementRef.current);
      }

      return () => {
         if (elementRef.current) {
            observer.unobserve(elementRef.current);
         }
      };
   }, []);

   return (
      <div 
         ref={elementRef}
         className={`
            flex flex-col md:flex-row items-center gap-6 md:gap-12 py-6 md:py-8 border-b border-white/5 last:border-0 
            ${!isEven ? 'md:flex-row-reverse' : ''} 
            group
            transition-all duration-700 ease-out transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
         `}
      >
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
                  loading="lazy"
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