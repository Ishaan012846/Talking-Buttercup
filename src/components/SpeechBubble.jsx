import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SpeechBubble = ({ message, mood = 'happy' }) => {
  if (!message) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={message}
        initial={{ opacity: 0, y: 15, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        className="absolute top-[4%] left-1/2 -translate-x-1/2 z-40 max-w-[280px] sm:max-w-xs"
      >
        <div
          className={`relative px-5 py-3 rounded-2xl shadow-xl text-center backdrop-blur-md font-bold text-sm sm:text-base border ${
            mood === 'shy'
              ? 'bg-purple-900/90 text-purple-100 border-purple-400/50 shadow-purple-500/30'
              : mood === 'dizzy'
              ? 'bg-amber-900/90 text-amber-100 border-amber-400/50 shadow-amber-500/30'
              : mood === 'love'
              ? 'bg-pink-600/95 text-white border-pink-300 shadow-pink-500/50'
              : 'bg-slate-900/90 text-pink-200 border-pink-500/40 shadow-pink-500/20'
          }`}
        >
          <span>{message}</span>

          {/* Speech Bubble Tail Pointing Down */}
          <div
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 ${
              mood === 'shy'
                ? 'border-t-purple-900'
                : mood === 'dizzy'
                ? 'border-t-amber-900'
                : mood === 'love'
                ? 'border-t-pink-600'
                : 'border-t-slate-900'
            }`}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
