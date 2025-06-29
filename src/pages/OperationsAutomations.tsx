
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Project {
  title: string;
  category: string;
  description: string;
  github: string;
}

const OperationsAutomations = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const hasVisitedOpsAutomations = sessionStorage.getItem('hasVisitedOpsAutomations');
    if (hasVisitedOpsAutomations) {
      setInitialLoading(false);
      setIsLoaded(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedOpsAutomations', 'true');
    setInitialLoading(false);
    setIsLoaded(true);
  };

  const operationsProjects: Project[] = [
    {
      title: "Lead Scoring Engine",
      category: "Marketing Ops",
      description: "Automated lead scoring and qualification system with behavioral tracking and predictive analytics.",
      github: "https://github.com/amanashutosh6998/lead-scoring-engine"
    },
    {
      title: "Campaign Attribution",
      category: "Marketing Ops", 
      description: "Multi-touch attribution modeling for campaign performance analysis and ROI optimization.",
      github: "https://github.com/amanashutosh6998/campaign-attribution"
    },
    {
      title: "Sales Pipeline Automation",
      category: "Sales Ops",
      description: "Automated deal progression, task assignments, and notification workflows for sales teams.",
      github: "https://github.com/amanashutosh6998/sales-pipeline-automation"
    },
    {
      title: "Territory Management",
      category: "Sales Ops",
      description: "Dynamic territory assignment and lead routing based on geographic and demographic criteria.",
      github: "https://github.com/amanashutosh6998/territory-management"
    }
  ];

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      {/* Background particles */}
      <ColorParticles colorScheme="purple-blue" density="medium" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[150px] transform -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-[150px] transform translate-y-1/2 -translate-x-1/2"></div>
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
                Operations and Automations
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Streamlining business processes through intelligent automation and operational excellence
              </motion.p>
            </div>

            {/* Marketing Operations Section */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-blue-400">Marketing Operations</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {operationsProjects.filter(project => project.category === 'Marketing Ops').map((project, index) => (
                  <Card key={index} className="overflow-hidden border border-gray-800 bg-gray-900/50 hover:-translate-y-1 transition-transform duration-300">
                    <CardContent className="p-6">
                      <div className="px-2">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-sm px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                        <p className="text-gray-400 mb-4">{project.description}</p>
                        <Button variant="secondary" className="bg-transparent border-white text-white hover:bg-white hover:text-black w-full" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            View Project
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Sales Operations Section */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-green-400">Sales Operations</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {operationsProjects.filter(project => project.category === 'Sales Ops').map((project, index) => (
                  <Card key={index} className="overflow-hidden border border-gray-800 bg-gray-900/50 hover:-translate-y-1 transition-transform duration-300">
                    <CardContent className="p-6">
                      <div className="px-2">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-sm px-3 py-1 rounded-full bg-green-500/20 text-green-400">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                        <p className="text-gray-400 mb-4">{project.description}</p>
                        <Button variant="secondary" className="bg-transparent border-white text-white hover:bg-white hover:text-black w-full" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
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

export default OperationsAutomations;
