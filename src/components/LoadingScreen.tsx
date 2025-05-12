
import { useState, useEffect, useRef } from 'react';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  // Black Hole animation
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
    
    // Star and black hole properties
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const blackHoleRadius = Math.min(canvas.width, canvas.height) * 0.15;
    let blackHoleGlowSize = blackHoleRadius * 1.5;
    
    // Star properties
    const maxStarDistance = Math.min(canvas.width, canvas.height) * 0.3;
    let starDistance = maxStarDistance;
    const starRadius = blackHoleRadius * 0.4;
    const starColor = '#F9D923';
    
    // Stars in the background
    const stars: {x: number, y: number, size: number, alpha: number, speed: number}[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.3 + 0.1
      });
    }
    
    // Animation variables
    let angle = 0;
    let angularSpeed = 0.02;
    let animationId: number;
    
    // Animation function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw starry background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw moving stars in background
      stars.forEach(star => {
        // Move stars slightly
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw black hole glow
      const blackHoleGradient = ctx.createRadialGradient(
        centerX, centerY, blackHoleRadius * 0.8,
        centerX, centerY, blackHoleGlowSize
      );
      blackHoleGradient.addColorStop(0, 'rgba(138, 43, 226, 0.8)');
      blackHoleGradient.addColorStop(0.4, 'rgba(138, 43, 226, 0.4)');
      blackHoleGradient.addColorStop(0.8, 'rgba(138, 43, 226, 0.1)');
      blackHoleGradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleGlowSize, 0, Math.PI * 2);
      ctx.fillStyle = blackHoleGradient;
      ctx.fill();
      
      // Draw black hole
      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(138, 43, 226, 0.7)';
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Draw accretion disk (spiral effect)
      ctx.save();
      ctx.translate(centerX, centerY);
      
      for (let i = 0; i < 360; i += 5) {
        const rad = i * Math.PI / 180;
        const x1 = Math.cos(rad + angle) * blackHoleRadius;
        const y1 = Math.sin(rad + angle) * blackHoleRadius;
        const x2 = Math.cos(rad + angle) * (blackHoleRadius * 2);
        const y2 = Math.sin(rad + angle) * (blackHoleRadius * 2);
        
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, 'rgba(138, 43, 226, 0.8)');
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.restore();
      
      // Update star position (orbiting and getting closer to black hole)
      const starX = centerX + Math.cos(angle * 2) * starDistance;
      const starY = centerY + Math.sin(angle * 2) * starDistance;
      
      // Draw star with glow
      const starGradient = ctx.createRadialGradient(
        starX, starY, 0,
        starX, starY, starRadius * 1.5
      );
      starGradient.addColorStop(0, starColor);
      starGradient.addColorStop(0.4, 'rgba(249, 217, 35, 0.6)');
      starGradient.addColorStop(0.8, 'rgba(249, 217, 35, 0.2)');
      starGradient.addColorStop(1, 'rgba(249, 217, 35, 0)');
      
      ctx.beginPath();
      ctx.arc(starX, starY, starRadius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = starGradient;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(starX, starY, starRadius, 0, Math.PI * 2);
      ctx.fillStyle = starColor;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#F9D923';
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Draw energy trail from star to black hole
      const trailGradient = ctx.createLinearGradient(
        starX, starY,
        centerX, centerY
      );
      trailGradient.addColorStop(0, 'rgba(249, 217, 35, 0.7)');
      trailGradient.addColorStop(0.5, 'rgba(249, 217, 35, 0.3)');
      trailGradient.addColorStop(1, 'rgba(138, 43, 226, 0.5)');
      
      ctx.beginPath();
      ctx.moveTo(starX, starY);
      ctx.lineTo(centerX, centerY);
      ctx.strokeStyle = trailGradient;
      ctx.lineWidth = Math.max(1, starRadius * (1 - starDistance / maxStarDistance) * 0.8);
      ctx.stroke();
      
      // Update animation
      angle += angularSpeed;
      
      // Make star get closer to black hole based on loading progress
      const progressFactor = loadingProgress / 100;
      starDistance = maxStarDistance * (1 - progressFactor);
      
      // Increase black hole glow as star gets closer
      blackHoleGlowSize = blackHoleRadius * 1.5 * (1 + progressFactor * 0.5);
      
      // Speed up rotation as star gets closer
      angularSpeed = 0.02 + progressFactor * 0.03;
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [loadingProgress]);

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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Black Hole Canvas Animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />
      
      {/* Content overlay */}
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
          
          {/* Loading percentage */}
          <div className="text-xs text-gray-400 mt-2">
            {loadingProgress}%
          </div>
        </div>
      </div>
      
      {/* Add keyframe animations */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
