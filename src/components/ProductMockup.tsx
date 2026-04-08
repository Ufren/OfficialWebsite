import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProductMockupProps {
  className?: string;
}

export const ProductMockup: React.FC<ProductMockupProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        <div
          className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)]"
          style={{
            transform: 'translateZ(0px)',
            boxShadow: isHovered
              ? '0 40px 80px -20px rgba(0, 0, 0, 0.3), 0 0 1px rgba(0, 0, 0, 0.1)'
              : '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-[var(--color-bg-card)] text-xs text-[var(--color-text-muted)] border border-[var(--color-border)]">
                UfrenClaw
              </div>
            </div>
            <div className="w-[42px]" />
          </div>

          <div className="p-4 space-y-3">
            <div className="flex gap-3">
              <div className="w-48 shrink-0 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-3 space-y-2">
                <div className="h-2 w-3/4 rounded bg-[var(--color-text-muted)]/20" />
                <div className="h-2 w-1/2 rounded bg-[var(--color-text-muted)]/20" />
                <div className="h-2 w-2/3 rounded bg-[var(--color-text-muted)]/20" />
                <div className="h-2 w-1/3 rounded bg-[var(--color-text-muted)]/20" />
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full rounded bg-[var(--color-accent)]/20" />
                  <div className="h-2 w-4/5 rounded bg-[var(--color-text-muted)]/15" />
                  <div className="h-2 w-3/5 rounded bg-[var(--color-text-muted)]/15" />
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex gap-2 items-start">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-accent)]/20 shrink-0" />
                  <div className="flex-1 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-3 space-y-2">
                    <div className="h-2 w-4/5 rounded bg-[var(--color-text-muted)]/20" />
                    <div className="h-2 w-3/5 rounded bg-[var(--color-text-muted)]/20" />
                  </div>
                </div>
                <div className="flex gap-2 items-start justify-end">
                  <div className="flex-1 max-w-[80%] rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 p-3 space-y-2">
                    <div className="h-2 w-4/5 rounded bg-[var(--color-accent)]/30" />
                    <div className="h-2 w-3/5 rounded bg-[var(--color-accent)]/30" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[var(--color-text-muted)]/20 shrink-0" />
                </div>
                <div className="flex gap-2 items-start">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-accent)]/20 shrink-0" />
                  <div className="flex-1 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-3 space-y-2">
                    <div className="h-2 w-3/4 rounded bg-[var(--color-text-muted)]/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            transform: 'translateZ(50px)',
            background: isHovered
              ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)'
              : 'none',
            transition: 'background 0.3s ease',
          }}
        />

        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 rounded-full blur-xl"
          style={{
            background: 'var(--color-accent-glow)',
            opacity: isHovered ? 0.8 : 0.4,
            transition: 'opacity 0.3s ease',
          }}
        />
      </motion.div>
    </div>
  );
};
