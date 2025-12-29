import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows connections from external URLs
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false, // Bundle all CSS into one file for faster loading
    rollupOptions: {
      output: {
        // Ensure CSS is loaded before JS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  css: {
    // Optimize CSS loading
    devSourcemap: false,
  },
});
