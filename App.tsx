import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MainContent } from './components/MainContent';
import { GrainOverlay, CustomCursor } from './components/UIEffects';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
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