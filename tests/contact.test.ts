import assert from 'node:assert/strict';
import test from 'node:test';

import { submitContact } from '../src/lib/contact.ts';

const submission = {
  email: 'lea@example.com',
  organization: 'Cabinet Exemple',
  name: 'Léa Martin',
  need: 'Nous souhaitons mieux retrouver des pièces dans nos archives.',
  website: '',
};

test('une réponse explicite du service confirme la réception', async () => {
  const result = await submitContact({
    endpoint: 'https://formspree.io/f/example-form',
    submission,
    send: async () => new Response(JSON.stringify({ next: '/merci' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }),
  });

  assert.deepEqual(result, { status: 'accepted' });
});

test('une erreur du service ne confirme pas la réception', async () => {
  const result = await submitContact({
    endpoint: 'https://formspree.io/f/example-form',
    submission,
    send: async () => new Response(JSON.stringify({ ok: false }), {
      status: 422,
      headers: { 'content-type': 'application/json' },
    }),
  });

  assert.deepEqual(result, { status: 'failed', reason: 'rejected' });
});

test('une panne réseau ne confirme pas la réception', async () => {
  const result = await submitContact({
    endpoint: 'https://formspree.io/f/example-form',
    submission,
    send: async () => { throw new TypeError('fetch failed'); },
  });

  assert.deepEqual(result, { status: 'failed', reason: 'network' });
});

test('sans service configuré, aucune tentative d’envoi n’est faite', async () => {
  const result = await submitContact({
    endpoint: '',
    submission,
    send: async () => { throw new Error('le service ne doit pas être appelé'); },
  });

  assert.deepEqual(result, { status: 'unavailable' });
});

test('le service reçoit uniquement les champs du formulaire et le honeypot', async () => {
  let received: Record<string, FormDataEntryValue> = {};

  await submitContact({
    endpoint: 'https://formspree.io/f/example-form',
    submission,
    send: async (_url, init) => {
      received = Object.fromEntries((init?.body as FormData).entries());
      return new Response(JSON.stringify({ next: '/merci' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    },
  });

  assert.deepEqual(received, {
    email: 'lea@example.com',
    structure: 'Cabinet Exemple',
    nom: 'Léa Martin',
    besoin: 'Nous souhaitons mieux retrouver des pièces dans nos archives.',
    _gotcha: '',
  });
});

test('un honeypot rempli ne produit jamais de confirmation', async () => {
  const result = await submitContact({
    endpoint: 'https://formspree.io/f/example-form',
    submission: { ...submission, website: 'https://spam.example' },
    send: async () => new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }),
  });

  assert.deepEqual(result, { status: 'failed', reason: 'rejected' });
});

test('un HTTP 200 sans acceptation explicite ne confirme pas la réception', async () => {
  const result = await submitContact({
    endpoint: 'https://formspree.io/f/example-form',
    submission,
    send: async () => new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }),
  });

  assert.deepEqual(result, { status: 'failed', reason: 'rejected' });
});

test('une erreur HTTP ne confirme pas la réception même si le corps a le format de succès', async () => {
  const result = await submitContact({
    endpoint: 'https://formspree.io/f/example-form',
    submission,
    send: async () => new Response(JSON.stringify({ next: '/merci' }), {
      status: 503,
      headers: { 'content-type': 'application/json' },
    }),
  });

  assert.deepEqual(result, { status: 'failed', reason: 'rejected' });
});

test('une requête qui dépasse le délai rend la main sans confirmation', async () => {
  let signal: AbortSignal | undefined;
  const result = await submitContact({
    endpoint: 'https://formspree.io/f/example-form',
    submission,
    timeoutMs: 5,
    send: async (_url, init) => {
      signal = init?.signal ?? undefined;
      if (!signal) throw new Error('signal absent');

      await new Promise<void>((_resolve, reject) => {
        signal?.addEventListener('abort', () => reject(signal?.reason), { once: true });
      });
      return new Response();
    },
  });

  assert.deepEqual({ result, aborted: signal?.aborted }, {
    result: { status: 'failed', reason: 'network' },
    aborted: true,
  });
});
