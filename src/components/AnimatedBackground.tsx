
import { useState, useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      initParticles();
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };
    
    const initParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: `hsl(${Math.random() * 60 + 220}, 80%, 70%)`,
          velocity: {
            x: (Math.random() - 0.5) * 0.7,
            y: (Math.random() - 0.5) * 0.7
          },
          lastPositions: []
        });
      }
    };
    
    const drawParticle = (particle: any) => {
      if (!ctx) return;

      // Draw particle trail
      if (particle.lastPositions.length > 0) {
        for (let i = 0; i < particle.lastPositions.length; i++) {
          const pos = particle.lastPositions[i];
          const alpha = 0.5 * (1 - i / particle.lastPositions.length);
          const radius = particle.radius * (1 - i / particle.lastPositions.length * 0.5);
          
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${parseInt(particle.color.split(',')[0].slice(4))}, 80%, 70%, ${alpha})`;
          ctx.fill();
        }
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };
    
    const connect = () => {
      if (!ctx) return;
      
      const lineOpacityBase = 0.8;
      const maxDistance = 150;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = lineOpacityBase * (1 - distance / maxDistance);
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.strokeStyle = `rgba(150, 180, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create a radial gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width / 1.5, canvas.height / 1.5)
      );
      gradient.addColorStop(0, 'rgba(10, 10, 25, 1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Black hole effect around cursor - ENHANCED
      const blackHoleRadius = 200; // Increased radius of effect
      const blackHoleStrength = 5.0; // Increased strength of the pull
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];
        
        // Store last position
        particle.lastPositions.unshift({ x: particle.x, y: particle.y });
        if (particle.lastPositions.length > 5) {
          particle.lastPositions.pop();
        }
        
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        // Black hole (cursor) interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < blackHoleRadius) {
          // Calculate gravitational force (stronger when closer)
          const angle = Math.atan2(dy, dx);
          const force = blackHoleStrength * (1 - distance / blackHoleRadius);
          
          // Pull towards cursor (black hole effect) - Increased strength
          particle.velocity.x += Math.cos(angle) * force * 0.2;
          particle.velocity.y += Math.sin(angle) * force * 0.2;
          
          // Add slight orbital motion to prevent all particles from collapsing to center
          const perpAngle = angle + Math.PI / 2;
          const orbitalForce = force * 0.05;
          particle.velocity.x += Math.cos(perpAngle) * orbitalForce;
          particle.velocity.y += Math.sin(perpAngle) * orbitalForce;
        }
        
        // Boundary checking
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.velocity.x = -particle.velocity.x;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.velocity.y = -particle.velocity.y;
        }
        
        // Damping (slow down over time)
        particle.velocity.x *= 0.99;
        particle.velocity.y *= 0.99;
        
        // Add small random movement
        particle.velocity.x += (Math.random() - 0.5) * 0.01;
        particle.velocity.y += (Math.random() - 0.5) * 0.01;
        
        drawParticle(particle);
      }
      
      connect();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ touchAction: 'none' }}
    />
  );
};

export default AnimatedBackground;
