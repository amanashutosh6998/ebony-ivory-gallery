
import { useState, useEffect, useRef } from 'react';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Set up the canvas animation for the loading screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle class for the loading animation
    class LoadingParticle {
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
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        
        // Create a gradient palette of blues and purples
        const hue = Math.random() * 60 + 230; // Range from blue to purple
        this.color = `hsla(${hue}, 80%, 70%, ${0.7 + Math.random() * 0.3})`;
      }
      
      update(progress: number) {
        // Particles gravitate toward the center as progress increases
        const centerPull = progress / 100 * 0.4;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Calculate direction to center
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Add slight pull toward center based on progress
        if (dist > 5) {
          this.speedX += (dx / dist) * centerPull;
          this.speedY += (dy / dist) * centerPull;
        }
        
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Apply slight damping
        this.speedX *= 0.99;
        this.speedY *= 0.99;
        
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const particles: LoadingParticle[] = [];
    const particleCount = Math.min(
      Math.floor(window.innerWidth * window.innerHeight / 15000),
      80
    );
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new LoadingParticle());
    }
    
    // Connect particles with lines
    const connectParticles = (progress: number) => {
      const maxDistance = 100 + progress; // Connection distance increases with progress
      const opacity = 0.5 + (progress / 100 * 0.5); // Lines get more opaque with progress
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    let animationId: number;
    let lastProgress = 0;
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create a radial gradient background effect that shifts with progress
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      
      gradient.addColorStop(0, `rgba(20, 20, 30, 1)`);
      gradient.addColorStop(0.5, `rgba(10, 10, 25, 0.9)`);
      gradient.addColorStop(1, `rgba(0, 0, 15, 0.8)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update(loadingProgress);
        particle.draw();
      });
      
      // Connect particles
      connectParticles(loadingProgress);
      
      // Only reanimate if progress has changed or not complete
      if (loadingProgress < 100 || lastProgress !== loadingProgress) {
        lastProgress = loadingProgress;
        animationId = requestAnimationFrame(animate);
      }
    };
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [loadingProgress]);

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
          onComplete(); // Complete immediately without fade
        }
        return newValue;
      });
    }, 60); // Slight adjustment to timing for smoother progress

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Canvas for the loading animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-bold mb-8 text-white">
          Welcome
        </h2>
        
        <div className="w-64 mb-4">
          <Progress value={loadingProgress} className="h-2 bg-gray-700">
            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
          </Progress>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
