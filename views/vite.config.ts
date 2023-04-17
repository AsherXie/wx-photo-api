import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/test': {
        target:'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/test/, '')
      }
    },
  },
  css: {
    preprocessorOptions: {
      javascriptEnabled: true,

      less: {
        additionalData: '@import url("@/assets/less/reset.less");',
      },
    },
  },
});
