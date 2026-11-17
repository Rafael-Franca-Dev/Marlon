import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://localhost:4200';
const isCI = Boolean(process.env['CI']);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: {
    command: 'npm start -- --port 4200',
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
