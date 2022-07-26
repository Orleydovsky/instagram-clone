import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../services/firebase/firebase-config'
import instagram from '../assets/instagram.svg'
import { Link } from 'react-router-dom'

export default function Header () {
  return (
    <header className='h-16 bg-white border border-gray-200 mb-5 px-5'>
      <div className='flex justify-between container mx-auto h-full max-w-screen-md items-center'>
        <Link to='/'>
          <img src={instagram} alt='Instagram logo' className='h-8'/>
        </Link>
        <input type='search' placeholder='Search' className='bg-gray-100 rounded-lg py-2 px-3' />
        {
        auth.currentUser
          ? <div className='flex flex-row'>
              <div onClick={async () => await signOut(auth)} className='rounded-full w-7 h-7 bg-black'></div>
            </div>
          : <div className='flex flex-row'>
              <Link to='/' className='bg-blue-500 text-white rounded-md py-1 px-3 font-medium'>Log In</Link>
              <Link to='/signup' className='text-blue-500 py-1 px-3 font-medium'>Sign Up</Link>
            </div>
      }
      </div>
    </header>
  )
}
