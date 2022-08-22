import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/current-user'
import { toggleFollow } from '../../services/firebase/firebase'
import { Avatar, Spinner } from '../lib'

interface Props {
  username: string,
  name: string,
  profilePicture: string,
  docId: string,
  uid: string
}

export default function SuggestedUserCard ({ username, name, profilePicture, docId } : Props) {
  const { uid: userDoc } = useUserContext()
  const [isFollowed, setIsFollowed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleFollow = async () => {
    setIsLoading(true)
    try {
      await toggleFollow(userDoc, docId, isFollowed)
    } catch (error) {
      error instanceof Error ? console.error(error.message) : console.error(error)
    }
    setIsLoading(false)
    setIsFollowed(!isFollowed)
  }
  return (
    <div className='my-3 w-3/4 flex flex-row justify-between items-center'>
      <div className='flex flex-row'>
        <div className='mr-2'>
          <Link to={`/${username}`}>
            <Avatar picture={profilePicture} size='small'/>
          </Link>
        </div>
        <div className='text-xs'>
          <div className='font-semibold'>
            <Link to={`/${username}`}>{username}</Link>
          </div>
          <div className='text-gray-400'>
            {name}
          </div>
        </div>
      </div>
      <div>
        <button onClick={handleFollow} className='text-xs font-bold text-blue-500'>
          {isLoading ? <Spinner/> : isFollowed ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  )
}
