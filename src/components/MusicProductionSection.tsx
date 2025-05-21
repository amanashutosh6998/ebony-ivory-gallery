
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Speaker, Guitar, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Track {
  title: string;
  description: string;
  embedUrl: string;
  genre: string;
}

const MusicProductionSection = () => {
  const spotifyArtistId = "1f7ZzfhwAFCDOze7onqLhG";
  const [volume, setVolume] = useState(80); // Default volume 80%
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const spotifyIframeRef = useRef<HTMLIFrameElement | null>(null);
  const { toast } = useToast();
  
  // Find and store the Spotify iframe reference after component mounts
  useEffect(() => {
    const findSpotifyIframe = () => {
      const iframe = document.querySelector('iframe[src*="spotify.com"]') as HTMLIFrameElement;
      if (iframe) {
        spotifyIframeRef.current = iframe;
        setIsLoaded(true);
        
        // Set initial volume
        if (iframe.contentWindow) {
          setTimeout(() => {
            iframe.contentWindow?.postMessage({ 
              command: 'volume', 
              volume: volume / 100 
            }, '*');
          }, 1000); // Delay to make sure iframe is loaded
        }
      } else {
        // If iframe isn't loaded yet, try again after a short delay
        setTimeout(findSpotifyIframe, 300);
      }
    };
    
    findSpotifyIframe();
    
    // Add event listener for message from iframe
    const handleMessage = (event: MessageEvent) => {
      // Check for any response from Spotify iframe
      if (event.data && event.data.type === 'player_ready') {
        setIsLoaded(true);
        // Apply volume after player is ready
        if (spotifyIframeRef.current && spotifyIframeRef.current.contentWindow) {
          spotifyIframeRef.current.contentWindow.postMessage({ 
            command: 'volume', 
            volume: volume / 100 
          }, '*');
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [volume]);

  // For controlling the Spotify iframe volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    
    // Control Spotify volume through the iframe's postMessage API
    if (spotifyIframeRef.current && spotifyIframeRef.current.contentWindow) {
      spotifyIframeRef.current.contentWindow.postMessage({ 
        command: 'volume', 
        volume: newVolume / 100 
      }, '*');
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Save previous volume before muting
    const newVolume = newMutedState ? 0 : (volume === 0 ? 80 : volume);
    setVolume(newVolume);
    
    // Send mute command to Spotify iframe
    if (spotifyIframeRef.current && spotifyIframeRef.current.contentWindow) {
      spotifyIframeRef.current.contentWindow.postMessage({ 
        command: 'volume', 
        volume: newVolume / 100 
      }, '*');
      
      toast({
        title: newMutedState ? "Audio Muted" : "Audio Unmuted",
        duration: 1500
      });
    }
  };

  const tools = [
    {
      name: "Production",
      icon: Speaker,
      skills: ["Ableton Live", "Logic Pro X", "FL Studio", "Sound Design"]
    },
    {
      name: "Instruments",
      icon: Guitar,
      skills: ["Piano", "Guitar", "Synthesizers", "Drum Programming"]
    },
    {
      name: "Post-Production",
      icon: Headphones,
      skills: ["Mixing", "Mastering", "Vocal Processing", "Sample Creation"]
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Music Production
          </h2>
          <p className="text-lg text-gray-400">
            Crafting sonic experiences through digital production, sound design, and audio engineering.
          </p>
        </div>

        {/* Spotify Artist Embed with Volume Controls */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold mb-8 text-center">My Spotify</h3>
          <div className="max-w-2xl mx-auto">
            <div className="aspect-auto w-full bg-black rounded-xl overflow-hidden mb-6">
              <iframe 
                src={`https://open.spotify.com/embed/artist/${spotifyArtistId}?utm_source=generator&theme=0`}
                width="100%" 
                height="352"
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Spotify Artist Profile"
                className="rounded-lg"
                ref={el => spotifyIframeRef.current = el}
              ></iframe>
            </div>
            
            {/* Volume Controls */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <button 
                onClick={toggleMute}
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? 
                  <VolumeX className="h-5 w-5 text-gray-300" /> : 
                  <Volume2 className="h-5 w-5 text-gray-300" />
                }
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full max-w-[200px] h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgba(168, 85, 247, 0.8) 0%, rgba(168, 85, 247, 0.8) ${volume}%, rgb(55, 65, 81) ${volume}%, rgb(55, 65, 81) 100%)`
                }}
              />
              <span className="text-gray-300 text-sm min-w-[40px]">{volume}%</span>
            </div>
          </div>
        </div>
        
        {/* Production Skills section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center">Production Skills</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Card key={index} className="border border-gray-800 bg-gray-900/50 hover:bg-gray-800/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-900/50 rounded-lg">
                      <tool.icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <h4 className="text-xl font-bold">{tool.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tool.skills.map((skill, i) => (
                      <span key={i} className="bg-gray-800 text-sm px-3 py-1 rounded-full text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Looking for a music producer?</h3>
          <p className="text-gray-400 mb-8">
            I offer music production, mixing, and mastering services for artists, bands, and content creators.
            Let's create something amazing together.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700" asChild>
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MusicProductionSection;
