import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { auth } from '../services/firebase/firebase-config'

export function LoginForm () {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const { email, password } = event.target.elements
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email.value, password.value)
    } catch (error: any) {
      setError(error.message)
      console.log(error.code)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='py-12'>
      <div className='w-80 bg-white justify-center flex flex-col items-center border border-gray-200 py-5'>
        <div className='flex justify-center my-5'>
            <img src={logo} alt='Instagram logo' className='h-16' />
        </div>
          <form onSubmit={handleSubmit} className='w-64 flex flex-col'>
            <input id='email' type='text' placeholder='Email address' className='bg-gray-50 border border-gray-200 rounded-sm p-2 text-sm mb-2' />
            <input id='password' type='password' placeholder='Password' className='bg-gray-50 border border-gray-200 rounded-sm p-2 text-sm mb-2' />
            <button className='bg-blue-500 text-white rounded-md py-1 mt-1 font-medium'>
            {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
      <div className='font-thin text-red-500 mt-5'>
      {error}
      </div>
      </div>
      <div className='bg-white my-3 text-center p-5 border border-gray-200'>
        Don't have an account? <Link to='/signup' className='text-blue-500 font-medium'>Sign up</Link>
      </div>
    </div>
  )
}
