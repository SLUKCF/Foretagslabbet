import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Foretagslabbet/', // behåll detta!
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Företagslabbet',
        short_name: 'Företagslabbet',
        description: 'En pedagogisk webbapp för AI i företagande',
        theme_color: '#00A6A6',
        icons: [
          {
            src: 'trio_NY_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'trio_NY_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})