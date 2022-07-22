import React, { useEffect } from 'react'

export default function NotFoundPage () {
  useEffect(() => {
    document.title = 'Page not found'
  })
  return (
    <div className='text-center'>
      <h1 className='font-bold text-xl'>Sorry, this page isn't available.</h1>
      <p>The link you followed may be broken, or the page may have been removed. Go back to Instagram.</p>
    </div>
  )
}
