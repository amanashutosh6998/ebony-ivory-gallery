
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { lazy, Suspense } from 'react';

// Lazy load the animated background
const AnimatedBackground = lazy(() => import('./AnimatedBackground'));

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 bg-black"></div>}>
        <AnimatedBackground />
      </Suspense>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 animate-fade-in">
            <span className="block">I'm</span>
            <span className="block mt-2 text-5xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Aman Ashutosh</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-4 max-w-3xl mx-auto font-light text-gray-300 animate-fade-in" style={{animationDelay: "300ms"}}>
            Growth Analyst & Growth Engineer
          </p>
          
          <p className="text-md md:text-lg mb-8 max-w-3xl mx-auto text-gray-400 animate-fade-in" style={{animationDelay: "500ms"}}>
            Building and growing businesses by improving Marketing, Sales, Customer Success, Product, Analytics, Engineering, and AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in" style={{animationDelay: "600ms"}}>
            <Button 
              className="bg-white text-black hover:bg-gray-200 border border-white px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link to="/projects">View My Work</Link>
            </Button>
            <Button 
              variant="outline" 
              className="bg-black text-white hover:bg-white hover:text-black border-white px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link to="/contact">Contact Me</Link>
            </Button>
          </div>
          
          <div className="w-full max-w-xl mx-auto animate-fade-in" style={{animationDelay: "900ms"}}>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
