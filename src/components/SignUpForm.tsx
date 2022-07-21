import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { auth, db } from '../services/firebase/firebase-config'

export function SignUpForm () {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [formInputs, setFormInputs] = useState({
    email: '',
    name: '',
    username: '',
    password: ''
  })
  const handleFormInputs = (event: any) => {
    setFormInputs({
      ...formInputs, [event.target.id]: event.target.value
    })
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setLoading(true)
    const { email, name, username, password } = event.target.elements
    try {
      const { empty } = await getDocs(query(collection(db, 'users'), where('username', '==', username.value)))
      if (!empty) throw new Error("This username isn't available. Please try another")
      await createUserWithEmailAndPassword(auth, email.value, password.value)
      await addDoc(collection(db, 'users'), {
        dateCreated: serverTimestamp(),
        username: username.value,
        email: email.value,
        name: name.value,
        following: ['uid'],
        followers: ['uid']
      })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='my-12'>
      <div className='w-80 bg-white justify-center flex flex-col items-center border border-gray-200 py-5'>
        <div className='flex justify-center my-5'>
            <img src={logo} alt='Instagram logo' className='h-16' />
        </div>
        <form onSubmit={handleSubmit} onChange={handleFormInputs} className='w-64 flex flex-col'>
          <input id='email' type='text' placeholder='Email Address' className='bg-gray-50 border border-gray-200 rounded-sm p-2 text-sm mb-2' />
          <input id='name' type='text' placeholder='Full Name' className='bg-gray-50 border border-gray-200 rounded-sm p-2 text-sm mb-2' />
          <input id='username' type='text' placeholder='Username' className='bg-gray-50 border border-gray-200 rounded-sm p-2 text-sm mb-2' />
          <input id='password' type='password' placeholder='Password' className='bg-gray-50 border border-gray-200 rounded-sm p-2 text-sm mb-2' />
          <button className='bg-blue-500 text-white rounded-md py-1 mt-1 font-medium disabled:opacity-50'>{loading ? 'Loading...' : 'Sign up'}</button>
          <div className='font-thin text-red-500 mt-5'>{error}</div>
        </form>
      </div>
      <div className='bg-white my-3 text-center p-5 border border-gray-200'>
        Have an account? <Link to='/login' className='text-blue-500 font-medium'>Log in</Link>
      </div>
    </div>
  )
}
