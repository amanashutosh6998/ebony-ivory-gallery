
import { Card, CardContent } from "@/components/ui/card";

interface LabProject {
  title: string;
  description: string;
}

const AILabSection = () => {
  const labProjects: LabProject[] = [
    {
      title: "AI Sales Calling Assistant",
      description: "Enter a number and text → get a realistic AI voice call response (Twilio/Vapi + Claude/GPT)."
    },
    {
      title: "Smart Chatbot (Multi-channel)",
      description: "AI chatbot that works across web, email, and WhatsApp with memory and conversation tagging."
    },
    {
      title: "Diabetes Risk Predictor",
      description: "Upload health data → get your diabetes risk score (classification model)."
    },
    {
      title: "Search Intelligence Tool",
      description: "Enter a keyword → see rankings from GPT, Claude, Gemini + site recommendations."
    },
    {
      title: "Data Game (Mini)",
      description: "A small interactive logic/memory game as a portfolio demo."
    },
    {
      title: "Reverse Funnel Visualizer",
      description: "View your conversion funnel *backwards*, starting from Closed Won to first click."
    },
    {
      title: "Voice Disposition Analyzer",
      description: "Upload sales call audio → get emotional tone + objection points on a timeline."
    },
    {
      title: "Auto FAQ from Tickets",
      description: "Feed in support tickets → cluster and summarize common questions into FAQs."
    },
    {
      title: "Timezone Conflict Predictor",
      description: "Input remote team hours → see ideal meeting times and churn risk."
    },
    {
      title: "Lead Intent Simulator",
      description: "Predict how serious a lead is based on form behavior and metadata (not just field values)."
    }
  ];

  return (
    <section id="ai-lab" className="py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">AI Lab</h2>
          <span className="inline-block px-3 py-1 text-sm font-medium bg-white text-black rounded-full mb-6">Coming Soon</span>
          <p className="text-lg text-gray-400">
            Experimental projects at the intersection of growth, data, and artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden border border-gray-700 bg-black/50 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="px-1">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex justify-end">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Coming Soon</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AILabSection;
