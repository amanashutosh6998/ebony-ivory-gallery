
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import { motion } from "framer-motion";

interface HubSpotService {
  category: string;
  color: string;
  items: string[];
}

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

  const services: HubSpotService[] = [
    {
      category: "CRM Management",
      color: "bg-emerald-100 text-emerald-900",
      items: [
        "Contacts, Companies, Deals, Tickets",
        "Lifecycle Stages",
        "Property Management",
        "Data Imports & Deduplication"
      ]
    },
    {
      category: "Automation",
      color: "bg-amber-100 text-amber-900",
      items: [
        "Workflows (Sales, Marketing, CS)",
        "Lead Rotation & Scoring",
        "Task Assignments",
        "Internal Notifications"
      ]
    },
    {
      category: "Sales Hub",
      color: "bg-amber-100 text-amber-900",
      items: [
        "Pipeline Setup & Structure",
        "Deal Forecasting",
        "Quotes & Products",
        "Task & Meeting Scheduling"
      ]
    },
    {
      category: "Marketing Hub",
      color: "bg-cyan-100 text-cyan-900",
      items: [
        "Email Campaigns & A/B Tests",
        "List Segmentation",
        "Landing Pages & Forms",
        "CTAs, Popups",
        "Blog/SEO Tools"
      ]
    },
    {
      category: "Reporting & Dashboards",
      color: "bg-red-100 text-red-900",
      items: [
        "Custom Reports",
        "Sales & Marketing Attribution",
        "Funnel Analysis",
        "Lifecycle Conversion Rates"
      ]
    },
    {
      category: "Integration & API",
      color: "bg-purple-100 text-purple-900",
      items: [
        "App Marketplace Tools",
        "Webhooks & Custom Code Actions",
        "API-based data sync",
        "Custom Properties for joined systems"
      ]
    },
    {
      category: "Data Governance",
      color: "bg-pink-100 text-pink-900",
      items: [
        "GDPR/Consent Management",
        "Field Audit Trails",
        "Property Cleanups & Migrations",
        "Data Quality Monitoring"
      ]
    },
    {
      category: "Training & Documentation",
      color: "bg-red-100 text-red-900",
      items: [
        "Internal SOPs for Marketing",
        "Onboarding for new users",
        "Troubleshooting Guides"
      ]
    },
    {
      category: "Strategy & Optimization",
      color: "bg-lime-100 text-lime-900",
      items: [
        "RevOps Alignment",
        "Funnel & Process Optimization"
      ]
    }
  ];

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles - fixed to use a valid colorScheme */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ColorParticles colorScheme="green-cyan" density="medium" />
      </div>
      
      <Navbar />
      
      <div className={`pt-16 relative z-10 ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 gap-8">
              <div className="md:w-1/2">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent"
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
            </div>
            
            {/* Mind Map Animation */}
            <motion.div 
              className="w-full py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative">
                {/* Center Hub */}
                <motion.div 
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full p-6 shadow-lg flex items-center justify-center w-40 h-40"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <h2 className="text-xl font-bold text-center text-white">HubSpot Expert</h2>
                </motion.div>
                
                {/* Service Categories */}
                <div className="min-h-[800px] relative">
                  {services.map((service, index) => {
                    const angle = (index * (360 / services.length)) * (Math.PI / 180);
                    const radius = 260; // Distance from center
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <motion.div
                        key={service.category}
                        className={`absolute left-1/2 top-1/2 ${service.color} rounded-lg shadow-lg p-4 w-64`}
                        style={{
                          translateX: `calc(${x}px - 50%)`,
                          translateY: `calc(${y}px - 50%)`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      >
                        <h3 className="text-lg font-bold mb-2">{service.category}</h3>
                        <ul className="text-sm">
                          {service.items.map((item, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 1.2 + i * 0.1 + index * 0.05 }}
                              className="mb-1"
                            >
                              • {item}
                            </motion.li>
                          ))}
                        </ul>
                        
                        {/* Line connecting to center */}
                        <motion.div 
                          className="absolute left-1/2 top-1/2 h-0.5 bg-gray-400 origin-left z-0"
                          style={{
                            width: Math.sqrt(x * x + y * y) - 70, // Length of line
                            transform: `rotate(${Math.atan2(y, x) * (180 / Math.PI)}deg)`, // Rotation based on angle
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-12 max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Why Work With a HubSpot Expert?</h2>
              <p className="text-gray-300 mb-8">
                HubSpot's powerful platform requires expert knowledge to fully leverage its capabilities. 
                Working with a certified HubSpot expert ensures your CRM is properly configured to match your
                business processes, saving you time and maximizing your return on investment.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 text-4xl font-bold">95%</span>
                  <span className="text-gray-400">Increase in lead capture efficiency</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 text-4xl font-bold">75%</span>
                  <span className="text-gray-400">Reduction in manual data entry</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 text-4xl font-bold">60%</span>
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
