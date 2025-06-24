
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import ParticleBackground from "@/components/ParticleBackground";
import AboutSection from "@/components/AboutSection";
import TrackRecordSection from "@/components/TrackRecordSection";
import ChatbotWidget from "@/components/ChatbotWidget";
import PersonalInterestsSection from "@/components/PersonalInterestsSection";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Only show loading screen on first visit
    const hasVisited = sessionStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setInitialLoading(false);
      setIsLoaded(true);
    } else {
      // Reduced loading time
      setTimeout(() => {
        handleLoadingComplete();
      }, 400); // Reduced from 800ms
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedBefore', 'true');
    setInitialLoading(false);
    setIsLoaded(true);
  };

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} initialProgress={20} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background particles - always visible */}
      <div className="fixed inset-0 opacity-100 z-0">
        <ParticleBackground />
      </div>
      
      <Navbar />
      
      <div 
        className={`relative z-10 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-all duration-500`}
      >
        <div className="flow-content">
          {/* Hero Section - Initial animation */}
          <div className="animate-fade-in" style={{animationDelay: "200ms"}}>
            <HeroSection />
          </div>
          
          {/* Track Record Section - Flows after hero */}
          <div className="animate-fade-in" style={{animationDelay: "800ms"}}>
            <TrackRecordSection />
          </div>
          
          {/* About Section - Flows after track record */}
          <div className="animate-fade-in" style={{animationDelay: "1200ms"}}>
            <AboutSection />
          </div>
          
          {/* Personal Interests Section - Final section animation */}
          <div className="animate-fade-in" style={{animationDelay: "1600ms"}}>
            <PersonalInterestsSection />
          </div>
        </div>
      </div>
      
      <Footer />
      <ScrollIndicator />
      
      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

export default Index;
