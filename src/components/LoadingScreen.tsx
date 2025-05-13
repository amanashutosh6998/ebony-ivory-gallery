
import { useState, useEffect, useRef } from 'react';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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
  
  // Colorful particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    const particleCount = Math.min(
      Math.floor((canvas.width * canvas.height) / 15000),
      100
    );
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        
        // Generate various colors for particles
        const colorSchemes = [
          // Blue range
          `rgba(90, 120, 255, ${0.7 + Math.random() * 0.3})`,
          // Cyan range
          `rgba(80, 210, 255, ${0.7 + Math.random() * 0.3})`,
          // Purple range
          `rgba(180, 120, 255, ${0.7 + Math.random() * 0.3})`,
          // Pink range
          `rgba(255, 120, 220, ${0.7 + Math.random() * 0.3})`,
          // Teal range
          `rgba(80, 220, 200, ${0.7 + Math.random() * 0.3})`,
        ];
        
        this.color = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const particles: Particle[] = [];
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  const rocketSize = 24; // Size of the rocket icon

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Larger Loading Progress Bar with Rocket */}
      <div className="relative z-10 w-[70%] max-w-[500px] mb-4">
        <div className="relative">
          <Progress 
            value={loadingProgress} 
            className="h-6 bg-gray-800 rounded-full overflow-hidden"
          />
          
          {/* Rocket Icon */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2"
            style={{ 
              left: `calc(${loadingProgress}% - ${rocketSize/2}px)`,
              transition: 'left 0.3s ease-out'
            }}
          >
            <div className="flex justify-center items-center">
              {/* SVG Rocket - positioned at the loading progress point */}
              <svg 
                width={rocketSize} 
                height={rocketSize} 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path 
                  d="M12 2C9 2 4 3 4 10C4 15.5 7 19 9.5 20.5C10 21 11 21 11.5 20.5C11.5 20.5 12 20 12 19.5C12 19 11.5 18.5 11 18C10.5 17.5 10 16.5 10 15C10 13.5 11 12 12.5 12C14 12 15 13 15 14.5C15 16 14 17 13 17.75C12.5 18.25 12 19 12 19.75C12 20.5 13 21 13 21C13 21 14 21 14.5 20.5C17 19 20 15.5 20 10C20 3 15 2 12 2Z" 
                  fill="white"
                />
                <path 
                  d="M13 15.5C13 16.33 12.33 17 11.5 17C10.67 17 10 16.33 10 15.5C10 14.67 10.67 14 11.5 14C12.33 14 13 14.67 13 15.5Z" 
                  fill="#5F9EF9"
                />
                <path 
                  d="M9 10.5C9 11.33 8.33 12 7.5 12C6.67 12 6 11.33 6 10.5C6 9.67 6.67 9 7.5 9C8.33 9 9 9.67 9 10.5Z" 
                  fill="#5F9EF9"
                />
                <path 
                  d="M18 10.5C18 11.33 17.33 12 16.5 12C15.67 12 15 11.33 15 10.5C15 9.67 15.67 9 16.5 9C17.33 9 18 9.67 18 10.5Z" 
                  fill="#5F9EF9"
                />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Loading percentage */}
        <div className="text-sm text-gray-300 mt-2 text-center">
          {loadingProgress.toFixed(0)}%
        </div>
      </div>
      
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
