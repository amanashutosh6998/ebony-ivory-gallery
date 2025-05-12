
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ContactSection from "@/components/ContactSection";
import ColorParticles from "@/components/ColorParticles";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ColorParticles colorScheme="blue-cyan" density="low" />
      </div>
      
      <Navbar />
      
      <div className="pt-16 relative z-10">
        <ContactSection />
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default Contact;
