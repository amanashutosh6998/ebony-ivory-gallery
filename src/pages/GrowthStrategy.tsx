
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
  description: string;
  details: string[];
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
      description: "Comprehensive monthly reporting system for investor communications including KPIs, financial metrics, and strategic updates.",
      details: [
        "Automated KPI collection and analysis",
        "Financial performance metrics tracking",
        "Strategic milestone progress reporting",
        "Interactive dashboards for stakeholders",
        "Customizable report templates"
      ],
      github: "https://github.com/amanashutosh6998/monthly-investor-summary"
    },
    {
      title: "Project Management",
      description: "Centralized project tracking and management system with timeline visualization, resource allocation, and milestone tracking.",
      details: [
        "Real-time project timeline visualization",
        "Resource allocation and capacity planning",
        "Milestone tracking and deadline management",
        "Team collaboration tools",
        "Risk assessment and mitigation tracking"
      ],
      github: "https://github.com/amanashutosh6998/project-management-dashboard"
    },
    {
      title: "Product Improvement Initiatives",
      description: "Data-driven product enhancement strategies including A/B testing frameworks, user feedback analysis, and feature prioritization.",
      details: [
        "A/B testing framework implementation",
        "User feedback collection and analysis",
        "Feature prioritization matrix",
        "Performance impact measurement",
        "Product roadmap optimization"
      ],
      github: "https://github.com/amanashutosh6998/product-improvements"
    },
    {
      title: "Revenue Control",
      description: "Revenue optimization platform with predictive analytics, growth forecasting, and performance tracking dashboards.",
      details: [
        "Predictive revenue analytics",
        "Growth forecasting models",
        "Performance tracking dashboards",
        "Revenue stream optimization",
        "Financial trend analysis"
      ],
      github: "https://github.com/amanashutosh6998/revenue-analytics"
    },
    {
      title: "SLA Monitoring & Compliance",
      description: "Service Level Agreement tracking system with automated alerts, performance metrics, compliance reporting, and integrated ticket management.",
      details: [
        "Automated SLA performance monitoring",
        "Compliance reporting and alerts",
        "Ticket management and routing system",
        "Escalation workflow automation",
        "Performance analytics and insights"
      ],
      github: "https://github.com/amanashutosh6998/sla-monitoring"
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

            {/* All Initiatives */}
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {growthInitiatives.map((initiative, index) => (
                <Card key={index} className="overflow-hidden border border-gray-800 bg-gray-900/50 hover:-translate-y-1 transition-transform duration-300">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 text-white">{initiative.title}</h3>
                      <p className="text-gray-400 mb-4">{initiative.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-purple-400 mb-2">Key Features:</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {initiative.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start">
                              <span className="text-purple-400 mr-2">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button variant="secondary" className="bg-transparent border-white text-white hover:bg-white hover:text-black w-full" asChild>
                        <a href={initiative.github} target="_blank" rel="noopener noreferrer">
                          View Project
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
