
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 opacity-0 animate-fade-in">
            <span className="block">Hello, I'm</span>
            <span className="block mt-2 text-5xl md:text-7xl lg:text-8xl">Aman Ashutosh</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto font-light text-gray-400 opacity-0 animate-fade-in" style={{animationDelay: "300ms"}}>
            Growth Analyst $ Growth Engineer
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 opacity-0 animate-fade-in" style={{animationDelay: "600ms"}}>
            <Button 
              className="bg-white text-black hover:bg-gray-200 border border-white px-8 py-6 text-lg"
              asChild
            >
              <a href="#projects">View My Work</a>
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white bg-transparent hover:bg-white hover:text-black px-8 py-6 text-lg"
              asChild
            >
              <a href="#contact">Contact Me</a>
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
