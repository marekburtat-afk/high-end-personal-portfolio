import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env': {}, // Přidali jsme prázdný objekt pro procesy
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        global: 'window',
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      optimizeDeps: {
        include: ['sanity', 'styled-components']
      }
    };
});