import { useState } from 'react'
import{} from './firebaseConfig';
import { useEffect } from 'react';
import { 
    getAuth,
    createUserWithEmailAndPassword,
  } from 'firebase/auth';
import { useRouter } from 'next/router';
export default function Register(){
    const auth = getAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');

    const signUp = () =>{
        createUserWithEmailAndPassword(auth,email,password)
        .then((response)=>{
            console.log(response.user)
            sessionStorage.setItem('Token', response.user)
            router.push('/home')
        })  
        .catch(err =>{
            alert('Email Already Exist')
        })

    }
    useEffect(()=>{
        let token = sessionStorage.getItem('Token')
        if(token){
            router.push('/home')
        }
    },[])
    const change = () => {
        router.push('/login')
      }


    return(
        <div className="w-full min-h-screen flex justify-center items-center bg-white-900">
            <div>
            <div className="relative w-[380px] h-[420px] bg-transparent-400 rounded-lg z-10 p-5">
            <h1 className="text-2xl font-bold font-mono text-gray-900 text-center mt-3 mb-5">
                Register
            </h1>

            <div  className="relative flex flex-col mb-2">
            <input placeholder='Email' onChange={(event) => setEmail(event.target.value)} value={email}
             className="relative z-10 border-0 border-b-2 
             border-gray-900 h-10 bg-transparent text-black-400 font-mono outline-none px-2 peer 
               border-red-500: border-gray-300"
            type='email'>
            </input>
            </div>

            <div  className="relative flex flex-col mb-2">
            <input placeholder='Password'onChange={(event) => setPassword(event.target.value)} value={password}
            type='password'
            className="relative z-10 border-0 border-b-2 
             border-gray-900 h-10 bg-transparent text-black-400 font-mono outline-none px-2 peer 
               border-red-500: border-gray-300">
            </input>
            </div>

            <button className="py-3 mt-10 font-mono text-white bg-gray-900 w-full rounded hover:bg-white-700
                        hover-scale-105 duration-300"onClick={signUp }>sign Up </button> <br></br>

             <h2 className="flex justify-center items-center mt-10 text-sm text-gray-900 font-mono">
                        Already have an account?<button className="text-blue-900 ml-1" 
                        onClick={change}>Log in</button>
                        </h2>

            </div>
            </div>
        </div>

        
    )
}