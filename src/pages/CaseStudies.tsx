
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import LoadingScreen from "@/components/LoadingScreen";

const CaseStudies = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [startAnimations, setStartAnimations] = useState(false);

  useEffect(() => {
    // Only show loading screen on first visit to this specific page
    const hasVisitedCaseStudies = sessionStorage.getItem('hasVisitedCaseStudies');
    if (hasVisitedCaseStudies) {
      setInitialLoading(false);
      setIsLoaded(true);
      // Start animations immediately if no loading screen
      setTimeout(() => setStartAnimations(true), 300);
    } else {
      // Reduced animation time
      setTimeout(() => {
        handleLoadingComplete();
      }, 400);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedCaseStudies', 'true');
    setInitialLoading(false);
    setIsLoaded(true);
    // Start animations after loading completes
    setTimeout(() => setStartAnimations(true), 300);
  };

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} initialProgress={30} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      
      <div className={`pt-16 relative z-10 ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
        <div className={startAnimations ? "animate-content" : ""}>
          <CaseStudiesSection />
        </div>
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default CaseStudies;
