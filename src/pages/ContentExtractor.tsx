
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ColorParticles from "@/components/ColorParticles";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Download, Copy, Globe } from "lucide-react";

const ContentExtractor = () => {
  const [url, setUrl] = useState('');
  const [extractedContent, setExtractedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const extractContent = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Use a CORS proxy service to fetch the content
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (data.contents) {
        // Create a temporary DOM element to parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        
        // Remove script and style elements
        const scripts = doc.querySelectorAll('script, style, nav, header, footer');
        scripts.forEach(el => el.remove());
        
        // Extract text content
        const textContent = doc.body?.textContent || doc.textContent || '';
        
        // Clean up the text
        const cleanedContent = textContent
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .replace(/\n\s*\n/g, '\n\n') // Clean up multiple newlines
          .trim();
        
        setExtractedContent(cleanedContent);
        toast({
          title: "Success",
          description: "Content extracted successfully!",
        });
      } else {
        throw new Error('Failed to fetch content');
      }
    } catch (error) {
      console.error('Error extracting content:', error);
      toast({
        title: "Error",
        description: "Failed to extract content. The website might be blocking requests.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedContent);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  const downloadAsText = () => {
    const blob = new Blob([extractedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-content.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "Content saved as text file",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      <ColorParticles colorScheme="blue-cyan" density="low" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[150px] transform -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-[150px] transform translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <Navbar />
      
      <div className="pt-16 relative z-10">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Content Extractor
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Extract clean text content from any website for your chatbot or content management
              </motion.p>
            </div>

            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gray-900/50 border-gray-800 mb-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Website URL
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button 
                      onClick={extractContent}
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? 'Extracting...' : 'Extract'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {extractedContent && (
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      Extracted Content
                      <div className="flex gap-2">
                        <Button 
                          onClick={copyToClipboard}
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </Button>
                        <Button 
                          onClick={downloadAsText}
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      value={extractedContent}
                      onChange={(e) => setExtractedContent(e.target.value)}
                      className="w-full h-96 bg-gray-800 border-gray-700 text-white p-4 rounded-md resize-none"
                      placeholder="Extracted content will appear here..."
                    />
                    <p className="text-sm text-gray-400 mt-2">
                      Content is editable. You can modify it before copying or downloading.
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default ContentExtractor;
