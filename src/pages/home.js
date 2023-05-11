import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { app, database } from './firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { useRouter } from 'next/router';
export default function Home() {
  const [ID, setID] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [emailadd, setEmailAdd]= useState("");
  const [address, setAddress]=useState("");
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
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
        setAge(null)
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
      address: address

      
    })
    .then(() => {
      alert('Data Updated')
      getData()
      setName('')
      setAge(null)
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
    <div class="flex flex-col h-screen" >
    <header class="bg-gray-800 text-white py-3 px-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Home</h1>
      <button class="px-3 py-1 bg-gray-600 rounded" onClick={logout}>Log Out</button>
    </div>
  </header>

    <main  class="flex-1 overflow-y-auto p-4">
      <div class="mb-4">
      <input
        placeholder='Name'
        class="w-full px-3 py-2 rounded-lg border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      </div>
      <div  class="mb-4">
      <input
        placeholder='Age'
        class="w-full px-3 py-2 rounded-lg border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        type="number"
        value={age}
        onChange={event => setAge(event.target.value)}
      />
      </div>
      <div  class="mb-4">
      <input
        placeholder='Email Address'
        class="w-full px-3 py-2 rounded-lg border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        type="text"
        value={emailadd}
        onChange={event => setEmailAdd(event.target.value)}
      />
      </div>
      <div  class="mb-4">
      <input
        placeholder='Address'
        class="w-full px-3 py-2 rounded-lg border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        type="text"
        value={address}
        onChange={event => setAddress(event.target.value)}
      />
      </div>

      {isUpdate ? (
        <button
        class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={updateFields}
        >
          UPDATE
        </button>
      ) : (
        <button
        class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={addData}
        >
          ADD
        </button>
      )}

      <div class="mt-4 grid grid-cols-2 gap-4 place-content-stretch h-48 ...flex items-stretch ... " >
        {fireData.map((data) => {
          return (
            <div class="bg-gray-100 p-4 mb-4 rounded-lg border-solid border-2 border-indigo-600 " >
              <h1 class="font-bold mb-2">Name: {data.name}</h1>
              <h1 class="mb-2">Age: {data.age}</h1>
              <h1 class="mb-2">Email Address: {data.emailadd}</h1>
              <h1 class="mb-2">Address: {data.address}</h1>
              <button class="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mr-2"
               
                onClick={() => getID(data.id, data.name, data.age)}
              >Update</button>
              <button
                class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mr-2"
                onClick={() => deleteDocument(data.id)}
              >Delete</button>
            </div>
          )
        })}
      </div>
    </main>
  </div>
)
}
