import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import instagram from '../assets/instagram.svg'
import { doesUsernameExist } from '../services/firebase/firebase'
import { auth, db } from '../services/firebase/firebase-config'
import { Input } from './lib'

interface FormInputs {
  email: string,
  name: string,
  username: string,
  password: string,
}

export default function SignUpForm () {
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Sign Up • Instagram'
  })
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [formInputs, setFormInputs] = useState<FormInputs>({
    email: '',
    name: '',
    username: '',
    password: ''
  })

  const { email, name, username, password } = formInputs
  const isSubmitInvalid = email === '' || name === '' || username === '' || password === ''

  const handleFormInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    try {
      await doesUsernameExist(username)
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      navigate('/')
      await setDoc(doc(db, 'users', user.uid), {
        dateCreated: serverTimestamp(),
        email,
        followers: [],
        following: [],
        name,
        profilePicture: `https://i.pravatar.cc/150?u=@${username?.toLowerCase()}`,
        username: username?.toLowerCase(),
        uid: user.uid
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
        <form onSubmit={handleSubmit} className='w-64 flex flex-col'>
          <Input onChange={handleFormInputs} name='email' type='text' placeholder='Email Address'/>
          <Input onChange={handleFormInputs} name='name' type='text' placeholder='Full Name'/>
          <Input onChange={handleFormInputs} name='username' type='text' placeholder='Username'/>
          <Input onChange={handleFormInputs} name='password' type='password' placeholder='Password'/>
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
