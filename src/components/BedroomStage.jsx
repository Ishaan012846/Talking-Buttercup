import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BedroomStage Component
 * Garland featuring ONLY Anajli's Real Uploaded Photos & Couple Memories!
 * - Left Side: Anajli Outdoors 🌿 & Anajli & Boyfriend Couple Photo 💖
 * - Right Side: Anajli Night Clock Tower 🌃 & Anajli Star Lights ✨
 * - Wide clear gap in the middle so Buttercup's head is 100% unblocked!
 */
export const BedroomStage = ({ children, activeRoom = 'vent' }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Left Side Photos (Anajli's Real Uploaded Photos)
  const leftPhotos = [
    {
      id: 1,
      src: '/anjali_photo1.jpg',
      title: 'Anajli Outdoors 🌿',
      tasselColor: '#0d9488', // Teal
      rotation: -5,
    },
    {
      id: 2,
      src: '/couple_photo.jpg',
      title: 'Anajli & Boyfriend 💖',
      tasselColor: '#d97706', // Gold
      rotation: 4,
    },
  ];

  // Right Side Photos (Anajli's Real Uploaded Photos)
  const rightPhotos = [
    {
      id: 3,
      src: '/anjali_photo2.png',
      title: 'Anajli Night Clock Tower 🌃',
      tasselColor: '#db2777', // Pink
      rotation: -4,
    },
    {
      id: 4,
      src: '/anjali_photo3.png',
      title: 'Anajli Star Lights ✨',
      tasselColor: '#0d9488', // Teal
      rotation: 5,
    },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none bg-gradient-to-b from-[#f7e6d4] via-[#eed4bd] to-[#e4bf9d]">
      {/* ================= 1. FAIRY LIGHT GARLAND (LEFT & RIGHT ONLY - CENTER CLEAR!) ================= */}
      <div className="absolute top-14 inset-x-0 z-20 pointer-events-auto flex flex-col items-center">
        {/* SVG String Line & Fairy Lights */}
        <svg viewBox="0 0 1000 120" className="w-full h-28 overflow-visible">
          {/* Garland String with Center Arch */}
          <path
            d="M 50,20 Q 250,90 500,30 Q 750,90 950,20"
            fill="none"
            stroke="#b45309"
            strokeWidth="2.5"
            strokeDasharray="4,2"
          />

          {/* Glowing Fairy Light Bulbs */}
          {[80, 160, 240, 320, 400, 500, 600, 680, 760, 840, 920].map((x, idx) => (
            <g key={idx}>
              <circle cx={x} cy={30 + Math.sin(idx) * 12} r="5" fill="#fef08a" />
              <circle cx={x} cy={30 + Math.sin(idx) * 12} r="9" fill="#fde047" opacity="0.4" className="animate-pulse" />
            </g>
          ))}
        </svg>

        {/* HANGING POLAROID FRAMES (2 ON LEFT & 2 ON RIGHT - ALL ANAJLI'S REAL PHOTOS!) */}
        <div className="absolute top-6 inset-x-6 sm:inset-x-12 flex justify-between items-start pointer-events-auto max-w-6xl mx-auto w-full">
          {/* Left Group */}
          <div className="flex gap-4 sm:gap-8">
            {leftPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.12, rotate: 0 }}
                onClick={() => setSelectedPhoto(photo)}
                style={{ rotate: photo.rotation }}
                className="relative flex flex-col items-center cursor-pointer group transition-all"
              >
                {/* Clothespin Clip */}
                <div className="w-3 h-5 bg-amber-800 border border-amber-950 rounded-xs shadow-md z-30 -mb-1" />

                {/* White Polaroid Frame */}
                <div className="w-20 sm:w-28 bg-white rounded-md p-1.5 pt-1.5 pb-5 shadow-[0_8px_20px_rgba(0,0,0,0.25)] border border-stone-200 relative overflow-hidden group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)]">
                  <div className="w-full h-16 sm:h-24 bg-stone-900 rounded-sm overflow-hidden relative">
                    <img src={photo.src} alt={photo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hanging Tassel */}
                <div className="flex flex-col items-center -mt-1 z-20">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: photo.tasselColor }} />
                  <div className="w-3 h-6 rounded-b-md shadow-sm" style={{ backgroundColor: photo.tasselColor }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* WIDE CLEAR GAP IN THE CENTER FOR BUTTERCUP'S HEAD */}
          <div className="w-48 sm:w-80 h-1 pointer-events-none" />

          {/* Right Group */}
          <div className="flex gap-4 sm:gap-8">
            {rightPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.12, rotate: 0 }}
                onClick={() => setSelectedPhoto(photo)}
                style={{ rotate: photo.rotation }}
                className="relative flex flex-col items-center cursor-pointer group transition-all"
              >
                {/* Clothespin Clip */}
                <div className="w-3 h-5 bg-amber-800 border border-amber-950 rounded-xs shadow-md z-30 -mb-1" />

                {/* White Polaroid Frame */}
                <div className="w-20 sm:w-28 bg-white rounded-md p-1.5 pt-1.5 pb-5 shadow-[0_8px_20px_rgba(0,0,0,0.25)] border border-stone-200 relative overflow-hidden group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)]">
                  <div className="w-full h-16 sm:h-24 bg-stone-900 rounded-sm overflow-hidden relative">
                    <img src={photo.src} alt={photo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hanging Tassel */}
                <div className="flex flex-col items-center -mt-1 z-20">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: photo.tasselColor }} />
                  <div className="w-3 h-6 rounded-b-md shadow-sm" style={{ backgroundColor: photo.tasselColor }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 2. WOODEN DOOR (LEFT SIDE) ================= */}
      <div className="absolute top-10 left-3 sm:left-8 w-32 sm:w-44 h-[68vh] rounded-t-lg bg-gradient-to-r from-[#6b3a19] via-[#85471e] to-[#6b3a19] border-4 border-[#45220c] shadow-2xl p-2 flex flex-col justify-between">
        <div className="w-full h-full rounded border-2 border-[#45220c]/60 bg-[#6b3a19]/80 p-2 flex flex-col gap-4">
          <div className="w-full h-1/2 rounded border border-[#45220c]/40 bg-[#85471e]/40 shadow-inner" />
          <div className="w-full h-1/2 rounded border border-[#45220c]/40 bg-[#85471e]/40 shadow-inner" />
        </div>
        <div className="absolute top-1/2 right-2 w-3 h-12 rounded-sm bg-gradient-to-b from-slate-200 to-slate-400 border border-slate-600 shadow-md flex items-center justify-center">
          <div className="w-1.5 h-3 bg-slate-700 rounded-xs" />
        </div>
      </div>

      {/* ================= 3. WALL LAMP SCONCE (TOP RIGHT) ================= */}
      <div className="absolute top-14 right-8 sm:right-16 z-20 flex flex-col items-center">
        <div className="absolute -top-6 w-32 h-32 rounded-full bg-amber-200/40 blur-xl pointer-events-none animate-pulse" />
        <div className="w-10 sm:w-14 h-12 sm:h-16 rounded-t-2xl bg-gradient-to-b from-amber-100 to-amber-300 border border-amber-400 shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        </div>
        <div className="w-3 h-6 bg-amber-800 border-x border-amber-950" />
      </div>

      {/* ================= 4. COZY BEIGE SOFA (RIGHT SIDE) ================= */}
      <div className="absolute bottom-20 right-2 sm:right-8 z-10 w-40 sm:w-60 h-48 sm:h-60 rounded-3xl bg-gradient-to-b from-[#f3e3d3] to-[#e6d0bc] border-4 border-[#c4a485] shadow-2xl p-3 flex flex-col justify-end">
        <div className="w-full h-24 rounded-2xl bg-[#f7ebd9] border-2 border-[#b08b68] shadow-inner" />
      </div>

      {/* ================= 5. WARM PARQUET WOODEN FLOOR (BOTTOM) ================= */}
      <div className="absolute bottom-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-b from-[#a3683b] via-[#854f27] to-[#693b16] border-t-8 border-[#693b16] shadow-2xl flex flex-col justify-around py-2">
        <div className="w-full h-1 bg-[#d99b6c]/30" />
        <div className="w-full h-1 bg-[#d99b6c]/30" />
      </div>

      {/* ================= CHARACTER CONTAINER ================= */}
      <div className="relative z-30 w-full h-full flex items-center justify-center">
        {children}
      </div>

      {/* ================= 6. PHOTO VIEWER MODAL POPUP ================= */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-3xl p-4 sm:p-6 max-w-sm w-full shadow-2xl flex flex-col items-center relative border-4 border-amber-400"
            >
              <img src={selectedPhoto.src} alt={selectedPhoto.title} className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-md" />
              <h3 className="text-slate-900 font-black text-lg sm:text-xl mt-4 tracking-wide">
                {selectedPhoto.title}
              </h3>
              <p className="text-pink-600 font-bold text-xs mt-1">Tap anywhere to close 💖</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
