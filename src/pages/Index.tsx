
import { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";

// Lazy load non-critical components
const HeroSection = lazy(() => import('@/components/HeroSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ParticleBackground = lazy(() => import('@/components/ParticleBackground'));

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add animation delay to allow particles to initialize first
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <ParticleBackground />
      </Suspense>
      
      <Navbar />
      
      <div 
        className={`transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
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
