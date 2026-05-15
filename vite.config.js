import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'image-proxy',
      configureServer(server) {
        server.middlewares.use('/api/image-proxy', async (req, res) => {
          const params = new URL(req.url, 'http://localhost').searchParams
          const imageUrl = params.get('url')
          if (!imageUrl) {
            res.statusCode = 400
            res.end('Missing url')
            return
          }
          try {
            const response = await fetch(imageUrl)
            if (!response.ok) throw new Error('Fetch failed')
            const contentType = response.headers.get('Content-Type') || 'image/jpeg'
            const buffer = Buffer.from(await response.arrayBuffer())
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Content-Type', contentType)
            res.end(buffer)
          } catch {
            res.statusCode = 502
            res.end('Proxy failed')
          }
        })
      },
    },
  ],
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
