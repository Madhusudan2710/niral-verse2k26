import React, { useRef, useState, useEffect } from 'react';
import { CommandDeckHero } from './CommandDeckHero';
import { ArrivalCutscene } from './transitions/ArrivalCutscene';
import { DashboardSection } from './dashboard/DashboardSection';

export const MainContent: React.FC = () => {
  // Initialize state from storage to keep view continuity
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

  // Sync state to Session Storage
  useEffect(() => {
    try {
      sessionStorage.setItem('niral_main_view', viewState);
    } catch (e) {
      console.warn('Session storage unavailable');
    }
  }, [viewState]);

  // Handle Browser History (Back Button / Gestures)
  useEffect(() => {
    // 1. Set initial history state if null
    if (!window.history.state) {
      window.history.replaceState({ view: viewState }, '');
    }

    // 2. Listen for PopState (Back/Forward)
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && state.view) {
        // Only handle root level view changes (command vs dashboard)
        // Dashboard internal nav is handled by DashboardSection
        if (state.view === 'command' || state.view === 'dashboard') {
             setViewState(state.view);
        }
      } else {
        // Fallback: If no state (e.g. going back to start), default to command
        setViewState('command');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleCutsceneComplete = () => {
    // Push new history state when entering dashboard
    window.history.pushState({ view: 'dashboard' }, '');
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
           <DashboardSection onBackToHome={() => {
              // Force navigation to command view
              setViewState('command');
              // Using pushState ensures we have a valid history entry to return to dashboard via forward
              // and standardizes the navigation flow
              window.history.pushState({ view: 'command' }, '');
           }} />
        </div>
      )}
    </div>
  );
};