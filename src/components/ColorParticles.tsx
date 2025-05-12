import { useEffect, useRef, useState } from 'react';

interface ColorParticlesProps {
  colorScheme?: 'purple-blue' | 'blue-cyan' | 'purple-pink' | 'green-cyan';
  density?: 'low' | 'medium' | 'high';
}

const ColorParticles = ({ 
  colorScheme = 'purple-blue', 
  density = 'medium' 
}: ColorParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const explosionsRef = useRef<any[]>([]);
  
  // Define color ranges based on colorScheme
  const getColorRange = () => {
    switch (colorScheme) {
      case 'blue-cyan':
        return { min: 180, max: 220, saturation: 70 }; // Blue to cyan range
      case 'purple-pink':
        return { min: 270, max: 330, saturation: 75 }; // Purple to pink range
      case 'green-cyan':
        return { min: 140, max: 180, saturation: 65 }; // Green to cyan range
      case 'purple-blue':
      default:
        return { min: 240, max: 280, saturation: 70 }; // Purple to blue range
    }
  };
  
  // Define density
  const getDensityMultiplier = () => {
    switch (density) {
      case 'low': return 0.7;
      case 'high': return 1.5;
      case 'medium':
      default: return 1.0;
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    let particles: any[] = [];
    const colorRange = getColorRange();
    const densityMultiplier = getDensityMultiplier();
    
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
        y: e.clientY - rect.top,
        isActive: true
      };
      
      // Reset active state after a delay
      setTimeout(() => {
        mouseRef.current = { ...mouseRef.current, isActive: false };
      }, 100);
      
      // Create mini explosion on mouse move occasionally
      if (Math.random() < 0.05) {
        createExplosion(mouseRef.current.x, mouseRef.current.y, 3 + Math.random() * 3);
      }
    };
    
    class Explosion {
      x: number;
      y: number;
      particles: any[];
      lifetime: number;
      maxLifetime: number;
      
      constructor(x: number, y: number, particleCount: number) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.lifetime = 0;
        this.maxLifetime = 30;
        
        for (let i = 0; i < particleCount; i++) {
          this.particles.push(new ExplosionParticle(x, y, colorRange));
        }
      }
      
      update() {
        this.lifetime++;
        this.particles.forEach(p => p.update());
        return this.lifetime < this.maxLifetime;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        this.particles.forEach(p => p.draw(ctx));
      }
    }
    
    class ExplosionParticle {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      hue: number;
      alpha: number;
      
      constructor(x: number, y: number, colorRange: any) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 1.5 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.hue = Math.random() * (colorRange.max - colorRange.min) + colorRange.min;
        this.alpha = 1;
      }
      
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.04;
        this.speed *= 0.95;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        if (this.alpha <= 0) return;
        ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const createExplosion = (x: number, y: number, particleCount: number) => {
      explosionsRef.current.push(new Explosion(x, y, particleCount));
    };
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      hue: number;
      originalHue: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.originalHue = Math.random() * (colorRange.max - colorRange.min) + colorRange.min;
        this.hue = this.originalHue;
        this.color = `hsla(${this.hue}, ${colorRange.saturation}%, 60%, 0.7)`;
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
        
        // Interact with mouse
        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            // Change color when interacting with mouse
            const interactionHue = (this.hue + 40) % 360;
            this.color = `hsla(${interactionHue}, ${colorRange.saturation + 10}%, 70%, 0.8)`;
            
            // Repel from mouse
            const angle = Math.atan2(dy, dx);
            const force = 1 - distance / 100;
            this.speedX -= Math.cos(angle) * force * 0.2;
            this.speedY -= Math.sin(angle) * force * 0.2;
            
            // Occasionally create mini explosion
            if (Math.random() < 0.01) {
              createExplosion(this.x, this.y, 2 + Math.random() * 2);
            }
          } else {
            this.color = `hsla(${this.hue}, ${colorRange.saturation}%, 60%, 0.7)`;
          }
        } else {
          // Normal color when not interacting
          this.color = `hsla(${this.hue}, ${colorRange.saturation}%, 60%, 0.7)`;
        }
        
        // Damping but keep some momentum
        this.speedX *= 0.99;
        this.speedY *= 0.99;
        
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
        Math.floor((canvas.width * canvas.height) / 15000 * densityMultiplier),
        110
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
          
          // Dynamic connection distance based on mouse position
          let maxDistance = 100;
          
          if (mouseRef.current.isActive) {
            const midX = (particles[a].x + particles[b].x) / 2;
            const midY = (particles[a].y + particles[b].y) / 2;
            const dxMouse = midX - mouseRef.current.x;
            const dyMouse = midY - mouseRef.current.y;
            const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            
            if (mouseDist < 120) {
              maxDistance += 50 * (1 - mouseDist / 120);
            }
          }
          
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            
            // Create a colored gradient for the line
            const hueA = particles[a].hue;
            const hueB = particles[b].hue;
            
            const gradient = ctx.createLinearGradient(
              particles[a].x, particles[a].y,
              particles[b].x, particles[b].y
            );
            
            gradient.addColorStop(0, `hsla(${hueA}, ${colorRange.saturation}%, 60%, ${opacity * 0.3})`);
            gradient.addColorStop(1, `hsla(${hueB}, ${colorRange.saturation}%, 60%, ${opacity * 0.3})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Generate random small explosions occasionally
    const generateRandomExplosions = () => {
      if (Math.random() < 0.005) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        createExplosion(x, y, 2 + Math.random() * 3);
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Generate random explosions
      generateRandomExplosions();
      
      // Update and draw explosions
      explosionsRef.current = explosionsRef.current.filter(explosion => {
        const isAlive = explosion.update();
        explosion.draw(ctx);
        return isAlive;
      });
      
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
  }, [colorScheme, density]);
  
  // When color scheme changes, update the particles
  useEffect(() => {
    if (isInitialized && particlesRef.current.length > 0) {
      const colorRange = getColorRange();
      particlesRef.current.forEach(particle => {
        particle.originalHue = Math.random() * (colorRange.max - colorRange.min) + colorRange.min;
        particle.hue = particle.originalHue;
        particle.color = `hsl(${particle.hue}, ${colorRange.saturation}%, 60%)`;
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
