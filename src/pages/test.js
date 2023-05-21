import {useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe( process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const HomePage = () => {
	const router = useRouter();
	const { success, canceled } = router.query;

	useEffect(() => {
		if (success !== undefined || canceled !== undefined) {
			if (success) {
				console.log(
					'Order placed! You will receive an email confirmation.'
				);
			}

			if (canceled) {
				console.log(
					'Order canceled -- continue to shop around and checkout when you’re ready.'
				);
			}
		}
	}, [success, canceled]);

  return (
    <form action="/api/checkout_sessions" method="POST" className="mt-4">
    <section>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Checkout
      </button>
    </section>
  </form>
  );
}
export default HomePage;