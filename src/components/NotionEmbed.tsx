import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface NotionEmbedProps {
  notionUrl: string;
  title: string;
  fallbackContent?: React.ReactNode;
}

const NotionEmbed = ({ notionUrl, title, fallbackContent }: NotionEmbedProps) => {
  // Check if it's a published Notion page (notion.site domain)
  const isPublishedNotion = notionUrl.includes('notion.site');
  
  const getEmbedUrl = (url: string) => {
    if (isPublishedNotion) {
      return url; // Use the published URL directly
    }
    // For private pages, extract the page ID
    const pageId = url.split('/').pop()?.split('?')[0];
    return `https://www.notion.so/${pageId}`;
  };

  // Always show the enhanced card view instead of iframe due to Notion's embedding restrictions
  return (
    <div className="space-y-4">
      {/* Enhanced Notion Content Card */}
      <Card className="overflow-hidden border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold">N</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{title}</h4>
                <p className="text-blue-100">Detailed case study with insights and implementation</p>
              </div>
            </div>
          </div>
          
          {/* Content Preview */}
          <div className="p-6">
            {fallbackContent && (
              <div className="mb-6">
                {fallbackContent}
              </div>
            )}
            
            {/* Call to Action */}
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 text-center">
              <div className="mb-4">
                <span className="text-2xl mb-2 block">📖</span>
                <h5 className="text-lg font-semibold text-white mb-2">Read the Complete Case Study</h5>
                <p className="text-gray-300 text-sm mb-4">
                  Get the full details, implementation steps, challenges faced, and measurable outcomes.
                </p>
              </div>
              
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
                  Open Full Case Study
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
              
              <p className="text-xs text-gray-500 mt-3">
                Opens in new tab • No signup required
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

};

export default NotionEmbed;