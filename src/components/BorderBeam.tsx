import React from 'react';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = '',
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  colorFrom = 'var(--color-text-muted)',
  colorTo = 'transparent',
  delay = 0,
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}
      style={{
        overflow: 'hidden',
        padding: borderWidth,
      }}
    >
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
          borderRadius: '50%',
          animation: `border-beam-spin ${duration}s linear ${delay}s infinite`,
          top: '-50%',
          left: '-50%',
        }}
      />
    </div>
  );
};

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  beamSize?: number;
  beamDuration?: number;
  beamColorFrom?: string;
  beamColorTo?: string;
}

export const AnimatedBorder: React.FC<AnimatedBorderProps> = ({
  children,
  className = '',
  beamSize = 200,
  beamDuration = 12,
  beamColorFrom,
  beamColorTo,
}) => {
  return (
    <div className={`relative rounded-2xl ${className}`}>
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{ padding: 1 }}
      >
        <div
          className="absolute"
          style={{
            width: beamSize,
            height: beamSize,
            background: `linear-gradient(to right, ${beamColorFrom || 'var(--color-text-secondary)'}, ${beamColorTo || 'transparent'})`,
            borderRadius: '50%',
            animation: `border-beam-spin ${beamDuration}s linear infinite`,
            top: '-50%',
            left: '-50%',
          }}
        />
      </div>
      <div className="relative rounded-2xl overflow-hidden bg-[var(--color-bg-card)]">
        {children}
      </div>
    </div>
  );
};
