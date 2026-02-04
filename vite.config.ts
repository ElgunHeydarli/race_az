import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['@fancyapps/ui'],
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://admin.race.az',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
      '/sitemap.xml': {
        target: 'https://admin.race.az/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sitemap\.xml/, '/sitemap.xml'),
      },
      '/robots.txt': {
        target: 'https://admin.race.az/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/robots\.txt/, '/robots.txt'),
      },
    },
  },
});
