import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instagram from '../assets/instagram.svg'
import { auth, db } from '../services/firebase/firebase-config'

export function SignUpForm () {
  useEffect(() => {
    document.title = 'Sign Up • Instagram'
  })
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [formInputs, setFormInputs] = useState({
    email: '',
    name: '',
    username: '',
    password: ''
  })
  const { email, name, username, password } = formInputs
  const isSubmitInvalid = email === '' || name === '' || username === '' || password === ''
  const handleFormInputs = (event: any) => {
    setFormInputs({
      ...formInputs,
      [event.target.id]: event.target.value
    })
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    console.log(email)
    setLoading(true)
    try {
      const { empty } = await getDocs(query(collection(db, 'users'), where('username', '==', username)))
      if (!empty) throw new Error("This username isn't available. Please try another")
      await createUserWithEmailAndPassword(auth, email, password)
      await addDoc(collection(db, 'users'), {
        dateCreated: serverTimestamp(),
        email,
        followers: [],
        following: [],
        name,
        username,
        uid: auth.currentUser?.uid
      })
    } catch (error) {
      error instanceof Error ? setError(error.message) : console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='my-12 w-80'>
      <div className='bg-white justify-center flex flex-col items-center border border-gray-200 py-5'>
        <div className='flex justify-center my-6'>
            <img src={instagram} alt='Instagram logo' className='h-12' />
        </div>
        <form onChange={handleFormInputs} onSubmit={handleSubmit} className='w-64 flex flex-col'>
          <input id='email' type='text' placeholder='Email Address' className='bg-gray-50 border border-gray-200 rounded-sm p-2 text-sm mb-2' />
          <input id='name' type='text' placeholder='Full Name' className='bg-gray-50 border border-gray-200 rounded-sm p-2 text-sm mb-2' />
          <input id='username' type='text' placeholder='Username' className='bg-gray-50 border border-gray-200 rounded-sm p-2 text-sm mb-2' />
          <input id='password' type='password' placeholder='Password' className='bg-gray-50 border border-gray-200 rounded-sm p-2 text-sm mb-2' />
          <button disabled={isSubmitInvalid} className='bg-blue-500 text-white rounded-md py-1 mt-1 font-medium disabled:opacity-50'>{loading ? 'Loading...' : 'Sign up'}</button>
          <div className='font-thin text-red-500 mt-5'>{error}</div>
        </form>
      </div>
      <div className='bg-white my-3 text-center p-5 border border-gray-200'>
        Have an account? <Link to='/' className='text-blue-500 font-medium'>Log in</Link>
      </div>
    </div>
  )
}
