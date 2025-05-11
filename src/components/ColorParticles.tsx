import { useEffect, useRef, useState } from 'react';

interface ColorParticlesProps {
  colorScheme?: 'purple-blue' | 'blue-cyan' | 'purple-pink';
}

const ColorParticles = ({ colorScheme = 'purple-blue' }: ColorParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  // Define color ranges based on colorScheme
  const getColorRange = () => {
    switch (colorScheme) {
      case 'blue-cyan':
        return { min: 180, max: 220 }; // Blue to cyan range
      case 'purple-pink':
        return { min: 270, max: 330 }; // Purple to pink range
      case 'purple-blue':
      default:
        return { min: 240, max: 280 }; // Purple to blue range
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    let particles: any[] = [];
    const colorRange = getColorRange();
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      if (isInitialized) {
        initParticles();
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      hue: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.hue = Math.random() * (colorRange.max - colorRange.min) + colorRange.min;
        this.color = `hsl(${this.hue}, 70%, 60%)`;
      }
      
      update() {
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        // Gradually shift color based on position
        const gradientProgress = this.y / canvas.height;
        this.hue = colorRange.min + gradientProgress * (colorRange.max - colorRange.min);
        this.color = `hsl(${this.hue}, 70%, 60%)`;
        
        // Interact with mouse
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = 1 - distance / 100;
          this.speedX += Math.cos(angle) * force * 0.1;
          this.speedY += Math.sin(angle) * force * 0.1;
        }
        
        // Damping but keep some momentum
        this.speedX *= 0.995;
        this.speedY *= 0.995;
        
        // Add slight randomness to keep particles moving
        this.speedX += (Math.random() - 0.5) * 0.01;
        this.speedY += (Math.random() - 0.5) * 0.01;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const initParticles = () => {
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 15000),
        80
      );
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
      particlesRef.current = particles;
      setIsInitialized(true);
    };
    
    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = 1 - distance / 100;
            const gradient = ctx.createLinearGradient(
              particles[a].x, particles[a].y,
              particles[b].x, particles[b].y
            );
            gradient.addColorStop(0, `${particles[a].color.slice(0, -1)}, ${opacity * 0.3})`);
            gradient.addColorStop(1, `${particles[b].color.slice(0, -1)}, ${opacity * 0.3})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    initParticles();
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [colorScheme]);
  
  // When color scheme changes, update the particles
  useEffect(() => {
    if (isInitialized && particlesRef.current.length > 0) {
      const colorRange = getColorRange();
      particlesRef.current.forEach(particle => {
        particle.hue = Math.random() * (colorRange.max - colorRange.min) + colorRange.min;
        particle.color = `hsl(${particle.hue}, 70%, 60%)`;
      });
    }
  }, [colorScheme, isInitialized]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        opacity: isInitialized ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  );
};

export default ColorParticles;
