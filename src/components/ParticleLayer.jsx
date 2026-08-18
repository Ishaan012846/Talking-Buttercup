import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ParticleLayer Component
 * Manages all animated particle effects:
 * - 💫 Orbiting Stars & Birds (Head Tap)
 * - 💖 Pink Heart Confetti Explosion (Shirt Tap)
 * - ✨ Trailing Star Sparkles (Hair Hover Brush)
 * - 💨 Vent Soot Particles (Hair Cleaning)
 */
export const ParticleLayer = ({
  showHeadOrbit,
  heartConfetti,
  cursorTrail,
  sootParticles,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {/* 1. Orbiting Stars and Birds Over Head */}
      {showHeadOrbit && (
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-64 h-32 flex items-center justify-center pointer-events-none">
          {/* Orbiting Star 1 */}
          <div className="absolute animate-orbit-star text-amber-300 text-3xl filter drop-shadow-[0_0_8px_rgba(252,211,77,0.9)]">
            ⭐
          </div>
          {/* Orbiting Star 2 */}
          <div
            className="absolute animate-orbit-star text-yellow-400 text-2xl filter drop-shadow-[0_0_8px_rgba(250,204,21,0.9)]"
            style={{ animationDelay: '-0.7s' }}
          >
            💫
          </div>
          {/* Orbiting Bird 1 */}
          <div
            className="absolute animate-orbit-bird text-cyan-300 text-2xl filter drop-shadow-[0_0_6px_rgba(103,232,249,0.8)]"
            style={{ animationDelay: '-1.1s' }}
          >
            🐦
          </div>
          {/* Orbiting Bird 2 */}
          <div
            className="absolute animate-orbit-bird text-pink-300 text-xl"
            style={{ animationDelay: '-1.8s' }}
          >
            🐥
          </div>
          {/* Dizzy Swirl */}
          <div className="absolute text-purple-300 text-4xl animate-spin duration-1000 opacity-70">
            🌀
          </div>
        </div>
      )}

      {/* 2. Pink Heart Confetti Explosion */}
      <AnimatePresence>
        {heartConfetti.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0.2,
              opacity: 1,
              rotate: particle.rotate,
            }}
            animate={{
              x: particle.x + particle.vx * 1.8,
              y: particle.y + particle.vy * 1.8 - 60,
              scale: [0.3, 1.4, 1],
              opacity: [1, 1, 0],
              rotate: particle.rotate + particle.spin,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute text-2xl sm:text-3xl filter drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]"
          >
            {particle.icon || '💖'}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 3. Trailing Star Particles (Mouse Brush Position) */}
      <AnimatePresence>
        {cursorTrail.map((trail) => (
          <motion.div
            key={trail.id}
            initial={{
              x: trail.x - 12,
              y: trail.y - 12,
              scale: 0.4,
              opacity: 1,
            }}
            animate={{
              y: trail.y - 40,
              scale: [0.4, 1.2, 0],
              opacity: [1, 0.8, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="absolute text-lg sm:text-xl pointer-events-none filter drop-shadow-[0_0_6px_rgba(253,224,71,0.9)]"
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 4. Vent Soot Dust Floating Off Hair */}
      <AnimatePresence>
        {sootParticles.map((soot) => (
          <motion.div
            key={soot.id}
            initial={{
              x: soot.x,
              y: soot.y,
              scale: 0.8,
              opacity: 0.85,
            }}
            animate={{
              x: soot.x + (Math.random() * 40 - 20),
              y: soot.y - (40 + Math.random() * 30),
              scale: [0.8, 1.3, 0.2],
              opacity: [0.85, 0.4, 0],
              rotate: 60,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute w-3 h-3 rounded-full bg-slate-700/80 border border-slate-600 filter blur-[1px]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
