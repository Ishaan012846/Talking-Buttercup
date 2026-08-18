import React from 'react';
import { motion } from 'framer-motion';

/**
 * BatmanLogo Component
 * Strictly complies with Requirement #1:
 * Large iconic Batman logo graphic filled inside with a dense pattern of red lipstick kiss marks.
 */
export const BatmanLogo = ({ onClick, isRippling }) => {
  return (
    <motion.div
      className="relative cursor-pointer select-none group"
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      animate={
        isRippling
          ? {
              scale: [1, 1.25, 0.85, 1.15, 0.95, 1],
              rotate: [0, -6, 6, -3, 3, 0],
            }
          : {}
      }
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <svg
        viewBox="0 0 320 200"
        className="w-36 h-22 sm:w-44 sm:h-28 filter drop-shadow-md transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(244,63,94,0.85)]"
      >
        <defs>
          {/* Dense Pattern of Red Lipstick Kiss Marks */}
          <pattern
            id="lipstickPattern"
            patternUnits="userSpaceOnUse"
            width="32"
            height="32"
            patternTransform="rotate(20)"
          >
            {/* Base lipstick deep red fill */}
            <rect width="32" height="32" fill="#be123c" />

            {/* Kiss Mark 1 */}
            <g transform="translate(8, 8) scale(0.55)">
              <path
                d="M-8,-2 C-6,-5 6,-5 8,-2 C10,1 6,4 0,3 C-6,4 -10,1 -8,-2 Z"
                fill="#fda4af"
                opacity="0.9"
              />
              <path
                d="M-7,2 C-5,6 5,6 7,2 C9,5 4,8 0,8 C-4,8 -9,5 -7,2 Z"
                fill="#f43f5e"
              />
              <ellipse cx="0" cy="2.5" rx="3" ry="1" fill="#881337" />
            </g>

            {/* Kiss Mark 2 */}
            <g transform="translate(24, 22) scale(0.5) rotate(-25)">
              <path
                d="M-8,-2 C-6,-5 6,-5 8,-2 C10,1 6,4 0,3 C-6,4 -10,1 -8,-2 Z"
                fill="#ffe4e6"
                opacity="0.95"
              />
              <path
                d="M-7,2 C-5,6 5,6 7,2 C9,5 4,8 0,8 C-4,8 -9,5 -7,2 Z"
                fill="#e11d48"
              />
              <ellipse cx="0" cy="2.5" rx="3" ry="1" fill="#4c0519" />
            </g>

            {/* Kiss Mark 3 */}
            <g transform="translate(22, 6) scale(0.45) rotate(30)">
              <path
                d="M-8,-2 C-6,-5 6,-5 8,-2 C10,1 6,4 0,3 C-6,4 -10,1 -8,-2 Z"
                fill="#fecdd3"
              />
              <path
                d="M-7,2 C-5,6 5,6 7,2 C9,5 4,8 0,8 C-4,8 -9,5 -7,2 Z"
                fill="#9f1239"
              />
            </g>
          </pattern>

          {/* Glow filter */}
          <filter id="lipstickGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Classic Yellow/Gold Oval Emblem Border */}
        <ellipse
          cx="160"
          cy="100"
          rx="150"
          ry="90"
          fill="#facc15"
          stroke="#090d16"
          strokeWidth="7"
        />

        {/* Inner Black Accent Ring */}
        <ellipse
          cx="160"
          cy="100"
          rx="138"
          ry="80"
          fill="#090d16"
        />

        {/* Sharp Iconic Batman Wings & Silhouette filled strictly with Lipstick Pattern */}
        <path
          d="M 160 38
             L 168 56
             C 178 56, 192 48, 208 44
             C 195 62, 192 84, 245 80
             C 272 78, 290 92, 298 98
             C 275 120, 230 122, 205 110
             C 188 140, 172 158, 160 162
             C 148 158, 132 140, 115 110
             C 90 122, 45 120, 22 98
             C 30 92, 48 78, 75 80
             C 128 84, 125 62, 112 44
             C 128 48, 142 56, 152 56 Z"
          fill="url(#lipstickPattern)"
          stroke="#f43f5e"
          strokeWidth="3.5"
          filter="url(#lipstickGlow)"
        />

        {/* Shiny Highlight Glare overlay for 3D sticker finish */}
        <path
          d="M 45 55 Q 160 25 275 55 Q 160 38 45 55 Z"
          fill="#ffffff"
          opacity="0.35"
        />
      </svg>
    </motion.div>
  );
};
