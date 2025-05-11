
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
        // Accelerate as percentage increases
        const increment = Math.max(1, Math.floor(10 / (100 - prev + 1)));
        const newValue = Math.min(100, prev + increment);
        
        // When we reach 100%, immediately complete
        if (newValue >= 100) {
          clearInterval(interval);
          // Complete immediately without fade animation
          onComplete();
        }
        return newValue;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-8 text-white">Loading</h2>
        
        <div className="w-64 mb-4">
          <Progress value={loadingProgress} className="h-2" />
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
