import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
      alias: {
            '@/': resolve(__dirname, 'src'),
            '@/images': resolve(__dirname, 'src/assets/images'),
            '@/styles': resolve(__dirname, 'src/assets/styles'),
            '@/components': resolve(__dirname, 'src/components'),
            '@/pages': resolve(__dirname, 'src/pages'),
      }
  }
})
