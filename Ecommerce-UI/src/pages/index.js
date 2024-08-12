import getStripe from '../lib/getStripe';


export default function Home() {
    async function handleCheckout() {
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        successUrl: `http://localhost:3000/success`,
        cancelUrl: `http://localhost:3000/cancel`,
        customerEmail: 'customer@email.com',
      });
      console.warn(error.message);
    }
  
    return <button onClick={handleCheckout}>Checkout</button>;
  }