
import { useEffect, useRef, useState } from 'react';

interface ExplosionParticle {
  x: number;
  y: number;
  initialX: number;
  initialY: number;
  size: number;
  speed: number;
  angle: number;
  color: string;
  alpha: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

interface ExplosionType {
  x: number;
  y: number;
  particles: ExplosionParticle[];
  lifetime: number;
  maxLifetime: number;
  update: () => boolean;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const explosionsRef = useRef<ExplosionType[]>([]);
  
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

    // Explosion effect class
    class Explosion implements ExplosionType {
      x: number;
      y: number;
      particles: ExplosionParticle[];
      lifetime: number;
      maxLifetime: number;
      
      constructor(x: number, y: number, intensity: number = 1) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.lifetime = 0;
        this.maxLifetime = 40;
        
        // Create explosion particles - use intensity to determine count
        const particleCount = Math.floor(Math.random() * 5 * intensity + 3 * intensity);
        for (let i = 0; i < particleCount; i++) {
          this.particles.push(new ExplosionParticle(x, y));
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
    
    // Individual explosion particle
    class ExplosionParticle implements ExplosionParticle {
      x: number;
      y: number;
      initialX: number;
      initialY: number;
      size: number;
      speed: number;
      angle: number;
      color: string;
      alpha: number;
      
      constructor(x: number, y: number) {
        this.initialX = x;
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2;
        
        // Bright colors for explosion particles
        const hue = Math.random() * 60 + 180; // Blue to purple range
        this.color = `hsla(${hue}, 100%, 70%, 1)`;
        this.alpha = 1;
      }
      
      update() {
        // Move outward from center
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        // Fade out
        this.alpha -= 0.03;
        if (this.alpha < 0) this.alpha = 0;
        
        // Slow down
        this.speed *= 0.95;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color.replace('1)', `${this.alpha})`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Track mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Create small explosion occasionally when mouse moves
      if (Math.random() < 0.05) {
        explosionsRef.current.push(new Explosion(x, y, 0.5));
      }
      
      mouseRef.current = { 
        x,
        y,
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
      interactionColor: string;
      originalColor: string;
      maxSpeed: number;
      clusterId: number;
      
      constructor(clusterId = -1) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 1.5 + 0.5;
        this.size = this.baseSize;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.maxSpeed = 2;
        this.clusterId = clusterId;
        
        // Add different colored particles (mostly white with some blue/purple accents)
        const colorRand = Math.random();
        if (colorRand > 0.9) {
          // Purple particles
          this.color = `rgba(180, 160, 255, ${0.6 + Math.random() * 0.4})`;
          this.interactionColor = `rgba(220, 180, 255, ${0.8 + Math.random() * 0.2})`;
        } else if (colorRand > 0.8) {
          // Blue particles
          this.color = `rgba(150, 180, 255, ${0.6 + Math.random() * 0.4})`;
          this.interactionColor = `rgba(170, 200, 255, ${0.8 + Math.random() * 0.2})`;
        } else if (colorRand > 0.7) {
          // Pink particles
          this.color = `rgba(255, 150, 220, ${0.6 + Math.random() * 0.4})`;
          this.interactionColor = `rgba(255, 180, 230, ${0.8 + Math.random() * 0.2})`;
        } else if (colorRand > 0.6) {
          // Cyan particles
          this.color = `rgba(130, 220, 255, ${0.6 + Math.random() * 0.4})`;
          this.interactionColor = `rgba(160, 230, 255, ${0.8 + Math.random() * 0.2})`;
        } else {
          // White particles (majority)
          this.color = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.3})`;
          this.interactionColor = `rgba(255, 255, 255, ${0.7 + Math.random() * 0.2})`;
        }
        this.originalColor = this.color;
      }
      
      update() {
        // Apply cursor interaction - maintain particle size
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
            
            // Keep size constant, but change color
            this.color = this.interactionColor;
            
            // Create small explosion occasionally when interacting
            if (Math.random() < 0.01) {
              const explosionX = this.x + Math.random() * 20 - 10;
              const explosionY = this.y + Math.random() * 20 - 10;
              explosionsRef.current.push(new Explosion(explosionX, explosionY, 1));
            }
          } else {
            // Reset color when out of range
            this.color = this.originalColor;
          }
        } else {
          // Reset color when mouse is not active
          this.color = this.originalColor;
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
        
        // Add random motion for more natural movement
        this.speedX += (Math.random() - 0.5) * 0.03;
        this.speedY += (Math.random() - 0.5) * 0.03;
        
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Generate clusters of particles
    const clusters: {centerX: number, centerY: number, radius: number}[] = [];
    const numClusters = Math.floor(Math.random() * 3) + 2; // 2-4 clusters
    
    for (let i = 0; i < numClusters; i++) {
      clusters.push({
        centerX: Math.random() * canvas.width,
        centerY: Math.random() * canvas.height,
        radius: Math.random() * 100 + 50
      });
    }
    
    // Initialize particles - use more particles for a denser effect
    const initParticles = () => {
      // Use more particles based on screen size
      const particleCount = Math.min(
        Math.floor(window.innerWidth * window.innerHeight / 7000),
        180
      );
      
      particles = [];
      
      // Create 70% of particles in clusters, 30% random
      const clusteredParticles = Math.floor(particleCount * 0.7);
      const randomParticles = particleCount - clusteredParticles;
      
      // Add clustered particles
      let particlesPerCluster = Math.floor(clusteredParticles / clusters.length);
      for (let c = 0; c < clusters.length; c++) {
        for (let i = 0; i < particlesPerCluster; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * clusters[c].radius;
          
          const particle = new Particle(c);
          particle.x = clusters[c].centerX + Math.cos(angle) * distance;
          particle.y = clusters[c].centerY + Math.sin(angle) * distance;
          particles.push(particle);
        }
      }
      
      // Add random particles
      for (let i = 0; i < randomParticles; i++) {
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
              
              // Create burst effect when mouse is over a cluster connection
              if (mouseDist < 30 && particles[a].clusterId === particles[b].clusterId && 
                  particles[a].clusterId !== -1 && Math.random() < 0.02) {
                explosionsRef.current.push(new Explosion(midX, midY, 3));
              }
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
            
            // Use different colors for lines in clusters
            if (particles[a].clusterId === particles[b].clusterId && particles[a].clusterId !== -1) {
              // Enhanced colors for cluster connections
              let clusterHue = 220; // Blue base
              if (particles[a].clusterId % 3 === 0) clusterHue = 280; // Purple
              if (particles[a].clusterId % 3 === 1) clusterHue = 180; // Cyan
              if (particles[a].clusterId % 3 === 2) clusterHue = 330; // Pink
              
              gradient.addColorStop(0, `hsla(${clusterHue}, 70%, 60%, ${lineOpacity * 1.2})`);
              gradient.addColorStop(1, `hsla(${clusterHue}, 70%, 60%, ${lineOpacity * 1.2})`);
            } else {
              gradient.addColorStop(0, colorA.replace(/[\d\.]+\)$/, `${lineOpacity})`));
              gradient.addColorStop(1, colorB.replace(/[\d\.]+\)$/, `${lineOpacity})`));
            }
            
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
    
    // Randomly generate spontaneous tiny explosions for visual interest
    const generateRandomExplosions = () => {
      if (Math.random() < 0.01 && explosionsRef.current.length < 5) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        explosionsRef.current.push(new Explosion(x, y, 0.5));
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Generate random explosions
      generateRandomExplosions();
      
      // Update and draw explosions
      explosionsRef.current = explosionsRef.current.filter(explosion => {
        const isAlive = explosion.update();
        explosion.draw(ctx);
        return isAlive;
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
