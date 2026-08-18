import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Ensures relative path assets for GitHub Pages!
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: true,
  },
})
