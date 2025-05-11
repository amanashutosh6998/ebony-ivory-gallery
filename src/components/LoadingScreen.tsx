
import { useState, useEffect } from 'react';
import Typewriter from './Typewriter';
import { Loader } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Start the typewriter after a short delay
    const timer = setTimeout(() => {
      setShowTypewriter(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleTypewriterComplete = () => {
    // Add a slight delay after typewriter is done before transitioning
    setTimeout(() => {
      setLoadingComplete(true);
      // Give time for the fade-out animation before completing
      setTimeout(onComplete, 1000);
    }, 500);
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${loadingComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-center">
        {showTypewriter ? (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            <Typewriter 
              text="I am Aman Ashutosh" 
              speed={120} 
              onComplete={handleTypewriterComplete}
              className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200"
            />
          </h1>
        ) : (
          <div className="h-[60px]"></div>
        )}
        <Loader className="animate-spin text-white mx-auto mb-4 w-10 h-10" />
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute -bottom-32 -left-40 w-80 h-80 border border-white/10 rounded-full blur-sm"></div>
      <div className="absolute -top-72 -right-72 w-[500px] h-[500px] border border-white/10 rounded-full blur-sm"></div>
      <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-purple-500/50 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-blue-500/50 rounded-full blur-sm animate-pulse"></div>
    </div>
  );
};

export default LoadingScreen;
