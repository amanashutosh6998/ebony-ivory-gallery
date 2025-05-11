
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollIndicator from "@/components/ScrollIndicator";

const Projects = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add animation delay to allow particles to initialize first
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
      <ParticleBackground />
      <Navbar />
      
      <div 
        className={`flex-grow transition-opacity duration-1000 relative z-10 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <ProjectsSection />
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default Projects;
