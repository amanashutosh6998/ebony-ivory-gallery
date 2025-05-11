
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronUp } from "lucide-react";

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const calculateScrollProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    // Calculate progress
    const totalScroll = documentHeight - windowHeight;
    const currentProgress = Math.min(scrollTop / totalScroll, 1);
    setScrollProgress(currentProgress * 100);
    
    // Show scroll-to-top button after scrolling down 20% of the page
    setShowScrollTop(scrollTop > windowHeight * 0.2);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", calculateScrollProgress);
    return () => window.removeEventListener("scroll", calculateScrollProgress);
  }, []);

  return (
    <>
      {/* Scroll indicator */}
      <div className="fixed right-2 top-1/2 transform -translate-y-1/2 h-1/3 w-1 bg-gray-800/30 rounded-full z-50">
        <div 
          className="bg-white rounded-full w-full transition-all duration-300"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-4 bottom-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-full shadow-lg transition-all duration-300 z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </>
  );
};

export default ScrollIndicator;
