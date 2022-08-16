import { Link } from 'react-router-dom'
import instagram from '../../assets/instagram.svg'
import React from 'react'
import { HeaderMenuButton } from './menu-button'
import { SearchBar } from './seach-bar'

export default function Header () {
  return (
    <nav className='h-16 bg-white border border-gray-200 px-5 sticky top-0 mb-5 w-full'>
      <div className='flex justify-between container mx-auto h-full max-w-screen-md items-center'>
        <Link to='/'>
          <img src={instagram} alt='Instagram logo' className='h-8'/>
        </Link>
        <SearchBar/>
        <HeaderMenuButton/>
      </div>
    </nav>
  )
}
