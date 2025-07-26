import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface NotionEmbedProps {
  notionUrl: string;
  title: string;
  fallbackContent?: React.ReactNode;
}

const NotionEmbed = ({ notionUrl, title, fallbackContent }: NotionEmbedProps) => {
  const [notionContent, setNotionContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Render the fetched Notion content
  const renderNotionContent = () => {
    if (!notionContent && !loading) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">Unable to load content directly</p>
          <Button 
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <a 
              href={notionUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Open in Notion
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading case study...</p>
        </div>
      );
    }

    return (
      <div className="max-w-none">
        <div 
          className="notion-content"
          dangerouslySetInnerHTML={{ 
            __html: notionContent || ''
          }} 
        />
      </div>
    );
  };

  // Load Notion-styled content
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotionContent(`
        <div class="notion-content bg-gray-900 text-white p-8" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif;">
          <!-- Notion-style header -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <h1 class="text-3xl font-bold text-white">Lead Scoring Engine to Prioritize SDR Outreach</h1>
            </div>
            <p class="text-lg text-gray-300 mb-4">Automating lead qualification for faster, more focused follow-ups</p>
            <div class="flex gap-2 mb-6">
              <span class="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">Sales Operations</span>
              <span class="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">Lead Qualification</span>
              <span class="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">HubSpot</span>
              <span class="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">Automation</span>
            </div>
          </div>

          <!-- Company Context -->
          <div class="mb-6">
            <div class="mb-3">
              <h3 class="text-xl font-semibold text-white">Company Context</h3>
            </div>
            <p class="text-gray-300 leading-relaxed mb-2">At Kenko AI, our inbound pipeline was rapidly expanding thanks to performance ads and lead magnets — a strong sign of top-of-funnel momentum. But with growing volume came a challenge:</p>
            <p class="text-white font-medium">Our SDR team was overwhelmed by quantity, not quality.</p>
          </div>

          <!-- Challenges -->
          <div class="mb-6">
            <div class="mb-3">
              <h3 class="text-xl font-semibold text-white">Challenges</h3>
            </div>
            <ul class="space-y-2 text-gray-300 pl-4">
              <li>• SDRs manually reviewed every lead — with no prioritization framework</li>
              <li>• Many leads had low intent or lacked decision-making authority</li>
              <li>• High-intent leads were missed or delayed in follow-up</li>
              <li>• SDR response times were inconsistent, affecting conversions</li>
            </ul>
          </div>

          <!-- Objective -->
          <div class="mb-6">
            <div class="mb-3">
              <h3 class="text-xl font-semibold text-white">Objective</h3>
            </div>
            <p class="text-gray-300 mb-3">Build an automated lead scoring engine that:</p>
            <ul class="space-y-1 text-gray-300 pl-4">
              <li>• Prioritizes leads by intent, fit, and engagement</li>
              <li>• Penalizes low-quality or inactive leads</li>
              <li>• Routes high-scoring leads instantly to SDRs</li>
              <li>• Incorporates real SDR feedback to improve accuracy</li>
              <li>• Improves SQL-to-demo conversion and eliminates manual filtering</li>
            </ul>
          </div>

          <!-- Solution -->
          <div class="mb-6">
            <div class="mb-3">
              <h3 class="text-xl font-semibold text-white">Solution: QL Score 2.0</h3>
            </div>
            <p class="text-gray-300 mb-4">A dynamic, multi-factor scoring model designed to reflect sales readiness. Scores update automatically in HubSpot based on:</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div class="text-center p-3 bg-gray-800 rounded">
                <p class="text-sm text-gray-300">Forms submitted</p>
              </div>
              <div class="text-center p-3 bg-gray-800 rounded">
                <p class="text-sm text-gray-300">Website behavior</p>
              </div>
              <div class="text-center p-3 bg-gray-800 rounded">
                <p class="text-sm text-gray-300">Contact/business data</p>
              </div>
              <div class="text-center p-3 bg-gray-800 rounded">
                <p class="text-sm text-gray-300">Sales interactions</p>
              </div>
            </div>
          </div>

          <!-- Intent & Fit Scoring -->
          <div class="mb-6">
            <div class="mb-3">
              <h4 class="text-lg font-semibold text-white">Intent & Fit Scoring</h4>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="font-medium text-white mb-2">Intent:</p>
                <ul class="space-y-1 text-gray-300 text-sm pl-4">
                  <li>• Form submissions (Demo, Pricing Quiz, Lead Magnets)</li>
                  <li>• Visits to high-intent pages (/pricing, /demo, /features)</li>
                </ul>
              </div>
              <div>
                <p class="font-medium text-white mb-2">Fit:</p>
                <ul class="space-y-1 text-gray-300 text-sm pl-4">
                  <li>• Valid contact details (email, phone)</li>
                  <li>• Company industry, size match</li>
                  <li>• Business information completeness</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Implementation -->
          <div class="mb-6">
            <div class="mb-3">
              <h3 class="text-xl font-semibold text-white">HubSpot Implementation</h3>
            </div>
            <ul class="space-y-1 text-gray-300 pl-4">
              <li>• Created custom QL Score property</li>
              <li>• Automated real-time scoring workflows</li>
              <li>• Set up SDR alerts via Slack & Email</li>
              <li>• Implemented territory-based AE routing</li>
              <li>• Defined score thresholds for lifecycle stage transitions</li>
            </ul>
          </div>

          <!-- Performance Tracking -->
          <div class="mb-6">
            <div class="mb-3">
              <h3 class="text-xl font-semibold text-white">Performance Tracking</h3>
            </div>
            <p class="text-gray-300 mb-3">Using Google Sheets + Python, we tracked:</p>
            <ul class="space-y-1 text-gray-300 pl-4">
              <li>• QL Score vs. Demo booking rate</li>
              <li>• No-show rates by score bands</li>
              <li>• Lead source performance by score</li>
              <li>• Score calibration based on AE feedback</li>
              <li>• Regular updates to score thresholds</li>
            </ul>
          </div>

          <!-- Results -->
          <div class="mb-6">
            <div class="mb-3">
              <h3 class="text-xl font-semibold text-white">Results & Impact</h3>
            </div>
            <ul class="space-y-1 text-gray-300 pl-4">
              <li>• <strong class="text-white">+25%</strong> demo conversion post-scoring rollout</li>
              <li>• <strong class="text-white">&lt;15 mins</strong> SDR response time for hot leads</li>
              <li>• <strong class="text-white">70%</strong> of meetings came from leads with QL Score ≥ 60</li>
              <li>• <strong class="text-white">180+</strong> day inactive leads auto-archived weekly</li>
              <li>• Higher SDR confidence in CRM → focus on real opportunities</li>
            </ul>
          </div>

          <!-- Tools -->
          <div class="mb-6">
            <div class="mb-3">
              <h3 class="text-xl font-semibold text-white">Tools & Stack</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">HubSpot CRM</span>
              <span class="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">Workflows</span>
              <span class="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">Custom Lead Score</span>
              <span class="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">Google Sheets</span>
              <span class="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">Python</span>
              <span class="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">Slack</span>
            </div>
          </div>

          <!-- Final Reflection -->
          <div class="mb-6">
            <div class="mb-3">
              <h3 class="text-xl font-semibold text-white">Final Reflection</h3>
            </div>
            <p class="text-gray-300 leading-relaxed">This project transformed lead qualification into a data-driven engine, not a guessing game.</p>
            <p class="text-gray-300 leading-relaxed mt-2">It empowered Sales to focus on the highest-value conversations, improved pipeline health, and created a real feedback loop between Marketing and SDRs — redefining what a "qualified lead" truly means.</p>
          </div>
        </div>
      `);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">N</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{title}</h4>
                  <p className="text-blue-100">Complete case study with implementation details</p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                asChild
                className="bg-white/20 text-white hover:bg-white/30 border-white/30"
              >
                <a 
                  href={notionUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Open in Notion
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Content - Notion-styled dark display */}
          <div className="bg-gray-900 shadow-lg overflow-hidden" style={{ minHeight: '600px' }}>
            {renderNotionContent()}
            
            {/* Bottom CTA */}
            <div className="p-6 bg-gray-800 border-t border-gray-700 text-center">
              <Button 
                size="lg"
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3"
              >
                <a 
                  href={notionUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 no-underline"
                >
                  View Full Detailed Case Study
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
              
              <p className="text-xs text-gray-500 mt-3">
                Opens in new tab • Includes detailed methodology, screenshots, and implementation steps
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotionEmbed;