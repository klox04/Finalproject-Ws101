import { useState } from 'react'
import{} from './firebaseConfig';
import { useEffect } from 'react';
import Link from 'next/link';
import { 
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup} from 'firebase/auth';
import { useRouter } from 'next/router';
export default function Register(){
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
   
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');

    const signUp = () =>{
        signInWithEmailAndPassword(auth,email,password)
        .then((response)=>{
            console.log(response.user)
            sessionStorage.setItem('Token', response.user)
            router.push('/home')
        })  
        .catch(err =>{
            alert('Incorrect email or Password')
        })
    }

    const signUpWithGoogle =()=>{
        signInWithPopup(auth,googleProvider)
        .then((response)=>{
            console.log(response.user)
            sessionStorage.setItem('Token', response.user)
            router.push('/home')
        })

        .catch(err =>{
            console.error(err);
        })
    }
    const signUpWithGithub =()=>{
        signInWithPopup(auth,githubProvider)
        .then((response)=>{
            console.log(response.user)
            sessionStorage.setItem('Token', response.user)
            router.push('/home')
        })

        .catch(err =>{
            console.error(err);
        })
    }
  
    useEffect(()=>{
        let token = sessionStorage.getItem('Token')
        if(token){
            router.push('/home')
        }
    },[])

    return(
        <div className="w-full min-h-screen flex justify-center items-center bg-white-900">
            <div>
            <div className="relative w-[380px] h-[420px] bg-transparent-400 rounded-lg z-10 p-5">
            <h1 className="text-2xl font-bold font-mono text-gray-900 text-center mt-3 mb-5">
               Login
            </h1>
        
            <div className="relative flex flex-col mb-2">
            <input placeholder='Email' onChange={(event) => setEmail(event.target.value)} value={email}
            type='email'
            className="relative z-10 border-0 border-b-2 
            border-gray-900 h-10 bg-transparent text-black-400 font-mono outline-none px-2 peer 
              border-red-500: border-gray-300">
            </input>
            </div>

            <div className="relative flex flex-col mb-2">
            <input placeholder='Password'onChange={(event) => setPassword(event.target.value)} value={password}
            type='password'
            className="relative z-10 border-0 border-b-2 
            border-gray-900 h-10 bg-transparent text-black-400 font-mono outline-none px-2 peer 
              border-red-500: border-gray-300">
            </input>
            </div>

            <button 
            type="submit"
             className="py-3 mt-10 font-mono text-white bg-gray-900 w-full rounded hover:bg-white-700
                        hover-scale-105 duration-300" onClick={signUp }>login </button> <br></br>

                        <div  class="mt-4 flex items-center justify-center text-gray-900 font-mono">
		<div className="flex-grow bg-gray-300 h-px"></div>
		<p className="mx-3 text-sm text-gray-600">Login with social accounts</p>
		<div className="flex-grow bg-gray-300 h-px"></div>
	</div>
	<div className="mt-2 flex items-center justify-center">
		<button aria-label="Log in with Google" class="bg-white rounded-full p-3"  onClick={signUpWithGoogle} >
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-6 h-6" >
				<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099
                9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
			</svg>
		</button>
		<button aria-label="Log in with GitHub" class="bg-white rounded-full p-3 " onClick={signUpWithGithub}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6" >
				<path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183
                 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 
                 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 
                 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464
                  1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
			</svg>
		</button>
	</div>
    <h2 className="flex justify-center items-center mt-2 text-sm text-gray-900 font-mono">
                        Don't have an account?  <Link legacyBehavior href="/register">
        <a className='text-blue-900'>sign Up</a>
      </Link>
                        </h2>
            
            </div>
            </div>
        </div>

        
    )
}