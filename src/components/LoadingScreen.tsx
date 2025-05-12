
import { useState, useEffect, useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import ColorParticles from './ColorParticles';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Staggered text animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Set up the text animation
  useEffect(() => {
    if (!textRef.current || !showText) return;
    
    const letters = textRef.current.querySelectorAll('.letter');
    
    letters.forEach((letter, index) => {
      setTimeout(() => {
        (letter as HTMLElement).style.opacity = '1';
        (letter as HTMLElement).style.transform = 'translateY(0)';
      }, 70 * index);
    });
  }, [showText]);

  useEffect(() => {
    // Simulate loading progress - more controlled acceleration
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        // Progress acceleration curve
        let increment;
        if (prev < 30) {
          increment = 1 + Math.floor(prev / 10); // Starts slower
        } else if (prev < 70) {
          increment = 2 + Math.floor((prev - 30) / 10); // Medium speed
        } else {
          increment = 1 + Math.floor((100 - prev) / 10); // Slows down at end
        }
        
        const newValue = Math.min(100, prev + increment);
        
        // When we reach 100%, complete the loading
        if (newValue >= 100) {
          clearInterval(interval);
          // Small delay for visual polish before completing
          setTimeout(onComplete, 300);
        }
        return newValue;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Split text into individual letters for animation
  const welcomeText = "Welcome";
  const letters = welcomeText.split('').map((letter, index) => (
    <span 
      key={index} 
      className="letter inline-block opacity-0 transform translate-y-4 transition-all duration-300"
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {letter}
    </span>
  ));

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Background particle animation */}
      <div className="absolute inset-0 overflow-hidden">
        <ColorParticles colorScheme="purple-blue" />
      </div>
      
      {/* Center glowing orb */}
      <div className="relative z-10 mb-12">
        <div 
          className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
          style={{
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.7), 0 0 80px rgba(59, 130, 246, 0.3)',
            animation: 'pulse 2s infinite ease-in-out'
          }}
        />
        
        {/* Orbiting small circles */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div 
            className="w-4 h-4 absolute rounded-full bg-blue-300"
            style={{ 
              top: '10%', 
              left: '50%',
              animation: 'orbit 6s linear infinite',
              boxShadow: '0 0 10px rgba(96, 165, 250, 0.7)'
            }} 
          />
          <div 
            className="w-3 h-3 absolute rounded-full bg-purple-300"
            style={{ 
              top: '50%', 
              left: '90%',
              animation: 'orbit 8s linear infinite 1s',
              boxShadow: '0 0 8px rgba(167, 139, 250, 0.7)'
            }} 
          />
          <div 
            className="w-2 h-2 absolute rounded-full bg-pink-300"
            style={{ 
              top: '80%', 
              left: '20%',
              animation: 'orbit 7s linear infinite 2s',
              boxShadow: '0 0 6px rgba(236, 72, 153, 0.7)'
            }} 
          />
        </div>
      </div>
      
      <div className="relative z-10 text-center">
        <div ref={textRef} className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          {letters}
        </div>
        
        <div className="w-64 mb-4 relative overflow-hidden rounded-full">
          <Progress 
            value={loadingProgress} 
            className="h-2 bg-gray-800"
          >
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-blue-400 to-purple-500 rounded-full relative"
              style={{
                backgroundSize: '200% 100%',
                animation: 'gradientShift 2s ease infinite'
              }}
            />
          </Progress>
          
          {/* Add loading percentage below */}
          <div className="text-xs text-gray-400 mt-2">
            {loadingProgress}%
          </div>
        </div>
      </div>
      
      {/* Add global keyframe animations - fixed by removing jsx and global props */}
      <style>{`
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
