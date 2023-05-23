import { useEffect, useState } from 'react'
import {database} from './firebaseConfig';
import Link from 'next/link';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { useRouter } from 'next/router';
export default function Payment() {
    const [ID, setID] = useState(null);
    const [accountnum, setAccountNum] = useState(null);
    const [clientname, setClientName] = useState('');
    const [price, setPrice]= useState(null);
    const [deduct,setDeduct]=useState(null)
    const [fireData, setFireData] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const databaseRef = collection(database, 'Payment Data');
    let router = useRouter()
    useEffect(() => {
      let token = sessionStorage.getItem('Token')
      if (token) {
        getData()
      }
      if (!token) {
        router.push('/login')
      }
    }, [])
  
    const addData = () => {
      if (accountnum === null || clientname.trim() === '' || price === null || deduct==null) {
        alert('Please fill in all fields');
        return;
      }
      const balance = price - deduct;
      addDoc(databaseRef, {
        Accountnum: Number(accountnum),
        ClientName: clientname,
        Price: Number(price),
        Pay: Number(deduct),
        Balance: balance
      })
        .then(() => {
          alert('Data Sent')
          getData()
          setAccountNum('')
          setClientName('')
          setPrice('')
          setDeduct('')
        })
        .catch((err) => {
          console.error(err);
        })
        
    }
  
    const getData = async () => {
      await getDocs(databaseRef)
        .then((response) => {
          setFireData(response.docs.map((data) => {
            return { ...data.data(), id: data.id }
          }))
        })
    }
  
    const getID = (id, accountnum, clientname, price, deduct) => {
      setID(id)
      setAccountNum(accountnum)
      setClientName(clientname)
      setPrice(price)
      setDeduct(deduct)
      setIsUpdate(true)
    }
  
    const deleteDocument = (id) => {
      let fieldToEdit = doc(database, 'Payment Data', id);
      deleteDoc(fieldToEdit)
      .then(() => {
        alert('Data Deleted')
        getData()
      })
      .catch((err) => {
        alert('Cannot Delete that field..')
      })
    }
    const logout = () => {
        sessionStorage.removeItem('Token')
        router.push('/login')
      }
      const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
      };
    return(
        <div className="flex h-screen bg-gray-200">
             <aside
        className={`w-64 bg-gray-900 text-white shadow ${isSidebarOpen ? "" : "hidden"}`}
        id="sidebar"
      >
        <div className="p-4 mt-4">
          <h1 className="text-lg font-semibold">Payment Management</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link legacyBehavior href="/home">
                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
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
                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <span onClick={logout}>Logout</span>
                </a>
  
            </li>
            
          </ul>
        </nav>
      </aside>
      <button
  className="text-gray-800 hover:text-gray-600 focus:outline-none"
  onClick={toggleSidebar}
>
➤
    {isSidebarOpen ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12h18M9 5l7 7-7 7"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    )}
  
</button>
<main className="flex-grow container mx-auto px-4 py-8">
<div className="flex items-center justify-center mt-2" >
  <div className="mb-4 mr-1" >
    <input
      placeholder="Account Number"
      className="border border-gray-300 rounded px-4 py-2"
      type='number'
      value={accountnum}
      onChange={(event) => setAccountNum(event.target.value)}
      />
  </div>
  <div className="mb-4 mr-1">
    <input
      placeholder="Client Name"
      className="border border-gray-300 rounded px-4 py-2"
      type="text"
      value={clientname}
      onChange={(event) => setClientName(event.target.value)}
    />
  </div>
  <div className="mb-4 mr-1">
    <input
      placeholder="Price"
      className="border border-gray-300 rounded px-4 py-2"
      type="number"
      value={price}
      onChange={(event) => setPrice(event.target.value)}
    />
  </div>
  <div className="mb-4 mr-1">
    <input
      placeholder="Pay"
      className="border border-gray-300 rounded px-4 py-2"
      type="number"
      value={deduct}
      onChange={(event) => setDeduct(event.target.value)}
    /> 
  </div>
  <div className="mb-4 mr-1">
  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"  onClick={addData}>
      ADD
    </button>
  </div>
</div>
   <main className="flex-1 overflow-y-auto p-4  ">
      <table className="w-full border-solid border-2 border-gray-500">
        <thead>
          <tr>
            <th className="py-1px-2 border-solid border-2 border-gray-500">Account Number</th>
            <th className="py-1 px-2 border-solid border-2 border-gray-500">Client Name</th>
            <th className="py-1 px-2 border-solid border-2 border-gray-500">Price Of Lot</th>
            <th className="py-1 px-2 border-solid border-2 border-gray-500">Pay</th>
            <th className="py-1 px-2 border-solid border-2 border-gray-500">Balance</th>
            <th className="py-1 px-2 border-solid border-2 border-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fireData.map((data) =>  (
            <tr key={data.id} className='text-center'>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.Accountnum}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.ClientName}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.Price}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.Pay}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.Balance}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">
                <button className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={() => deleteDocument(data.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   </main>
   </main>
        </div> 
        
    )
}