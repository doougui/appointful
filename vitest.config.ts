import 'reflect-metadata';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    setupFiles: './src/tests/setup.ts',
  },
  plugins: [tsconfigPaths()],
});
