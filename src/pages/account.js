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
    return(
        <div className="flex flex-col h-screen">
          <header className="bg-gray-800 text-white py-3 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Account Management</h1>
    
        <button className="px-3 py-1 bg-gray-600 rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </header>
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