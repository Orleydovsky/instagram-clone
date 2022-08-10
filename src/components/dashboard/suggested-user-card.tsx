import { arrayRemove, arrayUnion, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../services/firebase/firebase-config'
import { Avatar } from '../lib'

export default function SuggestedUserCard ({ username, name, profilePicture, suggestedUserDocId, suggestedUserUid, userDoc }: any) {
  const [isFollowed, setIsFollowed] = useState(false)
  const handleFollow = async (suggestedUserUid: string, suggestedUserDocId: string) => {
    await setDoc(doc(db, 'users', userDoc), {
      following: isFollowed ? arrayRemove(suggestedUserUid) : arrayUnion(suggestedUserUid)
    }, {
      merge: true
    })
    await setDoc(doc(db, 'users', suggestedUserDocId), {
      followers: isFollowed ? arrayRemove(suggestedUserUid) : arrayUnion(suggestedUserUid)
    }, {
      merge: true
    })
    setIsFollowed(!isFollowed)
  }
  return (
    <div className='my-3 w-3/4 flex flex-row justify-between items-center'>
      <div className='flex flex-row'>
        <div className='w-10 mr-2'>
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
        <button onClick={() => handleFollow(suggestedUserUid, suggestedUserDocId)} className='text-xs font-bold text-blue-500'>
          { isFollowed ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  )
}
