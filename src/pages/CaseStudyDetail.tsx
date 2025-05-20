
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/components/ui/use-toast";

interface Solution {
  unified: {
    title: string;
    points: string[];
  };
  funnel: {
    title: string;
    points: string[];
  };
  leadScoring: {
    title: string;
    points: string[];
  };
  attribution: {
    title: string;
    points: string[];
  };
  reporting: {
    title: string;
    points: string[];
  };
}

interface CaseStudy {
  title: string;
  context: string;
  problem: string[];
  solution: Solution;
  tools: string[];
  results: string[];
  image: string;
  order?: number;
  active?: boolean;
  categories?: string[];
}

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  useEffect(() => {
    // For now, we're hardcoding the one case study we have
    // In the future, this would fetch from a CMS based on the slug
    const fetchCaseStudy = () => {
      // Simulate API call delay
      setTimeout(() => {
        if (slug === "reporting-mql-sql-won-conversion-by-campaign") {
          const study: CaseStudy = {
            title: "Reporting MQL → SQL → Won Conversion by Campaign",
            context: "At Kenko AI, a fast-growing B2B SaaS company, leadership lacked visibility into how marketing spend translated into revenue. The founders wanted a clear view of how leads from Facebook Ads, Google Ads, and inbound channels moved through the funnel—from MQL to SQL to Closed Won.",
            problem: [
              "Data was scattered across HubSpot, Google Sheets, Facebook Ads, and Google Ads.",
              "UTM parameters were inconsistently captured, breaking attribution.",
              "No unified view to answer: \"Which campaigns are driving actual customers?\"",
              "Marketing reported on MQLs, but sales needed visibility into downstream conversion.",
              "Lead qualification lacked structure—wasting SDR bandwidth on unqualified leads."
            ],
            solution: {
              unified: {
                title: "Unified Source of Truth",
                points: [
                  "Synced data from HubSpot CRM using the HubSpot API into structured Google Sheets reports.",
                  "Used Contact–Company–Deal associations to maintain lifecycle integrity."
                ]
              },
              funnel: {
                title: "Funnel Stage Tracking",
                points: [
                  "Standardized lifecycle stages within HubSpot:",
                  "MQL: Based on form fills and key website actions",
                  "SQL: Accepted by Sales team (manual + automated based on score)",
                  "Closed Won: Deal booked with actual revenue"
                ]
              },
              leadScoring: {
                title: "Lead Scoring Engine",
                points: [
                  "Built a custom lead scoring model using HubSpot's native lead score field.",
                  "Behavior-based: Website visits, demo requests, email interactions",
                  "Demographic: Job title, company size, region",
                  "Triggered workflows to alert SDRs only when leads crossed a predefined score threshold."
                ]
              },
              attribution: {
                title: "Attribution Mapping",
                points: [
                  "Captured UTM parameters using hidden fields in HubSpot forms.",
                  "Used the Facebook Ads API and Google Ads API to fetch campaign, ad set, and spend data.",
                  "Mapped ad-level data to contact records in Sheets using UTM source + email join keys."
                ]
              },
              reporting: {
                title: "Reporting Workflow",
                points: [
                  "Automated daily exports using HubSpot API to Google Sheets (via Python and Apps Script).",
                  "Built a custom Google Sheets dashboard showing:",
                  "Campaign-wise performance: MQL → SQL → Closed Won",
                  "Conversion rates between lifecycle stages",
                  "ROI estimates per ad channel using spend vs. revenue"
                ]
              }
            },
            tools: ["HubSpot CRM", "HubSpot API", "Facebook Ads API", "Google Ads API", "Google Sheets", "Apps Script", "Python"],
            results: [
              "📊 Built a self-refreshing dashboard for founders showing campaign ROI",
              "⏱️ Saved ~6–8 hours/week of manual marketing-to-sales handoff reporting",
              "📉 Identified 3 high-spend ad campaigns with <5% SQL conversion—budget reallocated",
              "📈 Improved SQL-to-Won conversion by 25% after scoring and attribution fixes",
              "📌 Gave founders visibility from first click to revenue, enabling better budgeting"
            ],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
            categories: ["Marketing", "Data Analytics", "HubSpot"]
          };
          setCaseStudy(study);
          setInitialLoading(false);
          setIsLoaded(true);
        } else {
          // Case study not found
          toast({
            title: "Case Study Not Found",
            description: "The requested case study could not be found",
            variant: "destructive"
          });
          navigate("/case-studies");
        }
      }, 500);
    };
    
    fetchCaseStudy();
  }, [slug, navigate, toast]);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  if (initialLoading) {
    return <LoadingScreen onComplete={() => setInitialLoading(false)} />;
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Button onClick={() => navigate("/case-studies")}>
            Return to Case Studies
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ColorParticles colorScheme="purple-blue" density="medium" />
      </div>
      
      <Navbar />
      
      <div className={`pt-16 relative z-10 ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <Button 
              variant="outline" 
              className="mb-8" 
              onClick={() => navigate("/case-studies")}
            >
              ← Back to Case Studies
            </Button>

            <div className="grid md:grid-cols-5 gap-8 mb-12">
              <div className="md:col-span-3">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">{caseStudy.title}</h1>
                
                {/* Context */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-300">📍 Context</h2>
                  <p className="text-gray-200 text-lg">{caseStudy.context}</p>
                </div>
                
                {/* Problem */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-300">❌ Problem</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-200">
                    {caseStudy.problem.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <AspectRatio ratio={4/3} className="overflow-hidden rounded-lg border border-gray-800">
                  <img 
                    src={caseStudy.image} 
                    alt={caseStudy.title} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.categories?.map((category, idx) => (
                      <span key={idx} className="bg-gray-800 text-gray-200 px-3 py-1 text-sm rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.tools.map((tool, idx) => (
                      <span key={idx} className="bg-gray-800 text-gray-200 px-3 py-1 text-sm rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Solution */}
            <Card className="border border-gray-800 bg-gray-900/20 mb-12">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">✅ Solution</h2>
                
                {/* Unified Source of Truth */}
                <div 
                  className="border border-gray-700 rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-800/30 transition-colors"
                  onClick={() => toggleSection('unified')}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white text-lg">🔗 {caseStudy.solution.unified.title}</h3>
                    <span>{activeSection === 'unified' ? '−' : '+'}</span>
                  </div>
                  
                  {activeSection === 'unified' && (
                    <ul className="list-disc pl-5 mt-3 text-gray-300">
                      {caseStudy.solution.unified.points.map((point, idx) => (
                        <li key={idx} className="mt-1">{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
                
                {/* Funnel Stage Tracking */}
                <div 
                  className="border border-gray-700 rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-800/30 transition-colors"
                  onClick={() => toggleSection('funnel')}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white text-lg">📊 {caseStudy.solution.funnel.title}</h3>
                    <span>{activeSection === 'funnel' ? '−' : '+'}</span>
                  </div>
                  
                  {activeSection === 'funnel' && (
                    <ul className="list-disc pl-5 mt-3 text-gray-300">
                      {caseStudy.solution.funnel.points.map((point, idx) => (
                        <li key={idx} className="mt-1">{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
                
                {/* Lead Scoring Engine */}
                <div 
                  className="border border-gray-700 rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-800/30 transition-colors"
                  onClick={() => toggleSection('leadScoring')}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white text-lg">🧮 {caseStudy.solution.leadScoring.title}</h3>
                    <span>{activeSection === 'leadScoring' ? '−' : '+'}</span>
                  </div>
                  
                  {activeSection === 'leadScoring' && (
                    <ul className="list-disc pl-5 mt-3 text-gray-300">
                      {caseStudy.solution.leadScoring.points.map((point, idx) => (
                        <li key={idx} className="mt-1">{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
                
                {/* Attribution Mapping */}
                <div 
                  className="border border-gray-700 rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-800/30 transition-colors"
                  onClick={() => toggleSection('attribution')}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white text-lg">🎯 {caseStudy.solution.attribution.title}</h3>
                    <span>{activeSection === 'attribution' ? '−' : '+'}</span>
                  </div>
                  
                  {activeSection === 'attribution' && (
                    <ul className="list-disc pl-5 mt-3 text-gray-300">
                      {caseStudy.solution.attribution.points.map((point, idx) => (
                        <li key={idx} className="mt-1">{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
                
                {/* Reporting Workflow */}
                <div 
                  className="border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-800/30 transition-colors"
                  onClick={() => toggleSection('reporting')}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white text-lg">📥 {caseStudy.solution.reporting.title}</h3>
                    <span>{activeSection === 'reporting' ? '−' : '+'}</span>
                  </div>
                  
                  {activeSection === 'reporting' && (
                    <ul className="list-disc pl-5 mt-3 text-gray-300">
                      {caseStudy.solution.reporting.points.map((point, idx) => (
                        <li key={idx} className="mt-1">{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Results */}
            <Card className="border border-gray-800 bg-gray-900/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">📈 Results</h2>
                <ul className="space-y-3">
                  {caseStudy.results.map((result, idx) => (
                    <li key={idx} className="flex items-start text-lg">
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default CaseStudyDetail;
