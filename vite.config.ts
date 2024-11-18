import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: "autoUpdate", manifest: {
      name: "bookshelf",
      short_name: "books",
      description: "非電子書籍用本棚アプリ",
      start_url: ".",
      display: "standalone",
      orientation: "any",
      theme_color: "#388e3c",
      background_color: "#f0f0f0",
      icons: [
        {
          src: "icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        }, {
          src: "icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  })],
  optimizeDeps: {
    exclude: ['@preflower/barcode-detector-polyfill']
  },
})
