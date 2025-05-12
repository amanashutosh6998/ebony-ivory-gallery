
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import ColorParticles from "@/components/ColorParticles";
import ScrollIndicator from "@/components/ScrollIndicator";

const About = () => {
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
    <div className="min-h-screen flex flex-col relative bg-black text-white overflow-hidden">
      {/* Particles as background */}
      <div className={`absolute inset-0 overflow-hidden z-0 transition-opacity duration-1000 ${
        showParticles ? "opacity-100" : "opacity-0"
      }`}>
        <ColorParticles colorScheme="blue-cyan" density="medium" />
      </div>
      
      <Navbar />

      {/* Content with fade-in animation */}
      <div 
        className={`flex-grow flex flex-col transition-opacity duration-1000 relative z-10 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex-grow">
          <AboutSection />
        </div>
        
        <Footer />
      </div>
      
      <ScrollIndicator />
    </div>
  );
};

export default About;
