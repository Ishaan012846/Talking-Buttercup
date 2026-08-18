import React from 'react';
import { Hand, MousePointer, Flame, Sparkles, Heart } from 'lucide-react';

export const InstructionOverlay = ({ activeRoom, isHairClean }) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 my-2 z-30 pointer-events-none">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-3 shadow-lg flex items-center justify-between gap-2 text-xs sm:text-sm">
        {activeRoom === 'vent' ? (
          <div className="flex items-center justify-around w-full gap-2 text-amber-200">
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="p-1 rounded-lg bg-amber-500/20 border border-amber-500/30">
                👤
              </span>
              <span>Tap Face (Duck)</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="p-1 rounded-lg bg-rose-500/20 border border-rose-500/30">
                🦇
              </span>
              <span>Tap Batman Logo (Hearts)</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="p-1 rounded-lg bg-orange-500/20 border border-orange-500/30">
                ↔️
              </span>
              <span>Swipe Avatar (Toss)</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full gap-2 text-pink-200">
            <div className="flex items-center gap-2 font-semibold">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>
                {isHairClean
                  ? '✨ Hair Styled & Neat Curls Ready!'
                  : 'Sweep cursor back & forth across hair to brush away soot!'}
              </span>
            </div>
            {isHairClean && (
              <span className="bg-pink-600 text-white font-extrabold px-2.5 py-1 rounded-xl text-xs flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" /> Loved!
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
