
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ProjectsSection from "@/components/ProjectsSection";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";

const Projects = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [startAnimations, setStartAnimations] = useState(false);

  useEffect(() => {
    // Only show loading screen on first visit to this specific page
    const hasVisitedProjects = sessionStorage.getItem('hasVisitedProjects');
    if (hasVisitedProjects) {
      setInitialLoading(false);
      setIsLoaded(true);
      // Start animations immediately if no loading screen
      setTimeout(() => setStartAnimations(true), 300);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedProjects', 'true');
    setInitialLoading(false);
    setIsLoaded(true);
    // Start animations after loading completes
    setTimeout(() => setStartAnimations(true), 300);
  };

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ColorParticles colorScheme="green-cyan" density="medium" />
      </div>
      
      <Navbar />
      
      <div className={`pt-16 relative z-10 ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        <div className={startAnimations ? "animate-content" : ""}>
          <ProjectsSection />
        </div>
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default Projects;
