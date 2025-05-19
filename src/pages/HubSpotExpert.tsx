
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import { motion } from "framer-motion";

const HubSpotExpert = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const hasVisitedHubspot = sessionStorage.getItem('hasVisitedHubspot');
    if (hasVisitedHubspot) {
      setInitialLoading(false);
      setIsLoaded(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedHubspot', 'true');
    setInitialLoading(false);
    setIsLoaded(true);
  };

  const services = [
    {
      title: "CRM Clean-up & Optimization",
      description: "Eliminate duplicate contacts, companies, and deals. Restructure properties for better data quality and reporting."
    },
    {
      title: "Workflow & Automation Setup",
      description: "Design and implement automated workflows for lead nurturing, customer onboarding, and internal notifications."
    },
    {
      title: "Custom Property Configuration",
      description: "Create and optimize custom properties to track specific metrics important to your business goals."
    },
    {
      title: "Pipeline Management",
      description: "Structure deal pipelines to match your sales process and optimize for conversion tracking."
    },
    {
      title: "Integration & API Development",
      description: "Connect HubSpot with other tools in your tech stack using native integrations or custom API solutions."
    },
    {
      title: "Reporting & Analytics Setup",
      description: "Build custom dashboards and reports to track KPIs and provide actionable insights."
    }
  ];

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ColorParticles colorScheme="orange-red" density="medium" />
      </div>
      
      <Navbar />
      
      <div className={`pt-16 relative z-10 ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 gap-8">
              <div className="md:w-1/2">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  HubSpot Expert Services
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Maximize your HubSpot ROI with expert setup, optimization, and automation services tailored to your business needs.
                </motion.p>
              </div>
              
              <div className="md:w-1/2 relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative h-80 w-full overflow-hidden rounded-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 opacity-30 rounded-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.svg 
                      width="200" 
                      height="200" 
                      viewBox="0 0 200 200"
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <circle cx="100" cy="100" r="85" fill="none" stroke="#E5703D" strokeWidth="5" />
                      <path 
                        d="M100,25 L120,80 H180 L130,115 L150,175 L100,140 L50,175 L70,115 L20,80 H80 L100,25" 
                        fill="#E5703D"
                      />
                    </motion.svg>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-orange-500/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-3 text-orange-400">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-20 max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-6">Why Work With a HubSpot Expert?</h2>
              <p className="text-gray-300 mb-8">
                HubSpot's powerful platform requires expert knowledge to fully leverage its capabilities. 
                Working with a certified HubSpot expert ensures your CRM is properly configured to match your
                business processes, saving you time and maximizing your return on investment.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-400 text-4xl font-bold">95%</span>
                  <span className="text-gray-400">Increase in lead capture efficiency</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-400 text-4xl font-bold">75%</span>
                  <span className="text-gray-400">Reduction in manual data entry</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-400 text-4xl font-bold">60%</span>
                  <span className="text-gray-400">Faster sales cycle</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default HubSpotExpert;
