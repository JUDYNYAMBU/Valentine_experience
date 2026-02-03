import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
}

export function HeartBurst() {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const newParticles: HeartParticle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i * 360) / 12,
      distance: 80 + Math.random() * 40,
      size: 20 + Math.random() * 15,
      duration: 0.6 + Math.random() * 0.3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => {
        const radian = (particle.angle * Math.PI) / 180;
        const x = Math.cos(radian) * particle.distance;
        const y = Math.sin(radian) * particle.distance;

        return (
          <motion.div
            key={particle.id}
            className="absolute left-1/2 top-1/2"
            style={{
              fontSize: `${particle.size}px`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x,
              y,
              opacity: 0,
              scale: 1,
            }}
            transition={{
              duration: particle.duration,
              ease: 'easeOut',
            }}
          >
            💖
          </motion.div>
        );
      })}
    </div>
  );
}
