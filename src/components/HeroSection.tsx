
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <SmoothInteractivePolygons />
      
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

// Enhanced Smooth Interactive Polygons component
const SmoothInteractivePolygons = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const polygonsRef = useRef<Array<{
    size: number;
    initialSize: number;
    top: number;
    left: number;
    rotation: number;
    opacity: number;
    sides: number;
    delay: number;
    speedX: number;
    speedY: number;
    rotationSpeed: number;
    hoverScale: number;
  }>>([]);

  // Initialize polygons with more properties
  useEffect(() => {
    polygonsRef.current = Array.from({ length: 18 }, (_, index) => {
      const size = Math.random() * 100 + 50;
      return {
        size: size,
        initialSize: size,
        top: Math.random() * 100,
        left: Math.random() * 100,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.3 + 0.1,
        sides: Math.floor(Math.random() * 3) + 3, // 3-5 sides
        delay: index * 0.1,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        hoverScale: Math.random() * 0.3 + 1.1, // Random scale between 1.1 and 1.4
      };
    });
  }, []);

  // Animation loop with smooth movements
  useEffect(() => {
    const animatePolygons = () => {
      polygonsRef.current = polygonsRef.current.map(polygon => {
        // Move polygons
        let newLeft = polygon.left + polygon.speedX;
        let newTop = polygon.top + polygon.speedY;
        
        // Bounce off edges
        if (newLeft <= 0 || newLeft >= 100) polygon.speedX *= -1;
        if (newTop <= 0 || newTop >= 100) polygon.speedY *= -1;
        
        // Update position
        polygon.left = Math.max(0, Math.min(100, newLeft));
        polygon.top = Math.max(0, Math.min(100, newTop));
        
        // Rotate slowly
        polygon.rotation += polygon.rotationSpeed;
        
        return polygon;
      });

      // Request next frame
      animationFrameRef.current = requestAnimationFrame(animatePolygons);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animatePolygons);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Render the polygons
  return (
    <div className="absolute inset-0 overflow-hidden">
      {polygonsRef.current.map((polygon, index) => (
        <div
          key={index}
          className="absolute transform transition-all duration-700 ease-in-out will-change-transform"
          style={{
            width: polygon.size,
            height: polygon.size,
            top: `${polygon.top}%`,
            left: `${polygon.left}%`,
            opacity: hoveredIndex === index ? polygon.opacity * 2 : polygon.opacity,
            transform: `rotate(${polygon.rotation}deg) scale(${hoveredIndex === index ? polygon.hoverScale : 1})`,
            transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.8s ease"
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div 
            className={`w-full h-full ${getPolygonClass(polygon.sides)} bg-gradient-to-r from-purple-500/20 to-blue-600/30 backdrop-blur-3xl border border-white/10 shadow-lg shadow-purple-500/5`}
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
    case 5:
      return "clip-path-pentagon";
    default:
      return "rounded-full";
  }
};

export default HeroSection;
