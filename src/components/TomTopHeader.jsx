import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * TomTopHeader Component
 * Floating Semi-Transparent Top Bar:
 * - Eliminates solid dark navy bars!
 * - Level Heart Badge (Top Left)
 * - Hearts (+3,900), Paw Coins (352), Blue Gems (💎 120) (Top Center)
 * - Pink Close/Settings Button (Top Right)
 */
export const TomTopHeader = ({
  level = 50,
  heartsCount = 3900,
  coinsCount = 352,
  gemsCount = 120,
  isMuted,
  toggleMute,
  voiceProfile,
  setVoiceProfile,
  onResetGame,
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto px-4 pt-3 pb-1 z-40 relative flex items-center justify-between select-none pointer-events-auto">
      {/* 1. Level Heart Badge (Top Left) */}
      <div className="relative flex items-center justify-center cursor-pointer group">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#a3e635] via-[#84cc16] to-[#4ade80] p-1 shadow-[0_0_20px_rgba(163,230,53,0.7)] flex items-center justify-center animate-pulse-glow">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#ec4899] to-[#be123c] flex items-center justify-center border-2 border-white shadow-inner">
            <div className="flex flex-col items-center justify-center">
              <span className="text-white font-black text-lg sm:text-xl leading-none filter drop-shadow-md">
                {level}
              </span>
              <span className="text-[9px] font-bold text-pink-200 uppercase -mt-0.5 tracking-tighter">
                LVL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Currency & Resource Counter Pills (Top Center Floating Glassmorphic) */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Pink Hearts Cash Pill */}
        <div className="bg-slate-900/40 backdrop-blur-md border-2 border-pink-400/70 rounded-full px-2.5 sm:px-3 py-1 flex items-center gap-1.5 shadow-lg shadow-pink-500/20">
          <div className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center font-black text-xs shadow-sm">
            +
          </div>
          <span className="text-white font-black text-xs sm:text-sm tracking-wide filter drop-shadow">
            {heartsCount.toLocaleString()}
          </span>
        </div>

        {/* Gold Paw Coins Pill */}
        <div className="bg-slate-900/40 backdrop-blur-md border-2 border-amber-400/70 rounded-full px-2.5 sm:px-3 py-1 flex items-center gap-1.5 shadow-lg shadow-amber-500/20">
          <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-sm">
            🐾
          </div>
          <span className="text-white font-black text-xs sm:text-sm tracking-wide filter drop-shadow">
            {coinsCount}
          </span>
        </div>

        {/* Blue Gems Pill */}
        <div className="bg-slate-900/40 backdrop-blur-md border-2 border-cyan-400/70 rounded-full px-2.5 sm:px-3 py-1 flex items-center gap-1.5 shadow-lg shadow-cyan-500/20">
          <div className="text-sm animate-pulse filter drop-shadow-[0_0_6px_rgba(34,211,238,0.9)]">
            💎
          </div>
          <span className="text-white font-black text-xs sm:text-sm tracking-wide filter drop-shadow">
            {gemsCount}
          </span>
        </div>
      </div>

      {/* 3. Settings & Audio Toggle Buttons (Top Right) */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-gradient-to-b from-pink-400 to-rose-600 border-2 border-white shadow-lg shadow-pink-500/40 flex items-center justify-center text-white hover:scale-105 transition-transform"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <button
          onClick={onResetGame}
          className="w-10 h-10 rounded-full bg-gradient-to-b from-rose-500 to-pink-600 border-2 border-white shadow-lg shadow-rose-500/40 flex items-center justify-center text-white font-black text-lg hover:scale-105 transition-transform"
          title="Reset Room"
        >
          ✕
        </button>
      </div>
    </header>
  );
};
