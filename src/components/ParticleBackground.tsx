
import { useEffect, useRef, useState } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  
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
    
    // Track mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { 
        x: event.clientX,
        y: event.clientY,
        isActive: true 
      };
      
      // Reset the "active" state after a short delay
      setTimeout(() => {
        mouseRef.current = { ...mouseRef.current, isActive: false };
      }, 100);
    };
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      originalColor: string;
      maxSpeed: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 1.5 + 0.5;
        this.size = this.baseSize;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.maxSpeed = 2;
        
        // Add different colored particles (mostly white with some blue/purple accents)
        const colorRand = Math.random();
        if (colorRand > 0.9) {
          // Purple particles
          this.color = `rgba(180, 160, 255, ${0.6 + Math.random() * 0.4})`;
        } else if (colorRand > 0.8) {
          // Blue particles
          this.color = `rgba(150, 180, 255, ${0.6 + Math.random() * 0.4})`;
        } else if (colorRand > 0.7) {
          // Pink particles
          this.color = `rgba(255, 150, 220, ${0.6 + Math.random() * 0.4})`;
        } else if (colorRand > 0.6) {
          // Cyan particles
          this.color = `rgba(130, 220, 255, ${0.6 + Math.random() * 0.4})`;
        } else {
          // White particles (majority)
          this.color = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.3})`;
        }
        this.originalColor = this.color;
      }
      
      update() {
        // Apply cursor interaction
        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150; // The radius of effect around the cursor
          
          if (distance < maxDistance) {
            // Calculate the repulsion force (stronger when closer)
            const force = (1 - distance / maxDistance) * 3;
            
            // Calculate angle away from cursor
            const angle = Math.atan2(dy, dx);
            
            // Apply force to speed (pushing particles away from cursor)
            this.speedX -= Math.cos(angle) * force;
            this.speedY -= Math.sin(angle) * force;
            
            // Increase size temporarily based on proximity
            this.size = this.baseSize + (maxDistance - distance) / 10;
            
            // Brighten color when affected by cursor
            const brightenFactor = Math.min(1, (1 - distance / maxDistance) * 2);
            this.color = this.getHighlightColor(this.originalColor, brightenFactor);
          } else {
            // Reset color and size when out of range
            this.color = this.originalColor;
            this.size = this.baseSize;
          }
        } else {
          // Reset color and size when mouse is not active
          this.color = this.originalColor;
          this.size = this.baseSize;
        }
        
        // Limit maximum speed
        if (this.speedX > this.maxSpeed) this.speedX = this.maxSpeed;
        if (this.speedX < -this.maxSpeed) this.speedX = -this.maxSpeed;
        if (this.speedY > this.maxSpeed) this.speedY = this.maxSpeed;
        if (this.speedY < -this.maxSpeed) this.speedY = -this.maxSpeed;
        
        // Apply damping to slow particles down
        this.speedX *= 0.96;
        this.speedY *= 0.96;
        
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      getHighlightColor(color: string, factor: number) {
        // Extract RGBA values from string
        const colorMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (colorMatch) {
          const r = parseInt(colorMatch[1]);
          const g = parseInt(colorMatch[2]);
          const b = parseInt(colorMatch[3]);
          const a = colorMatch[4] ? parseFloat(colorMatch[4]) : 1;
          
          // Brighten values
          const brightenR = Math.min(255, r + 50 * factor);
          const brightenG = Math.min(255, g + 50 * factor);
          const brightenB = Math.min(255, b + 50 * factor);
          
          return `rgba(${brightenR}, ${brightenG}, ${brightenB}, ${a})`;
        }
        
        return color; // Return original if parsing fails
      }
      
      draw() {
        if (!ctx) return;
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
          
          // Add a cursor proximity effect to line connections too
          let maxDistance = 100;
          
          if (mouseRef.current.isActive) {
            // Calculate distance of the midpoint between particles to the cursor
            const midX = (particles[a].x + particles[b].x) / 2;
            const midY = (particles[a].y + particles[b].y) / 2;
            const dxMouse = midX - mouseRef.current.x;
            const dyMouse = midY - mouseRef.current.y;
            const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            
            // Increase connection distance if near cursor
            if (mouseDist < 150) {
              maxDistance += 80 * (1 - mouseDist / 150);
            }
          }
          
          if (distance < maxDistance) {
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
            
            // Lines get more visible when near the cursor
            let lineOpacityMultiplier = 1;
            if (mouseRef.current.isActive) {
              const midX = (particles[a].x + particles[b].x) / 2;
              const midY = (particles[a].y + particles[b].y) / 2;
              const dxMouse = midX - mouseRef.current.x;
              const dyMouse = midY - mouseRef.current.y;
              const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
              
              if (mouseDist < 150) {
                lineOpacityMultiplier = 1 + (1 - mouseDist / 150);
              }
            }
            
            const lineOpacity = (opacityA + opacityB) / 4 * (1 - distance / maxDistance) * lineOpacityMultiplier;
            gradient.addColorStop(0, colorA.replace(/[\d\.]+\)$/, `${lineOpacity})`));
            gradient.addColorStop(1, colorB.replace(/[\d\.]+\)$/, `${lineOpacity})`));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = mouseRef.current.isActive ? 0.8 : 0.5;
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
      window.removeEventListener('mousemove', handleMouseMove);
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
