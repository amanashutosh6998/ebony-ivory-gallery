import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface NotionEmbedProps {
  notionUrl: string;
  title: string;
  fallbackContent?: React.ReactNode;
}

const NotionEmbed = ({ notionUrl, title, fallbackContent }: NotionEmbedProps) => {
  const [notionContent, setNotionContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

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
      <div className="prose prose-invert max-w-none">
        <div 
          className="notion-content text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: notionContent?.replace(/\n/g, '<br/>') || ''
          }} 
        />
      </div>
    );
  };

  // Simulate loading for now (you would fetch real content here)
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotionContent(`
        <div class="space-y-6">
          <div class="border-l-4 border-blue-500 pl-6">
            <h3 class="text-xl font-semibold text-white mb-3">🎯 Lead Scoring Engine to Prioritize SDR Outreach</h3>
            <p class="text-gray-300">Automating lead qualification for faster, more focused follow-ups</p>
            <div class="mt-2">
              <span class="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm mr-2">Sales Operations</span>
              <span class="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-sm mr-2">Lead Qualification</span>
              <span class="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm">HubSpot</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-800 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-white mb-3">🏢 Company Context</h4>
              <p class="text-gray-300">At Kenko AI, our inbound pipeline was rapidly expanding thanks to performance ads and lead magnets — a strong sign of top-of-funnel momentum. But with growing volume came a challenge: Our SDR team was overwhelmed by quantity, not quality.</p>
            </div>

            <div class="bg-gray-800 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-white mb-3">🚧 Challenges</h4>
              <ul class="text-gray-300 space-y-2">
                <li>• SDRs manually reviewed every lead — with no prioritization framework</li>
                <li>• Many leads had low intent or lacked decision-making authority</li>
                <li>• High-intent leads were missed or delayed in follow-up</li>
                <li>• SDR response times were inconsistent</li>
              </ul>
            </div>
          </div>

          <div class="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6">
            <h4 class="text-lg font-semibold text-white mb-3">🧠 Solution: QL Score 2.0</h4>
            <p class="text-gray-300 mb-4">A dynamic, multi-factor scoring model designed to reflect sales readiness. Scores update automatically in HubSpot based on:</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center">
                <div class="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">📝</div>
                <p class="text-sm text-gray-300">Forms submitted</p>
              </div>
              <div class="text-center">
                <div class="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">🌐</div>
                <p class="text-sm text-gray-300">Website behavior</p>
              </div>
              <div class="text-center">
                <div class="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">🏢</div>
                <p class="text-sm text-gray-300">Contact/business data</p>
              </div>
              <div class="text-center">
                <div class="bg-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">🤝</div>
                <p class="text-sm text-gray-300">Sales interactions</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg p-6">
            <h4 class="text-lg font-semibold text-white mb-3">📊 Results & Impact</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-green-400">25%</div>
                <p class="text-sm text-gray-300">Demo Conversion Rate Improvement</p>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-400">&lt;15min</div>
                <p class="text-sm text-gray-300">Hot Lead Response Time</p>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-400">70%</div>
                <p class="text-sm text-gray-300">Meetings from QL Score ≥ 60</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg p-6">
            <h4 class="text-lg font-semibold text-white mb-3">🛠️ Tools & Technologies</h4>
            <div class="flex flex-wrap gap-2">
              <span class="bg-orange-600 text-white px-3 py-1 rounded-full text-sm">HubSpot CRM</span>
              <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Workflows</span>
              <span class="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Custom Lead Score</span>
              <span class="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">Google Sheets</span>
              <span class="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">Python</span>
              <span class="bg-pink-600 text-white px-3 py-1 rounded-full text-sm">Slack</span>
            </div>
          </div>
        </div>
      `);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      {/* Enhanced Notion Content Card */}
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
                variant="outline" 
                size="sm"
                asChild
                className="border-white/20 text-white hover:bg-white/10"
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
          
          {/* Content */}
          <div className="p-6">
            {renderNotionContent()}
            
            <div className="mt-6 pt-6 border-t border-gray-700 text-center">
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