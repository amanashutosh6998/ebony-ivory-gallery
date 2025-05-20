
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Speaker, Guitar, Music } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface Track {
  title: string;
  description: string;
  embedUrl: string;
  genre: string;
}

const MusicProductionSection = () => {
  const [activeAudio, setActiveAudio] = useState<string | null>(null);

  const spotifyArtistId = "1f7ZzfhwAFCDOze7onqLhG";

  const tracks: Track[] = [
    {
      title: "Midnight Dreams",
      description: "A smooth ambient track with deep bass and atmospheric pads",
      embedUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1612656565&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
      genre: "Ambient"
    },
    {
      title: "Urban Rhythm",
      description: "Upbeat electronic track with syncopated beats and vocal chops",
      embedUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1612656565&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
      genre: "Electronic"
    },
    {
      title: "Sunset Boulevard",
      description: "Lo-fi hip hop track perfect for studying and relaxing",
      embedUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1612656565&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
      genre: "Lo-Fi Hip Hop"
    }
  ];

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

        {/* Spotify Artist Embed */}
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
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="mb-24">
          <h3 className="text-2xl font-bold mb-8 text-center">Featured Tracks</h3>
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {tracks.map((track, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden border border-gray-800 bg-gray-900/50">
                    <CardContent className="p-0">
                      <div className="aspect-video w-full bg-black">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          scrolling="no" 
                          frameBorder="no" 
                          src={track.embedUrl}
                          title={track.title}
                        ></iframe>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-xl font-bold">{track.title}</h4>
                          <span className="text-sm bg-gray-800 px-2 py-1 rounded-full text-purple-400">{track.genre}</span>
                        </div>
                        <p className="text-gray-400">{track.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4 gap-2">
              <CarouselPrevious className="relative inset-auto -left-0 top-0 translate-y-0" />
              <CarouselNext className="relative inset-auto -right-0 top-0 translate-y-0" />
            </div>
          </Carousel>
        </div>

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
