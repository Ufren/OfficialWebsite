import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { themeStore } from '../store/theme';

interface MorphingBlobProps {
  className?: string;
}

export const MorphingBlob: React.FC<MorphingBlobProps> = ({
  className = '',
}) => {
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
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const isDark = () => document.documentElement.classList.contains('dark');

    const blobs = [
      { cx: 0.3, cy: 0.4, radius: 180, hue: 170, sat: 60, light: 50, opacity: 0.15, speed: 0.4, points: 6 },
      { cx: 0.7, cy: 0.5, radius: 150, hue: 220, sat: 50, light: 45, opacity: 0.12, speed: 0.35, points: 5 },
      { cx: 0.5, cy: 0.3, radius: 120, hue: 280, sat: 45, light: 40, opacity: 0.1, speed: 0.5, points: 7 },
    ];

    const drawBlob = (
      cx: number,
      cy: number,
      baseRadius: number,
      hue: number,
      sat: number,
      light: number,
      opacity: number,
      speed: number,
      numPoints: number,
      phaseOffset: number
    ) => {
      const dark = isDark();
      const points: { x: number; y: number }[] = [];

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const noise = Math.sin(time * speed + phaseOffset + i * 1.5) * 0.3
          + Math.sin(time * speed * 0.7 + phaseOffset + i * 2.3) * 0.2;
        const r = baseRadius * (1 + noise);
        points.push({
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
        });
      }

      ctx.beginPath();
      ctx.moveTo(
        (points[points.length - 1].x + points[0].x) / 2,
        (points[points.length - 1].y + points[0].y) / 2
      );

      for (let i = 0; i < points.length; i++) {
        const next = points[(i + 1) % points.length];
        const midX = (points[i].x + next.x) / 2;
        const midY = (points[i].y + next.y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }

      ctx.closePath();

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 1.5);
      if (dark) {
        gradient.addColorStop(0, `hsla(${hue}, ${sat}%, ${light}%, ${opacity})`);
        gradient.addColorStop(0.5, `hsla(${hue}, ${sat}%, ${light}%, ${opacity * 0.5})`);
        gradient.addColorStop(1, 'transparent');
      } else {
        gradient.addColorStop(0, `hsla(${hue}, ${sat * 0.5}%, ${light + 20}%, ${opacity * 0.6})`);
        gradient.addColorStop(0.5, `hsla(${hue}, ${sat * 0.5}%, ${light + 20}%, ${opacity * 0.3})`);
        gradient.addColorStop(1, 'transparent');
      }

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      blobs.forEach((blob, i) => {
        const cx = w * blob.cx + Math.sin(time * 0.2 + i) * 30;
        const cy = h * blob.cy + Math.cos(time * 0.15 + i) * 20;
        drawBlob(
          cx, cy, blob.radius, blob.hue, blob.sat, blob.light,
          blob.opacity, blob.speed, blob.points, i * 2
        );
      });

      time += 0.01;
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
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ filter: 'blur(40px)' }}
    />
  );
};
