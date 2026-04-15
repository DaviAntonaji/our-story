import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 82 },
      jpeg: { quality: 82 },
      png: { quality: 85, compressionLevel: 8 },
      webp: { lossless: false, quality: 82 },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'imgs/og-share.jpg',
      ],
      manifest: {
        name: 'Davi & Maysa — Nossa História',
        short_name: 'Nossa História',
        description:
          'Nossa história: momentos, promessas, versículo e tudo que constrói o nosso amor.',
        theme_color: '#5c2d42',
        background_color: '#5c2d42',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'pt-BR',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: 'index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/imgs/'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'our-story-media',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})
