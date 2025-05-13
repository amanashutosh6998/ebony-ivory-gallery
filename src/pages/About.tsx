
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import ColorParticles from "@/components/ColorParticles";
import ScrollIndicator from "@/components/ScrollIndicator";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(true); // Start with true to remove loading animation

  return (
    <div className="min-h-screen flex flex-col relative bg-black text-white overflow-hidden">
      {/* Particles as background - always visible */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ColorParticles colorScheme="blue-cyan" density="medium" />
      </div>
      
      <Navbar />

      {/* Content without fade-in animation */}
      <div className="flex-grow flex flex-col relative z-10 opacity-100">
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
