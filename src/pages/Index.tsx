
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import ScrollIndicator from "@/components/ScrollIndicator";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Only show loading screen on first visit
    const hasVisited = sessionStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setInitialLoading(false);
      // Show particles immediately for smoother UX on return visits
      setShowParticles(true);
      setIsLoaded(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedBefore', 'true');
    setInitialLoading(false);
    
    // Show particles and content immediately without fading
    setShowParticles(true);
    setIsLoaded(true);
  };

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background particles */}
      <div 
        className={`fixed inset-0 ${
          showParticles ? "opacity-100" : "opacity-0"
        }`}
      >
        <ParticleBackground />
      </div>
      
      <Navbar />
      
      <div 
        className={`relative z-10 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <HeroSection />
      </div>
      
      <ScrollIndicator />
    </div>
  );
};

export default Index;
