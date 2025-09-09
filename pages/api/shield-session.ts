import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const r = await fetch('https://shield.openfort.io/project/encryption-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.SHIELD_PUBLISHABLE_KEY as string,
        'x-api-secret': process.env.SHIELD_SECRET_KEY as string,
      },
      body: JSON.stringify({
        encryption_part: process.env.SHIELD_ENCRYPTION_SHARE as string,
      }),
    });

    if (!r.ok) throw new Error('Failed to authorize user');

    const json = await r.json();
    res.status(200).json({ session: json.session_id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
}