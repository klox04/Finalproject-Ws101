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
      age: Number(age)
    })
      .then(() => {
        alert('Data Sent')
        getData()
        setName('')
        setAge(null)
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

  const getID = (id, name, age) => {
    setID(id)
    setName(name)
    setAge(age)
    setIsUpdate(true)
  }

  const updateFields = () => {
    let fieldToEdit = doc(database, 'CRUD Data', ID);
    updateDoc(fieldToEdit, {
      name: name,
      age: Number(age)
    })
    .then(() => {
      alert('Data Updated')
      getData()
      setName('')
      setAge(null)
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

    <div  class="flex justify-center items-center mt-10 ">
    <div class="mr-5">
      <input placeholder='Name'
      type='text'
      value={name}
       onChange={(event) => setName(event.target.value)}></input>
    </div>

    <div class="mr-5">
      <input placeholder='Age'
      type='number'
      value={age}
       onChange={(event) => setAge(event.target.value)}></input>
    </div>
    
    
    {isUpdate ?(
   <button onClick={updateFields }>update</button>
    ):(
      <button onClick={addData}>Add</button>
    )}
    </div>
   
    
    <div  class="flex justify-center items-center mt-10">
      {fireData.map((data)=> {
        return(
          <div >
            <h1>{data.name}</h1>
            <p>{data.age}</p>

            <button onClick={()=>getID(data.id, data.name, data.age )}>Update</button>
             </div>
        )
      })}
    </div>
    
  </div>
  )
}
