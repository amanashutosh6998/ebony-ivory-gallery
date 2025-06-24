
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import AILabSection from "@/components/AILabSection";
import ColorParticles from "@/components/ColorParticles";

const AILab = () => {
  const [startAnimations, setStartAnimations] = useState(false);

  useEffect(() => {
    // Start animations after component mounts
    setTimeout(() => setStartAnimations(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ColorParticles colorScheme="purple-pink" density="low" />
      </div>
      
      <Navbar />
      
      <div className="pt-16 relative z-10">
        <div className={startAnimations ? "animate-content" : ""}>
          <AILabSection />
        </div>
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default AILab;
