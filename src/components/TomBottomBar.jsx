import React from 'react';
import { Moon, Flame, Sparkles, Utensils, Mic, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * TomBottomBar Component
 * Strictly modeled after My Talking Angela 2 / My Talking Tom 2 Circular Jelly Navigation Bar:
 * - 🌙 Sleep Bedroom (82% gauge)
 * - ⚡ Vent Zone (Phase A)
 * - 🪮 Grooming & Makeup Care (Phase B)
 * - 🍴 Kitchen / Feed
 * - 🎤 Voice Mimic / Town
 */
export const TomBottomBar = ({
  activeRoom, // 'bedroom' | 'vent' | 'healing' | 'kitchen'
  setActiveRoom,
  mimicState,
  onToggleMic,
  isHairClean,
  hairSootLevel,
  ventCombo,
}) => {
  return (
    <nav className="w-full max-w-xl mx-auto px-4 pb-4 z-40 relative flex items-center justify-around select-none">
      {/* 1. 🌙 SLEEP BEDROOM ROOM BUTTON (82% Gauge from image!) */}
      <button
        onClick={() => setActiveRoom('bedroom')}
        className={`relative flex flex-col items-center justify-center transition-all ${
          activeRoom === 'bedroom' ? 'scale-110' : 'hover:scale-105 opacity-90'
        }`}
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-gradient-to-b from-rose-400 via-pink-500 to-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.6)] flex items-center justify-center border-3 border-white">
          <Moon className="w-7 h-7 text-white fill-white animate-pulse" />

          {/* Percentage Badge Indicator (82% from user screenshot) */}
          <div className="absolute -bottom-2 bg-slate-900 text-white border-2 border-pink-400 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-md">
            82%
          </div>
        </div>
        <span className="text-[11px] font-black text-pink-200 mt-2 shadow-sm">
          Bedroom
        </span>
      </button>

      {/* 2. ⚡ VENT & THRASH ZONE BUTTON (Phase A) */}
      <button
        onClick={() => setActiveRoom('vent')}
        className={`relative flex flex-col items-center justify-center transition-all ${
          activeRoom === 'vent' ? 'scale-110' : 'hover:scale-105 opacity-90'
        }`}
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-gradient-to-b from-amber-400 via-rose-500 to-orange-600 shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center justify-center border-3 border-white">
          <Flame className="w-7 h-7 text-amber-200 fill-amber-200" />
          {ventCombo > 0 && (
            <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
              {ventCombo}x
            </div>
          )}
        </div>
        <span className="text-[11px] font-black text-amber-300 mt-2 shadow-sm">
          Vent Zone
        </span>
      </button>

      {/* 3. 🍴 KITCHEN / FOOD FEED BUTTON */}
      <button
        onClick={() => setActiveRoom('kitchen')}
        className={`relative flex flex-col items-center justify-center transition-all ${
          activeRoom === 'kitchen' ? 'scale-110' : 'hover:scale-105 opacity-90'
        }`}
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-gradient-to-b from-lime-400 via-green-500 to-emerald-600 shadow-[0_0_20px_rgba(132,204,22,0.6)] flex items-center justify-center border-3 border-white">
          <Utensils className="w-7 h-7 text-white" />
        </div>
        <span className="text-[11px] font-black text-green-300 mt-2 shadow-sm">
          Kitchen
        </span>
      </button>

      {/* 4. 🪮 GROOMING & SALON CARE BUTTON (Phase B) */}
      <button
        onClick={() => setActiveRoom('healing')}
        className={`relative flex flex-col items-center justify-center transition-all ${
          activeRoom === 'healing' ? 'scale-110' : 'hover:scale-105 opacity-90'
        }`}
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-gradient-to-b from-emerald-400 via-cyan-500 to-teal-600 shadow-[0_0_20px_rgba(45,212,191,0.6)] flex items-center justify-center border-3 border-white">
          <Sparkles className="w-7 h-7 text-white" />
          {isHairClean ? (
            <div className="absolute -top-1 -right-1 bg-emerald-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-md animate-pulse">
              DONE!
            </div>
          ) : (
            <div className="absolute -bottom-2 bg-slate-900 text-white border-2 border-emerald-400 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-md">
              {Math.round(100 - hairSootLevel)}%
            </div>
          )}
        </div>
        <span className="text-[11px] font-black text-cyan-300 mt-2 shadow-sm">
          Grooming
        </span>
      </button>

      {/* 5. 🎤 VOICE MIMIC / TOWN BUTTON */}
      <button
        onClick={onToggleMic}
        className={`relative flex flex-col items-center justify-center transition-all ${
          mimicState === 'listening' ? 'scale-115 animate-bounce' : 'hover:scale-105'
        }`}
      >
        <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 border-3 border-white flex items-center justify-center ${
          mimicState === 'listening'
            ? 'bg-gradient-to-b from-rose-500 via-pink-600 to-purple-600 shadow-[0_0_25px_rgba(244,63,94,0.9)] animate-mic-pulse'
            : 'bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-600 shadow-[0_0_20px_rgba(56,189,248,0.6)]'
        }`}>
          <Mic className="w-7 h-7 text-white" />
        </div>
        <span className="text-[11px] font-black text-sky-300 mt-2 shadow-sm">
          {mimicState === 'listening' ? 'Listening...' : mimicState === 'mimicking' ? 'Mimicking!' : 'Voice Mic'}
        </span>
      </button>
    </nav>
  );
};
