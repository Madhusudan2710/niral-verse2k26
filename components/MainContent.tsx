import React, { useRef, useState, useEffect } from 'react';
import { CommandDeckHero } from './CommandDeckHero';
import { ArrivalCutscene } from './transitions/ArrivalCutscene';
import { DashboardSection } from './dashboard/DashboardSection';

export const MainContent: React.FC = () => {
  // Initialize state from storage to keep view continuity (e.g. Dashboard) if desired,
  // but App.tsx ensures we start at Welcome Screen on refresh.
  const [viewState, setViewState] = useState<'command' | 'cutscene' | 'dashboard'>(() => {
    try {
      const saved = sessionStorage.getItem('niral_main_view');
      // If user was in cutscene during reload, skip straight to dashboard
      if (saved === 'cutscene') return 'dashboard';
      return (saved as 'command' | 'dashboard') || 'command';
    } catch (e) {
      return 'command';
    }
  });

  const dashboardRef = useRef<HTMLDivElement>(null);

  // Persist state changes
  useEffect(() => {
    try {
      sessionStorage.setItem('niral_main_view', viewState);
    } catch (e) {
      console.warn('Session storage unavailable');
    }
  }, [viewState]);

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