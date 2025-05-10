
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 opacity-0 animate-fade-in">
            <span className="block">I'm</span>
            <span className="block mt-2 text-5xl md:text-7xl lg:text-8xl">Aman Ashutosh</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-4 max-w-3xl mx-auto font-light text-gray-400 opacity-0 animate-fade-in" style={{animationDelay: "300ms"}}>
            Growth Analyst & Growth Engineer
          </p>
          
          <p className="text-md md:text-lg mb-8 max-w-3xl mx-auto text-gray-400 opacity-0 animate-fade-in" style={{animationDelay: "500ms"}}>
            Building and growing businesses by improving Marketing, Sales, Customer Success, Product, Analytics, Engineering, and AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 opacity-0 animate-fade-in" style={{animationDelay: "600ms"}}>
            <Button 
              className="bg-white text-black hover:bg-gray-200 border border-white px-8 py-6 text-lg"
              asChild
            >
              <a href="#projects">View My Work</a>
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg"
              asChild
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mb-8 opacity-0 animate-fade-in" style={{animationDelay: "700ms"}}>
            <Button variant="outline" size="icon" className="rounded-full border-white text-white hover:bg-white hover:text-black" asChild>
              <a href="https://github.com/amanashutosh6998" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                <span className="sr-only">Github</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-white text-white hover:bg-white hover:text-black" asChild>
              <a href="https://linkedin.com/in/amanashutosh" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-white text-white hover:bg-white hover:text-black" asChild>
              <a href="mailto:amanshutosh.analytics@gmail.com">
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
            <Button variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-black flex items-center gap-2" asChild>
              <a href="/resume.pdf" download="Aman_Ashutosh_Resume.pdf">
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </Button>
          </div>
          
          <div className="w-full max-w-xl mx-auto opacity-0 animate-fade-in" style={{animationDelay: "900ms"}}>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
