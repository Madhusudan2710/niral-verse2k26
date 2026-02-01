import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MainContent } from './components/MainContent';
import { GrainOverlay, CustomCursor } from './components/UIEffects';

export default function App() {
  const [hasEntered, setHasEntered] = useState(() => {
    try {
      const entered = sessionStorage.getItem('niral_verse_entered') === 'true';
      const view = sessionStorage.getItem('niral_main_view');
      
      // Logic: 
      // - If we are deep in the app (dashboard/cutscene), persist the session (skip welcome).
      // - If we are at the Command Deck (Hero), treat it as a fresh entry on reload (show welcome).
      if (entered && (view === 'dashboard' || view === 'cutscene')) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  });

  const handleEnter = () => {
    try {
      sessionStorage.setItem('niral_verse_entered', 'true');
    } catch (e) {
      console.warn('Session storage not available');
    }
    setHasEntered(true);
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-gray-900 text-white selection:bg-cyan-500/30 selection:text-cyan-100">
      <GrainOverlay />
      <CustomCursor />
      
      {!hasEntered ? (
        <WelcomeScreen onEnter={handleEnter} />
      ) : (
        <MainContent />
      )}
    </div>
  );
}