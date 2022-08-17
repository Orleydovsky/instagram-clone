import React from 'react'
import { Link } from 'react-router-dom'

export default function DashBoardFallBack ({ error }: {error: Error}) {
  return (
    <main className='container max-w-lg mx-auto text-center'>
      <h1 className='font-bold text-xl'>Sorry, this page isn't available.</h1>
      <p>The link you followed may be broken, or the page may have been removed. Go back to <Link className='text-blue-600' to='/'>Instagram.</Link></p>
      <pre className='text-xs text-red-500 mt-10'>{error.message}</pre>
    </main>
  )
}
