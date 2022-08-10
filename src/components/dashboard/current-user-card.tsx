import { Link } from 'react-router-dom'
import { auth } from '../../services/firebase/firebase-config'
import { Avatar } from '../lib'

export default function CurrentUserCard ({ profilePicture, currentUser }: any) {
  return (
    <div className='w-full flex flex-row items-center'>
        <div className='w-16 mr-2'>
          <Link to={`/${auth.currentUser?.displayName}`}>
            <Avatar picture={profilePicture} size='medium'/>
          </Link>
        </div>
        <div className='text-sm'>
          <div className='font-semibold'>
            <Link to={`/${auth.currentUser?.displayName}`}>{auth.currentUser?.displayName}</Link>
          </div>
          <div className='text-gray-400'>
           {currentUser?.docs[0].data().name}
          </div>
        </div>
      </div>
  )
}
