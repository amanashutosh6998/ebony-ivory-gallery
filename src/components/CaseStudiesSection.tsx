
import React from 'react';
import NotionEmbed from './NotionEmbed';


const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-white">Case Studies</h2>
          <p className="text-lg text-gray-400">
            Real-world problems solved with a data-driven approach to growth and optimization.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <NotionEmbed 
            notionUrl="https://positive-cadet-b70.notion.site/Case-Study-Lead-Scoring-23c23925821080d09977f7cd932a358c"
            title="Lead Scoring Engine to Prioritize SDR Outreach"
            fallbackContent={
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Problem:</h4>
                  <p className="text-gray-300">Kenko AI's inbound pipeline was growing rapidly through performance ads and lead magnets. While this signaled strong top-of-funnel traction, the SDR team was overwhelmed by volume, but not by quality. SDRs were manually reviewing leads with no clear prioritization, many leads lacked buying intent or decision-making power, high-intent leads were slipping through the cracks, and follow-up was inconsistent with lagging response times.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Solution:</h4>
                  <p className="text-gray-300">Created QL Score 2.0 – A Multi-Factor Scoring Model that automatically ranks leads based on intent, fit, and engagement while penalizing inactive or low-quality contacts. The system reflects real buying intent and sales-readiness, with scores updating automatically in HubSpot based on forms, behavior, contact data, and SDR interaction.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Tools Used:</h4>
                  <p className="text-gray-300">HubSpot CRM, Workflows, Custom Lead Score, Google Sheets, Python, Slack</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Impact:</h4>
                  <p className="text-gray-300">Demo Conversion Rate improved by 25% after scoring launch. Hot leads contacted in under 15 mins. 70% of meetings came from leads with QL Score ≥ 60. Sales trust improved with SDRs focusing on high-quality, validated leads. Enhanced CRM hygiene with 180+ day inactive leads auto-archived weekly.</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
