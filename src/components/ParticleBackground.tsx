import React, { useRef, useEffect, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { themeStore } from '../store/theme';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  mouseInteractionRadius?: number;
  className?: string;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 80,
  connectionDistance = 150,
  mouseInteractionRadius = 200,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const theme = useStore(themeStore);

  const getParticleColor = useCallback((hue: number, opacity: number) => {
    return `hsla(${hue}, 80%, 60%, ${opacity})`;
  }, []);

  const createParticle = useCallback((width: number, height: number): Particle => {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      hue: theme === 'dark' ? 160 + Math.random() * 40 : 170 + Math.random() * 30,
    };
  }, [theme]);

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = Array.from({ length: particleCount }, () => 
      createParticle(width, height)
    );
  }, [particleCount, createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInteractionRadius) {
          const force = (mouseInteractionRadius - distance) / mouseInteractionRadius;
          particle.vx -= (dx / distance) * force * 0.02;
          particle.vy -= (dy / distance) * force * 0.02;
        }

        const maxSpeed = 2;
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(0, 212, 170, ${opacity})`
              : `rgba(0, 180, 148, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = getParticleColor(particle.hue, particle.opacity);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 3
        );
        gradient.addColorStop(0, getParticleColor(particle.hue, particle.opacity * 0.5));
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, connectionDistance, mouseInteractionRadius, initParticles, getParticleColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: theme === 'dark' ? 0.6 : 0.4 }}
    />
  );
};
