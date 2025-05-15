
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileText, Github, Linkedin, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

const ResumeSection = () => {
  return (
    <section id="resume" className="py-24 relative bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-[100px] transform -translate-y-1/2 -translate-x-1/4 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-[100px] transform translate-y-1/2 translate-x-1/4 animate-pulse" style={{animationDelay: "1s"}}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Aman Ashutosh</h2>
          <div className="flex justify-center space-x-4 mb-8">
            <a href="mailto:amanashutosh.analytics@gmail.com" className="text-gray-300 hover:text-white flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              amanashutosh.analytics@gmail.com
            </a>
            <a href="https://github.com/amanashutosh6998" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/aman-ashutosh/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center">
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </a>
          </div>
          <p className="text-lg text-gray-300 animate-fade-in" style={{animationDelay: "200ms"}}>
            Front-end Developer & UX Designer specializing in creating beautiful, 
            user-friendly interfaces and digital experiences.
          </p>
        </div>

        <div className="grid gap-10 animate-fade-in" style={{animationDelay: "300ms"}}>
          {/* Experience Section */}
          <Card className="p-6 bg-black/40 backdrop-blur-lg border border-gray-800">
            <h3 className="text-2xl font-bold mb-6 text-white/90 flex items-center">
              <FileText className="mr-3 h-6 w-6" />
              Experience
            </h3>
            
            <div className="space-y-8">
              <div className="animate-fade-in" style={{animationDelay: "400ms"}}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">Senior Front-End Developer</h4>
                  <span className="text-gray-400 text-sm">2021 - Present</span>
                </div>
                <h5 className="text-blue-400 mb-2">Tech Innovations Inc.</h5>
                <p className="text-gray-300">
                  Led the development of responsive web applications using React, TypeScript, and Tailwind CSS.
                  Implemented state management solutions with Redux and optimized application performance.
                </p>
              </div>
              
              <div className="animate-fade-in" style={{animationDelay: "500ms"}}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">UX Designer</h4>
                  <span className="text-gray-400 text-sm">2018 - 2021</span>
                </div>
                <h5 className="text-blue-400 mb-2">Design Studio XYZ</h5>
                <p className="text-gray-300">
                  Created user-centered design solutions for web and mobile applications.
                  Conducted user research and testing to refine the user experience.
                </p>
              </div>
            </div>
          </Card>
          
          {/* Education Section */}
          <Card className="p-6 bg-black/40 backdrop-blur-lg border border-gray-800 animate-fade-in" style={{animationDelay: "600ms"}}>
            <h3 className="text-2xl font-bold mb-6 text-white/90 flex items-center">
              <FileText className="mr-3 h-6 w-6" />
              Education
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">Master of Computer Science</h4>
                  <span className="text-gray-400 text-sm">2016 - 2018</span>
                </div>
                <h5 className="text-blue-400">Tech University</h5>
              </div>
              
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">Bachelor of Design</h4>
                  <span className="text-gray-400 text-sm">2012 - 2016</span>
                </div>
                <h5 className="text-blue-400">Design Institute</h5>
              </div>
            </div>
          </Card>
          
          {/* Skills Section */}
          <Card className="p-6 bg-black/40 backdrop-blur-lg border border-gray-800 animate-fade-in" style={{animationDelay: "700ms"}}>
            <h3 className="text-2xl font-bold mb-6 text-white/90 flex items-center">
              <FileText className="mr-3 h-6 w-6" />
              Skills
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 p-3 rounded-md">React.js</div>
              <div className="bg-gray-900/50 p-3 rounded-md">TypeScript</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Tailwind CSS</div>
              <div className="bg-gray-900/50 p-3 rounded-md">UI/UX Design</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Figma</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Node.js</div>
            </div>
          </Card>
        </div>

        <div className="mt-12 flex justify-center animate-fade-in" style={{animationDelay: "800ms"}}>
          <Button 
            className="bg-black/50 backdrop-blur-sm text-white hover:bg-gray-800 border border-gray-700 flex items-center gap-2 px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            asChild
          >
            <a href="/resume.pdf" download="Aman_Ashutosh_Resume.pdf">
              <Download className="w-5 h-5" />
              <span>Download Full Resume</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
