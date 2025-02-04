import * as path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_URL_BASENAME } = { ...loadEnv(mode, process.cwd()) };
  console.log({ VITE_URL_BASENAME });

  return {
    server: {
      port: 5000,
    },
    preview: {
      port: 8080,
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
  };
});
