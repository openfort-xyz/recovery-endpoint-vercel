# Recovery Endpoint - Vercel

One-click deploy Openfort Shield recovery endpoint on Vercel Functions.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openfort-xyz/recovery-endpoint-vercel&project-name=shield-recovery-endpoint&env=SHIELD_PUBLISHABLE_KEY,SHIELD_SECRET_KEY,SHIELD_ENCRYPTION_SHARE&envDescription=Required%20Shield%20API%20keys%20from%20your%20Openfort%20project&envLink=https://www.openfort.xyz/docs&project-deployment-protection=disabled)

## Environment Variables

Set these in Vercel during deployment:

- `SHIELD_PUBLISHABLE_KEY`: Your Shield publishable API key
- `SHIELD_SECRET_KEY`: Your Shield secret API key  
- `SHIELD_ENCRYPTION_SHARE`: Your Shield encryption share

## API Endpoint

Creates a POST endpoint at `/api/shield-session` that:

1. Accepts a POST request
2. Calls the Shield encryption-session API
3. Returns the session ID

**Response format:**
```json
{
  "session": "session_id_here"
}
```

## Local Development

```bash
npm install
npm run dev
```

## Features

- Serverless functions
- Automatic HTTPS
- Environment variable management
- TypeScript support

## Support

For issues with Openfort Shield: [Openfort Documentation](https://www.openfort.xyz/docs)

For Vercel: [Vercel Documentation](https://vercel.com/docs)

## License

MIT