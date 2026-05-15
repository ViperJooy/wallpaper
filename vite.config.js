import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
  },
  server: {
    host: true,
    port: 5500,
    proxy: {
      '/intf': {
        target: 'https://wp.shanhutech.cn',
        changeOrigin: true,
      },
    },
  },
})
