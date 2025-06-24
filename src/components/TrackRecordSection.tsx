
import { Card } from "@/components/ui/card";
import { TrendingUp, Database, Users, BarChart3 } from "lucide-react";
import ColorParticles from "./ColorParticles";

const TrackRecordSection = () => {
  const achievements = [
    {
      icon: TrendingUp,
      title: "25% increase in demo bookings",
      description: "at Kenko AI by launching an AI-powered outbound engine integrated with custom attribution models."
    },
    {
      icon: Database,
      title: "Built robust end-to-end ETL pipelines",
      description: "that enabled real-time analytics for sales and marketing teams."
    },
    {
      icon: Users,
      title: "Streamlined CRM workflows",
      description: "and enriched customer profiles for better lifecycle segmentation and retargeting."
    },
    {
      icon: BarChart3,
      title: "Connected cross-functional data",
      description: "to surface high-intent behaviours and improve campaign ROI."
    }
  ];

  const skills = [
    {
      category: "Analytics",
      items: ["SQL, Python, ETL, Dashboards (Looker, Metabase)", "Forecasting, cohort analysis, campaign performance"]
    },
    {
      category: "Growth Engineering",
      items: ["CRM automation (HubSpot, Salesforce)", "Attribution modelling, API integrations, workflow design"]
    },
    {
      category: "Customer Intelligence",
      items: ["Lifecycle analysis, churn prediction, retention strategy", "Conversion rate optimisation, engagement scoring"]
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Add animated particles as a background layer */}
      <ColorParticles colorScheme="purple-blue" density="medium" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[100px] transform -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-[100px] transform translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            My Track Record
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Business Growth Through Data Systems
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <Card
              key={achievement.title}
              className="p-6 border border-gray-800 bg-gray-800/30 backdrop-blur-sm animate-fade-in hover:bg-gray-800/50 transition-all duration-300"
              style={{ animationDelay: `${400 + index * 150}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                  <achievement.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{achievement.title}</h3>
                  <p className="text-gray-400">{achievement.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* What I Bring Section */}
        <div className="animate-fade-in" style={{ animationDelay: "1000ms" }}>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white">
            What I Bring
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <Card
                key={skill.category}
                className="p-6 border border-gray-800 bg-gray-800/30 backdrop-blur-sm animate-fade-in hover:bg-gray-800/50 transition-all duration-300"
                style={{ animationDelay: `${1200 + index * 150}ms` }}
              >
                <h4 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
                  {skill.category}
                </h4>
                <ul className="space-y-2">
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-400 text-sm leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackRecordSection;
