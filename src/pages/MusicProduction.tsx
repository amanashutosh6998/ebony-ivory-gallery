
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import MusicProductionSection from "@/components/MusicProductionSection";

const MusicProduction = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [startAnimations, setStartAnimations] = useState(false);

  useEffect(() => {
    // Only show loading screen on first visit to this specific page
    const hasVisitedMusicProduction = sessionStorage.getItem('hasVisitedMusicProduction');
    if (hasVisitedMusicProduction) {
      setInitialLoading(false);
      setIsLoaded(true);
      // Start animations immediately if no loading screen
      setTimeout(() => setStartAnimations(true), 100);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedMusicProduction', 'true');
    setInitialLoading(false);
    setIsLoaded(true);
    // Start animations after loading completes
    setTimeout(() => setStartAnimations(true), 100);
  };

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ColorParticles colorScheme="purple-blue" density="medium" />
      </div>
      
      <Navbar />
      
      <div className={`pt-16 relative z-10 ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        <div className={startAnimations ? "animate-content" : ""}>
          <MusicProductionSection />
        </div>
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default MusicProduction;
