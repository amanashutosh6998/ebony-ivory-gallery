import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MiroFrame {
  id: string;
  label: string;
  embedUrl: string;
}

interface TabbedMiroEmbedProps {
  frames: MiroFrame[];
}

const TabbedMiroEmbed = ({ frames }: TabbedMiroEmbedProps) => {
  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(new Set([frames[0]?.id]));

  const handleTabChange = (value: string) => {
    setLoadedTabs(prev => new Set([...prev, value]));
  };

  return (
    <Tabs defaultValue={frames[0]?.id} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-4 bg-background/50 border border-border/30">
        {frames.map((frame) => (
          <TabsTrigger 
            key={frame.id} 
            value={frame.id}
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            {frame.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {frames.map((frame) => (
        <TabsContent key={frame.id} value={frame.id} className="mt-0">
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-border/30 shadow bg-background/5">
            {loadedTabs.has(frame.id) ? (
              <iframe
                src={frame.embedUrl}
                width="100%"
                height="100%"
                allowFullScreen
                frameBorder="0"
                title={frame.label}
                scrolling="no"
                allow="fullscreen; clipboard-read; clipboard-write"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Loading...
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabbedMiroEmbed;
