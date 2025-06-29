
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Initiative {
  title: string;
  category: string;
  description: string;
  github: string;
}

const GrowthStrategy = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const hasVisitedGrowthStrategy = sessionStorage.getItem('hasVisitedGrowthStrategy');
    if (hasVisitedGrowthStrategy) {
      setInitialLoading(false);
      setIsLoaded(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedGrowthStrategy', 'true');
    setInitialLoading(false);
    setIsLoaded(true);
  };

  const growthInitiatives: Initiative[] = [
    {
      title: "Monthly Investor Summary (MIS)",
      category: "Reporting",
      description: "Comprehensive monthly reporting system for investor communications including KPIs, financial metrics, and strategic updates.",
      github: "https://github.com/amanashutosh6998/monthly-investor-summary"
    },
    {
      title: "Project Management Dashboard",
      category: "Management",
      description: "Centralized project tracking and management system with timeline visualization, resource allocation, and milestone tracking.",
      github: "https://github.com/amanashutosh6998/project-management-dashboard"
    },
    {
      title: "Product Improvement Initiatives",
      category: "Growth",
      description: "Data-driven product enhancement strategies including A/B testing frameworks, user feedback analysis, and feature prioritization.",
      github: "https://github.com/amanashutosh6998/product-improvements"
    },
    {
      title: "SLA Monitoring & Compliance",
      category: "Operations",
      description: "Service Level Agreement tracking system with automated alerts, performance metrics, and compliance reporting.",
      github: "https://github.com/amanashutosh6998/sla-monitoring"
    },
    {
      title: "Ticket Management System",
      category: "Operations",
      description: "Comprehensive ticketing solution with priority routing, escalation workflows, and performance analytics.",
      github: "https://github.com/amanashutosh6998/ticket-management"
    },
    {
      title: "Revenue Control & Growth Analytics",
      category: "Growth",
      description: "Revenue optimization platform with predictive analytics, growth forecasting, and performance tracking dashboards.",
      github: "https://github.com/amanashutosh6998/revenue-analytics"
    }
  ];

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      {/* Background particles */}
      <ColorParticles colorScheme="purple-pink" density="medium" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-[150px] transform -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-[150px] transform translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <Navbar />
      
      <div className={`pt-16 relative z-10 ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Growth and Strategy (CEO's office)
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Strategic initiatives driving organizational growth, operational excellence, and executive decision-making
              </motion.p>
            </div>

            {/* Reporting & Management Section */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-purple-400">Reporting & Management</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {growthInitiatives.filter(initiative => ['Reporting', 'Management'].includes(initiative.category)).map((initiative, index) => (
                  <Card key={index} className="overflow-hidden border border-gray-800 bg-gray-900/50 hover:-translate-y-1 transition-transform duration-300">
                    <CardContent className="p-6">
                      <div className="px-2">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-sm px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
                            {initiative.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">{initiative.title}</h3>
                        <p className="text-gray-400 mb-4">{initiative.description}</p>
                        <Button variant="secondary" className="bg-transparent border-white text-white hover:bg-white hover:text-black w-full" asChild>
                          <a href={initiative.github} target="_blank" rel="noopener noreferrer">
                            View Project
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Growth Initiatives Section */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-pink-400">Growth Initiatives</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {growthInitiatives.filter(initiative => initiative.category === 'Growth').map((initiative, index) => (
                  <Card key={index} className="overflow-hidden border border-gray-800 bg-gray-900/50 hover:-translate-y-1 transition-transform duration-300">
                    <CardContent className="p-6">
                      <div className="px-2">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-sm px-3 py-1 rounded-full bg-pink-500/20 text-pink-400">
                            {initiative.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">{initiative.title}</h3>
                        <p className="text-gray-400 mb-4">{initiative.description}</p>
                        <Button variant="secondary" className="bg-transparent border-white text-white hover:bg-white hover:text-black w-full" asChild>
                          <a href={initiative.github} target="_blank" rel="noopener noreferrer">
                            View Project
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Operations Section */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-cyan-400">Operations</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {growthInitiatives.filter(initiative => initiative.category === 'Operations').map((initiative, index) => (
                  <Card key={index} className="overflow-hidden border border-gray-800 bg-gray-900/50 hover:-translate-y-1 transition-transform duration-300">
                    <CardContent className="p-6">
                      <div className="px-2">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-sm px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400">
                            {initiative.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">{initiative.title}</h3>
                        <p className="text-gray-400 mb-4">{initiative.description}</p>
                        <Button variant="secondary" className="bg-transparent border-white text-white hover:bg-white hover:text-black w-full" asChild>
                          <a href={initiative.github} target="_blank" rel="noopener noreferrer">
                            View Project
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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

export default GrowthStrategy;
