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
import { Download, Copy, Globe, AlertCircle, Info, Settings, Eye } from "lucide-react";

const WebScraper = () => {
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [scrapedContent, setScrapedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const { toast } = useToast();

  const scrapeWithScrapingBee = async (targetUrl: string, userApiKey: string) => {
    console.log('Attempting to scrape with ScrapingBee...');
    
    const params = new URLSearchParams({
      api_key: userApiKey,
      url: targetUrl,
      render_js: 'true',
      wait_for: '2000',
      block_ads: 'true',
      block_resources: 'false'
    });
    
    const response = await fetch(`https://app.scrapingbee.com/api/v1/?${params}`);
    
    if (!response.ok) {
      throw new Error(`ScrapingBee API failed: ${response.status}`);
    }
    
    return await response.text();
  };

  const extractTextFromHtml = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Remove unwanted elements
    const elementsToRemove = doc.querySelectorAll('script, style, noscript, nav, header, footer, .navbar, .header, .footer, .sidebar, .menu, .navigation, .ad, .advertisement');
    elementsToRemove.forEach(el => el.remove());
    
    // Try to find main content
    let content = '';
    const mainContentSelectors = [
      'main',
      'article', 
      '[role="main"]',
      '.main-content',
      '#main-content',
      '.content',
      '#content'
    ];
    
    for (const selector of mainContentSelectors) {
      const element = doc.querySelector(selector);
      if (element && element.textContent && element.textContent.trim().length > 100) {
        content = element.textContent;
        break;
      }
    }
    
    // Fallback to body content
    if (!content || content.trim().length < 50) {
      content = doc.body?.textContent || '';
    }
    
    // Clean up the text
    return content
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
  };

  const handleScrape = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.trim()) {
      setShowApiKeyInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your ScrapingBee API key to continue",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Starting scrape for URL:', url);
      const html = await scrapeWithScrapingBee(url, apiKey);
      const extractedText = extractTextFromHtml(html);
      
      setScrapedContent(extractedText);
      
      if (extractedText.length > 100) {
        toast({
          title: "Success",
          description: "Content scraped successfully with JavaScript rendering!",
        });
      } else {
        toast({
          title: "Limited Content",
          description: "Only limited content was found on this page.",
          variant: "default",
        });
      }
      
    } catch (error) {
      console.error('Error scraping content:', error);
      
      let errorMessage = "Failed to scrape content.";
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          errorMessage = "Invalid API key. Please check your ScrapingBee API key.";
        } else if (error.message.includes('403')) {
          errorMessage = "API quota exceeded or access denied.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Scraping Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      <ColorParticles colorScheme="green-cyan" density="low" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-[150px] transform -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full blur-[150px] transform translate-y-1/2 -translate-x-1/2"></div>
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
                Advanced Web Scraper
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Extract content from any website including React SPAs with JavaScript rendering
              </motion.p>
              
              <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-green-200 text-sm">
                      <strong>JavaScript Rendering:</strong> This scraper can execute JavaScript and extract content from React/Vue/Angular applications after they load.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4 mb-8">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-blue-200 text-sm">
                      <strong>API Required:</strong> This tool uses ScrapingBee API. Get your free API key at <a href="https://www.scrapingbee.com/" target="_blank" rel="noopener noreferrer" className="underline">scrapingbee.com</a> (1000 free requests/month)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {showApiKeyInput && (
                <Card className="bg-gray-900/50 border-gray-800 mb-6">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      ScrapingBee API Key
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Input
                        type="password"
                        placeholder="Enter your ScrapingBee API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="flex-1 bg-gray-800 border-gray-700 text-white"
                      />
                      <Button 
                        onClick={() => setShowApiKeyInput(false)}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-gray-900/50 border-gray-800 mb-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Website URL
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button 
                      onClick={handleScrape}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isLoading ? 'Scraping...' : 'Scrape'}
                    </Button>
                  </div>
                  
                  {!showApiKeyInput && (
                    <Button 
                      onClick={() => setShowApiKeyInput(true)}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {apiKey ? 'Update API Key' : 'Set API Key'}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {scrapedContent && (
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span>Scraped Content</span>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => {
                            navigator.clipboard.writeText(scrapedContent);
                            toast({
                              title: "Copied!",
                              description: "Content copied to clipboard",
                            });
                          }}
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </Button>
                        <Button 
                          onClick={() => {
                            const blob = new Blob([scrapedContent], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'scraped-content.txt';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                            toast({
                              title: "Downloaded!",
                              description: "Content saved as text file",
                            });
                          }}
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
                      value={scrapedContent}
                      onChange={(e) => setScrapedContent(e.target.value)}
                      className="w-full h-96 bg-gray-800 border-gray-700 text-white p-4 rounded-md resize-none"
                      placeholder="Scraped content will appear here..."
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

export default WebScraper;
