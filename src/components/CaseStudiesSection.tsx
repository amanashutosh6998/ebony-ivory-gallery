
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  tools: string[];
  impact: string;
  image: string;
  order?: number;
  active?: boolean;
  categories?: string[];
}

const CaseStudiesSection = () => {
  const [activeStudy, setActiveStudy] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  
  const caseStudies: CaseStudy[] = [
    {
      title: "Reporting MQL → SQL → Won Conversion by Campaign",
      problem: "At Kenko AI, a fast-growing B2B SaaS company, leadership lacked visibility into how marketing spend translated into revenue. The founders wanted a clear view of how leads from Facebook Ads, Google Ads, and inbound channels moved through the funnel—from MQL to SQL to Closed Won. Data was scattered across HubSpot, Google Sheets, Facebook Ads, and Google Ads. UTM parameters were inconsistently captured, breaking attribution. No unified view to answer: 'Which campaigns are driving actual customers?' Marketing reported on MQLs, but sales needed visibility into downstream conversion. Lead qualification lacked structure—wasting SDR bandwidth on unqualified leads.",
      solution: "🔗 Unified Source of Truth: Synced data from HubSpot CRM using the HubSpot API into structured Google Sheets reports. Used Contact–Company–Deal associations to maintain lifecycle integrity. 📊 Funnel Stage Tracking: Standardized lifecycle stages within HubSpot: MQL (Based on form fills and key website actions), SQL (Accepted by Sales team - manual + automated based on score), Closed Won (Deal booked with actual revenue). 🧮 Lead Scoring Engine: Built a custom lead scoring model using HubSpot's native lead score field. Behavior-based: Website visits, demo requests, email interactions. Demographic: Job title, company size, region. Triggered workflows to alert SDRs only when leads crossed a predefined score threshold. 🎯 Attribution Mapping: Captured UTM parameters using hidden fields in HubSpot forms. Used the Facebook Ads API and Google Ads API to fetch campaign, ad set, and spend data. Mapped ad-level data to contact records in Sheets using UTM source + email join keys. 📥 Reporting Workflow: Automated daily exports using HubSpot API to Google Sheets (via Python and Apps Script).",
      tools: ["HubSpot CRM", "HubSpot API", "Facebook Ads API", "Google Ads API", "Google Sheets", "Apps Script", "Python"],
      impact: "📊 Built a self-refreshing dashboard for founders showing campaign ROI. ⏱️ Saved ~6–8 hours/week of manual marketing-to-sales handoff reporting. 📉 Identified 3 high-spend ad campaigns with <5% SQL conversion—budget reallocated. 📈 Improved SQL-to-Won conversion by 25% after scoring and attribution fixes. 📌 Gave founders visibility from first click to revenue, enabling better budgeting.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
      order: 1,
      active: true,
      categories: ["Marketing", "Data Analytics", "HubSpot"]
    }
  ];

  const toggleStudy = (index: number) => {
    setActiveStudy(activeStudy === index ? null : index);
  };

  if (loading) {
    return (
      <div className="py-24 bg-black">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-gray-400">Loading case studies...</p>
        </div>
      </div>
    );
  }

  return (
    <section id="case-studies" className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Case Studies</h2>
          <p className="text-lg text-gray-400">
            Real-world problems solved with a data-driven approach to growth and optimization.
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <Card key={index} className="overflow-hidden border border-gray-800 bg-gray-900/20">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-5">
                  {study.image && (
                    <div className="md:col-span-2 h-64 md:h-auto relative">
                      <AspectRatio ratio={16/9} className="h-full">
                        <img 
                          src={study.image} 
                          alt={study.title} 
                          className="w-full h-full object-cover object-center"
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:bg-gradient-to-t"></div>
                      <h3 className="absolute bottom-4 left-4 text-2xl font-bold md:hidden text-white">{study.title}</h3>
                    </div>
                  )}
                  <div className={`p-6 md:col-span-${study.image ? '3' : '5'}`}>
                    <h3 className="text-2xl font-bold mb-4 hidden md:block text-white">{study.title}</h3>
                    
                    {activeStudy === index ? (
                      <div className="animate-fade-in">
                        <div className="mb-4">
                          <h4 className="text-lg font-medium mb-2">Problem</h4>
                          <p className="text-gray-400">{study.problem}</p>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-lg font-medium mb-2">Solution</h4>
                          <p className="text-gray-400">{study.solution}</p>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-lg font-medium mb-2">Tools Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {study.tools.map((tool, i) => (
                              <span key={i} className="bg-gray-800 text-gray-300 px-3 py-1 text-sm rounded-full">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-lg font-medium mb-2">Business Impact</h4>
                          <p className="text-gray-400">{study.impact}</p>
                        </div>
                        
                        <Button 
                          onClick={() => toggleStudy(index)}
                          variant="default"
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Close
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-400 mb-6 line-clamp-2">{study.problem}</p>
                        <Button 
                          onClick={() => toggleStudy(index)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Read Case Study
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
