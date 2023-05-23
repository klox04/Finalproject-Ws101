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
import { useRouter } from 'next/router'
export default function Account() {
    const [ID, setID] = useState(null);
    const [accountnum, setAccountNum] = useState(null);
    const [maxLotNum, setMaxLotNum] = useState(0);
    const [clientname, setClientName] = useState('');
    const [lotid, setLotID]= useState(null);
    const [price, setPrice]=useState(null);
    const [fireData, setFireData] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const databaseRef = collection(database, 'Account Data');
    let router = useRouter()
    useEffect(() => {
      let token = sessionStorage.getItem('Token')
      if (token) {
        getData()
        getMaxLotNumber()
      }
      if (!token) {
        router.push('/login')
      }
    }, [])
    const getMaxLotNumber = async () => {
        await getDocs(databaseRef)
          .then((response) => {
            let maxNum = 0;
            response.docs.forEach((data) => {
              const Num = data.data().Number;
              if (Num > maxNum) {
                maxNum = Num;
              }
            });
            setMaxLotNum(maxNum);
          });
      };
  
    const addData = () => {
      if (clientname.trim() === null || lotid === null || price === null) {
        alert('Please fill in all fields');
        return;
      }
        const newLotNum = maxLotNum + 1;
      addDoc(databaseRef, {
        Accountnum: newLotNum,
        Clientname: clientname,
        LotID: Number(lotid),
        Price: Number(price)
      })
        .then(() => {
          alert('Data Sent')
          getData()
          setClientName('')
          setLotID('')
          setPrice('')
          setMaxLotNum(newLotNum);
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
  
    const getID = (id, accountnum, clientname, lotid, price) => {
      setID(id)
      setAccountNum(accountnum)
      setClientName(clientname)
      setLotID(lotid)
      setPrice(price)
      setIsUpdate(true)
    }
  
    const updateFields = () => {
      let fieldToEdit = doc(database, 'Account Data', ID);
      updateDoc(fieldToEdit, {
        Accountnum: Number(accountnum),
        Clientname: clientname,
        LotID: Number(lotid),
        Price: Number(price)
      })
      .then(() => {
        alert('Data Updated')
        getData()
        setAccountNum('')
        setClientName('')
        setLotID('')
        setPrice('')
        setIsUpdate(false)
      })
      .catch((err) => {
        console.log(err);
      })
    }
    const deleteDocument = (id) => {
      let fieldToEdit = doc(database, 'Account Data', id);
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
        <div className="flex h-screen bg-white-900" >
               <aside
        className={`w-64 bg-gray-900  shadow ${isSidebarOpen ? "" : "hidden"}`}
        id="sidebar"
      >
        <div className="p-4 mt-4">
          <h1 className="text-lg font-semibold text-white">Account Management</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link legacyBehavior href="/home">
                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <span >Home</span>
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
      placeholder="LOT ID"
      className="border border-gray-300 rounded px-4 py-2"
      type="number"
      value={lotid}
      onChange={(event) => setLotID(event.target.value)}
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
  {isUpdate ? (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={updateFields}>
      UPDATE
    </button>
  ) : (
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"  onClick={addData}>
      ADD
    </button>
  )}
  </div>
</div>
    <main className="flex-1 overflow-y-auto p-4  ">
      <table className="w-full border-solid border-2 border-gray-500">
        <thead>
          <tr>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Account Number</th>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Client Name</th>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Num Lot</th>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Price</th>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fireData.map((data) =>  (
            <tr key={data.id} className='text-center'>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.Accountnum}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.Clientname}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.LotID}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.Price}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">
                <button className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mr-2" onClick={() => getID(data.id, data.Accountnum, data.Clientname, data.LotID, data.Price)}>
                  Update
                </button>
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