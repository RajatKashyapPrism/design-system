import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import type { Plugin } from 'vite';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Copies src/tokens/ into dist/tokens/ after the JS bundle is written.
// package.json exports already point to src/tokens/ directly, so this copy
// exists only to keep dist/ self-contained for consumers who reference dist/.
function copyTokens(): Plugin {
  const srcTokensDir = path.resolve(dirname, 'src/tokens');
  const destTokensDir = path.resolve(dirname, 'dist/tokens');

  function copyDir(src: string, dest: string) {
    mkdirSync(dest, { recursive: true });
    readdirSync(src).forEach((file) => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      if (statSync(srcPath).isDirectory()) {
        copyDir(srcPath, destPath);
      } else if (file.endsWith('.css')) {
        copyFileSync(srcPath, destPath);
      }
    });
  }

  return {
    name: 'copy-tokens',
    apply: 'build',
    closeBundle() {
      copyDir(srcTokensDir, destTokensDir);
    },
  };
}

export default defineConfig({
  plugins: [react(), copyTokens()],
  publicDir: false,
  build: {
    target: 'es2022',
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'PrismDesignGlobalComponentLibrary',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    outDir: 'dist',
  },
});
