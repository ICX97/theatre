/*
  Generates environment.prod.ts from Netlify (or CI) environment variables at build time.
  This avoids committing real keys to the repository.
*/

const fs = require('fs');
const path = require('path');

const apiUrl = process.env.API_URL || 'https://your-railway-app.railway.app';
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY || 'pk_live_your_stripe_public_key';

const fileContent = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
  stripePublicKey: '${stripePublicKey}'
};
`;

const targetPath = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, fileContent, { encoding: 'utf8' });
console.log('Generated environment.prod.ts from env vars');


