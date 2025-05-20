
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import AwsCdpFlowDiagram from "@/components/AwsCdpFlowDiagram";
import MiroEmbed from "@/components/MiroEmbed";

const AwsCdpPipeline = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const hasVisitedAwsCdp = sessionStorage.getItem('hasVisitedAwsCdp');
    if (hasVisitedAwsCdp) {
      setInitialLoading(false);
      setIsLoaded(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedAwsCdp', 'true');
    setInitialLoading(false);
    setIsLoaded(true);
  };

  if (initialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
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
                  className="text-4xl md:text-5xl font-bold mb-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  AWS CDP Pipeline
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  End-to-end Customer Data Platform using S3, Lambda, Redshift & Step Functions
                </motion.p>
              </div>
            </div>
            
            {/* Miro Embed Section */}
            <motion.div 
              className="w-full py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">Architecture Overview</h2>
              
              {/* Miro Embed */}
              <div className="mb-12">
                <MiroEmbed />
              </div>
            </motion.div>
            
            {/* Complex ETL Flow Diagram Section */}
            <motion.div 
              className="w-full py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">ETL Data Flow Architecture</h2>
              
              {/* Complex ETL Flow Diagram */}
              <div className="mb-12">
                <AwsCdpFlowDiagram />
              </div>
            </motion.div>
            
            {/* Project Description Section */}
            <motion.div 
              className="my-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Card className="bg-gray-900/50 border border-gray-800 p-8">
                <h2 className="text-3xl font-bold mb-6 text-white">About This Project</h2>
                <div className="space-y-6 text-gray-300">
                  <p>
                    This project implements a complete Customer Data Platform on AWS, 
                    featuring automated data ingestion, transformation, and analysis workflows.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white">Key Components</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>S3 buckets for raw data storage with event-driven ingestion</li>
                    <li>Lambda functions for data cleaning and transformation</li>
                    <li>Redshift for data warehousing and analytics</li>
                    <li>Step Functions for workflow orchestration</li>
                    <li>IAM roles and policies for secure access management</li>
                  </ul>
                  
                  <h3 className="text-xl font-bold text-white">Technical Challenges</h3>
                  <p>
                    The primary challenge was optimizing the data pipeline for both speed and cost. 
                    By implementing smart batching and incremental processing, we reduced 
                    processing times by 40% while keeping compute costs minimal.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white">Results</h3>
                  <p>
                    This CDP solution enabled real-time customer insights across multiple channels,
                    leading to more personalized marketing campaigns and a 25% increase in customer 
                    engagement for our client.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default AwsCdpPipeline;
