import Link from "next/link";
import router from "next/router";
import{AiFillHome} from 'react-icons/ai'
import {BsPerson} from "react-icons/bs";
import {TbBuildingWarehouse} from "react-icons/tb"
import {MdAccountBox,MdPayments} from "react-icons/md"
import {BiLogOut} from "react-icons/bi"


export default function test (){
    const logout = () => {
        sessionStorage.removeItem('Token');
        router.push('/login');
      };
    return(
        <div class="flex h-screen bg-gray-200">
        
        <aside class="w-64 bg-gray-900">
          <div class="p-4">
            <h1 class="text-lg font-semibold text-white">Home</h1>
          </div>
          <nav class="mt-6">
            <ul class="space-y-2">
              <li>
              <Link legacyBehavior href="/home">
                <a class="flex items-center px-4 py-2 text-white font-semibold hover:bg-gray-100 hover:text-black font-bold"><AiFillHome size={18} className="mr-4"/>
                  <span>Home </span>
                </a>
                </Link>
              </li>
              <li>
              <Link legacyBehavior href="/client">
                <a class="flex items-center px-4 py-2 text-white font-semibold hover:bg-gray-100 hover:text-black font-bold"><BsPerson size={18} className="mr-4"/>
                  <span>Client</span>
                </a>
              </Link>
              </li>
              <li>
              <Link legacyBehavior href="/lot">
                <a class="flex items-center px-4 py-2 text-white font-semibold hover:bg-gray-100 hover:text-black font-bold"><TbBuildingWarehouse size={18} className="mr-4"/>
                  <span>Lot</span>
                </a>
              </Link>
              </li>
              <li>
              <Link legacyBehavior href="/account">
                <a class="flex items-center px-4 py-2 text-white font-semibold hover:bg-gray-100 hover:text-black font-bold"><MdAccountBox size={18} className="mr-4"/>
                  <span>Account</span>
                </a>
              </Link>
              </li>
              <li>
              <Link legacyBehavior href="/payment">
                <a class="flex items-center px-4 py-2 text-white font-semibold hover:bg-gray-100 hover:text-black font-bold"><MdPayments size={18} className="mr-4"/>
                  <span>Payment</span>
                </a>
              </Link>
              </li>

              <li>
                <a class="flex items-center px-4 py-2 text-white font-semibold hover:bg-gray-100 hover:text-black font-bold"><BiLogOut size={18} className="mr-4"/>
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