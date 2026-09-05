export interface ContactSubmission {
  email: string;
  organization: string;
  name: string;
  need: string;
  website: string;
}

export interface SubmitContactOptions {
  endpoint: string;
  submission: ContactSubmission;
  send?: typeof fetch;
  timeoutMs?: number;
}

export type ContactResult =
  | { status: 'accepted' }
  | { status: 'unavailable' }
  | { status: 'failed'; reason: 'rejected' | 'network' };

export async function submitContact({
  endpoint,
  submission,
  send = fetch,
  timeoutMs = 15_000,
}: SubmitContactOptions): Promise<ContactResult> {
  if (endpoint.trim() === '') {
    return { status: 'unavailable' };
  }

  if (submission.website.trim() !== '') {
    return { status: 'failed', reason: 'rejected' };
  }

  try {
    const body = new FormData();
    body.set('email', submission.email);
    body.set('structure', submission.organization);
    body.set('nom', submission.name);
    body.set('besoin', submission.need);
    body.set('_gotcha', submission.website);

    const response = await send(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
      signal: AbortSignal.timeout(timeoutMs),
    });
    const data = await response.json();

    return response.ok && typeof data?.next === 'string'
      ? { status: 'accepted' }
      : { status: 'failed', reason: 'rejected' };
  } catch {
    return { status: 'failed', reason: 'network' };
  }
}
