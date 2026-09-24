import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'html-entry',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            return html
              .replace(
                /<script\s+type="module"\s+crossorigin\s+src="\/assets\/index-.*?\.js"><\/script>/,
                '<script type="module" src="/src/main.tsx"></script>'
              )
              .replace(
                /<link\s+rel="stylesheet"\s+crossorigin\s+href="\/assets\/index-.*?\.css">\s*/,
                ''
              );
          },
        },
      },
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

