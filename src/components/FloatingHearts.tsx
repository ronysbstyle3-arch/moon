import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerHeartBurst } from '../utils/confetti';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const FloatingHearts: React.FC = () => {
  const [clickHearts, setClickHearts] = useState<HeartParticle[]>([]);

  const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#e11d48'];

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Don't trigger if clicked on an interactive input or button
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }

      const newHeart: HeartParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.floor(Math.random() * 16) + 20,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      setClickHearts((prev) => [...prev.slice(-15), newHeart]);
      
      // Also occasionally trigger small confetti heart burst
      if (Math.random() > 0.6) {
        triggerHeartBurst(e.clientX, e.clientY);
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Ambient floating background hearts
  const ambientHearts = [
    { left: '5%', duration: 14, delay: 0, size: 18 },
    { left: '15%', duration: 18, delay: 2, size: 24 },
    { left: '28%', duration: 16, delay: 4, size: 14 },
    { left: '42%', duration: 22, delay: 1, size: 28 },
    { left: '58%', duration: 15, delay: 3, size: 16 },
    { left: '72%', duration: 19, delay: 5, size: 22 },
    { left: '85%', duration: 17, delay: 2, size: 15 },
    { left: '94%', duration: 21, delay: 6, size: 20 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Ambient background floating items */}
      {ambientHearts.map((h, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.45, 0.6, 0],
            rotate: [0, 25, -25, 10]
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            left: h.left,
            fontSize: `${h.size}px`,
            color: '#f43f5e'
          }}
        >
          💖
        </motion.div>
      ))}

      {/* Dynamic click heart effects */}
      <AnimatePresence>
        {clickHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, scale: 0.5, x: h.x - h.size / 2, y: h.y - h.size / 2 }}
            animate={{
              opacity: 0,
              scale: 1.8,
              y: h.y - 70,
              x: h.x + (Math.random() * 40 - 20)
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setClickHearts((prev) => prev.filter((item) => item.id !== h.id));
            }}
            style={{
              position: 'fixed',
              fontSize: `${h.size}px`,
              zIndex: 9999
            }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
