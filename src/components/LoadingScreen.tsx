
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  onComplete: () => void;
  initialProgress?: number;
}

const LoadingScreen = ({ onComplete, initialProgress = 0 }: LoadingScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(initialProgress);
  
  useEffect(() => {
    // Start with faster initial loading
    const initialDelay = 30; // Faster interval in ms
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        // Create an accelerated loading curve
        let increment;
        if (prev < 40) {
          increment = 2 + Math.random() * 1; // Faster start
        } else if (prev < 80) {
          increment = 1.5 + Math.random() * 0.8; // Medium pace
        } else {
          increment = 1 + Math.random() * 0.5; // Still reasonably fast at the end
        }
        
        const newValue = Math.min(100, prev + increment);
        
        if (newValue >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200); // Reduced delay after reaching 100%
        }
        return newValue;
      });
    }, initialDelay);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      <div className="relative z-10 w-[70%] max-w-[500px]">
        <Progress 
          value={loadingProgress} 
          className="h-6 bg-gray-800 rounded-full overflow-hidden"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
