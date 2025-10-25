import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    console.log('[OPENFORT] Incoming request to /api/shield-session');

    const apiKey = process.env.SHIELD_PUBLISHABLE_KEY as string;
    const apiSecret = process.env.SHIELD_SECRET_KEY as string;
    const encryptionShare = process.env.SHIELD_ENCRYPTION_SHARE as string;

    if (!apiKey || !apiSecret || !encryptionShare) {
      console.error('[OPENFORT] Missing required environment variables. SHIELD_PUBLISHABLE_KEY, SHIELD_SECRET_KEY, or SHIELD_ENCRYPTION_SHARE is not set.');
      return res.status(500).json({ error: '[OPENFORT] Missing required environment variables.' });
    }

    const r = await fetch('https://shield.openfort.io/project/encryption-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'x-api-secret': apiSecret,
      },
      body: JSON.stringify({
        encryption_part: encryptionShare,
      }),
    });

    if (!r.ok) {
      const text = await r.text();
      console.error(`[OPENFORT] Shield failed to authorize keys. Status: ${r.status}. Response: ${text}`);
      return res.status(502).json({ error: '[OPENFORT] Shield failed to authorize keys. Please check your .env keys and try again.' });
    }

    const json = await r.json();
    console.log('[OPENFORT] Successfully created shield session:', json.session_id);
    res.status(200).json({ session: json.session_id });
  } catch (e) {
    console.error('[OPENFORT] Shield internal server error:', e);
    res.status(500).json({ error: '[OPENFORT] Shield internal server error. Please contact the Openfort team at https://t.me/openfort' });
  }
}
