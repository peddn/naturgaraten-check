import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Relativer Basispfad: Der Build läuft auf jedem statischen Hosting,
// auch in Unterordnern wie GitHub Pages.
export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss()],
})
