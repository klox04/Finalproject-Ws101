import Link from "next/link";
import router from "next/router";

export default function test (){
    const logout = () => {
        sessionStorage.removeItem('Token');
        router.push('/login');
      };
    return(
        <div class="flex h-screen bg-gray-200">
        
        <aside class="w-64 bg-gray-900 text-white shadow">
          <div class="p-4">
            <h1 class="text-lg font-semibold">Home</h1>
          </div>
          <nav class="mt-6">
            <ul class="space-y-2">
              <li>
              <Link legacyBehavior href="/home">
                <a class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <span>Home</span>
                </a>
                </Link>
              </li>
              <li>
              <Link legacyBehavior href="/client">
                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <span>Client</span>
                </a>
              </Link>
              </li>
              <li>
              <Link legacyBehavior href="/lot">
                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <span>Lot</span>
                </a>
              </Link>
              </li>
              <li>
              <Link legacyBehavior href="/account">
                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <span>Account</span>
                </a>
              </Link>
              </li>
              <li>
              <Link legacyBehavior href="/payment">
                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <span>Payment</span>
                </a>
              </Link>
              </li>

              <li>
                <a class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <span onClick={logout}>Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      
        <div class="flex-1 flex flex-col">
          <header class="bg-white shadow">
            <div class="container mx-auto px-4 py-6">
              <h1 class="text-2xl font-semibold">Home</h1>
            </div>
          </header>
          <main class="flex-grow container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-semibold mb-4">Sales</h2>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold">$10,000</span>
                <span class="text-green-500">+5%</span>
              </div>
            </div>
          
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-semibold mb-4">Lot</h2>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold">456</span>
                <span class="text-green-500">+2%</span>
              </div>
            </div>
          
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-semibold mb-4">Client</h2>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold">890</span>
                <span class="text-green-500">+8%</span>
              </div>
            </div>
          </div>
        </main>
          <footer class="bg-white shadow">
            <div class="container mx-auto px-4 py-6 text-center">
              &copy; 2023 Dashboard. All rights reserved.
            </div>
          </footer>
        </div>
      </div>

    )
}