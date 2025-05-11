
import { useEffect, useRef, useState } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Smooth entrance animation for the canvas with longer duration
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 400);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particles: Particle[] = [];
    let animationId: number;
    let isInitialized = false;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
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
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        
        // Add different colored particles (mostly white with some blue/purple accents)
        const colorRand = Math.random();
        if (colorRand > 0.85) {
          // Purple particles
          this.color = `rgba(180, 160, 255, ${0.5 + Math.random() * 0.3})`;
        } else if (colorRand > 0.7) {
          // Blue particles
          this.color = `rgba(150, 180, 255, ${0.5 + Math.random() * 0.3})`;
        } else {
          // White particles (majority)
          this.color = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.3})`;
        }
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
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Initialize particles - use more particles for a denser effect
    const initParticles = () => {
      // Use more particles based on screen size
      const particleCount = Math.min(
        Math.floor(window.innerWidth * window.innerHeight / 8000),
        150
      );
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    // Connect particles with lines if they're close enough
    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            // Get colors for gradient based on particle colors
            const colorA = particles[a].color;
            const colorB = particles[b].color;
            
            // Create a gradient for the line
            const gradient = ctx.createLinearGradient(
              particles[a].x, particles[a].y,
              particles[b].x, particles[b].y
            );
            
            // Extract opacity from rgba
            const opacityA = parseFloat(colorA.slice(colorA.lastIndexOf(',') + 1, -1));
            const opacityB = parseFloat(colorB.slice(colorB.lastIndexOf(',') + 1, -1));
            
            const lineOpacity = (opacityA + opacityB) / 4 * (1 - distance / 100);
            gradient.addColorStop(0, colorA.replace(/[\d\.]+\)$/, `${lineOpacity})`));
            gradient.addColorStop(1, colorB.replace(/[\d\.]+\)$/, `${lineOpacity})`));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    // Use requestIdleCallback or setTimeout to defer initialization
    const initializeWhenIdle = () => {
      if (isInitialized) return;
      
      initParticles();
      animate();
      isInitialized = true;
    };
    
    // Initialize after a short delay to prioritize critical UI rendering
    const timeoutId = setTimeout(initializeWhenIdle, 600);
    
    return () => {
      clearTimeout(visibilityTimer);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      clearTimeout(timeoutId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-2000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

export default ParticleBackground;
