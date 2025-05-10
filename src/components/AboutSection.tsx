
import { Card } from "@/components/ui/card";
import { Code, User, Star } from "lucide-react";

const AboutSection = () => {
  const skills = [
    { name: "Design", icon: Star, description: "UI/UX, Branding, Typography" },
    { name: "Development", icon: Code, description: "React, TypeScript, Node.js" },
    { name: "Experience", icon: User, description: "5+ years in the industry" },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 animate-pulse">About Me</h2>
          <p className="text-lg text-gray-400 animate-fade-in">
            I'm a passionate designer and developer with a focus on creating clean, 
            user-friendly experiences. With a background in both design and programming, 
            I bring a unique perspective to every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in" style={{animationDelay: "200ms"}}>
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <p className="mb-4 text-gray-400">
              I started my career as a graphic designer but quickly became fascinated 
              with the web and interactive experiences. This led me to learn front-end 
              development, and I've been building digital products ever since.
            </p>
            <p className="mb-4 text-gray-400">
              My approach combines aesthetic sensibility with technical knowledge to 
              create solutions that are both beautiful and functional. I believe in 
              minimalism and purpose-driven design.
            </p>
            <p className="text-gray-400">
              When I'm not designing or coding, you can find me exploring photography, 
              reading about new technologies, or hiking in nature.
            </p>
          </div>

          <div className="grid gap-4">
            {skills.map((skill, index) => (
              <Card 
                key={skill.name} 
                className="p-6 border border-gray-800 bg-gray-800/50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                style={{animationDelay: `${(index + 1) * 200}ms`}}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gradient-to-r from-gray-900 to-black rounded-md">
                    <skill.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-1">{skill.name}</h4>
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
