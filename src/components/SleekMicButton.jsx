import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * SleekMicButton Component
 * Single clean floating Voice Mic button for Talking Tom pitch-shifted voice mimicry!
 * Eliminates all extra cluttered bottom bars & props.
 */
export const SleekMicButton = ({ mimicState, onToggleMic }) => {
  return (
    <div className="w-full max-w-xs mx-auto pb-4 z-40 relative flex justify-center select-none pointer-events-auto">
      <motion.button
        onClick={onToggleMic}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`relative flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-black text-sm shadow-2xl border-2 transition-all ${
          mimicState === 'listening'
            ? 'bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white border-white animate-mic-pulse shadow-rose-600/60'
            : mimicState === 'mimicking'
            ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-white animate-pulse shadow-amber-500/60'
            : 'bg-slate-950/70 backdrop-blur-md text-pink-300 border-pink-400/50 hover:bg-slate-900 hover:text-white shadow-pink-500/30'
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
