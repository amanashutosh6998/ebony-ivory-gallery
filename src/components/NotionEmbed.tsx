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
  // Convert Notion URL to embeddable format
  const getEmbedUrl = (url: string) => {
    // Remove query parameters and convert to embed format
    const cleanUrl = url.split('?')[0];
    return cleanUrl.replace('notion.so/', 'notion.site/');
  };

  return (
    <div className="space-y-4">
      {/* Notion Embed */}
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
          
          {/* Notion iframe embed */}
          <div className="relative w-full" style={{ height: '600px' }}>
            <iframe
              src={getEmbedUrl(notionUrl)}
              className="w-full h-full border-0"
              title={title}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
        </CardContent>
      </Card>

      {/* Fallback content for better SEO and accessibility */}
      {fallbackContent && (
        <Card className="border border-gray-700 bg-gray-900">
          <CardContent className="p-6">
            <div className="text-sm text-gray-400 mb-4">
              💡 Can't see the embedded content? Here's a summary:
            </div>
            {fallbackContent}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotionEmbed;