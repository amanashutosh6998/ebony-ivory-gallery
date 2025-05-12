
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

  // Particle animation
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
      Math.floor((canvas.width * canvas.height) / 10000),
      150
    );
    
    const particles = [];
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      hue: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.hue = 240; // Start with blue
      }
      
      update(progress: number) {
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        // Gradually shift color based on loading progress
        // From blue (240) to purple (280) as loading progresses
        this.hue = 240 + (progress / 100) * 80;
      }
      
      draw() {
        ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, 0.7)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Connect particles with lines
    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = (particles[a] as Particle).x - (particles[b] as Particle).x;
          const dy = (particles[a] as Particle).y - (particles[b] as Particle).y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = 1 - distance / 100;
            
            // Create a gradient based on the two particles
            const gradient = ctx.createLinearGradient(
              (particles[a] as Particle).x, (particles[a] as Particle).y,
              (particles[b] as Particle).x, (particles[b] as Particle).y
            );
            
            gradient.addColorStop(0, `hsla(${(particles[a] as Particle).hue}, 70%, 60%, ${opacity * 0.3})`);
            gradient.addColorStop(1, `hsla(${(particles[b] as Particle).hue}, 70%, 60%, ${opacity * 0.3})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo((particles[a] as Particle).x, (particles[a] as Particle).y);
            ctx.lineTo((particles[b] as Particle).x, (particles[b] as Particle).y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      // Change background gradient based on loading progress
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, `rgba(0, 0, 0, 1)`);
      
      // Gradually add more color to the background
      const alpha = loadingProgress / 100;
      bgGradient.addColorStop(1, `rgba(25, 5, 50, ${alpha})`);
      
      // Fill with semi-transparent background for trail effect
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        (particle as Particle).update(loadingProgress);
        (particle as Particle).draw();
      });
      
      connectParticles();
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [loadingProgress]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Loading Progress */}
      <div className="relative z-10 w-64 mb-4">
        <Progress 
          value={loadingProgress} 
          className="h-2 bg-gray-800"
        >
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full" 
               style={{
                 backgroundSize: '200% 100%',
                 animation: 'gradientShift 2s ease infinite'
               }}
          />
        </Progress>
        
        {/* Loading percentage */}
        <div className="text-xs text-gray-400 mt-2 text-center">
          {loadingProgress.toFixed(0)}%
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
