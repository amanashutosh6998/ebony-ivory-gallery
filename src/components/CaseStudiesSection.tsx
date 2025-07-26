
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import NotionEmbed from './NotionEmbed';

interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  tools: string[];
  impact: string;
  slug: string;
  order?: number;
  active?: boolean;
  categories?: string[];
  notionUrl?: string;
}

const CaseStudiesSection = () => {
  const [loading, setLoading] = useState(false);
  
  const caseStudies: CaseStudy[] = [
    {
      title: "Campaign-Level Revenue Attribution Dashboard",
      problem: "Kenko AI, a fast-growing B2B SaaS company helping fitness studios automate operations, needed deeper insight into how performance marketing and inbound efforts converted into a real sales pipeline, not just leads. Despite running highly targeted campaigns and collecting leads, the reporting infrastructure couldn't answer a fundamental question: \"Which campaigns are creating meetings, deals, and revenue?\" Data was fragmented across Facebook Ads, Google Ads, HubSpot, and Google Sheets with inconsistent UTM capturing leading to broken attribution chains.",
      solution: "We built a live, self-refreshing dashboard that connects ads → form fills → demo bookings → SQLs → deals → pipeline, across both paid and organic channels. This included end-to-end funnel mapping, form classification in HubSpot, data extraction from ad platforms, enhanced attribution logic, conversion audits, deal and pipeline integration, and automated Google Sheets dashboards showing weekly metrics, month-over-month trends, paid vs organic splits, and funnel drop-offs by stage.",
      tools: ["HubSpot CRM", "Facebook Ads API", "Google Ads API", "Google Sheets", "Apps Script", "Python", "UTM Tracking"],
      impact: "Flagged 3 high-spend campaigns with <5% SQL rate → reallocated budget. Saved ~6–8 hours/week through automation. Discovered 30% overreporting in Google Ads conversions. Gave Sales visibility into which campaigns created most pipeline. Enabled prioritizing campaigns based on SQL and Deal creation, not just CPL. Identified campaigns with high no-show rates → improved SDR follow-up. Created full visibility from Click → Deal Opened → Pipeline Created.",
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
      impact: "Demo Conversion Rate improved by 25% after scoring launch. Hot leads contacted in <15 mins. 70% of meetings came from leads with QL Score ≥ 60. Sales trust improved with SDRs focusing on high-quality, validated leads. Enhanced CRM hygiene with 180+ day inactive leads auto-archived weekly.",
      slug: "lead-scoring-engine",
      order: 2,
      active: true,
      categories: ["Sales Operations", "Lead Qualification", "HubSpot", "Automation"],
      notionUrl: "https://www.notion.so/Case-Study-Lead-Scoring-23c23925821080d09977f7cd932a358c"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-white">Case Studies</h2>
          <p className="text-lg text-gray-400">
            Real-world problems solved with a data-driven approach to growth and optimization.
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div key={index} className="space-y-6">
              <Card className="overflow-hidden border border-gray-700 bg-gray-900 shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-white">{study.title}</h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">{study.problem}</p>
                  <Link to={`/case-study/${study.slug}`}>
                    <Button 
                      className="bg-white text-black hover:bg-gray-200 border border-white"
                    >
                      Read Case Study
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Notion Embed for studies that have Notion URLs */}
              {study.notionUrl && (
                <NotionEmbed 
                  notionUrl={study.notionUrl}
                  title={`${study.title} - Detailed Case Study`}
                  fallbackContent={
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Solution:</h4>
                        <p className="text-gray-300">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Tools Used:</h4>
                        <p className="text-gray-300">{study.tools.join(', ')}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Impact:</h4>
                        <p className="text-gray-300">{study.impact}</p>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
