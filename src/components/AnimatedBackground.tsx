
import { useState, useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  trail: Array<{x: number, y: number, opacity: number}>;
  hue: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const initStars = () => {
      starsRef.current = Array.from({ length: 100 }, () => createStar());
    };
    
    const createStar = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.5 + 0.1,
      trail: [],
      hue: Math.floor(Math.random() * 60) + 220, // Blue to purple hues
    });
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create subtle gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, '#10101e');
      gradient.addColorStop(1, '#000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Mouse attraction area
      const attractionRadius = 300;
      
      // Update and render stars
      starsRef.current.forEach(star => {
        // Calculate distance to mouse
        const dx = mousePosition.x - star.x;
        const dy = mousePosition.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Add to trail before updating position
        if (star.trail.length > 15) {
          star.trail.pop();
        }
        
        star.trail.unshift({
          x: star.x,
          y: star.y,
          opacity: star.opacity
        });
        
        // Update position with mouse attraction/repulsion
        if (distance < attractionRadius) {
          const force = (attractionRadius - distance) / attractionRadius;
          star.x += dx * force * 0.02;
          star.y += dy * force * 0.02;
        }
        
        // Normal movement
        star.y -= star.speed;
        
        // Wrap around screen
        if (star.y < -10) {
          star.y = canvas.height + 10;
          star.x = Math.random() * canvas.width;
        }
        if (star.x < -10) star.x = canvas.width + 10;
        if (star.x > canvas.width + 10) star.x = -10;
        
        // Draw trail first (from oldest to newest)
        star.trail.forEach((point, index) => {
          const trailOpacity = point.opacity * (1 - index / star.trail.length);
          const size = star.size * (1 - index / star.trail.length * 0.7);
          
          ctx.beginPath();
          ctx.fillStyle = `hsla(${star.hue}, 80%, 70%, ${trailOpacity * 0.4})`;
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Draw star
        ctx.beginPath();
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2);
        glow.addColorStop(0, `hsla(${star.hue}, 80%, 80%, ${star.opacity})`);
        glow.addColorStop(1, `hsla(${star.hue}, 80%, 50%, 0)`);
        ctx.fillStyle = glow;
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.fillStyle = `hsla(${star.hue}, 100%, 70%, ${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw connection lines between nearby stars
      drawConnections(ctx);
      
      animFrameRef.current = requestAnimationFrame(animate);
    };
    
    const drawConnections = (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < starsRef.current.length; i++) {
        for (let j = i + 1; j < starsRef.current.length; j++) {
          const star1 = starsRef.current[i];
          const star2 = starsRef.current[j];
          
          const dx = star1.x - star2.x;
          const dy = star1.y - star2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 180, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(star1.x, star1.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.stroke();
          }
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10" 
    />
  );
};

export default AnimatedBackground;
