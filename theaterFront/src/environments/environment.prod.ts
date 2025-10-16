export const environment = {
    production: true,
    apiUrl: process.env['API_URL'] || 'https://your-railway-app.railway.app',
    stripePublicKey: process.env['STRIPE_PUBLIC_KEY'] || 'pk_live_your_stripe_public_key'
  };