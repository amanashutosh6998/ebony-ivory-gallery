
import { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import LoadingScreen from "@/components/LoadingScreen";

// Lazy load non-critical components
const HeroSection = lazy(() => import('@/components/HeroSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ParticleBackground = lazy(() => import('@/components/ParticleBackground'));

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
    
    // After loading screen is gone, fade in particles
    setTimeout(() => {
      setShowParticles(true);
    }, 100);
    
    // Then fade in content
    setTimeout(() => {
      setIsLoaded(true);
    }, 400);
  };

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background particles with smoother fade-in */}
      <div 
        className={`fixed inset-0 transition-opacity duration-700 ${
          showParticles ? "opacity-100" : "opacity-0"
        }`}
      >
        <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
          <ParticleBackground />
        </Suspense>
      </div>
      
      <Navbar />
      
      <div 
        className={`relative z-10 transition-all duration-700 ${
          isLoaded ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
        }`}
      >
        <Suspense fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="text-2xl text-gray-500">Loading...</div>
          </div>
        }>
          <HeroSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-gradient-to-b from-black to-[#050516]"></div>}>
          <AboutSection />
        </Suspense>
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default Index;
