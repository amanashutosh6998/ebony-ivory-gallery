
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Decorative elements - removed the purple dot */}
      <div className="absolute -bottom-32 -left-40 w-80 h-80 border border-white/10 rounded-full blur-sm"></div>
      <div className="absolute -top-72 -right-72 w-[500px] h-[500px] border border-white/10 rounded-full blur-sm"></div>
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-blue-500/50 rounded-full blur-sm animate-pulse"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 animate-fade-in">
            <span className="block">I'm</span>
            <span className="block mt-2 text-5xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">Aman Ashutosh</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-4 max-w-3xl mx-auto font-light text-gray-300 animate-fade-in" style={{animationDelay: "300ms"}}>
            Growth Analyst & Engineer
          </p>
          
          <p className="text-md md:text-lg mb-8 max-w-3xl mx-auto text-gray-400 animate-fade-in" style={{animationDelay: "500ms"}}>
            Building and growing businesses by improving Marketing, Sales, Customer Success, Product, Analytics, Engineering, and AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{animationDelay: "600ms"}}>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 border-0 px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
              asChild
            >
              <Link to="/projects" className="flex items-center gap-2">
                View My Work <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="backdrop-blur-sm bg-white/5 text-white hover:bg-white/10 hover:text-white border-white/20 px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link to="/contact">Contact Me</Link>
            </Button>
          </div>
          
          <div className="w-full max-w-xl mx-auto animate-fade-in" style={{animationDelay: "900ms"}}>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
