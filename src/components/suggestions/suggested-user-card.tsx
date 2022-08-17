import { arrayRemove, arrayUnion, doc, setDoc } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/current-user'
import { db } from '../../services/firebase/firebase-config'
import { Avatar } from '../lib'

interface Props {
  username: string,
  name: string,
  profilePicture: string,
  docId: string,
  uid: string
}

export default function SuggestedUserCard ({ username, name, profilePicture, docId, uid } : Props) {
  const { uid: userDoc } = useContext(UserContext)
  const [isFollowed, setIsFollowed] = useState(false)
  const handleFollow = async (uid: string, docId: string) => {
    await setDoc(doc(db, 'users', userDoc), {
      following: isFollowed ? arrayRemove(uid) : arrayUnion(uid)
    }, {
      merge: true
    })
    await setDoc(doc(db, 'users', docId), {
      followers: isFollowed ? arrayRemove(uid) : arrayUnion(uid)
    }, {
      merge: true
    })
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
        <button onClick={() => handleFollow(uid, docId)} className='text-xs font-bold text-blue-500'>
          { isFollowed ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  )
}
