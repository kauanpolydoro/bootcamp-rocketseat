import { loadStripe } from '@stripe/stripe-js';

export async function getStripeJs() {
  const stipeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

  return stipeJs;
}