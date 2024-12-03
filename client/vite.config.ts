import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './client',  // Set the root to the frontend directory (where index.html is located)
  build: {
    outDir: '../dist',  // This will place the build output in the root `dist` directory
    emptyOutDir: true,  // Clears the output directory before each build
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/',  // Adjust base if deploying to a subpath (e.g., '/my-app/')
});
