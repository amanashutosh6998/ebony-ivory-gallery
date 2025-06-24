
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import GoogleSheetsEmbed from "@/components/GoogleSheetsEmbed";

const Analytics = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [startAnimations, setStartAnimations] = useState(false);

  useEffect(() => {
    // Only show loading screen on first visit to this specific page
    const hasVisitedAnalytics = sessionStorage.getItem('hasVisitedAnalytics');
    if (hasVisitedAnalytics) {
      setInitialLoading(false);
      setIsLoaded(true);
      // Start animations immediately if no loading screen
      setTimeout(() => setStartAnimations(true), 100);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedAnalytics', 'true');
    setInitialLoading(false);
    setIsLoaded(true);
    // Start animations after loading completes
    setTimeout(() => setStartAnimations(true), 100);
  };

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ColorParticles colorScheme="purple-blue" density="medium" />
      </div>
      
      <Navbar />
      
      <div className={`pt-16 relative z-10 ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        <div className={startAnimations ? "animate-content" : ""}>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Analytics Pipeline</h1>
                <p className="text-lg text-gray-400 mb-8">
                  An asynchronous data pipeline built to extract, clean, and enrich support conversations from Intercom. 
                  This project demonstrates how to process large volumes of customer support data to derive actionable insights.
                </p>
                
                <div className="space-y-6">
                  <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
                    <h2 className="text-xl md:text-2xl font-semibold mb-3">Challenge</h2>
                    <p className="text-gray-400">
                      Customer support teams needed deeper insights into conversation patterns, response times, 
                      and sentiment analysis to improve their service quality. Raw Intercom data lacked the structure 
                      and enrichment necessary for actionable reporting.
                    </p>
                  </div>
                  
                  <div className="animate-fade-in" style={{ animationDelay: "600ms" }}>
                    <h2 className="text-xl md:text-2xl font-semibold mb-3">Solution</h2>
                    <p className="text-gray-400">
                      I developed an ETL pipeline that extracts conversations from the Intercom API, 
                      processes them through a series of transformations including sentiment analysis and 
                      topic classification, and loads them into a structured data warehouse for reporting.
                    </p>
                  </div>
                  
                  <div className="animate-fade-in" style={{ animationDelay: "800ms" }}>
                    <h2 className="text-xl md:text-2xl font-semibold mb-3">Results</h2>
                    <p className="text-gray-400 mb-4">
                      The analytics pipeline processes thousands of conversations daily, providing the support team with:
                    </p>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4">
                      <li>Automated sentiment scoring to identify unhappy customers</li>
                      <li>Topic classification to understand common issues</li>
                      <li>Response time metrics with anomaly detection</li>
                      <li>Agent performance dashboards</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="max-w-5xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: "1000ms" }}>
                <h2 className="text-xl md:text-2xl font-semibold mb-6">Analytics Dashboard</h2>
                <p className="text-gray-400 mb-8">
                  Below is the reporting dashboard created from the processed data, showing key metrics and trends:
                </p>
                
                <GoogleSheetsEmbed />
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default Analytics;
