
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        // Create a natural loading curve
        let increment;
        if (prev < 20) {
          increment = 0.7 + Math.random() * 0.5; // Start slowly
        } else if (prev < 60) {
          increment = 1.2 + Math.random() * 0.8; // Medium pace
        } else if (prev < 85) {
          increment = 0.8 + Math.random() * 0.5; // Slow down
        } else {
          increment = 0.4 + Math.random() * 0.3; // Very slow at end
        }
        
        const newValue = Math.min(100, prev + increment);
        
        if (newValue >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
        }
        return newValue;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Simple Loading Progress Bar */}
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
