// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['src/api/index.ts', 'src/api/app.ts', 'vitest.config.ts'],
    },
  },
});
