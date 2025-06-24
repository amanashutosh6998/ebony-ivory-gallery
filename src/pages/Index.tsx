
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
          isLoaded ? "opacity-100 animate-fade-in" : "opacity-0"
        } transition-all duration-300`}
        style={{animationDelay: "100ms"}}
      >
        <div className="flow-content">
          <HeroSection />
          <TrackRecordSection />
          <AboutSection />
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
