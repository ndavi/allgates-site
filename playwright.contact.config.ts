import { defineConfig, devices } from '@playwright/test';

const formEndpoint = '/api/contact.php';

export default defineConfig({
  testDir: './tests',
  testMatch: 'contact-service.spec.ts',
  outputDir: '.contact-test-dist/playwright-results',
  fullyParallel: false,
  use: {
    baseURL: 'http://127.0.0.1:4323',
    serviceWorkers: 'block',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'contact-desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npx astro build --config astro.contact.config.mjs && npx astro preview --config astro.contact.config.mjs --ignore-lock --host 127.0.0.1 --port 4323',
    env: {
      ...process.env,
      ASTRO_PREVIEW_BACKGROUND: '1',
      PUBLIC_CONTACT_FORM_ENDPOINT: formEndpoint,
    },
    url: 'http://127.0.0.1:4323/contact/',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
