import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import LoadingScreen from "@/components/LoadingScreen";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SolutionStep {
  title: string;
  points: string[];
}

interface Solution {
  steps: {
    formClassification: SolutionStep;
    adPlatform: SolutionStep;
    attribution: SolutionStep;
    conversion: SolutionStep;
    dealPipeline: SolutionStep;
    dashboard: SolutionStep;
  };
}

interface CaseStudy {
  title: string;
  subtitle: string;
  companyOverview: string;
  challenges: string[];
  goal: string;
  solution: Solution;
  results: {
    items: { title: string; description: string }[];
  };
  tools: string[];
  reflection: string;
  categories?: string[];
}

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  
  useEffect(() => {
    // For now, we're hardcoding the case studies
    // In the future, this would fetch from a CMS based on the slug
    const fetchCaseStudy = () => {
      // Simulate API call delay
      setTimeout(() => {
        if (slug === "campaign-level-revenue-attribution-dashboard") {
          const study: CaseStudy = {
            title: "Campaign-Level Revenue Attribution Dashboard",
            subtitle: "From Impressions to Pipeline: Unifying Paid & Organic Attribution at Kenko AI",
            companyOverview: "Kenko AI is a fast-growing B2B SaaS company helping fitness studios automate operations. As the business scaled its ad spend across Facebook and Google, the leadership team needed deeper insight into how performance marketing and inbound efforts converted into a real sales pipeline, not just leads. Despite running highly targeted campaigns and collecting leads, the reporting infrastructure couldn't answer a fundamental question: \"Which campaigns are creating meetings, deals, and revenue?\"",
            challenges: [
              "Fragmented Data Sources: Facebook Ads, Google Ads, HubSpot, and Google Sheets had to be manually stitched together.",
              "Shallow Attribution: UTMs were inconsistently captured, leading to broken attribution chains.",
              "Mismatch in Conversions: Google Ads showed high conversions, but HubSpot revealed fewer actual demo bookings.",
              "Organic Influence Unmeasured: Some ad campaigns influenced organic visits but weren't credited.",
              "No Deal Visibility: Campaign-level insights stopped at the MQL stage — not connected to demo no-shows, deals, or revenue potential.",
              "Manual Reporting Overhead: 6–8 hours/week were spent creating reports for founders."
            ],
            goal: "To build a live, self-refreshing dashboard that connects ads → form fills → demo bookings → SQLs → deals → pipeline, across both paid and organic channels, enabling full-funnel visibility and smarter budget allocation.",
            solution: {
              steps: {
                formClassification: {
                  title: "Form Classification in HubSpot",
                  points: [
                    "Classified all form submissions based on intent:",
                    "Lead Magnets → Lead",
                    "Newsletters/Ebooks → Subscriber",
                    "Demo Request → MQL",
                    "Calendar Booking → SQL",
                    "Used HubSpot workflows to auto-tag stages and assign ownership (Marketing → SDR → AE)."
                  ]
                },
                adPlatform: {
                  title: "Ad Platform Data Extraction",
                  points: [
                    "Pulled weekly and monthly data from Google Ads and Facebook Ads APIs:",
                    "Campaign Name, Ad Set",
                    "Impressions, Clicks, Spend",
                    "Reported Conversions",
                    "Standardized campaign names to match UTM values and HubSpot properties."
                  ]
                },
                attribution: {
                  title: "Enhanced Attribution Logic",
                  points: [
                    "Captured UTMs via hidden fields on forms: utm_source, utm_medium, utm_campaign.",
                    "Used First Page Seen, Last Page Seen, and HubSpot's Original Source / Latest Source fields to triangulate traffic origins.",
                    "For repeat visits:",
                    "If the first session came from Ads → awareness credit",
                    "If the second session included Demo Form fill → conversion credit",
                    "Differentiated ad landing pages (e.g., utm_lp or /ads/landing-page-1) from organic using URL structures."
                  ]
                },
                conversion: {
                  title: "HubSpot + Ads Conversion Audit",
                  points: [
                    "Compared Google Ads conversions with actual Demo Booked counts from HubSpot.",
                    "Found ~30% overreporting in Google Ads (form starts, page views counted as conversions).",
                    "Adjusted CPL and ROI calculations to reflect actual booked meetings (SQLs)."
                  ]
                },
                dealPipeline: {
                  title: "Deal & Pipeline Integration",
                  points: [
                    "For every campaign, also tracked:",
                    "✅ Demo Booked",
                    "❌ Demo No-Show",
                    "📂 Deals Opened",
                    "💰 Pipeline Value (Sum of deal amounts)",
                    "This allowed us to report:",
                    "Cost per SQL",
                    "Cost per Pipeline Dollar",
                    "No-show Rate per Campaign",
                    "Demo-to-Deal Conversion Rate"
                  ]
                },
                dashboard: {
                  title: "Automated Google Sheets Dashboard",
                  points: [
                    "Built a self-updating dashboard with:",
                    "Python for data pulls",
                    "Google Apps Script for Sheets automation",
                    "Separate tabs for:",
                    "Weekly metrics by campaign",
                    "Month-over-month trends",
                    "Paid vs organic split",
                    "Funnel drop-off by stage",
                    "No-shows and pipeline value",
                    "ROI by spend vs pipeline generated"
                  ]
                }
              }
            },
            results: {
              items: [
                { title: "Budget Efficiency", description: "Flagged 3 high-spend campaigns with <5% SQL rate → reallocated budget" },
                { title: "Ops Productivity", description: "Saved ~6–8 hours/week through automation" },
                { title: "Conversion Clarity", description: "Discovered 30% overreporting in Google Ads conversions" },
                { title: "Sales Insight", description: "Gave Sales visibility into which campaigns created most pipeline" },
                { title: "Strategic Decision-Making", description: "Enabled Marketing & Founders to prioritize campaigns based on SQL and Deal creation, not just CPL" },
                { title: "No-Show Analysis", description: "Identified campaigns with high no-show rates → improved SDR follow-up" },
                { title: "SQL-to-Pipeline Attribution", description: "Full visibility from Click → Deal Opened → Pipeline Created" }
              ]
            },
            tools: ["HubSpot CRM (Contacts, Forms, Lifecycle, Deals)", "Facebook Ads API", "Google Ads API", "Google Sheets + Apps Script (dashboards)", "Python (ETL and automation)", "Hidden UTM Tracking, Form Metadata", "Sales Handoff Automation via HubSpot Workflows"],
            reflection: "\"This project shifted our company's reporting from vanity metrics to true revenue metrics. We stopped optimizing for cost per lead and started optimizing for cost per deal and pipeline created. That changed how we spent our budget — and how Sales trusted Marketing.\"",
            categories: ["Marketing", "Data Analytics", "HubSpot", "Revenue Attribution"]
          };
          setCaseStudy(study);
          setInitialLoading(false);
          setIsLoaded(true);
        } else if (slug === "lead-scoring-engine") {
          const study: CaseStudy = {
            title: "Lead Scoring Engine to Prioritize SDR Outreach",
            subtitle: "Automating lead qualification for faster, more focused SDR follow-up",
            companyOverview: "Kenko AI's inbound pipeline was growing rapidly through performance ads and lead magnets. While this signaled strong top-of-funnel traction, our SDR team was stretched thin — overwhelmed by volume, but not by quality.",
            challenges: [
              "SDRs were manually reviewing leads with no clear prioritization",
              "Many leads lacked buying intent or decision-making power",
              "High-intent leads were slipping through the cracks",
              "Follow-up was inconsistent, and the response time lagged"
            ],
            goal: "To create a dynamic lead scoring system that automatically ranks leads based on intent, fit, and engagement — while penalizing inactive or low-quality contacts. The end goal was to route qualified leads instantly to SDRs, improve SQL-to-demo conversion, save time by eliminating manual filtering, and incorporate real SDR feedback into the scoring.",
            solution: {
              steps: {
                formClassification: {
                  title: "QL Score 2.0 – A Multi-Factor Scoring Model",
                  points: [
                    "Designed a scoring system that reflects the real buying intent and sales-readiness of leads.",
                    "Scores update automatically in HubSpot based on forms, behavior, contact data, and SDR interaction.",
                    "Scores combine intent, fit, engagement, and apply risk/decay factors."
                  ]
                },
                adPlatform: {
                  title: "Intent & Fit Scoring",
                  points: [
                    "Intent scoring based on:",
                    "Form submissions (Demo request, Pricing quiz, Lead magnets)",
                    "High-intent page visits (/pricing, /demo, /features)",
                    "Fit scoring based on:",
                    "Contact data quality (email, phone)",
                    "Business information completeness",
                    "Industry and size matching"
                  ]
                },
                attribution: {
                  title: "Engagement & Decay Logic",
                  points: [
                    "Email engagement scoring:",
                    "Marketing email opens, clicks, replies",
                    "Sales email engagement tracking",
                    "SDR call outcomes scoring",
                    "Time-based decay to penalize inactivity",
                    "Auto-archive system for very old leads"
                  ]
                },
                conversion: {
                  title: "HubSpot Implementation",
                  points: [
                    "Created custom QL Score property in HubSpot",
                    "Designed workflows for real-time score updates",
                    "Set up SDR alerts via Slack and Email",
                    "Configured territory-based routing to AEs",
                    "Established thresholds for qualification stages"
                  ]
                },
                dealPipeline: {
                  title: "Performance Tracking",
                  points: [
                    "Used Google Sheets + Python to track:",
                    "Score vs. demo booking rate correlation",
                    "No-show rates analysis by score bands",
                    "Lead source performance by score distribution",
                    "Score accuracy validation through AE feedback",
                    "Score threshold adjustments based on performance data"
                  ]
                },
                dashboard: {
                  title: "CRM & Pipeline Optimization",
                  points: [
                    "Auto-routed highest scored leads to priority queue",
                    "Implemented time-sensitive follow-up SLAs",
                    "Created SDR performance dashboards by lead score",
                    "Established automatic archival workflows",
                    "Connected scoring to lifecycle stage transitions",
                    "Built feedback loop for continuous scoring improvement"
                  ]
                }
              }
            },
            results: {
              items: [
                { title: "Demo Conversion Rate", description: "Improved by 25% after scoring launch" },
                { title: "SDR Response Time", description: "Hot leads contacted in <15 mins" },
                { title: "Prioritized Outreach", description: "70% of meetings came from QL Score ≥ 60" },
                { title: "Sales Trust Improved", description: "SDRs focused on high-quality, validated leads" },
                { title: "CRM Hygiene", description: "180+ day inactive leads auto-archived weekly" }
              ]
            },
            tools: ["HubSpot CRM – Lead Score Property, Lists, Workflows", "Google Sheets + Python – Scoring performance & refinement", "Slack + Email Integrations – Real-time SDR notifications", "Lifecycle Stage Automation – Routing based on score thresholds", "Archival Workflow – Auto-remove cold/inactive leads from pipeline"],
            reflection: "This scoring system turned lead prioritization into a data-driven process, not a guess. It helped Sales focus on the highest-value opportunities while keeping the CRM clean, responsive, and efficient. Most importantly, it closed the loop between Marketing and Sales — with real SDR feedback shaping how we define a \"good lead.\"",
            categories: ["Sales Operations", "Lead Qualification", "HubSpot", "Automation"]
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
      }, 300); // Reduced loading time for better UX
    };
    
    fetchCaseStudy();
  }, [slug, navigate, toast]);

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

  // Helper function to convert solution steps to paragraphs
  const convertSolutionToParagraphs = (solution: Solution) => {
    const steps = Object.values(solution.steps);
    return steps.map(step => ({
      title: step.title,
      content: step.points.join(' ')
    }));
  };

  // Helper function to convert challenges array to paragraph
  const convertChallengestoParagraph = (challenges: string[]) => {
    return challenges.join(' ');
  };

  // Helper function to convert results to paragraph
  const convertResultsToParagraph = (results: { items: { title: string; description: string }[] }) => {
    return results.items.map(item => `${item.title}: ${item.description}`).join('. ');
  };

  // Helper function to convert tools to paragraph
  const convertToolsToParagraph = (tools: string[]) => {
    return tools.join(', ');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      
      <div className={`pt-16 relative z-10 ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <Button 
              variant="secondary" 
              className="mb-8 text-white border border-gray-600 bg-gray-800 hover:bg-gray-700" 
              onClick={() => navigate("/case-studies")}
            >
              ← Back to Case Studies
            </Button>

            {/* Header */}
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{caseStudy.title}</h1>
              <h2 className="text-xl md:text-2xl mb-8 text-gray-300">{caseStudy.subtitle}</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-white">Categories</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {caseStudy.categories?.map((category, idx) => (
                    <span key={idx} className="bg-gray-800 text-white px-3 py-1 text-sm rounded-full border border-gray-600">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Company Overview */}
            <Card className="border border-gray-600 bg-gray-900 mb-8 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Company Overview</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{caseStudy.companyOverview}</p>
              </CardContent>
            </Card>
            
            {/* Challenges */}
            <Card className="border border-gray-600 bg-gray-900 mb-8 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Challenges</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{convertChallengestoParagraph(caseStudy.challenges)}</p>
              </CardContent>
            </Card>
            
            {/* Goal */}
            <Card className="border border-gray-600 bg-gray-900 mb-8 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Goal</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{caseStudy.goal}</p>
              </CardContent>
            </Card>
            
            {/* Solution */}
            <Card className="border border-gray-600 bg-gray-900 mb-8 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Solution Overview</h2>
                <div className="space-y-6">
                  {convertSolutionToParagraphs(caseStudy.solution).map((step, idx) => (
                    <div key={idx}>
                      <h3 className="text-xl font-semibold mb-3 text-gray-200">{step.title}</h3>
                      <p className="text-gray-300 text-lg leading-relaxed">{step.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Results */}
            <Card className="border border-gray-600 bg-gray-900 mb-8 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Results & Impact</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{convertResultsToParagraph(caseStudy.results)}</p>
              </CardContent>
            </Card>
            
            {/* Tools & Stack */}
            <Card className="border border-gray-600 bg-gray-900 mb-8 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Tools & Stack</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{convertToolsToParagraph(caseStudy.tools)}</p>
              </CardContent>
            </Card>
            
            {/* Final Reflection */}
            <Card className="border border-gray-600 bg-gray-900 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Final Reflection</h2>
                <blockquote className="italic text-gray-300 text-lg border-l-4 border-gray-600 pl-4 leading-relaxed">
                  {caseStudy.reflection}
                </blockquote>
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
