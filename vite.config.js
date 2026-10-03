import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  server: { proxy: { '/api': 'http://127.0.0.1:8788' } },
})
