import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebase/firebase-config'
import { Avatar } from './lib'
import instagram from '../assets/instagram.svg'

interface HeaderTypes {
  profilePicture?: string
}

export default function Header ({ profilePicture }: HeaderTypes) {
  return (
    <nav className='h-16 bg-white border border-gray-200 mb-5 px-5'>
      <div className='flex justify-between container mx-auto h-full max-w-screen-md items-center'>
        <Link to='/'>
          <img src={instagram} alt='Instagram logo' className='h-8'/>
        </Link>
        <input type='search' placeholder='Search' className='bg-gray-100 rounded-lg py-2 px-3 outline-none' />
        {auth.currentUser
          ? <div className='flex flex-row h-8' onClick={async () => await signOut(auth)}>
              <Avatar picture={profilePicture} size='small'/>
            </div>
          : <div className='flex flex-row'>
              <Link to='/' className='bg-blue-500 text-white rounded-md py-1 px-3 font-medium'>Log In</Link>
              <Link to='/signup' className='text-blue-500 py-1 px-3 font-medium'>Sign Up</Link>
            </div>
        }
      </div>
    </nav>
  )
}
