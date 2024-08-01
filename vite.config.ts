/// <reference types="vitest" />
import { defineConfig } from 'vite';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    dts({ include: ['src'] })
  ],
  build: {
    target: browserslistToEsbuild(),
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'bsBreakpoints',
      formats: ['es', 'umd'],
    }
  },
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/models/**', 'src/vite-env.d.ts'],
    },
  },
});
