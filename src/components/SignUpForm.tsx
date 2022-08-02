import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import instagram from '../assets/instagram.svg'
import { auth, db } from '../services/firebase/firebase-config'
import { Input } from './Lib'
import { formInputs } from './LoginForm'

export function SignUpForm () {
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Sign Up • Instagram'
  })
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [formInputs, setFormInputs] = useState<formInputs>({
    email: '',
    name: '',
    username: '',
    password: ''
  })
  const { email, name, username, password } = formInputs
  const isSubmitInvalid = email === '' || name === '' || username === '' || password === ''
  const handleFormInputs = (event: React.ChangeEvent<HTMLFormElement>) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setLoading(true)
    try {
      const { empty } = await getDocs(query(collection(db, 'users'), where('username', '==', username)))
      if (!empty) throw new Error("This username isn't available. Please try another")
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/')
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: username
        })
      }
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
          <Input name='email' type='text' placeholder='Email Address'/>
          <Input name='name' type='text' placeholder='Full Name'/>
          <Input name='username' type='text' placeholder='Username'/>
          <Input name='password' type='password' placeholder='Password'/>
          <button disabled={isSubmitInvalid} className='bg-blue-500 text-white rounded-md py-1 my-2 font-medium disabled:opacity-50'>{loading ? 'Loading...' : 'Sign up'}</button>
          <div className='font-thin text-red-500 mt-5'>{error}</div>
        </form>
      </div>
      <div className='bg-white my-3 text-center p-5 border border-gray-200'>
        Have an account? <Link to='/' className='text-blue-500 font-medium'>Log in</Link>
      </div>
    </div>
  )
}
