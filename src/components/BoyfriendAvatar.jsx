import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BatmanLogo } from './BatmanLogo';

/**
 * BoyfriendAvatar Component
 * Clean Avatar Face (Lower Dark Semicircle Removed!):
 * - Character likeness matching reference photo
 * - Clean chin & jawline (Zero dark lower semicircle!)
 * - Real Morphing Mouth & Eye Expressions (Blink, Duck > <, Slap ❌, Dizzy 🌀, Heart 💖)
 * - White Crewneck T-Shirt with Lipstick Batman Logo, Denim Jeans & Red Sneakers
 */
export const BoyfriendAvatar = ({
  activeRoom = 'vent',
  animState = 'idle',
  isHeadDucking = false,
  isShirtRippling = false,
  isSliding = false,
  slideOffset = 0,
  borderFlatten = false,
  hairSootLevel = 100,
  isHairClean = false,
  isSlapped = false,
  isTummyTickled = false,
  isToeTapped = false,
  isPurring = false,
  isRepeatingVoice = false,
  onHeadClick,
  onShirtClick,
  onCheekSlap,
  onTummyTap,
  onToeTap,
  onChestPetMove,
  onHairHoverMove,
  onDragStart,
  onDragEnd,
}) => {
  const [blink, setBlink] = useState(false);

  // Auto eye blinking every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-lg h-[86vh] max-h-[740px] pointer-events-auto select-none">
      <motion.div
        drag={activeRoom === 'vent' ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.4}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        animate={{
          x: slideOffset,
          scaleX: isShirtRippling ? [1, 1.12, 0.94, 1] : borderFlatten ? 1.25 : 1,
          scaleY: isHeadDucking ? 0.9 : borderFlatten ? 0.75 : 1,
          rotate: isSliding ? (slideOffset > 0 ? 12 : -12) : isSlapped ? (Math.random() > 0.5 ? 8 : -8) : 0,
          y: isHeadDucking ? 18 : isTummyTickled ? [0, -10, 0, -8, 0] : isToeTapped ? [0, -28, 0] : [0, -4, 0],
        }}
        transition={{
          y: { duration: isTummyTickled ? 0.4 : isToeTapped ? 0.5 : 4, repeat: isTummyTickled || isToeTapped ? 0 : Infinity, ease: 'easeInOut' },
          x: { type: 'spring', stiffness: 220, damping: 20 },
        }}
        className="relative flex flex-col items-center w-full h-full cursor-grab active:cursor-grabbing justify-end pb-4"
      >
        {/* ================= 1. HIGH-PRECISION 3D ANIMATED CHARACTER ================= */}
        <div className="relative w-80 sm:w-96 h-80 sm:h-96 flex items-center justify-center filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]">
          <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
            <defs>
              {/* 3D Skin Gradient matching Photo */}
              <radialGradient id="skinGrad" cx="45%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#e8b896" />
                <stop offset="50%" stopColor="#c48c66" />
                <stop offset="100%" stopColor="#965f3d" />
              </radialGradient>

              {/* Eye Iris Depth */}
              <radialGradient id="irisGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#543118" />
                <stop offset="60%" stopColor="#2b170a" />
                <stop offset="100%" stopColor="#0f0703" />
              </radialGradient>

              {/* Buzzcut Hair Gradient */}
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#292524" />
                <stop offset="60%" stopColor="#1c1917" />
                <stop offset="100%" stopColor="#09090b" />
              </linearGradient>

              {/* Shadow filter */}
              <filter id="headShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* EARS (LEFT & RIGHT) */}
            <g filter="url(#headShadow)">
              <path d="M 95,180 C 70,180 75,230 100,230 Z" fill="#c48c66" stroke="#8c5938" strokeWidth="4" />
              <path d="M 305,180 C 330,180 325,230 300,230 Z" fill="#c48c66" stroke="#8c5938" strokeWidth="4" />
            </g>

            {/* 3D HEAD CONTOUR */}
            <path
              d="M 110,130 C 180,80 220,80 290,130 C 340,180 335,270 295,330 C 255,375 145,375 105,330 C 65,270 60,180 110,130 Z"
              fill="url(#skinGrad)"
              stroke="#8c5938"
              strokeWidth="5"
              strokeLinejoin="round"
              filter="url(#headShadow)"
              onClick={onHeadClick}
              className="cursor-pointer"
            />

            {/* CHEEK SLAP REAL RED BLUSHING ON FACE */}
            {isSlapped && (
              <circle cx="125" cy="240" r="30" fill="#e11d48" opacity="0.65" filter="blur(8px)" />
            )}

            {/* REAL EYEBROWS (FURROW & ARCH ON INTERACTIONS) */}
            <g>
              <path
                d={
                  isHeadDucking
                    ? "M 115,148 Q 150,165 178,155"
                    : isSlapped
                    ? "M 115,135 Q 150,145 178,135"
                    : "M 115,142 Q 150,132 178,140"
                }
                fill="none"
                stroke="#1c1917"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <path
                d={
                  isHeadDucking
                    ? "M 285,148 Q 250,165 222,155"
                    : isSlapped
                    ? "M 285,135 Q 250,145 222,135"
                    : "M 285,142 Q 250,132 222,140"
                }
                fill="none"
                stroke="#1c1917"
                strokeWidth="11"
                strokeLinecap="round"
              />
            </g>

            {/* REAL EYES (BLINK, WINK, SQUINT & DEFORM ON FACE) */}
            <g onClick={onCheekSlap} className="cursor-pointer">
              {/* Left Eye Socket */}
              <ellipse cx="146" cy="182" rx="25" ry="22" fill="#ffffff" stroke="#1c1917" strokeWidth="4" />
              {isHeadDucking ? (
                <path d="M 130,174 L 150,184 L 130,194" fill="none" stroke="#1c1917" strokeWidth="6" strokeLinecap="round" />
              ) : isPurring || isHairClean ? (
                <path d="M 128,188 Q 146,166 164,188" fill="none" stroke="#1c1917" strokeWidth="6" strokeLinecap="round" />
              ) : isSlapped ? (
                <path d="M 132,170 L 160,194 M 160,170 L 132,194" stroke="#e11d48" strokeWidth="7" strokeLinecap="round" />
              ) : blink ? (
                <path d="M 124,182 L 168,182" stroke="#1c1917" strokeWidth="7" strokeLinecap="round" />
              ) : (
                <>
                  <ellipse cx="149" cy="182" rx="15" ry="15" fill="url(#irisGrad)" />
                  <circle cx="153" cy="177" r="5" fill="#ffffff" />
                </>
              )}

              {/* Right Eye Socket */}
              <ellipse cx="254" cy="182" rx="25" ry="22" fill="#ffffff" stroke="#1c1917" strokeWidth="4" />
              {isHeadDucking ? (
                <path d="M 270,174 L 250,184 L 270,194" fill="none" stroke="#1c1917" strokeWidth="6" strokeLinecap="round" />
              ) : isPurring || isHairClean ? (
                <path d="M 236,188 Q 254,166 272,188" fill="none" stroke="#1c1917" strokeWidth="6" strokeLinecap="round" />
              ) : isSlapped ? (
                <path d="M 240,170 L 268,194 M 268,170 L 240,194" stroke="#e11d48" strokeWidth="7" strokeLinecap="round" />
              ) : blink ? (
                <path d="M 232,182 L 276,182" stroke="#1c1917" strokeWidth="7" strokeLinecap="round" />
              ) : (
                <>
                  <ellipse cx="251" cy="182" rx="15" ry="15" fill="url(#irisGrad)" />
                  <circle cx="255" cy="177" r="5" fill="#ffffff" />
                </>
              )}
            </g>

            {/* REAL NOSE */}
            <path d="M 194,185 Q 200,212 206,212 Q 212,212 216,206" fill="none" stroke="#8c5938" strokeWidth="4" strokeLinecap="round" />

            {/* REAL FULL DARK MOUSTACHE (PHOTO STYLE) */}
            <path
              d="M 135,236 Q 200,224 265,236 C 245,258 155,258 135,236 Z"
              fill="#1c1917"
              stroke="#09090b"
              strokeWidth="3"
              filter="url(#headShadow)"
            />

            {/* REAL MORPHING MOUTH (SYNCED WITH VOICE & INTERACTIONS) */}
            <g>
              {isRepeatingVoice ? (
                <path d="M 175,252 Q 200,290 225,252 Z" fill="#780216" stroke="#1c1917" strokeWidth="4" />
              ) : isTummyTickled ? (
                <path d="M 172,252 Q 200,280 228,252 Z" fill="#780216" stroke="#1c1917" strokeWidth="4" />
              ) : isSlapped ? (
                <ellipse cx="200" cy="264" rx="12" ry="14" fill="#780216" stroke="#1c1917" strokeWidth="3" />
              ) : isPurring || isHairClean ? (
                <ellipse cx="200" cy="256" rx="10" ry="7" fill="#be123c" stroke="#1c1917" strokeWidth="3" />
              ) : (
                <path d="M 180,252 Q 200,266 220,252" fill="none" stroke="#1c1917" strokeWidth="5" strokeLinecap="round" />
              )}
            </g>

            {/* SOUL PATCH UNDER LIP */}
            <path d="M 193,266 Q 200,278 207,266 Z" fill="#1c1917" />

            {/* BUZZCUT HAIRCUT FADE CAP */}
            <g>
              <path
                d="M 110,130 C 180,80 220,80 290,130 C 300,155 100,155 110,130 Z"
                fill="url(#hairGrad)"
                stroke="#09090b"
                strokeWidth="3"
              />

              {/* Vent Soot Overlay Mask */}
              {activeRoom === 'healing' && !isHairClean && (
                <path
                  d="M 110,130 C 180,80 220,80 290,130 C 300,155 100,155 110,130 Z"
                  fill="#09090b"
                  opacity={hairSootLevel / 100 * 0.9}
                />
              )}
            </g>
          </svg>
        </div>

        {/* Neck */}
        <div className="w-14 h-6 bg-gradient-to-b from-[#c48c66] to-[#965f3d] border-x-2 border-[#8c5938] -mt-6 z-10" />

        {/* ================= 2. WHITE CREWNECK T-SHIRT WITH LIPSTICK BATMAN LOGO ================= */}
        <div
          onClick={onShirtClick}
          onMouseMove={onChestPetMove}
          onTouchMove={onChestPetMove}
          className="relative z-20 flex flex-col items-center cursor-pointer group"
        >
          <motion.div
            animate={{
              scaleX: isShirtRippling ? [1, 1.12, 0.94, 1] : 1,
              scaleY: isShirtRippling ? [1, 0.88, 1.08, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
            className="w-60 sm:w-68 h-46 sm:h-52 bg-white rounded-t-[40px] rounded-b-[26px] border-4 border-slate-200 shadow-[0_18px_36px_rgba(0,0,0,0.3)] relative flex flex-col items-center justify-start pt-3 overflow-visible"
          >
            {/* Crewneck Collar */}
            <div className="w-22 h-6 rounded-b-full border-b-4 border-slate-300 bg-slate-100 shadow-inner -mt-4" />

            {/* Short Sleeves */}
            <div className="absolute -left-8 top-2 w-11 h-22 bg-white border-l-4 border-b-4 border-slate-300 rounded-l-3xl transform -rotate-12 shadow-md" />
            <div className="absolute -right-8 top-2 w-11 h-22 bg-white border-r-4 border-b-4 border-slate-300 rounded-r-3xl transform rotate-12 shadow-md" />

            {/* 3D Fold Lines */}
            <div className="absolute top-10 left-7 w-1 h-24 bg-slate-200/80 rounded-full" />
            <div className="absolute top-10 right-7 w-1 h-24 bg-slate-200/80 rounded-full" />

            {/* PROMINENT LIPSTICK BATMAN LOGO */}
            <div className="mt-2 w-38 sm:w-46 h-26 sm:h-30 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] hover:scale-105 transition-transform">
              <BatmanLogo width={170} height={100} />
            </div>

            {/* Folded Arms & Hands */}
            <div className="absolute bottom-2 w-52 sm:w-60 h-10 rounded-full bg-slate-100 border-2 border-slate-300 shadow-md flex items-center justify-between px-4">
              <div className="w-8 h-8 rounded-full bg-[#c48c66] border border-[#8c5938]" />
              <div className="w-8 h-8 rounded-full bg-[#c48c66] border border-[#8c5938]" />
            </div>
          </motion.div>
        </div>

        {/* ================= 3. DENIM JEANS & LEGS ================= */}
        <div
          onClick={onTummyTap}
          className="relative z-10 flex items-center justify-center gap-3 -mt-2 cursor-pointer"
        >
          {/* Left Leg */}
          <div className="w-15 sm:w-17 h-28 sm:h-32 bg-gradient-to-b from-[#1d4ed8] to-[#1e40af] rounded-b-2xl border-2 border-blue-900 shadow-md flex flex-col justify-between p-1">
            <div className="w-full h-1 bg-blue-400/40 rounded" />
            <div className="w-full h-1 bg-blue-400/40 rounded" />
          </div>

          {/* Right Leg */}
          <div className="w-15 sm:w-17 h-28 sm:h-32 bg-gradient-to-b from-[#1d4ed8] to-[#1e40af] rounded-b-2xl border-2 border-blue-900 shadow-md flex flex-col justify-between p-1">
            <div className="w-full h-1 bg-blue-400/40 rounded" />
            <div className="w-full h-1 bg-blue-400/40 rounded" />
          </div>
        </div>

        {/* ================= 4. RED CARTOON SNEAKERS ================= */}
        <div
          onClick={onToeTap}
          className="relative z-10 flex items-center justify-center gap-6 -mt-3 cursor-pointer"
        >
          {/* Left Red Sneaker */}
          <motion.div
            animate={{ y: isToeTapped ? -16 : 0 }}
            className="w-22 sm:w-24 h-10 rounded-2xl bg-gradient-to-r from-rose-600 to-red-500 border-2 border-red-900 shadow-lg flex items-center justify-between px-2 relative"
          >
            <div className="w-6 h-6 rounded-lg bg-white border border-slate-300 shadow-inner" />
            <div className="flex flex-col gap-1">
              <div className="w-4 h-0.5 bg-white" />
              <div className="w-4 h-0.5 bg-white" />
            </div>
          </motion.div>

          {/* Right Red Sneaker */}
          <motion.div
            animate={{ y: isToeTapped ? -16 : 0 }}
            className="w-22 sm:w-24 h-10 rounded-2xl bg-gradient-to-r from-rose-600 to-red-500 border-2 border-red-900 shadow-lg flex items-center justify-between px-2 relative"
          >
            <div className="flex flex-col gap-1">
              <div className="w-4 h-0.5 bg-white" />
              <div className="w-4 h-0.5 bg-white" />
            </div>
            <div className="w-6 h-6 rounded-lg bg-white border border-slate-300 shadow-inner" />
          </motion.div>
        </div>

        {/* ================= 5. HEALING REWARD WOODEN SIGN ================= */}
        <AnimatePresence>
          {activeRoom === 'healing' && isHairClean && (
            <motion.div
              initial={{ scale: 0, y: 50, rotate: -15 }}
              animate={{ scale: 1, y: -40, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-28 z-50 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 border-4 border-amber-500 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center text-center max-w-xs"
            >
              <div className="bg-pink-500 text-white font-black text-base sm:text-lg px-4 py-2 rounded-2xl border-2 border-white shadow-md filter drop-shadow">
                I still love you, Anajli! 💖
              </div>
              <span className="text-amber-200 text-xs font-bold mt-1">✨ Clean Buzzcut Unlocked! ✨</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
