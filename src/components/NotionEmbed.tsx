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

  if (isPublishedNotion) {
    // Render embedded iframe for published pages
    return (
      <div className="space-y-4">
        <Card className="overflow-hidden border border-gray-700 bg-gray-900">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h4 className="text-lg font-semibold text-white">📄 {title}</h4>
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
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
            
            <div className="relative w-full" style={{ height: '600px' }}>
              <iframe
                src={getEmbedUrl(notionUrl)}
                className="w-full h-full border-0"
                title={title}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Fallback content */}
        {fallbackContent && (
          <Card className="border border-gray-700 bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-blue-400 mb-4">
                <span>📋</span>
                <span className="text-lg font-semibold">Case Study Summary</span>
              </div>
              {fallbackContent}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Fallback for private Notion pages
  return (
    <div className="space-y-4">
      {/* Notion Link Card */}
      <Card className="overflow-hidden border border-gray-700 bg-gray-900">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-black font-bold text-sm">N</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{title}</h4>
                <p className="text-sm text-gray-400">Full case study details</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <span>⚠️</span>
              <span className="text-sm font-medium">Notion Integration Info</span>
            </div>
            <p className="text-sm text-gray-300 mb-3">
              To embed this Notion page directly, it needs to be published to the web. For now, click the button below to view the full case study in Notion.
            </p>
            <Button 
              variant="default" 
              asChild
              className="bg-white text-black hover:bg-gray-200 w-full"
            >
              <a 
                href={getEmbedUrl(notionUrl)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                📖 Open Full Case Study in Notion
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
          
          <div className="text-xs text-gray-500">
            💡 To enable direct embedding: In Notion, click Share → Publish to web → Copy link
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Fallback content */}
      {fallbackContent && (
        <Card className="border border-gray-700 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-blue-400 mb-4">
              <span>📋</span>
              <span className="text-lg font-semibold">Case Study Summary</span>
            </div>
            {fallbackContent}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotionEmbed;