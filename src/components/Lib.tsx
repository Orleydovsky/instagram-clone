import camera from '../assets/camera.svg'
import loading from '../assets/loading.svg'
import React from 'react'
import { Link } from 'react-router-dom'

interface InputProps {
  name: string,
  type: 'text' | 'password'
  placeholder: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

function Input ({ name, type, placeholder, onChange, value }: InputProps) {
  return (
    <input
      onChange={onChange}
      value={value}
      name={name} type={type}
      placeholder={placeholder}
      className='bg-gray-50 border w-full border-gray-200 rounded-sm p-2 text-sm my-1 box-border'
    />
  )
}

interface AvatarProps {
  picture: string | undefined
  size: 'small' | 'medium' | 'large'
}
function Avatar ({ picture, size }: AvatarProps) {
  let applySize
  switch (size) {
    case 'small': applySize = 8; break
    case 'medium': applySize = 16; break
    case 'large': applySize = 40; break
    default: applySize = 8
  }
  return (
    <div className={`w-${applySize} h-${applySize}`}>
      <img src={picture} className='rounded-full aspect-square object-cover w-full h-full'/>
    </div>
  )
}

function NoPostsYet () {
  return (
    <div className='flex flex-col justify-center text-center'>
      <img className='opacity-30 h-8 my-10' src={camera}/>
      <h1 className='text-3xl font-light'>No Posts Yet</h1>
    </div>
  )
}

function NotFollowing () {
  return (
    <div className='col-span-3 text-center lg:col-span-2'>
      <h1 className='font-bold text-xl'>Welcome to Instagram</h1>
      <p>Follow people to start seeing the photos and videos they share</p>
    </div>
  )
}

function NoUserFound () {
  return (
    <div className='text-center container max-w-md mx-auto'>
    <h1 className='font-bold text-xl'>No user found</h1>
    <p>The link you followed may be broken, or the page may have been removed. Go back to <Link className='text-blue-600' to='/'>Instagram.</Link></p>
    </div>
  )
}

function Spinner () {
  return <img src={loading} className='w-5 h-5 animate-spin-slow'/>
}
function FullPageSpinner () {
  return (
    <div className='w-full'>
      <img src={loading} className='w-10 h-10 animate-spin-slow mx-auto'/>
    </div>
  )
}

export {
  Input,
  Avatar,
  NoPostsYet,
  NotFollowing,
  NoUserFound,
  Spinner,
  FullPageSpinner
}
