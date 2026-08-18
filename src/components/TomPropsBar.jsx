import React, { useState } from 'react';
import { Mic, MicOff, Coffee, Cookie, Wind, PartyPopper, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TomPropsBar = ({
  isListening,
  onToggleMic,
  onTextRepeatSubmit,
  onFeedCoffee,
  onFeedDonut,
  onPrankFart,
  onPartyHorn,
}) => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [typedText, setTypedText] = useState('');

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (typedText.trim()) {
      onTextRepeatSubmit(typedText.trim());
      setTypedText('');
      setShowTextInput(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 pb-1 z-40 relative pointer-events-auto">
      {/* Semi-Transparent Glassmorphic Props Bar (No solid dark bar!) */}
      <div className="bg-slate-950/40 backdrop-blur-md border border-white/20 rounded-3xl p-2 sm:p-2.5 shadow-2xl flex flex-col gap-2">
        <div className="flex items-center justify-around gap-1.5 sm:gap-2">
          {/* 1. Voice Repeater Button */}
          <button
            onClick={onToggleMic}
            className={`relative flex-1 py-2 px-3 rounded-2xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
              isListening
                ? 'bg-rose-600 text-white border-rose-300 animate-pulse shadow-lg shadow-rose-600/50'
                : 'bg-slate-900/60 text-pink-200 border-white/20 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 text-white animate-bounce" />
                <span>Listening...</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 text-pink-400" />
                <span>Talk to Him!</span>
              </>
            )}
          </button>

          {/* Type Text Drawer */}
          <button
            onClick={() => setShowTextInput(!showTextInput)}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-900/60 border border-white/20 text-cyan-300 hover:text-white hover:bg-slate-800 transition-all"
            title="Type text for Buttercup to repeat!"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* 2. Feed Coffee */}
          <button
            onClick={onFeedCoffee}
            className="p-2 sm:px-3 rounded-2xl bg-amber-950/60 border border-amber-500/50 text-amber-200 hover:bg-amber-900/80 transition-all flex items-center gap-1 font-bold text-xs shadow-md"
            title="Feed Iced Coffee"
          >
            <Coffee className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Coffee</span>
          </button>

          {/* 3. Feed Donut */}
          <button
            onClick={onFeedDonut}
            className="p-2 sm:px-3 rounded-2xl bg-pink-950/60 border border-pink-500/50 text-pink-200 hover:bg-pink-900/80 transition-all flex items-center gap-1 font-bold text-xs shadow-md"
            title="Feed Donut"
          >
            <Cookie className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">Donut</span>
          </button>

          {/* 4. Prank */}
          <button
            onClick={onPrankFart}
            className="p-2 sm:px-3 rounded-2xl bg-purple-950/60 border border-purple-500/50 text-purple-200 hover:bg-purple-900/80 transition-all flex items-center gap-1 font-bold text-xs shadow-md"
            title="Whoopee Cushion Prank"
          >
            <Wind className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Prank</span>
          </button>

          {/* 5. Party */}
          <button
            onClick={onPartyHorn}
            className="p-2 sm:px-3 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-rose-200 hover:bg-rose-900/80 transition-all flex items-center gap-1 font-bold text-xs shadow-md"
            title="Party Horn"
          >
            <PartyPopper className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">Party</span>
          </button>
        </div>

        {/* Text Drawer */}
        <AnimatePresence>
          {showTextInput && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleTextSubmit}
              className="flex items-center gap-2 pt-1 border-t border-white/10"
            >
              <input
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="Type anything for Buttercup to repeat back in squeaky voice..."
                className="flex-1 bg-slate-900/80 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Say It!
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
