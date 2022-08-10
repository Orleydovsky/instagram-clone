import React from 'react'
import icon from '../assets/icon.svg'
export default function FullPageLoader () {
  return (
    <div className='grid h-screen place-items-center w-full'>
      <img width='60px' src={icon}/>
    </div>
  )
}
