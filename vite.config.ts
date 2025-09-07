import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/timetree-proxy': {
        target: 'https://timetreeapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/timetree-proxy/, ''),
      },
    },
  },
  base: './',
});
