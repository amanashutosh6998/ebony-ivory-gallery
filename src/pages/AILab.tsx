
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AILabSection from "@/components/AILabSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollIndicator from "@/components/ScrollIndicator";

const AILab = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add animation delay to allow particles to initialize first
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
      <ParticleBackground />
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
