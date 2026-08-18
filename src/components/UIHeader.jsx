import React from 'react';
import { Volume2, VolumeX, Flame, Heart, RefreshCw, Mic } from 'lucide-react';

/**
 * UIHeader Component
 * Clean Top HUD (Level Badge removed & Room Labels Shortened!):
 * - Hearts Counter Pill (Top Left)
 * - Sound Mute Toggle & Reset Button (Top Right)
 * - Clean Room Toggle: VENT ZONE ↔ HEALING ZONE (Center)
 */
export const UIHeader = ({
  heartsCount = 4000,
  activeRoom,
  setActiveRoom,
  isMuted,
  toggleMute,
  voiceProfile,
  setVoiceProfile,
  ventCombo,
  hairSootLevel,
  isHairClean,
  mimicState,
  volumeLevel,
  onResetGame,
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto px-4 pt-3 pb-1 z-40 relative flex flex-col gap-2 select-none pointer-events-auto">
      {/* Row 1: Top Bar with Hearts Counter & Controls */}
      <div className="flex items-center justify-between gap-2">
        {/* Hearts Counter Pill (Top Left - Level 50 Removed!) */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-900/60 backdrop-blur-md border-2 border-pink-400/70 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-lg shadow-pink-500/20">
            <div className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center font-black text-xs">
              💖
            </div>
            <span className="text-white font-black text-xs sm:text-sm tracking-wide filter drop-shadow">
              {heartsCount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Center: Live Voice Equalizer (Only when mic active) */}
        {mimicState !== 'idle' && (
          <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-500/40 shadow-lg animate-pulse">
            <Mic className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
            <span className="text-xs font-black text-pink-200">
              {mimicState === 'listening' ? 'Listening...' : 'Mimicking!'}
            </span>
          </div>
        )}

        {/* Right Controls: Sound Mute & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-md border-2 border-white/40 text-pink-300 hover:text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={onResetGame}
            className="w-10 h-10 rounded-full bg-rose-600 border-2 border-white text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
            title="Reset"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Row 2: SHORTENED ROOM MODE TOGGLE (VENT ZONE ↔ HEALING ZONE) */}
      <div className="grid grid-cols-2 gap-2 bg-slate-950/40 backdrop-blur-md p-1 rounded-2xl border border-white/15 max-w-sm mx-auto w-full">
        <button
          onClick={() => setActiveRoom('vent')}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl font-black text-xs sm:text-sm transition-all ${
            activeRoom === 'vent'
              ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg border border-rose-400/40'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-300" />
          <span>VENT ZONE</span>
          {ventCombo > 0 && activeRoom === 'vent' && (
            <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-md text-[10px]">
              {ventCombo}x
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveRoom('healing')}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl font-black text-xs sm:text-sm transition-all ${
            activeRoom === 'healing'
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg border border-pink-400/40'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4 text-pink-300" />
          <span>HEALING ZONE</span>
          {isHairClean && (
            <span className="bg-emerald-400 text-slate-950 px-1.5 py-0.2 rounded-md text-[10px] animate-pulse">
              DONE!
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
