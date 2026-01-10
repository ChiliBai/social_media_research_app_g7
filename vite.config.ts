import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['Weibo Logo.jpg'],
          manifest: {
            name: '新浪微博 - 随时随地发现新鲜事',
            short_name: '微博',
            description: '随时随地发现新鲜事',
            start_url: '/',
            scope: '/',
            theme_color: '#f2f2f2',
            background_color: '#f2f2f2',
            display: 'standalone',
            icons: [
              {
                src: '/pwa-192.png',
                sizes: '192x192',
                type: 'image/png'
              },
              {
                src: '/pwa-512.png',
                sizes: '512x512',
                type: 'image/png'
              }
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
