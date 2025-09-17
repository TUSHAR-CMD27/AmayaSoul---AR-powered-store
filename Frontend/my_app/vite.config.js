import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows connections from external URLs
    port: 5173,
    strictPort: false,
    hmr: {
      host: 'fresh-flies-look.loca.lt', // your Localtunnel URL host
      protocol: 'https', // because Localtunnel uses https
    },
    allowedHosts: ['fresh-flies-look.loca.lt'],
  },
});
