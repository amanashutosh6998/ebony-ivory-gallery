
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
  description: string;
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
      description: "Complete CRM administration including data organization, property management, and database optimization for streamlined operations.",
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
      description: "Advanced workflow automation to streamline sales, marketing, and customer service processes with intelligent routing and notifications.",
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
      description: "Sales pipeline optimization with deal tracking, forecasting capabilities, and automated quoting systems for improved sales efficiency.",
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
      description: "Comprehensive marketing automation including email campaigns, lead nurturing, content management, and conversion optimization tools.",
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
      description: "Advanced analytics and reporting systems providing actionable insights into sales performance, marketing attribution, and customer journey analytics.",
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
      description: "Seamless integration management connecting HubSpot with external systems through APIs, webhooks, and marketplace applications for unified data flow.",
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
      description: "Comprehensive data management ensuring compliance, data quality, and proper governance with audit trails and migration support.",
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
      description: "Knowledge transfer and documentation services including training programs, standard operating procedures, and user onboarding resources.",
      items: [
        "Internal SOPs for Marketing",
        "Onboarding for new users",
        "Troubleshooting Guides"
      ]
    },
    {
      category: "Strategy & Optimization",
      color: "bg-slate-800 text-white",
      description: "Strategic consulting focused on revenue operations alignment and process optimization to maximize HubSpot ROI and operational efficiency.",
      items: [
        "RevOps Alignment",
        "Funnel & Process Optimization"
      ]
    }
  ];

  const caseStudy = {
    title: "Campaign-Level Revenue Attribution Dashboard",
    slug: "campaign-level-revenue-attribution-dashboard",
    summary: "At Kenko AI, a fast-growing B2B SaaS company helping fitness studios automate operations, the leadership team needed deeper insight into how performance marketing and inbound efforts converted into a real sales pipeline, not just leads.",
    problem: "Data was fragmented across multiple platforms with inconsistent attribution, making it impossible to trace which campaigns created actual revenue.",
    solution: "Built a live, self-refreshing dashboard connecting ads to pipeline, with full funnel visibility from impressions to deals created.",
    results: [
      "Identified underperforming high-spend campaigns",
      "Saved ~6–8 hours/week on reporting",
      "Discovered 30% overreporting in Google Ads"
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
                  HubSpot Administration Services
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Maximize your HubSpot ROI with expert administration, optimization, and automation services tailored to your business needs.
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
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">HubSpot Administration Service Areas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={service.category}
                    className={`${service.color} rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <h3 className="text-xl font-bold mb-3">{service.category}</h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{service.description}</p>
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
                          <span className="text-sm">{item}</span>
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
              <h2 className="text-3xl font-bold mb-6 text-white">Why Work With a HubSpot Administrator?</h2>
              <p className="text-gray-300 mb-8">
                HubSpot's powerful platform requires expert administration to fully leverage its capabilities. 
                Working with a certified HubSpot administrator ensures your CRM is properly configured to match your
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
