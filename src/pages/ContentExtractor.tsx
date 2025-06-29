
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
import { Download, Copy, Globe, AlertCircle, Info, RefreshCw } from "lucide-react";

const ContentExtractor = () => {
  const [url, setUrl] = useState('');
  const [extractedContent, setExtractedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [extractionMethod, setExtractionMethod] = useState('');
  const { toast } = useToast();

  const extractWithAllOrigins = async (targetUrl: string) => {
    console.log('Attempting extraction with AllOrigins...');
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (!data.contents) {
      throw new Error('No content received from AllOrigins');
    }
    
    return data.contents;
  };

  const extractWithCorsproxy = async (targetUrl: string) => {
    console.log('Attempting extraction with CORS Proxy...');
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error('CORS Proxy failed');
    }
    
    return await response.text();
  };

  const extractWithThingproxy = async (targetUrl: string) => {
    console.log('Attempting extraction with Thingproxy...');
    const proxyUrl = `https://thingproxy.freeboard.io/fetch/${targetUrl}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error('Thingproxy failed');
    }
    
    return await response.text();
  };

  const extractContentFromHtml = (html: string, targetUrl: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Remove script and style elements
    const elementsToRemove = doc.querySelectorAll('script, style, noscript, link[rel="stylesheet"]');
    elementsToRemove.forEach(el => el.remove());
    
    let textContent = '';
    let method = '';
    
    // Strategy 1: Look for React app content containers
    const reactSelectors = [
      '#root', 
      '#app', 
      '[data-reactroot]',
      '.App',
      'main[role="main"]',
      '[role="main"]'
    ];
    
    for (const selector of reactSelectors) {
      const element = doc.querySelector(selector);
      if (element && element.textContent && element.textContent.trim().length > 100) {
        textContent = element.textContent;
        method = `React app container (${selector})`;
        break;
      }
    }
    
    // Strategy 2: Look for main content areas
    if (!textContent || textContent.trim().length < 100) {
      const mainSelectors = [
        'main', 
        'article',
        '.main-content', 
        '#main-content',
        '.content',
        '#content',
        '.post-content',
        '.entry-content',
        '[role="main"]'
      ];
      
      for (const selector of mainSelectors) {
        const element = doc.querySelector(selector);
        if (element && element.textContent && element.textContent.trim().length > 50) {
          textContent = element.textContent;
          method = `main content area (${selector})`;
          break;
        }
      }
    }
    
    // Strategy 3: Extract from body but exclude common UI elements
    if (!textContent || textContent.trim().length < 100) {
      const elementsToRemoveFromBody = doc.querySelectorAll('nav, header, footer, .navbar, .header, .footer, .sidebar, .menu, .navigation, .ad, .advertisement');
      elementsToRemoveFromBody.forEach(el => el.remove());
      textContent = doc.body?.textContent || '';
      method = 'body content (excluding nav/header/footer)';
    }
    
    // Strategy 4: Enhanced meta data extraction
    if (!textContent || textContent.trim().length < 100) {
      const title = doc.querySelector('title')?.textContent || '';
      const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
      const ogDescription = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
      const keywords = doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
      
      // Look for JSON-LD structured data
      const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
      let structuredData = '';
      jsonLdScripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '');
          if (data.description) structuredData += data.description + ' ';
          if (data.text) structuredData += data.text + ' ';
          if (data.name) structuredData += data.name + ' ';
          if (data.headline) structuredData += data.headline + ' ';
        } catch (e) {
          // Ignore invalid JSON
        }
      });
      
      // Look for any text content in divs, paragraphs, etc.
      const textElements = doc.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6');
      let extractedText = '';
      textElements.forEach(el => {
        const text = el.textContent?.trim();
        if (text && text.length > 20 && !text.includes('Loading') && !text.includes('JavaScript')) {
          extractedText += text + ' ';
        }
      });
      
      const allMetaContent = [title, description, ogTitle, ogDescription, keywords, structuredData, extractedText]
        .filter(Boolean)
        .join(' | ');
      
      if (allMetaContent.length > 50) {
        textContent = allMetaContent;
        method = 'enhanced meta data and text extraction';
      } else {
        textContent = `[Limited content found for ${targetUrl}. This appears to be a React/SPA application that requires JavaScript to load content. Try using browser developer tools to copy the rendered HTML instead.]`;
        method = 'minimal extraction (SPA detected)';
      }
    }
    
    // Clean up the text
    const cleanedContent = textContent
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    
    return { content: cleanedContent, method };
  };

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
      let html = '';
      let proxyUsed = '';
      
      // Try multiple proxy services
      const proxies = [
        { name: 'AllOrigins', fn: extractWithAllOrigins },
        { name: 'CORS Proxy', fn: extractWithCorsproxy },
        { name: 'Thingproxy', fn: extractWithThingproxy }
      ];
      
      for (const proxy of proxies) {
        try {
          html = await proxy.fn(url);
          proxyUsed = proxy.name;
          console.log(`Successfully extracted content using ${proxy.name}`);
          break;
        } catch (error) {
          console.log(`${proxy.name} failed:`, error);
          continue;
        }
      }
      
      if (!html) {
        throw new Error('All proxy services failed');
      }
      
      const { content, method } = extractContentFromHtml(html, url);
      
      setExtractedContent(content);
      setExtractionMethod(`${method} via ${proxyUsed}`);
      
      if (content.length > 300 && !content.includes('[Limited content found')) {
        toast({
          title: "Success",
          description: `Content extracted successfully using ${method}!`,
        });
      } else {
        toast({
          title: "Partial Success",
          description: `Limited content extracted. This might be a React/SPA app. Try the manual extraction tip below.`,
          variant: "default",
        });
      }
      
    } catch (error) {
      console.error('Error extracting content:', error);
      
      let errorMessage = "Failed to extract content from all proxy services.";
      if (url.includes('localhost') || url.includes('127.0.0.1')) {
        errorMessage = "Cannot extract from localhost URLs. Deploy your site first.";
      } else if (url.includes('lovable.app') || url.includes('lovableproject.com')) {
        errorMessage = "For React apps, try the manual extraction method described below.";
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
                Extract clean text content from any website - now with multiple proxy services for better success rates
              </motion.p>
              
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-yellow-200 text-sm">
                      <strong>React/SPA Limitation:</strong> Single-page applications may have limited content extraction since they require JavaScript to render content.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4 mb-8">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-blue-200 text-sm">
                      <strong>Manual Extraction Tip:</strong> For React apps, open the site in browser → F12 → Elements tab → Right-click the body tag → Copy → Copy outerHTML → Paste into a text editor and extract the content you need.
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
