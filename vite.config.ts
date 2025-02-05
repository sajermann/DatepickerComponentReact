import * as path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import Pages from 'vite-plugin-pages';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_URL_BASENAME } = { ...loadEnv(mode, process.cwd()) };
  console.log({ VITE_URL_BASENAME, mode });

  return {
    server: {
      port: 5000,
    },
    base: VITE_URL_BASENAME,
    preview: {
      port: 8080,
    },
    plugins: [react(), tailwindcss(), Pages()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
  };
});
