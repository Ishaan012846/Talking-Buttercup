import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * SleekMicButton Component
 * Fixed Floating Overlay Anchored at Bottom Center:
 * - 100% Guaranteed to be visible on all mobile phone screens (iPhone & Android)!
 */
export const SleekMicButton = ({ mimicState, onToggleMic }) => {
  return (
    <div className="fixed bottom-4 sm:bottom-6 inset-x-0 mx-auto w-max z-50 flex justify-center select-none pointer-events-auto filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
      <motion.button
        onClick={onToggleMic}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`relative flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-black text-sm sm:text-base shadow-2xl border-2 transition-all ${
          mimicState === 'listening'
            ? 'bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white border-white animate-mic-pulse shadow-rose-600/80 ring-4 ring-rose-500/40'
            : mimicState === 'mimicking'
            ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-white animate-pulse shadow-amber-500/80 ring-4 ring-amber-500/40'
            : 'bg-slate-950/90 backdrop-blur-md text-pink-300 border-pink-400/80 hover:bg-slate-900 hover:text-white shadow-pink-500/40 ring-2 ring-pink-400/30'
        }`}
      >
        {mimicState === 'listening' ? (
          <>
            <MicOff className="w-5 h-5 text-white animate-bounce" />
            <span>Listening... Speak Now!</span>
          </>
        ) : mimicState === 'mimicking' ? (
          <>
            <Mic className="w-5 h-5 text-amber-300 animate-spin" />
            <span>Mimicking Voice!</span>
          </>
        ) : (
          <>
            <Mic className="w-5 h-5 text-pink-400" />
            <span>Talk to Buttercup!</span>
          </>
        )}
      </motion.button>
    </div>
  );
};
