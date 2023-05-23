import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react'
import { app, database } from './firebaseConfig';
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
  const [imageUrl, setImageUrl] = useState('');
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
    <div className="flex items-center justify-center mt-2" >
  <div className="mb-4 mr-1" >
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
    <footer className="h-10 rounded-lg shadow"></footer>
  </div>
)
}
