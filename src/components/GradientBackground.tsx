import React, { useEffect, useRef } from 'react';

export const GradientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGradientOrb = (
      x: number,
      y: number,
      radius: number,
      opacity: number,
      timeOffset: number
    ) => {
      const pulse = Math.sin(time * 0.5 + timeOffset) * 0.3 + 0.7;
      const currentRadius = radius * pulse;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, currentRadius);
      const isDark = document.documentElement.classList.contains('dark');
      
      if (isDark) {
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.15})`);
        gradient.addColorStop(0.5, `rgba(200, 200, 200, ${opacity * 0.08})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      } else {
        gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity * 0.08})`);
        gradient.addColorStop(0.5, `rgba(50, 50, 50, ${opacity * 0.04})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.beginPath();
      ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawMeshGradient = () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const baseOpacity = isDark ? 0.6 : 0.4;

      drawGradientOrb(
        canvas.width * 0.2 + Math.sin(time * 0.3) * 50,
        canvas.height * 0.3 + Math.cos(time * 0.4) * 30,
        400,
        baseOpacity,
        0
      );

      drawGradientOrb(
        canvas.width * 0.8 + Math.cos(time * 0.35) * 40,
        canvas.height * 0.2 + Math.sin(time * 0.45) * 35,
        350,
        baseOpacity * 0.8,
        2
      );

      drawGradientOrb(
        canvas.width * 0.5 + Math.sin(time * 0.25) * 60,
        canvas.height * 0.7 + Math.cos(time * 0.3) * 45,
        450,
        baseOpacity * 0.7,
        4
      );

      drawGradientOrb(
        canvas.width * 0.15 + Math.cos(time * 0.4) * 35,
        canvas.height * 0.8 + Math.sin(time * 0.35) * 40,
        300,
        baseOpacity * 0.6,
        1
      );

      drawGradientOrb(
        canvas.width * 0.85 + Math.sin(time * 0.3) * 45,
        canvas.height * 0.6 + Math.cos(time * 0.25) * 50,
        380,
        baseOpacity * 0.5,
        3
      );
    };

    const animate = () => {
      time += 0.01;
      drawMeshGradient();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
