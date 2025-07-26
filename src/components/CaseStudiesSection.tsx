
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
          />
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
