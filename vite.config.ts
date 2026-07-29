import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/infra/http/controllers/**', 'prisma']],
    coverage: {
      include: ['src/domain/application/use-cases/**/*.{js,ts}'],
      exclude: ['src/test/**/*.{ts,tsx}'],
      provider: 'v8',
    },
  },
})
