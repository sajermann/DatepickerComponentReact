import * as fs from 'node:fs';
import * as path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import Pages from 'vite-plugin-pages';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_URL_BASENAME } = { ...loadEnv(mode, process.cwd()) };

  return {
    base: `/${VITE_URL_BASENAME}`,

    server: {
      port: 5000,
      host: true,
      allowedHosts: ['.csb.app'],
    },
    preview: {
      port: 8080,
      host: true,
    },
    plugins: [
      {
        name: 'coverage-summary-api',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url?.includes('/__coverage-summary')) {
              const coveragePath = path.resolve(
                process.cwd(),
                'coverage',
                'coverage-summary.json',
              );
              if (fs.existsSync(coveragePath)) {
                res.setHeader('Content-Type', 'application/json');
                res.end(fs.readFileSync(coveragePath, 'utf-8'));
                return;
              }
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Not found' }));
              return;
            }
            next();
          });
        },
      },
      react(),
      tailwindcss(),
      Pages(),
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      'import.meta.env.VITE_PROJECT_ROOT': JSON.stringify(
        process.cwd().replace(/\\/g, '/'),
      ),
    },
  };
});
