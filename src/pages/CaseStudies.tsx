
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ColorParticles from "@/components/ColorParticles";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ColorParticles colorScheme="purple-blue" density="medium" />
      </div>
      
      <Navbar />
      
      <div className="pt-16 relative z-10">
        <CaseStudiesSection />
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default CaseStudies;
