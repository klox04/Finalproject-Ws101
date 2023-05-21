import {useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

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
  const logout = () => {
    sessionStorage.removeItem('Token')
    router.push('/login')
  }

  return (
    <div className="flex flex-col h-screen">
    <header className="bg-gray-800 text-white py-3 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Home</h1>
        <button className="px-3 py-1 bg-gray-600 rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </header>
    <div className="flex items-center justify-center mt-2">
    <form action="/api/checkout_sessions" method="POST" className="mt-4 mr-10">
    <section>
      <div>
      <div className='description'>
						<h3 className='heading'>Inner LOT</h3>
						<h5 className='price'>$100,000</h5>
					</div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
      Pay
      </button>
    </section>
  </form>
  <form action="/api/checkout_sessions" method="POST" className="mt-4 mr-10">
    <section>
      <div>
      <div className='description'>
						<h3 className='heading'>Inner LOT</h3>
						<h5 className='price'>$100,000</h5>
					</div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
        Pay
      </button>
    </section>
  </form>
  <form action="/api/checkout_sessions" method="POST" className="mt-4 mr-10">
    <section>
      <div>
      <div className='description'>
						<h3 className='heading'>Inner LOT</h3>
						<h5 className='price'>$100,000</h5>
					</div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
        Pay
      </button>
    </section>
  </form>
  </div>
  </div>
  
  );
}
export default HomePage;