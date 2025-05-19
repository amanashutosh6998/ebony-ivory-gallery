
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Database, Server, Cloud, ArrowRight } from "lucide-react";

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

  // Sample data for ETL flow visualization
  const etlStages = [
    { id: "source", name: "Data Sources", icon: <Database size={24} />, description: "Customer data from multiple systems" },
    { id: "ingest", name: "S3 Ingestion", icon: <Cloud size={24} />, description: "Raw data storage in S3 buckets" },
    { id: "transform", name: "Lambda Processing", icon: <Server size={24} />, description: "Data cleaning and transformation" },
    { id: "warehouse", name: "Redshift", icon: <Database size={24} />, description: "Data warehousing and analytics" },
    { id: "orchestration", name: "Step Functions", icon: <Server size={24} />, description: "Workflow orchestration" }
  ];

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
            
            {/* ETL Flow Animation Section */}
            <motion.div 
              className="w-full py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">ETL Data Flow Architecture</h2>
              
              {/* ETL Flow Diagram */}
              <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 shadow-lg mb-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
                  {etlStages.map((stage, index) => (
                    <React.Fragment key={stage.id}>
                      <motion.div
                        className="flex flex-col items-center text-center p-4 bg-gray-800/70 rounded-lg w-full md:w-40"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      >
                        <div className="p-3 bg-gray-700 rounded-full mb-3">
                          {stage.icon}
                        </div>
                        <h3 className="font-bold mb-2">{stage.name}</h3>
                        <p className="text-xs text-gray-400">{stage.description}</p>
                      </motion.div>
                      
                      {index < etlStages.length - 1 && (
                        <motion.div 
                          className="hidden md:flex"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        >
                          <ArrowRight className="text-gray-500" />
                        </motion.div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                {/* Sample Data Flow Chart */}
                <div className="mt-12 h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { name: 'Day 1', ingestion: 4000, processing: 2400, storage: 1800 },
                        { name: 'Day 2', ingestion: 3000, processing: 1800, storage: 1300 },
                        { name: 'Day 3', ingestion: 5000, processing: 3800, storage: 2800 },
                        { name: 'Day 4', ingestion: 2780, processing: 1908, storage: 1680 },
                        { name: 'Day 5', ingestion: 6890, processing: 4800, storage: 3800 },
                        { name: 'Day 6', ingestion: 3390, processing: 2300, storage: 1500 },
                        { name: 'Day 7', ingestion: 4490, processing: 3200, storage: 2100 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} />
                      <Legend />
                      <Line type="monotone" dataKey="ingestion" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="processing" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="storage" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
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
