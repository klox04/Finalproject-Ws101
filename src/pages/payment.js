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
    return(
        <div className="flex flex-col h-screen">
          <header className="bg-gray-800 text-white py-3 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Management</h1>
    
        <button className="px-3 py-1 bg-gray-600 rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </header>
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
            <th className="py-1 px-2 border-solid border-2 border-gray-500">Price</th>
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
        </div> 
        
    )
}