
import { Card } from "@/components/ui/card";
import { BarChart3, Database, Users } from "lucide-react";
import ColorParticles from "./ColorParticles";

const AboutSection = () => {
  const skills = [
    { name: "Data Analytics", icon: BarChart3, description: "SQL, Python, ETL, Reporting" },
    { name: "Growth Engineering", icon: Database, description: "CRM, Attribution, Automation" },
    { name: "Customer Insights", icon: Users, description: "Lifecycle Analysis, Retention" },
  ];

  return (
    <section id="about" className="py-12 relative overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* ✅ Add animated particles as a background layer */}
      <ColorParticles colorScheme="purple-blue" density="medium" />

      {/* Decorative elements (already present) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-[150px] transform -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[150px] transform translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto mb-16 text-center animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">About Me</h2>
          <p className="text-lg text-gray-400">
            I'm a Growth Analyst specializing in data-driven strategies with expertise in ETL pipelines,
            CRM management, and customer analytics. I blend technical skills with business acumen to drive
            measurable results across marketing, sales, and product initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <p className="mb-4 text-gray-400">
              With a background in data science, analytics, and marketing management,
              I've built expertise in transforming raw data into actionable insights. My focus
              lies in creating end-to-end data pipelines and automation systems that drive
              business growth.
            </p>
            <p className="mb-4 text-gray-400">
              At Kenko AI, I've implemented sophisticated ETL processes, built custom attribution
              models, and developed AI-powered outbound engines that increased demo bookings by 25%.
              I focus on creating systems that align marketing, sales, and product data for holistic
              business intelligence.
            </p>
            <p className="text-gray-400">
              My approach combines analytical rigor with practical applications. I'm passionate about
              using data to solve real business problems, optimize marketing spend, improve customer
              retention, and enhance product adoption through data-driven decision making.
            </p>
          </div>

          <div className="grid gap-4">
            {skills.map((skill, index) => (
              <Card
                key={skill.name}
                className="p-6 border border-gray-800 bg-gray-800/50 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-gray-900 to-black rounded-md">
                    <skill.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-1 text-white">{skill.name}</h4>
                    <p className="text-gray-400">{skill.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
