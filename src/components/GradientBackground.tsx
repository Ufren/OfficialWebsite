import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { themeStore } from '../store/theme';

interface AuroraOrb {
  x: number;
  y: number;
  radius: number;
  hue: number;
  saturation: number;
  lightness: number;
  opacity: number;
  speedX: number;
  speedY: number;
  phase: number;
  pulseSpeed: number;
}

export const GradientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useStore(themeStore);

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

    const isDark = () => document.documentElement.classList.contains('dark');

    const orbs: AuroraOrb[] = [
      {
        x: 0.2, y: 0.3, radius: 500, hue: 170, saturation: 70, lightness: 50,
        opacity: 0.12, speedX: 0.3, speedY: 0.4, phase: 0, pulseSpeed: 0.5,
      },
      {
        x: 0.8, y: 0.2, radius: 450, hue: 220, saturation: 60, lightness: 45,
        opacity: 0.1, speedX: 0.35, speedY: 0.45, phase: 2, pulseSpeed: 0.6,
      },
      {
        x: 0.5, y: 0.7, radius: 550, hue: 280, saturation: 50, lightness: 40,
        opacity: 0.08, speedX: 0.25, speedY: 0.3, phase: 4, pulseSpeed: 0.4,
      },
      {
        x: 0.15, y: 0.8, radius: 350, hue: 140, saturation: 65, lightness: 45,
        opacity: 0.07, speedX: 0.4, speedY: 0.35, phase: 1, pulseSpeed: 0.55,
      },
      {
        x: 0.85, y: 0.6, radius: 400, hue: 320, saturation: 55, lightness: 40,
        opacity: 0.06, speedX: 0.3, speedY: 0.25, phase: 3, pulseSpeed: 0.45,
      },
    ];

    const drawAurora = () => {
      const dark = isDark();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        const pulse = Math.sin(time * orb.pulseSpeed + orb.phase) * 0.3 + 0.7;
        const currentRadius = orb.radius * pulse;

        const cx = canvas.width * orb.x + Math.sin(time * orb.speedX + orb.phase) * 80;
        const cy = canvas.height * orb.y + Math.cos(time * orb.speedY + orb.phase) * 60;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, currentRadius);

        if (dark) {
          const h = orb.hue;
          const s = orb.saturation;
          const l = orb.lightness;
          gradient.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, ${orb.opacity * 1.5})`);
          gradient.addColorStop(0.3, `hsla(${h}, ${s}%, ${l}%, ${orb.opacity * 0.8})`);
          gradient.addColorStop(0.6, `hsla(${h}, ${s - 10}%, ${l - 5}%, ${orb.opacity * 0.3})`);
          gradient.addColorStop(1, 'transparent');
        } else {
          const h = orb.hue;
          const s = orb.saturation * 0.5;
          const l = orb.lightness + 20;
          gradient.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, ${orb.opacity * 0.8})`);
          gradient.addColorStop(0.3, `hsla(${h}, ${s}%, ${l}%, ${orb.opacity * 0.4})`);
          gradient.addColorStop(0.6, `hsla(${h}, ${s - 5}%, ${l}%, ${orb.opacity * 0.15})`);
          gradient.addColorStop(1, 'transparent');
        }

        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      if (dark) {
        const waveY = canvas.height * 0.5 + Math.sin(time * 0.2) * 100;
        const waveGradient = ctx.createLinearGradient(0, waveY - 200, 0, waveY + 200);
        waveGradient.addColorStop(0, 'transparent');
        waveGradient.addColorStop(0.3, 'hsla(200, 60%, 50%, 0.02)');
        waveGradient.addColorStop(0.5, 'hsla(180, 70%, 45%, 0.04)');
        waveGradient.addColorStop(0.7, 'hsla(220, 60%, 50%, 0.02)');
        waveGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = waveGradient;
        ctx.fillRect(0, waveY - 200, canvas.width, 400);
      }
    };

    const animate = () => {
      time += 0.008;
      drawAurora();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
