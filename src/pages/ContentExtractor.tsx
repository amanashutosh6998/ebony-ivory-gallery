
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
import { Download, Copy, Globe, AlertCircle, Info } from "lucide-react";

const ContentExtractor = () => {
  const [url, setUrl] = useState('');
  const [extractedContent, setExtractedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [extractionMethod, setExtractionMethod] = useState('');
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
    setExtractionMethod('');
    
    try {
      // Strategy 1: Try AllOrigins first
      console.log('Attempting extraction with AllOrigins...');
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (data.contents) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        
        // Remove script and style elements
        const elementsToRemove = doc.querySelectorAll('script, style, noscript');
        elementsToRemove.forEach(el => el.remove());
        
        // Try to extract meaningful content
        let textContent = '';
        let method = '';
        
        // Strategy 1: Look for main content areas
        const mainSelectors = [
          'main', 
          '[role="main"]', 
          '.main-content', 
          '#main-content',
          '.content',
          '#content',
          'article',
          '.post-content',
          '.entry-content'
        ];
        
        for (const selector of mainSelectors) {
          const mainElement = doc.querySelector(selector);
          if (mainElement) {
            textContent = mainElement.textContent || '';
            method = `main content area (${selector})`;
            break;
          }
        }
        
        // Strategy 2: If no main content, try body but exclude common UI elements
        if (!textContent || textContent.trim().length < 50) {
          const elementsToRemoveFromBody = doc.querySelectorAll('nav, header, footer, .navbar, .header, .footer, .sidebar, .menu, .navigation');
          elementsToRemoveFromBody.forEach(el => el.remove());
          textContent = doc.body?.textContent || '';
          method = 'body content (excluding nav/header/footer)';
        }
        
        // Strategy 3: If still minimal content, try to extract from meta tags and structured data
        if (!textContent || textContent.trim().length < 100) {
          const title = doc.querySelector('title')?.textContent || '';
          const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
          const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
          const ogDescription = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
          
          // Look for JSON-LD structured data
          const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
          let structuredData = '';
          jsonLdScripts.forEach(script => {
            try {
              const data = JSON.parse(script.textContent || '');
              if (data.description) structuredData += data.description + ' ';
              if (data.text) structuredData += data.text + ' ';
            } catch (e) {
              // Ignore invalid JSON
            }
          });
          
          const metaContent = [title, description, ogTitle, ogDescription, structuredData]
            .filter(Boolean)
            .join(' | ');
          
          if (metaContent) {
            textContent = `${metaContent}\n\n[Note: This appears to be a React/SPA application. Only meta tags and structured data could be extracted. For full content, the page would need to be rendered with JavaScript.]`;
            method = 'meta tags and structured data';
          } else {
            textContent = `[Note: This website appears to be a single-page application with minimal extractable content. Raw content found: "${textContent.trim().substring(0, 200)}..."]`;
            method = 'minimal content extraction';
          }
        }
        
        // Clean up the text
        const cleanedContent = textContent
          .replace(/\s+/g, ' ')
          .replace(/\n\s*\n/g, '\n\n')
          .trim();
        
        setExtractedContent(cleanedContent);
        setExtractionMethod(method);
        
        if (cleanedContent.length > 200) {
          toast({
            title: "Success",
            description: `Content extracted successfully using ${method}!`,
          });
        } else {
          toast({
            title: "Partial Success",
            description: `Limited content extracted. This might be a React/SPA app that requires JavaScript to load content.`,
            variant: "default",
          });
        }
      } else {
        throw new Error('Failed to fetch content');
      }
    } catch (error) {
      console.error('Error extracting content:', error);
      
      // Provide specific guidance based on the URL
      let errorMessage = "Failed to extract content.";
      if (url.includes('localhost') || url.includes('127.0.0.1')) {
        errorMessage = "Cannot extract from localhost URLs. Try deploying your site first.";
      } else if (url.includes('lovable.app') || url.includes('lovableproject.com')) {
        errorMessage = "React apps need JavaScript to render content. Try using browser developer tools to copy the rendered HTML instead.";
      } else {
        errorMessage = "The website might be blocking requests or using heavy JavaScript. Try a different URL.";
      }
      
      toast({
        title: "Extraction Failed",
        description: errorMessage,
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
              
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-yellow-200 text-sm">
                      <strong>Note:</strong> This tool works best with static websites and blogs. 
                      React/SPA applications may have limited content extraction since they require JavaScript to render.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4 mb-8">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-blue-200 text-sm">
                      <strong>For React/SPA sites:</strong> For better content extraction, you can manually copy the rendered HTML from your browser's developer tools (F12 → Elements → Copy outerHTML).
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
                      <div className="flex flex-col">
                        <span>Extracted Content</span>
                        {extractionMethod && (
                          <span className="text-sm text-gray-400 font-normal">
                            Method: {extractionMethod}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => {
                            navigator.clipboard.writeText(extractedContent);
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
