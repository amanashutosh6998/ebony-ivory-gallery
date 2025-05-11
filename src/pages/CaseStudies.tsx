
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import CaseStudiesSection from "@/components/CaseStudiesSection";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-16">
        <CaseStudiesSection />
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default CaseStudies;
