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
  <div class='main'>
     <div>
          <button onClick={logout}>Log Out</button>
        </div>
    <div class>
    <h1>Home Page</h1>
    </div>

    <div>
      <input placeholder='Name'
      type='text'
      value={name}
       onChange={(event) => setName(event.target.value)}></input>
    </div>

    <div>
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
   
    
    <div>
      {fireData.map((data)=> {
        return(
          <div>
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
