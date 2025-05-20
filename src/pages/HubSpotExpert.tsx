
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
      color: "bg-slate-800 text-white",
      items: [
        "Contacts, Companies, Deals, Tickets",
        "Lifecycle Stages",
        "Property Management",
        "Data Imports & Deduplication"
      ]
    },
    {
      category: "Automation",
      color: "bg-slate-800 text-white",
      items: [
        "Workflows (Sales, Marketing, CS)",
        "Lead Rotation & Scoring",
        "Task Assignments",
        "Internal Notifications"
      ]
    },
    {
      category: "Sales Hub",
      color: "bg-slate-800 text-white",
      items: [
        "Pipeline Setup & Structure",
        "Deal Forecasting",
        "Quotes & Products",
        "Task & Meeting Scheduling"
      ]
    },
    {
      category: "Marketing Hub",
      color: "bg-slate-800 text-white",
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
      color: "bg-slate-800 text-white",
      items: [
        "Custom Reports",
        "Sales & Marketing Attribution",
        "Funnel Analysis",
        "Lifecycle Conversion Rates"
      ]
    },
    {
      category: "Integration & API",
      color: "bg-slate-800 text-white",
      items: [
        "App Marketplace Tools",
        "Webhooks & Custom Code Actions",
        "API-based data sync",
        "Custom Properties for joined systems"
      ]
    },
    {
      category: "Data Governance",
      color: "bg-slate-800 text-white",
      items: [
        "GDPR/Consent Management",
        "Field Audit Trails",
        "Property Cleanups & Migrations",
        "Data Quality Monitoring"
      ]
    },
    {
      category: "Training & Documentation",
      color: "bg-slate-800 text-white",
      items: [
        "Internal SOPs for Marketing",
        "Onboarding for new users",
        "Troubleshooting Guides"
      ]
    },
    {
      category: "Strategy & Optimization",
      color: "bg-slate-800 text-white",
      items: [
        "RevOps Alignment",
        "Funnel & Process Optimization"
      ]
    }
  ];

  const caseStudy = {
    title: "Reporting MQL → SQL → Won Conversion by Campaign",
    slug: "reporting-mql-sql-won-conversion-by-campaign",
    summary: "At Kenko AI, a fast-growing B2B SaaS company, leadership lacked visibility into how marketing spend translated into revenue. The founders wanted a clear view of how leads moved through the funnel from marketing campaigns to closed deals.",
    problem: "Data was scattered across multiple platforms with inconsistent attribution, wasting SDR bandwidth on unqualified leads.",
    solution: "Created unified data source with proper lifecycle tracking, scoring, attribution, and automated reporting.",
    results: [
      "Built self-refreshing ROI dashboard",
      "Saved ~6–8 hours/week on reporting",
      "Improved SQL-to-Won conversion by 25%"
    ]
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
            
            {/* Case Study Section */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Case Study</h2>
              
              <Card className="border border-gray-800 bg-gray-900/20 overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-white">{caseStudy.title}</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-gray-300">📍 Summary</h4>
                      <p className="text-gray-300">{caseStudy.summary}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-gray-300">❌ Problem</h4>
                      <p className="text-gray-300">{caseStudy.problem}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-gray-300">✅ Solution</h4>
                      <p className="text-gray-300">{caseStudy.solution}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h4 className="text-lg font-semibold mb-2 text-gray-300">📈 Key Results</h4>
                      <ul className="list-disc pl-5 text-gray-300">
                        {caseStudy.results.map((result, idx) => (
                          <li key={idx}>{result}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white" 
                      asChild
                    >
                      <Link to={`/case-study/${caseStudy.slug}`}>
                        Read Full Case Study
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Services List */}
            <motion.div 
              className="w-full py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">HubSpot Expert Service Areas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={service.category}
                    className={`${service.color} rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <h3 className="text-xl font-bold mb-4">{service.category}</h3>
                    <ul className="space-y-2">
                      {service.items.map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="mr-2">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-12 max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Why Work With a HubSpot Expert?</h2>
              <p className="text-gray-300 mb-8">
                HubSpot's powerful platform requires expert knowledge to fully leverage its capabilities. 
                Working with a certified HubSpot expert ensures your CRM is properly configured to match your
                business processes, saving you time and maximizing your return on investment.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-4xl font-bold">95%</span>
                  <span className="text-gray-400">Increase in lead capture efficiency</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-4xl font-bold">75%</span>
                  <span className="text-gray-400">Reduction in manual data entry</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-4xl font-bold">60%</span>
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
