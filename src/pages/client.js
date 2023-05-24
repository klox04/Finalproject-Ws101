import { useEffect, useState } from 'react'
import { database } from './firebaseConfig';
import{AiFillHome} from 'react-icons/ai'
import {BsPerson} from "react-icons/bs";
import {TbBuildingWarehouse} from "react-icons/tb"
import {MdAccountBox,MdPayments} from "react-icons/md"
import {BiLogOut} from "react-icons/bi"
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
export default function Client() {
  const [ID, setID] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [emailadd, setEmailAdd]= useState("");
  const [address, setAddress]=useState("");
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const databaseRef = collection(database, 'CRUD Data');
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
    if (name.trim() === '' || age.trim() === '' || emailadd.trim() === '' || address.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
    addDoc(databaseRef, {
      name: name,
      age: Number(age),
      emailadd: emailadd,
      address: address
    })
      .then(() => {
        alert('Data Sent')
        getData()
        setName('')
        setAge('')
        setEmailAdd("")
        setAddress("")
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

  const getID = (id, name, age, emailadd, address) => {
    setID(id)
    setName(name)
    setAge(age)
    setEmailAdd(emailadd)
    setAddress(address)
    setIsUpdate(true)
  }

  const updateFields = () => {
    let fieldToEdit = doc(database, 'CRUD Data', ID);
    updateDoc(fieldToEdit, {
      name: name,
      age: Number(age),
      emailadd: emailadd,
      address: address,
    })
    .then(() => {
      alert('Data Updated')
      getData()
      setName('')
      setAge('')
      setEmailAdd('')
      setAddress('')
      setIsUpdate(false)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  const deleteDocument = (id) => {
    let fieldToEdit = doc(database, 'CRUD Data', id);
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

  return (
    <div className="flex h-screen bg-gray-200">
         <aside
        className={`w-64 bg-gray-900 text-white shadow ${isSidebarOpen ? "" : "hidden"}`}
        id="sidebar"
      >
        <div className="p-4 mt-4">
          <h1 className="text-lg font-semibold">Client Management</h1>
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
      placeholder="Name"
      className="border border-gray-300 rounded px-4 py-2"
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
  </div>
  <div className="mb-4 mr-1">
    <input
      placeholder="Age"
      className="border border-gray-300 rounded px-4 py-2"
      type="number"
      value={age}
      onChange={(event) => setAge(event.target.value)}
    />
  </div>
  <div className="mb-4 mr-1">
    <input
      placeholder="Email Address"
      className="border border-gray-300 rounded px-4 py-2"
      type="text"
      value={emailadd}
      onChange={(event) => setEmailAdd(event.target.value)}
    />
  </div>
  <div className="mb-4 mr-1">
    <input
      placeholder="Address"
      className="border border-gray-300 rounded px-4 py-2"
      type="text"
      value={address}
      onChange={(event) => setAddress(event.target.value)}
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
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Name</th>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Age</th>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Email Address</th>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Address</th>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fireData .slice().map((data) =>  (
            <tr key={data.id} className='text-center'>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.name}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.age}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.emailadd}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.address}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">
                <button className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mr-2" onClick={() => getID(data.id, data.name, data.age, data.emailadd, data.address)}>
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
