import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext, useUserContext } from '../../context/current-user'
import { Avatar } from '../lib'

export default function CurrentUserCard () {
  const { name, username, profilePicture } = useUserContext(UserContext)
  return (
    <div className='w-full flex flex-row items-center'>
      <div className='w-16 mr-2'>
        <Link to={username}>
          <Avatar picture={profilePicture} size='medium'/>
        </Link>
      </div>
      <div className='text-sm'>
        <div className='font-semibold'>
          <Link to={username}>{username}</Link>
        </div>
        <div className='text-gray-400'>
          {name}
        </div>
      </div>
    </div>
  )
}
