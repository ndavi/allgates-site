import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'site.spec.ts',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:4322',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: {
    command: 'npx astro preview --host 127.0.0.1 --port 4322 --ignore-lock',
    env: { ASTRO_PREVIEW_BACKGROUND: '0' },
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: false,
  },
});
