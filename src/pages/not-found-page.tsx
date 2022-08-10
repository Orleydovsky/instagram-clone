import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header'

export default function NotFoundPage () {
  useEffect(() => {
    document.title = 'Page not found'
  })
  return (
    <div className='w-full'>
    <Header/>
    <div className='text-center'>
      <h1 className='font-bold text-xl'>Sorry, this page isn't available.</h1>
      <p>The link you followed may be broken, or the page may have been removed. Go back to <Link className='text-blue-600' to='/'>Instagram.</Link></p>
    </div>
    </div>
  )
}
