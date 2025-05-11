
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AILabSection from "@/components/AILabSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollIndicator from "@/components/ScrollIndicator";

const AILab = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Smooth entrance for particles
    const particlesTimer = setTimeout(() => {
      setShowParticles(true);
    }, 100);
    
    // Add animation delay to allow particles to initialize first
    const contentTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(particlesTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
      <div className={`transition-opacity duration-1000 ${showParticles ? "opacity-100" : "opacity-0"}`}>
        <ParticleBackground />
      </div>
      
      <Navbar />
      
      <div 
        className={`flex-grow transition-opacity duration-1000 relative z-10 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <AILabSection />
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default AILab;
