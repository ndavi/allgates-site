import { expect, test, type Page } from '@playwright/test';

const formEndpoint = 'https://formspree.io/f/testform';

const fields = (page: Page) => ({
  email: page.getByRole('textbox', { name: /email professionnel/i }),
  organization: page.getByRole('textbox', { name: /^structure/i }),
  name: page.getByRole('textbox', { name: /nom du contact/i }),
  need: page.getByRole('textbox', { name: /votre besoin/i }),
});

async function fillContactForm(page: Page) {
  const formFields = fields(page);
  await formFields.email.fill('lea@example.test');
  await formFields.organization.fill('Cabinet Exemple');
  await formFields.name.fill('Léa Martin');
  await formFields.need.fill('Nous souhaitons préparer un premier échange de cadrage.');
  return formFields;
}

test('une acceptation du service confirme et vide la demande', async ({ page }) => {
  let requestMethod = '';
  let acceptHeader = '';
  await page.route(formEndpoint, async (route) => {
    requestMethod = route.request().method();
    acceptHeader = route.request().headers().accept ?? '';
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify({ next: '/merci' }),
    });
  });

  await page.goto('/contact/');
  const formFields = await fillContactForm(page);
  await page.getByRole('button', { name: /envoyer ma demande/i }).click();

  await expect(page.locator('[data-kind="success"]')).toContainText(/demande.*reçue/i);
  await expect(formFields.email).toHaveValue('');
  await expect(formFields.organization).toHaveValue('');
  await expect(formFields.name).toHaveValue('');
  await expect(formFields.need).toHaveValue('');
  expect({ requestMethod, acceptHeader }).toEqual({
    requestMethod: 'POST',
    acceptHeader: 'application/json',
  });
});

test('une réponse 200 ambiguë affiche un échec et conserve la saisie', async ({ page }) => {
  await page.route(formEndpoint, (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    headers: { 'access-control-allow-origin': '*' },
    body: JSON.stringify({ ok: true }),
  }));

  await page.goto('/contact/');
  const formFields = await fillContactForm(page);
  await page.getByRole('button', { name: /envoyer ma demande/i }).click();

  await expect(page.getByRole('alert')).toContainText(/n’a pas pu être confirmée/i);
  await expect(page.locator('[data-kind="success"]')).toHaveCount(0);
  await expect(formFields.email).toHaveValue('lea@example.test');
  await expect(formFields.organization).toHaveValue('Cabinet Exemple');
  await expect(formFields.name).toHaveValue('Léa Martin');
  await expect(formFields.need).toHaveValue('Nous souhaitons préparer un premier échange de cadrage.');
});

test('les échecs du service conservent la saisie et permettent de réessayer', async ({ page }) => {
  let attempt = 0;
  await page.route(formEndpoint, async (route) => {
    attempt += 1;
    if (attempt === 1) {
      await route.abort('failed');
      return;
    }
    if (attempt === 2) {
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify({ next: '/merci' }),
      });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify({ next: '/merci' }),
    });
  });

  await page.goto('/contact/');
  const formFields = await fillContactForm(page);
  const submit = page.getByRole('button', { name: /envoyer ma demande/i });

  await submit.click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(formFields.need).toHaveValue('Nous souhaitons préparer un premier échange de cadrage.');

  await submit.click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(formFields.need).toHaveValue('Nous souhaitons préparer un premier échange de cadrage.');

  await submit.click();
  await expect(page.locator('[data-kind="success"]')).toContainText(/demande.*reçue/i);
  await expect(formFields.need).toHaveValue('');
  expect(attempt).toBe(3);
});

test('un double clic pendant l’envoi ne crée qu’une demande', async ({ page }) => {
  let requestCount = 0;
  let releaseRequest!: () => void;
  const requestCanComplete = new Promise<void>((resolve) => {
    releaseRequest = resolve;
  });

  await page.route(formEndpoint, async (route) => {
    requestCount += 1;
    await requestCanComplete;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify({ next: '/merci' }),
    });
  });

  await page.goto('/contact/');
  const formFields = await fillContactForm(page);
  const submit = page.getByRole('button', { name: /envoyer ma demande/i });

  await submit.evaluate((button: HTMLButtonElement) => {
    button.click();
    button.click();
  });

  await expect.poll(() => requestCount).toBe(1);
  await expect(submit).toBeDisabled();
  await expect(formFields.email).toBeDisabled();
  await expect(formFields.need).toBeDisabled();

  releaseRequest();
  await expect(page.locator('[data-kind="success"]')).toContainText(/demande.*reçue/i);
  expect(requestCount).toBe(1);
});
