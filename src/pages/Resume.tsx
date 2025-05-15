
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import ResumeSection from "@/components/ResumeSection";

const Resume = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Only show loading screen on first visit to this specific page
    const hasVisitedResume = sessionStorage.getItem('hasVisitedResume');
    if (hasVisitedResume) {
      setInitialLoading(false);
      setIsLoaded(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedResume', 'true');
    setInitialLoading(false);
    setIsLoaded(true);
  };

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ColorParticles colorScheme="blue-cyan" density="low" />
      </div>
      
      <Navbar />
      
      <div className={`pt-16 relative z-10 ${isLoaded ? "opacity-100 animate-fade-in" : "opacity-0"} transition-opacity duration-500`}>
        <ResumeSection />
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default Resume;
