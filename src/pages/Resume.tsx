
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import ResumeSection from "@/components/ResumeSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";

const Resume = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // The password - in a real application, this would be stored securely on a server
  const correctPassword = "aman2024";

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('resumeAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    // Only show loading screen on first visit to this specific page
    const hasVisitedResume = sessionStorage.getItem('hasVisitedResume');
    if (hasVisitedResume) {
      setInitialLoading(false);
      setIsLoaded(true);
    } else {
      // Force animation to play by delaying the loading complete
      setTimeout(() => {
        handleLoadingComplete();
      }, 800);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedResume', 'true');
    setInitialLoading(false);
    setIsLoaded(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      localStorage.setItem('resumeAuthenticated', 'true');
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles with increased density for visibility */}
      <div className="fixed inset-0 z-0">
        <ColorParticles colorScheme="blue-cyan" density="medium" />
      </div>
      
      <Navbar />
      
      <div className={`pt-16 relative z-10 ${isLoaded ? "opacity-100 animate-fade-in" : "opacity-0"} transition-opacity duration-500`}>
        {isAuthenticated ? (
          <ResumeSection />
        ) : (
          <div className="container mx-auto px-4 py-24 flex justify-center">
            <Card className="w-full max-w-md p-8 bg-black/50 backdrop-blur-lg border border-gray-800">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-16 w-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Protected Content</h2>
                <p className="text-gray-400">Please enter the password to view the resume</p>
              </div>
              
              {error && <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-2 rounded-md mb-4">{error}</div>}
              
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-4">
                  <Input 
                    type="password" 
                    placeholder="Enter password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black/30 border-gray-700"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Unlock Resume
                </Button>
              </form>
            </Card>
          </div>
        )}
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default Resume;
