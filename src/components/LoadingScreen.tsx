
import { useState, useEffect } from 'react';
import { Loader, Percent } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingPercentage(prev => {
        // Accelerate as percentage increases
        const increment = Math.max(1, Math.floor(10 / (100 - prev + 1)));
        const newValue = Math.min(100, prev + increment);
        
        // When we reach 100%, prepare to transition out
        if (newValue >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoadingComplete(true);
            // Give time for the fade-out animation before completing
            setTimeout(onComplete, 1000);
          }, 500);
        }
        return newValue;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
      loadingComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="text-center">
        <div className="relative mb-8 flex items-center justify-center">
          <Loader className="animate-spin text-white w-16 h-16" />
          <div className="absolute flex items-center justify-center">
            <span className="text-white font-bold text-xl">{loadingPercentage}%</span>
          </div>
        </div>
        
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${loadingPercentage}%` }}
          ></div>
        </div>
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
