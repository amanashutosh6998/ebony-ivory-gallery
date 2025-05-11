
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
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
      // Show particles with a shorter delay for smoother UX
      const particlesTimer = setTimeout(() => {
        setShowParticles(true);
      }, 100);
      
      // Add animation delay to allow particles to initialize first
      const contentTimer = setTimeout(() => {
        setIsLoaded(true);
      }, 400); // Reduced delay for better user experience
      
      return () => {
        clearTimeout(contentTimer);
        clearTimeout(particlesTimer);
      };
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
        <AboutSection />
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default Index;
