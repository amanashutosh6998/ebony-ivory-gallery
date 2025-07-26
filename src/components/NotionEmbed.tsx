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
        <div class="notion-content bg-white text-gray-900 p-8" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif;">
          <!-- Notion-style header -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <span class="text-2xl">🎯</span>
              <h1 class="text-3xl font-bold text-gray-900">Lead Scoring Engine to Prioritize SDR Outreach</h1>
            </div>
            <p class="text-lg text-gray-600 mb-4">Automating lead qualification for faster, more focused follow-ups</p>
            <div class="flex gap-2 mb-6">
              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Sales Operations</span>
              <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Lead Qualification</span>
              <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">HubSpot</span>
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Automation</span>
            </div>
          </div>

          <!-- Company Context -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xl">🏢</span>
              <h3 class="text-xl font-semibold text-gray-900">Company Context</h3>
            </div>
            <div class="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p class="text-gray-700 leading-relaxed">At Kenko AI, our inbound pipeline was rapidly expanding thanks to performance ads and lead magnets — a strong sign of top-of-funnel momentum. But with growing volume came a challenge:</p>
              <p class="text-gray-900 font-medium mt-2">Our SDR team was overwhelmed by quantity, not quality.</p>
            </div>
          </div>

          <!-- Challenges -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xl">🚧</span>
              <h3 class="text-xl font-semibold text-gray-900">Challenges</h3>
            </div>
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start gap-2">
                  <span class="text-red-500 mt-1">•</span>
                  <span>SDRs manually reviewed every lead — with no prioritization framework</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500 mt-1">•</span>
                  <span>Many leads had low intent or lacked decision-making authority</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500 mt-1">•</span>
                  <span>High-intent leads were missed or delayed in follow-up</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-red-500 mt-1">•</span>
                  <span>SDR response times were inconsistent, affecting conversions</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Solution -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xl">🧠</span>
              <h3 class="text-xl font-semibold text-gray-900">Solution: QL Score 2.0</h3>
            </div>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p class="text-gray-700 mb-4">A dynamic, multi-factor scoring model designed to reflect sales readiness. Scores update automatically in HubSpot based on:</p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <div class="text-2xl mb-2">📝</div>
                  <p class="text-sm font-medium text-gray-900">Forms submitted</p>
                </div>
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <div class="text-2xl mb-2">🌐</div>
                  <p class="text-sm font-medium text-gray-900">Website behavior</p>
                </div>
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <div class="text-2xl mb-2">🏢</div>
                  <p class="text-sm font-medium text-gray-900">Contact/business data</p>
                </div>
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <div class="text-2xl mb-2">🤝</div>
                  <p class="text-sm font-medium text-gray-900">Sales interactions</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Implementation -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xl">⚙️</span>
              <h3 class="text-xl font-semibold text-gray-900">HubSpot Implementation</h3>
            </div>
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-semibold text-gray-900 mb-2">Setup & Configuration</h4>
                  <ul class="space-y-1 text-gray-700 text-sm">
                    <li>• Created custom QL Score property</li>
                    <li>• Automated real-time scoring workflows</li>
                    <li>• Set up SDR alerts via Slack & Email</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-2">Optimization</h4>
                  <ul class="space-y-1 text-gray-700 text-sm">
                    <li>• Implemented territory-based AE routing</li>
                    <li>• Defined score thresholds for lifecycle stages</li>
                    <li>• Built feedback loop with SDRs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Results -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xl">📈</span>
              <h3 class="text-xl font-semibold text-gray-900">Results & Impact</h3>
            </div>
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center">
                  <div class="text-3xl font-bold text-green-600 mb-1">+25%</div>
                  <p class="text-sm text-gray-700 font-medium">Demo Conversion Rate</p>
                  <p class="text-xs text-gray-600">Post-scoring rollout</p>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-blue-600 mb-1">&lt;15min</div>
                  <p class="text-sm text-gray-700 font-medium">Response Time</p>
                  <p class="text-xs text-gray-600">For hot leads</p>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-purple-600 mb-1">70%</div>
                  <p class="text-sm text-gray-700 font-medium">Quality Meetings</p>
                  <p class="text-xs text-gray-600">From QL Score ≥ 60</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tools -->
          <div class="mb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xl">🛠️</span>
              <h3 class="text-xl font-semibold text-gray-900">Tools & Stack</h3>
            </div>
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div class="flex flex-wrap gap-2">
                <span class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">HubSpot CRM</span>
                <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">Workflows</span>
                <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Custom Lead Score</span>
                <span class="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">Google Sheets</span>
                <span class="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">Python</span>
                <span class="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">Slack</span>
              </div>
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
          
          {/* Content - Notion-styled display */}
          <div className="bg-white shadow-lg overflow-hidden" style={{ minHeight: '600px' }}>
            {renderNotionContent()}
            
            {/* Bottom CTA */}
            <div className="p-6 bg-gray-50 border-t border-gray-200 text-center">
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