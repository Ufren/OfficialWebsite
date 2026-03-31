import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isVisible ? 1 : 0, 
            opacity: isVisible ? 1 : 0 
          }}
          transition={{ duration: 0.2 }}
          className="w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(120, 120, 120, 0.15) 0%, rgba(80, 80, 80, 0.08) 40%, transparent 70%)',
          }}
        />
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isVisible ? 1 : 0, 
            opacity: isVisible ? 0.8 : 0 
          }}
          transition={{ duration: 0.15 }}
          className="w-2 h-2 rounded-full bg-[var(--color-text-primary)]"
        />
      </motion.div>
    </>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = Math.max(rect.width, rect.height);
    
    if (distance < maxDistance) {
      const strength = 0.3;
      x.set(deltaX * strength);
      y.set(deltaY * strength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} style={{ display: 'inline-block' }}>
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} style={{ display: 'inline-block', cursor: disabled ? 'not-allowed' : 'pointer' }}>
      {content}
    </div>
  );
};

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareEnable?: boolean;
  tiltMaxAngle?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  glareEnable = true,
  tiltMaxAngle = 8,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const percentX = mouseX / (rect.width / 2);
    const percentY = mouseY / (rect.height / 2);
    
    rotateX.set(-percentY * tiltMaxAngle);
    rotateY.set(percentX * tiltMaxAngle);
    
    if (glareEnable) {
      glareX.set(50 + percentX * 30);
      glareY.set(50 + percentY * 30);
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className={`relative ${className}`}
    >
      {children}
      
      {glareEnable && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{ zIndex: 1 }}
        >
          <motion.div
            className="absolute inset-0 opacity-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.1 : 0,
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  children,
  className = '',
}) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples(prev => [...prev, { x, y, id }]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 600);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute w-20 h-20 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 40,
            top: ripple.y - 40,
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          }}
        />
      ))}
    </div>
  );
};
