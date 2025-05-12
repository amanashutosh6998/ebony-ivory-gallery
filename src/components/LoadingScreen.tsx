
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
    // Simulate loading progress with improved curve
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        // Improved progress acceleration curve
        let increment;
        if (prev < 20) {
          increment = 0.7 + Math.random() * 0.5; // Slower start
        } else if (prev < 60) {
          increment = 1.2 + Math.random() * 0.8; // Medium pace
        } else if (prev < 85) {
          increment = 0.8 + Math.random() * 0.5; // Slowing down
        } else {
          increment = 0.4 + Math.random() * 0.3; // Very slow at end
        }
        
        const newValue = Math.min(100, prev + increment);
        
        // When we reach 100%, complete the loading
        if (newValue >= 100) {
          clearInterval(interval);
          // Small delay for visual polish before completing
          setTimeout(onComplete, 500);
        }
        return newValue;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Improved Black Hole animation
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
    
    // Stars in the background - more stars for richer night sky
    const stars: {x: number, y: number, size: number, alpha: number, speed: number, twinkle: number, twinkleSpeed: number}[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
        twinkle: Math.random() * Math.PI * 2, // Phase for twinkling
        twinkleSpeed: 0.03 + Math.random() * 0.02 // Twinkling speed
      });
    }
    
    // Animation variables
    let angle = 0;
    let angularSpeed = 0.02;
    let animationId: number;
    
    // Special effects
    const energyTrails: {x1: number, y1: number, x2: number, y2: number, alpha: number, width: number}[] = [];
    const maxTrails = 12;
    
    // Add new energy trail
    const addEnergyTrail = (x1: number, y1: number, x2: number, y2: number) => {
      if (energyTrails.length >= maxTrails) return;
      
      energyTrails.push({
        x1, y1, x2, y2,
        alpha: 0.7 + Math.random() * 0.3,
        width: 0.5 + Math.random() * 1.5
      });
    };
    
    // Animation function
    const draw = () => {
      // Clear canvas with black background that has subtle gradient
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(canvas.width, canvas.height)
      );
      bgGradient.addColorStop(0, '#0a0014');
      bgGradient.addColorStop(0.7, '#06000c');
      bgGradient.addColorStop(1, '#030007');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw moving stars in background with twinkling effect
      stars.forEach(star => {
        // Move stars slightly
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Update twinkle effect
        star.twinkle += star.twinkleSpeed;
        const twinkleAlpha = (Math.sin(star.twinkle) + 1) * 0.5;
        
        // Draw star with twinkling
        const starGlow = ctx.createRadialGradient(
          star.x, star.y, 0, 
          star.x, star.y, star.size * 3
        );
        starGlow.addColorStop(0, `rgba(255, 255, 255, ${star.alpha * twinkleAlpha})`);
        starGlow.addColorStop(0.5, `rgba(200, 220, 255, ${star.alpha * twinkleAlpha * 0.4})`);
        starGlow.addColorStop(1, `rgba(180, 200, 255, 0)`);
        
        ctx.fillStyle = starGlow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkleAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw black hole glow with improved quality
      for (let i = 0; i < 3; i++) {
        const blackHoleGradient = ctx.createRadialGradient(
          centerX, centerY, blackHoleRadius * 0.8,
          centerX, centerY, blackHoleGlowSize * (1 + i * 0.3)
        );
        blackHoleGradient.addColorStop(0, `rgba(138, 43, 226, ${0.8 - i * 0.2})`);
        blackHoleGradient.addColorStop(0.4, `rgba(138, 43, 226, ${0.4 - i * 0.1})`);
        blackHoleGradient.addColorStop(0.8, `rgba(138, 43, 226, ${0.1 - i * 0.03})`);
        blackHoleGradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, blackHoleGlowSize * (1 + i * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = blackHoleGradient;
        ctx.fill();
      }
      
      // Draw black hole
      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(138, 43, 226, 0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Draw accretion disk with improved effect
      ctx.save();
      ctx.translate(centerX, centerY);
      
      for (let i = 0; i < 360; i += 3) {
        const rad = i * Math.PI / 180;
        const innerRadius = blackHoleRadius;
        const outerRadius = blackHoleRadius * (2 + Math.sin(rad * 3 + angle * 2) * 0.2);
        
        const x1 = Math.cos(rad + angle) * innerRadius;
        const y1 = Math.sin(rad + angle) * innerRadius;
        const x2 = Math.cos(rad + angle) * outerRadius;
        const y2 = Math.sin(rad + angle) * outerRadius;
        
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        
        // More vibrant colors in the accretion disk
        const hueShift = (i % 40) < 20 ? 60 : 0; // Creates banding effect
        gradient.addColorStop(0, `rgba(${138 + hueShift}, ${43 + hueShift/2}, 226, 0.9)`);
        gradient.addColorStop(0.5, `rgba(${200 + hueShift/2}, ${100 + hueShift/3}, 255, 0.5)`);
        gradient.addColorStop(1, `rgba(${138 + hueShift}, ${43 + hueShift/2}, 226, 0)`);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 + Math.random();
        ctx.stroke();
      }
      ctx.restore();
      
      // Update star position (orbiting and getting closer to black hole)
      const progressFactor = loadingProgress / 100;
      starDistance = maxStarDistance * (1 - progressFactor);
      const starX = centerX + Math.cos(angle * 2) * starDistance;
      const starY = centerY + Math.sin(angle * 2) * starDistance;
      
      // Draw energy trails from star to black hole
      if (Math.random() < 0.4) {
        addEnergyTrail(
          starX + (Math.random() - 0.5) * starRadius,
          starY + (Math.random() - 0.5) * starRadius,
          centerX + (Math.random() - 0.5) * blackHoleRadius * 0.5,
          centerY + (Math.random() - 0.5) * blackHoleRadius * 0.5
        );
      }
      
      // Update and draw energy trails
      for (let i = energyTrails.length - 1; i >= 0; i--) {
        const trail = energyTrails[i];
        trail.alpha -= 0.04;
        
        if (trail.alpha <= 0) {
          energyTrails.splice(i, 1);
          continue;
        }
        
        const trailGradient = ctx.createLinearGradient(
          trail.x1, trail.y1, trail.x2, trail.y2
        );
        trailGradient.addColorStop(0, `rgba(249, 217, 35, ${trail.alpha})`);
        trailGradient.addColorStop(0.5, `rgba(249, 150, 100, ${trail.alpha * 0.7})`);
        trailGradient.addColorStop(1, `rgba(138, 43, 226, ${trail.alpha * 0.5})`);
        
        ctx.beginPath();
        ctx.moveTo(trail.x1, trail.y1);
        ctx.lineTo(trail.x2, trail.y2);
        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = trail.width;
        ctx.stroke();
      }
      
      // Draw star with enhanced glow
      if (progressFactor < 0.99) {  // Hide star when loading is nearly complete
        // Outer glow
        const starGlowSize = starRadius * (2 + Math.sin(Date.now() / 300) * 0.3);
        const starGradient = ctx.createRadialGradient(
          starX, starY, 0,
          starX, starY, starGlowSize
        );
        starGradient.addColorStop(0, 'rgba(255, 235, 180, 0.8)');
        starGradient.addColorStop(0.4, 'rgba(249, 217, 35, 0.6)');
        starGradient.addColorStop(0.7, 'rgba(255, 150, 50, 0.2)');
        starGradient.addColorStop(1, 'rgba(255, 100, 50, 0)');
        
        ctx.beginPath();
        ctx.arc(starX, starY, starGlowSize, 0, Math.PI * 2);
        ctx.fillStyle = starGradient;
        ctx.fill();
        
        // Core
        ctx.beginPath();
        ctx.arc(starX, starY, starRadius * (0.8 + Math.sin(Date.now() / 200) * 0.1), 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#FFB830';
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Add turbulence to star surface
        for (let i = 0; i < 8; i++) {
          const flareAngle = Math.PI * 2 * i / 8 + Date.now() / 2000;
          const flareX = starX + Math.cos(flareAngle) * starRadius * 1.1;
          const flareY = starY + Math.sin(flareAngle) * starRadius * 1.1;
          
          ctx.beginPath();
          ctx.arc(flareX, flareY, starRadius * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 200, 0.4)';
          ctx.fill();
        }
        
        // Draw energy trail from star to black hole
        const trailGradient = ctx.createLinearGradient(
          starX, starY,
          centerX, centerY
        );
        trailGradient.addColorStop(0, 'rgba(249, 217, 35, 0.7)');
        trailGradient.addColorStop(0.3, 'rgba(255, 150, 50, 0.5)');
        trailGradient.addColorStop(0.7, 'rgba(200, 100, 255, 0.3)');
        trailGradient.addColorStop(1, 'rgba(138, 43, 226, 0.1)');
        
        ctx.beginPath();
        ctx.moveTo(starX, starY);
        
        // Add curve to the trail for more natural look
        const midX = (starX + centerX) / 2 + (Math.sin(angle * 3) * 20);
        const midY = (starY + centerY) / 2 + (Math.cos(angle * 2) * 20);
        ctx.quadraticCurveTo(midX, midY, centerX, centerY);
        
        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = Math.max(1, starRadius * (1 - starDistance / maxStarDistance) * 0.8);
        ctx.stroke();
      }
      
      // Update animation
      angle += angularSpeed;
      
      // Make star get closer to black hole based on loading progress
      
      // Increase black hole glow as star gets closer
      blackHoleGlowSize = blackHoleRadius * 1.5 * (1 + progressFactor * 0.8);
      
      // Speed up rotation as star gets closer
      angularSpeed = 0.02 + progressFactor * 0.05;
      
      // Additional visual effect when star is almost consumed
      if (progressFactor > 0.95) {
        ctx.fillStyle = `rgba(138, 43, 226, ${(progressFactor - 0.95) * 20})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
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
            {loadingProgress.toFixed(0)}%
          </div>
        </div>
      </div>
      
      <style jsx>{`
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
