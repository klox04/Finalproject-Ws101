import Link from 'next/link';
export default function Client() {
    const logout = () => {
        sessionStorage.removeItem('Token')
        router.push('/login')
      }
    return(
        <div className="flex flex-col h-screen">
          <header className="bg-gray-800 text-white py-3 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Home</h1>
    
        <button className="px-3 py-1 bg-gray-600 rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </header>
    <div className="flex items-center justify-center mt-2" >
  <div className="mb-4 mr-1" >
  <Link legacyBehavior href="/home">
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Home</button>
    </Link>
  </div>
  <div  className="mb-4 mr-1">
  <Link legacyBehavior href="/client">
  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Client</button>
  </Link>
  </div>
  <div className="mb-4 mr-1">
   <Link legacyBehavior href="/lot">
  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Lot</button>
  </Link>
  </div>
  <div className="mb-4 mr-1">
   <Link legacyBehavior href="/account">
  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Account</button>
  </Link>
  </div>
  <div className="mb-4 mr-1">
  <Link legacyBehavior href="/payment">
  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Payment</button>
  </Link>
  </div>
</div>
        </div> 
        
    )
}