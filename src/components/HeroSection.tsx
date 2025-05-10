
import { Button } from "@/components/ui/button";
import { useState } from "react";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <InteractivePolygons />
      
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
              <a href="#projects">View My Work</a>
            </Button>
            <Button 
              variant="outline" 
              className="bg-black text-white hover:bg-white hover:text-black border-white px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a href="#contact">Contact Me</a>
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

// Interactive Polygons component that renders interactive shapes
const InteractivePolygons = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Generate array of polygon configurations
  const polygons = Array.from({ length: 15 }, (_, index) => ({
    size: Math.random() * 100 + 50,
    top: Math.random() * 100,
    left: Math.random() * 100,
    rotation: Math.random() * 360,
    opacity: Math.random() * 0.3 + 0.1,
    sides: Math.floor(Math.random() * 3) + 3, // 3-5 sides
    delay: index * 0.1
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {polygons.map((polygon, index) => (
        <div
          key={index}
          className="absolute transform transition-all duration-700 ease-in-out"
          style={{
            width: polygon.size,
            height: polygon.size,
            top: `${polygon.top}%`,
            left: `${polygon.left}%`,
            opacity: hoveredIndex === index ? polygon.opacity * 2 : polygon.opacity,
            transform: `rotate(${polygon.rotation}deg) scale(${hoveredIndex === index ? 1.2 : 1})`,
            animation: `float 8s ease-in-out ${polygon.delay}s infinite alternate`
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div 
            className={`w-full h-full ${getPolygonClass(polygon.sides)} bg-gradient-to-r from-gray-500/20 to-white/30 backdrop-blur-3xl border border-white/10`}
          />
        </div>
      ))}
    </div>
  );
};

// Helper function to determine polygon clip-path based on number of sides
const getPolygonClass = (sides: number): string => {
  switch(sides) {
    case 3:
      return "clip-path-triangle";
    case 4:
      return "clip-path-square";
    default:
      return "rounded-full";
  }
};

export default HeroSection;
