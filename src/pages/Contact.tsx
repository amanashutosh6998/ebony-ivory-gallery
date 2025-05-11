
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ColorParticles from "@/components/ColorParticles";
import ScrollIndicator from "@/components/ScrollIndicator";

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add animation delay to allow particles to initialize first
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
      {/* Particles as background with higher z-index than absolute zero */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ColorParticles colorScheme="purple-pink" />
      </div>
      
      <Navbar />

      {/* Content with fade-in animation */}
      <div 
        className={`flex-grow flex flex-col transition-opacity duration-1000 relative z-10 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex-grow">
          <ContactSection />
        </div>
        
        <Footer />
      </div>
      
      <ScrollIndicator />
    </div>
  );
};

export default Contact;
