import { expect, test } from '@playwright/test';

const publicRoutes = ['/', '/avocats/', '/contact/'] as const;

async function fillValidContactForm(page: import('@playwright/test').Page) {
  await page.getByRole('textbox', { name: /email professionnel/i }).fill('contact@example.test');
  await page.getByRole('textbox', { name: /^structure/i }).fill('Cabinet exemple');
  await page.getByRole('textbox', { name: /votre besoin/i }).fill('Préparer un échange de cadrage.');
}

test('un prospect parcourt l’offre depuis l’accueil et atteint le contact', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible();

  await page.locator('main a[href="/avocats/"]').first().click();
  await expect(page).toHaveURL(/\/avocats\/$/);
  await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible();

  await page.getByRole('link', { name: /parlons de votre dossier/i }).first().click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible();
});

test('les routes et liens internes publics sont accessibles', async ({ page, request }) => {
  for (const route of publicRoutes) {
    const response = await request.get(route);
    expect(response.ok(), `${route} doit répondre avec succès`).toBeTruthy();

    await page.goto(route);
    const links = await page.locator('a[href^="/"]').evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute('href')).filter((href): href is string => href !== null),
    );

    for (const href of new Set(links)) {
      const linkResponse = await request.get(href);
      expect(linkResponse.ok(), `${href} lié depuis ${route} doit répondre avec succès`).toBeTruthy();
    }
  }
});

test('le lien d’évitement place le focus sur le contenu principal', async ({ page }) => {
  await page.goto('/avocats/');

  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: /aller au contenu/i });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();

  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
});

test('la navigation compacte reste utilisable au clavier', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');

  const menu = page.getByRole('button', { name: /menu/i });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');

  const offerLink = page.getByRole('navigation', { name: /navigation principale/i })
    .getByRole('link', { name: /archives pour avocats/i });
  await expect(offerLink).toBeVisible();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(offerLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/avocats\/$/);
});

test('un formulaire invalide conserve les informations déjà saisies', async ({ page }) => {
  await page.goto('/contact/');

  const email = page.getByRole('textbox', { name: /email professionnel/i });
  const structure = page.getByRole('textbox', { name: /^structure/i });
  await email.fill('contact@example.test');
  await structure.fill('Cabinet exemple');
  await page.getByRole('button', { name: /préparer mon email/i }).click();

  await expect(email).toHaveValue('contact@example.test');
  await expect(structure).toHaveValue('Cabinet exemple');
  await expect(page.getByRole('textbox', { name: /votre besoin/i })).toBeFocused();

  await page.getByRole('textbox', { name: /votre besoin/i }).fill('Préparer un échange de cadrage.');
  await email.fill('adresse invalide');
  await page.getByRole('button', { name: /préparer mon email/i }).click();
  await expect(email).toBeFocused();
  await expect(email).toHaveValue('adresse invalide');
  await expect(page.getByRole('textbox', { name: /votre besoin/i })).toHaveValue('Préparer un échange de cadrage.');
});

test('le repli prépare un email sans annoncer la réception de la demande', async ({ page }) => {
  await page.goto('/contact/');
  const form = page.locator('form[data-contact-form]');
  await expect(form).toHaveAttribute('action', /^mailto:contact@allgates\.net$/);

  const cdp = await page.context().newCDPSession(page);
  let mailtoUrl = '';
  await cdp.send('Page.enable');
  cdp.on('Page.frameRequestedNavigation', ({ url }) => {
    if (url.startsWith('mailto:')) mailtoUrl = url;
  });

  await fillValidContactForm(page);
  await page.getByRole('button', { name: /préparer mon email/i }).click();

  await expect.poll(() => mailtoUrl).toContain('mailto:contact@allgates.net?');
  expect(decodeURIComponent(mailtoUrl)).toContain('Cabinet exemple');
  expect(decodeURIComponent(mailtoUrl)).toContain('Préparer un échange de cadrage.');
  const status = page.getByRole('status');
  await expect(status).toContainText(/messagerie.*ouvrir/i);
  await expect(status).not.toContainText(/reçue|reçu/i);
  await cdp.detach();
});

test('le contact et la navigation restent accessibles sans JavaScript sur mobile', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 720 },
  });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:4322/contact/');
  const menu = page.getByRole('button', { name: /menu/i });
  await expect(menu).toBeHidden();
  const navigationLink = page.getByRole('navigation', { name: /navigation principale/i })
    .getByRole('link', { name: /archives pour avocats/i });
  await expect(navigationLink).toBeVisible();
  const [navigationBox, titleBox] = await Promise.all([
    navigationLink.boundingBox(),
    page.getByRole('main').getByRole('heading', { level: 1 }).boundingBox(),
  ]);
  expect(navigationBox?.y ?? Infinity).toBeLessThan(titleBox?.y ?? -Infinity);

  const directEmail = page.getByRole('link', { name: /contact@allgates\.net/i }).first();
  await expect(directEmail).toBeVisible();
  await expect(directEmail).toHaveAttribute('href', 'mailto:contact@allgates.net');

  await context.close();
});

test.describe('lecture à 320px et texte agrandi', () => {
  test.use({ viewport: { width: 320, height: 720 } });

  for (const route of publicRoutes) {
    test(`${route} reste sans débordement horizontal`, async ({ page }) => {
      await page.goto(route);
      await page.locator('html').evaluate((element) => {
        element.style.fontSize = '200%';
      });

      await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible();
      const overflow = await page.evaluate(() => {
        const viewportWidth = document.documentElement.clientWidth;
        const elements = Array.from(document.querySelectorAll<HTMLElement>('body *'))
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && (rect.left < -0.5 || rect.right > viewportWidth + 0.5);
          })
          .map((element) => `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ''}${element.className ? `.${String(element.className).split(/\s+/).join('.')}` : ''}`)
          .slice(0, 12);
        return {
          clientWidth: viewportWidth,
          elements,
          scrollWidth: document.documentElement.scrollWidth,
        };
      });

      expect(
        overflow.scrollWidth <= overflow.clientWidth,
        `largeur ${overflow.scrollWidth}px pour ${overflow.clientWidth}px ; éléments qui dépassent : ${overflow.elements.join(', ')}`,
      ).toBe(true);
    });
  }
});
