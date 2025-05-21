
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from 'react-router-dom';

interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  tools: string[];
  impact: string;
  image: string;
  slug: string;
  order?: number;
  active?: boolean;
  categories?: string[];
}

const CaseStudiesSection = () => {
  const [loading, setLoading] = useState(false);
  
  const caseStudies: CaseStudy[] = [
    {
      title: "Campaign-Level Revenue Attribution Dashboard",
      problem: "Kenko AI, a fast-growing B2B SaaS company helping fitness studios automate operations, needed deeper insight into how performance marketing and inbound efforts converted into a real sales pipeline, not just leads. Despite running highly targeted campaigns and collecting leads, the reporting infrastructure couldn't answer a fundamental question: \"Which campaigns are creating meetings, deals, and revenue?\" Data was fragmented across Facebook Ads, Google Ads, HubSpot, and Google Sheets with inconsistent UTM capturing leading to broken attribution chains.",
      solution: "We built a live, self-refreshing dashboard that connects ads → form fills → demo bookings → SQLs → deals → pipeline, across both paid and organic channels. This included end-to-end funnel mapping, form classification in HubSpot, data extraction from ad platforms, enhanced attribution logic, conversion audits, deal and pipeline integration, and automated Google Sheets dashboards showing weekly metrics, month-over-month trends, paid vs organic splits, and funnel drop-offs by stage.",
      tools: ["HubSpot CRM", "Facebook Ads API", "Google Ads API", "Google Sheets", "Apps Script", "Python", "UTM Tracking"],
      impact: "📉 Flagged 3 high-spend campaigns with <5% SQL rate → reallocated budget. ⏱️ Saved ~6–8 hours/week through automation. 🔍 Discovered 30% overreporting in Google Ads conversions. 💬 Gave Sales visibility into which campaigns created most pipeline. 📌 Enabled prioritizing campaigns based on SQL and Deal creation, not just CPL. 📊 Identified campaigns with high no-show rates → improved SDR follow-up. 📈 Created full visibility from Click → Deal Opened → Pipeline Created.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
      slug: "campaign-level-revenue-attribution-dashboard",
      order: 1,
      active: true,
      categories: ["Marketing", "Data Analytics", "HubSpot", "Revenue Attribution"]
    },
    {
      title: "Lead Scoring Engine to Prioritize SDR Outreach",
      problem: "Kenko AI's inbound pipeline was growing rapidly through performance ads and lead magnets. While this signaled strong top-of-funnel traction, the SDR team was overwhelmed by volume, but not by quality. SDRs were manually reviewing leads with no clear prioritization, many leads lacked buying intent or decision-making power, high-intent leads were slipping through the cracks, and follow-up was inconsistent with lagging response times.",
      solution: "Created QL Score 2.0 – A Multi-Factor Scoring Model that automatically ranks leads based on intent, fit, and engagement while penalizing inactive or low-quality contacts. The system reflects real buying intent and sales-readiness, with scores updating automatically in HubSpot based on forms, behavior, contact data, and SDR interaction. This includes custom scoring for intent signals, fit signals, engagement signals, and risk/decay factors.",
      tools: ["HubSpot CRM", "Workflows", "Custom Lead Score", "Google Sheets", "Python", "Slack"],
      impact: "🔥 Demo Conversion Rate improved by 25% after scoring launch. ⚡ Hot leads contacted in <15 mins. 🎯 70% of meetings came from leads with QL Score ≥ 60. 🧠 Sales trust improved with SDRs focusing on high-quality, validated leads. 🗂️ Enhanced CRM hygiene with 180+ day inactive leads auto-archived weekly.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop",
      slug: "lead-scoring-engine",
      order: 2,
      active: true,
      categories: ["Sales Operations", "Lead Qualification", "HubSpot", "Automation"]
    }
  ];

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
                    <p className="text-gray-400 mb-6 line-clamp-3">{study.problem}</p>
                    <Link to={`/case-study/${study.slug}`}>
                      <Button 
                        className="bg-black text-white hover:bg-gray-800"
                      >
                        Read Case Study
                      </Button>
                    </Link>
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
