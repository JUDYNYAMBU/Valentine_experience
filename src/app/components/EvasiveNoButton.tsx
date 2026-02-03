import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { playWhooshSound } from '@/app/utils/sounds';

interface EvasiveNoButtonProps {
  onEscape: () => void;
}

export function EvasiveNoButton({ onEscape }: EvasiveNoButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasEscaped, setHasEscaped] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
      );

      // If cursor is within 100px, move the button away
      if (distance < 100) {
        escapeFromCursor(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!buttonRef.current || e.touches.length === 0) return;

      const touch = e.touches[0];
      const rect = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(touch.clientX - buttonCenterX, 2) + Math.pow(touch.clientY - buttonCenterY, 2)
      );

      if (distance < 100) {
        escapeFromCursor(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const escapeFromCursor = (cursorX: number, cursorY: number) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    // Calculate escape direction (opposite to cursor)
    const angle = Math.atan2(buttonCenterY - cursorY, buttonCenterX - cursorX);
    
    // Random escape distance
    const escapeDistance = 150 + Math.random() * 100;
    
    const newX = Math.cos(angle) * escapeDistance;
    const newY = Math.sin(angle) * escapeDistance;

    // Keep button within viewport bounds
    const maxX = window.innerWidth - rect.width - 50;
    const maxY = window.innerHeight - rect.height - 50;
    
    const boundedX = Math.max(-rect.left + 20, Math.min(newX, maxX - rect.left));
    const boundedY = Math.max(-rect.top + 20, Math.min(newY, maxY - rect.top));

    setPosition({ x: boundedX, y: boundedY });
    setHasEscaped(true);
    playWhooshSound();
    onEscape();
    
    setTimeout(() => setHasEscaped(false), 300);
  };

  return (
    <motion.button
      ref={buttonRef}
      className="px-10 py-5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-xl shadow-lg transition-colors cursor-not-allowed"
      style={{
        position: 'relative',
        x: position.x,
        y: position.y,
      }}
      animate={{
        scale: hasEscaped ? 1.1 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 15,
      }}
      onClick={(e) => {
        e.preventDefault();
        // Never allow clicking
      }}
    >
      No
    </motion.button>
  );
}
