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
  const [address, SetAddress]=useState("");
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
      router.push('/register')
    }
  }, [])

  const addData = () => {
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
        SetAddress("")
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
    SetAddress(address)
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
      SetAddress('')
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
<div className="w-full min-h-screen bg-white-900" >
     <div className="bg-white pb-16 border-b-2 border-gray-900">
      <div className="p-5 ml-10 float-right text-xl text-gray-900 font-mono">
          <button onClick={logout}>LogOut</button>
          </div>  
    <div className="p-5 ml-10 float-left text-xl text-gray-900 font-mono font-semibold">
    <h1 >Home</h1>
    </div>
    </div>

    <div class="flex flex-col space-y-4">
  <div class="flex justify-between items-center">
    <input placeholder="Name" type="text" value={name} class="w-1/4 border rounded py-2 px-3" onChange={(event) => setName(event.target.value)} />
    <input placeholder="Age" type="number" value={age} class="w-1/4 border rounded py-2 px-3" onChange={(event) => setAge(event.target.value)} />
    <input placeholder="Email Address" type="text" value={emailadd} class="w-1/4 border rounded py-2 px-3" onChange={(event) => setEmailAdd(event.target.value)} />
    <input placeholder="Address" type="text" value={address} class="w-1/4 border rounded py-2 px-3" onChange={(event) => SetAddress(event.target.value)} />
    {isUpdate ? (
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={updateFields}>update</button>
    ) : (
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={addData}>Add</button>
    )}
  </div>
  <div class="space-y-4">
    {fireData.map((data)=> {
      return(
        <div class="flex justify-between items-center border p-4 rounded">
          <div  class="flex justify-between items-center">
            <h1 class="font-bold mr-5">Name: {data.name}</h1>
            <h1 class="font-bold mr-5">Age: {data.age}</h1>
            <h1 class="font-bold mr-5">Email Address: {data.emailadd}</h1>
            <h1 class="font-bold mr-5">Address: {data.address}</h1>
          </div>
          <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() =>getID(data.id, data.name, data.age, data.emailadd, data.address)}>Update</button>
          <button class="bg-red-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() =>deleteDocument(data.id)}>Delete</button>
        </div>
      )
    })}
  </div>
</div>
    
  </div>
  )
}
