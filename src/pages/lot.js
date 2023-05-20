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
export default function Home() {
  const [ID, setID] = useState(null);
  const [lotnum, setLotNum] = useState(null);
  const [blocknum, setBlockNum] = useState(null);
  const [typesoflot, setTypesOfLot]= useState('');
  const [price, setPrice]=useState(null);
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const databaseRef = collection(database, 'Lot Data');
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
    if (lotnum.trim() === '' || blocknum.trim() === '' || typesoflot.trim() === '' || price.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
    addDoc(databaseRef, {
      LotNumber: Number(lotnum),
      BlockNumber: Number(blocknum),
      TypeOfLOT: typesoflot,
      Price: Number(price)
    })
      .then(() => {
        alert('Data Sent')
        getData()
        setLotNum('')
        setBlockNum('')
        setTypesOfLot('')
        setPrice('')
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

  const getID = (id, lotnum, blocknum, typesoflot, price) => {
    setID(id)
    setLotNum(lotnum)
    setBlockNum(blocknum)
    setTypesOfLot(typesoflot)
    setPrice(price)
    setIsUpdate(true)
  }

  const updateFields = () => {
    let fieldToEdit = doc(database, 'Lot Data', ID);
    updateDoc(fieldToEdit, {
        LotNumber: Number(lotnum),
        BlockNumber: Number(blocknum),
        TypeOfLOT: typesoflot,
        Price: Number(price)
    })
    .then(() => {
      alert('Data Updated')
      getData()
      setLotNum('')
      setBlockNum('')
      setTypesOfLot('')
      setPrice('')
      setIsUpdate(false)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  const deleteDocument = (id) => {
    let fieldToEdit = doc(database, 'Lot Data', id);
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
        <h1 className="text-2xl font-bold">Lot Management</h1>
    
        <button className="px-3 py-1 bg-gray-600 rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </header>
    <div className="flex items-center justify-center mt-2" >
  <div className="mb-4 mr-1" >
    <input
      placeholder="Lot Number"
      className="border border-gray-300 rounded px-4 py-2"
      type='number'
      value={lotnum}
      onChange={(event) => setLotNum(event.target.value)}
    />
  </div>
  <div className="mb-4 mr-1">
    <input
      placeholder="Block Number"
      className="border border-gray-300 rounded px-4 py-2"
      type="number"
      value={blocknum}
      onChange={(event) => setBlockNum(event.target.value)}
    />
  </div>
  <div className="mb-4 mr-1">
    <input
      placeholder="Types of Lot"
      className="border border-gray-300 rounded px-4 py-2"
      type="text"
      value={typesoflot}
      onChange={(event) => setTypesOfLot(event.target.value)}
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
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Lot Number</th>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Block Number</th>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Types Of Lot</th>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Price</th>
            <th className="py-2 px-4 border-solid border-2 border-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fireData.map((data) =>  (
            <tr key={data.id} className='text-center'>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.lotnum}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.blocknum}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.typesoflot}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">{data.price}</td>
              <td className="py-2 px-4 border-solid border-2 border-gray-500">
                <button className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mr-2" onClick={() => getID(data.id, data.lotnum, data.blocknum, data.typesoflot, data.price)}>
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
    <div  className="mb-4 mr-1">
   <Link legacyBehavior href="/home">
  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Home</button>
  </Link>
  </div>
  <div className="mb-4 mr-1">
  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Client</button>
  </div>
  <div className="mb-4 mr-1">
   <Link legacyBehavior href="/lot">
  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Lot</button>
  </Link>
  </div>
  <div className="mb-4 mr-1">
  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Payment</button>
  </div>
</div>
    <footer className="h-10 rounded-lg shadow"></footer>
  </div>
)
}