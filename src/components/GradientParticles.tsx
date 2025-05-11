
import { useEffect, useRef } from 'react';

const GradientParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particles: Particle[] = [];
    let animationId: number;
    let mousePos = { x: 0, y: 0 };
    
    // Set canvas to full size of container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Reinitialize particles when canvas size changes
      initParticles();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos = {
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
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.hue = Math.random() * 120 + 240; // Blue to purple range
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
        
        // Gradually shift color based on position (gradient effect)
        const gradientProgress = this.y / canvas.height;
        this.hue = 240 + gradientProgress * 120; // Shift from blue to purple
        this.color = `hsl(${this.hue}, 70%, 60%)`;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Initialize particles
    const initParticles = () => {
      // Scale particle count based on canvas area
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 20000),
        60
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
          
          if (distance < 80) {
            const opacity = 1 - distance / 80;
            const gradient = ctx.createLinearGradient(
              particles[a].x,
              particles[a].y,
              particles[b].x,
              particles[b].y
            );
            gradient.addColorStop(0, `${particles[a].color.slice(0, -1)}, ${opacity * 0.2})`);
            gradient.addColorStop(1, `${particles[b].color.slice(0, -1)}, ${opacity * 0.2})`);
            
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
    
    // Animation loop
    const animate = () => {
      // Use a semi-transparent clear to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      animationId = requestAnimationFrame(animate);
    };
    
    // Initial setup
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Initialize
    resizeCanvas();
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default GradientParticles;
