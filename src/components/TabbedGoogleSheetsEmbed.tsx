import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SheetTab {
  id: string;
  label: string;
  embedUrl: string;
}

interface TabbedGoogleSheetsEmbedProps {
  sheets: SheetTab[];
}

const TabbedGoogleSheetsEmbed = ({ sheets }: TabbedGoogleSheetsEmbedProps) => {
  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(new Set([sheets[0]?.id]));

  const handleTabChange = (value: string) => {
    setLoadedTabs(prev => new Set([...prev, value]));
  };

  return (
    <Tabs defaultValue={sheets[0]?.id} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-4 bg-background/50 border border-border/30">
        {sheets.map((sheet) => (
          <TabsTrigger 
            key={sheet.id} 
            value={sheet.id}
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            {sheet.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {sheets.map((sheet) => (
        <TabsContent key={sheet.id} value={sheet.id} className="mt-0">
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-border/30 shadow bg-background/5">
            {loadedTabs.has(sheet.id) ? (
              <iframe
                src={sheet.embedUrl}
                width="100%"
                height="100%"
                allowFullScreen
                frameBorder="0"
                title={sheet.label}
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

export default TabbedGoogleSheetsEmbed;
