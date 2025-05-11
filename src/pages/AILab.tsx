
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import AILabSection from "@/components/AILabSection";

const AILab = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-16">
        <AILabSection />
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default AILab;
