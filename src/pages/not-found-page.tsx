import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import instagram from '../assets/instagram.svg'

export default function NotFoundPage () {
  useEffect(() => {
    document.title = 'Page not found'
  })
  return (
    <div className='w-full'>
      <nav className='h-16 bg-white border border-gray-200 px-5 fixed w-full'>
        <div className='flex justify-between container mx-auto h-full max-w-screen-md items-center'>
          <Link to='/'>
            <img src={instagram} alt='Instagram logo' className='h-8'/>
          </Link>
          <div className='flex flex-row'>
            <Link to='/' className='bg-blue-500 text-white rounded-md py-1 px-3 font-medium'>Log In</Link>
            <Link to='/signup' className='text-blue-500 py-1 px-3 font-medium'>Sign Up</Link>
          </div>
        </div>
      </nav>
      <div className='text-center'>
        <h1 className='font-bold text-xl'>Sorry, this page isn't available.</h1>
        <p>The link you followed may be broken, or the page may have been removed. Go back to <Link className='text-blue-600' to='/'>Instagram.</Link></p>
      </div>
    </div>
  )
}
