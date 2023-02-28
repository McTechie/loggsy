import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    viewportWidth: 1280,
    viewportHeight: 720,
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
