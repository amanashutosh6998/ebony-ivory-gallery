import { Card } from "@/components/ui/card";
import { Code, User, Star } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground"; // ✅ Import the Home page effect

const AboutSection = () => {
  const skills = [
    { name: "Design", icon: Star, description: "UI/UX, Branding, Typography" },
    { name: "Development", icon: Code, description: "React, TypeScript, Node.js" },
    { name: "Experience", icon: User, description: "5+ years in the industry" },
  ];

  return (
    <section id="about" className="py-12 relative overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* ✅ Exact same animated background from Home page */}
      <AnimatedBackground />

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-[150px] transform -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[150px] transform translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto mb-16 text-center animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">About Me</h2>
          <p className="text-lg text-gray-400">
            I'm a passionate designer and developer with a focus on creating clean, 
            user-friendly experiences. With a background in both design and programming, 
            I bring a unique perspective to every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
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
