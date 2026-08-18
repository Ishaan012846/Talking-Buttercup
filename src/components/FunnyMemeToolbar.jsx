import React from 'react';
import { Sparkles, Laugh, Skull, Frown, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * FunnyMemeToolbar Component
 * Quick meme reactions toolbar for Anajli / Anjalo:
 * - 😱 Cartoon Scream!
 * - 😂 Hysterical Laugh!
 * - 💥 Bonk Boing!
 * - 🎺 Sad Trombone Fail!
 * - 🎉 Yippee Cheer!
 */
export const FunnyMemeToolbar = ({
  onScream,
  onHystericalLaugh,
  onBonk,
  onSadFail,
  onYippeeCheer,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto pb-2 z-40 relative flex justify-center select-none pointer-events-auto">
      <div className="bg-slate-950/60 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 flex items-center justify-around gap-1 sm:gap-2 shadow-2xl">
        {/* 1. Cartoon Scream */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onScream}
          className="p-2 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-300 hover:bg-rose-500 hover:text-white transition-all shadow-md"
          title="Cartoon Scream (AAAHHH!)"
        >
          <Skull className="w-4 h-4" />
        </motion.button>

        {/* 2. Hysterical Laugh */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onHystericalLaugh}
          className="p-2 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-white transition-all shadow-md"
          title="Hysterical Laugh (BWAHAHA!)"
        >
          <Laugh className="w-4 h-4" />
        </motion.button>

        {/* 3. Bonk Boing */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBonk}
          className="p-2 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all shadow-md"
          title="Bonk Boing!"
        >
          <Sparkles className="w-4 h-4" />
        </motion.button>

        {/* 4. Sad Trombone Fail */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onSadFail}
          className="p-2 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 hover:bg-purple-500 hover:text-white transition-all shadow-md"
          title="Sad Trombone Fail Meme"
        >
          <Frown className="w-4 h-4" />
        </motion.button>

        {/* 5. Yippee Cheer */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onYippeeCheer}
          className="p-2 rounded-full bg-pink-500/20 border border-pink-500/50 text-pink-300 hover:bg-pink-500 hover:text-white transition-all shadow-md"
          title="Yippee Cheer Fanfare!"
        >
          <PartyPopper className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};
