import { DocumentData } from 'firebase/firestore'
import { useState } from 'react'
import { UserData, useUserContext } from '../../context/current-user'
import { toggleFollow } from '../../services/firebase/firebase'
import { auth } from '../../services/firebase/firebase-config'
import { Avatar, Spinner } from '../lib'

interface Props {
  data: DocumentData[]
  totalPosts: number | undefined
}

export default function ProfileHeader ({ data, totalPosts }: Props) {
  const { uid: currentUserUid } = useUserContext()
  const { profilePicture, username, name, following, followers, uid } = data[0] as UserData
  const [isFollowed, setIsFollowed] = useState(followers.includes(currentUserUid))
  console.log(following.includes(currentUserUid))
  const [isLoading, setIsLoading] = useState(false)
  const handleFollow = async () => {
    setIsLoading(true)
    try {
      await toggleFollow(currentUserUid, uid, isFollowed)
    } catch (error) {
      error instanceof Error ? console.error(error.message) : console.error(error)
    } finally {
      setIsLoading(false)
      setIsFollowed(!isFollowed)
    }
  }
  return (
    <header className='container mx-auto max-w-screen-md grid grid-cols-3 border-b-2 py-5'>
      <div className='flex justify-center h-40'>
        <Avatar picture={profilePicture} size='large' />
      </div>
      <section className='px-5 w-full m-auto col-span-2'>
        <div className='flex flex-row items-center'>
          <h1 className='text-3xl font-thin pr-5'>{username}</h1>
          { uid === auth.currentUser?.uid
            ? null
            : <button onClick={handleFollow} className='bg-blue-500 text-white text-md font-semibold rounded-md py-1 px-6'>
                { isLoading ? <Spinner/> : isFollowed ? 'Followed' : 'Follow' }
              </button>
          }
        </div>
        <ul className=' py-5 flex flex-row'>
          <li><span className='font-semibold'>{totalPosts}</span>&nbsp;posts</li>
          <li className='mx-10'><span className='font-semibold'>{followers.length}</span>&nbsp;followers</li>
          <li><span className='font-semibold'>{following.length}</span>&nbsp;following</li>
        </ul>
        <div>
          <h2 className='font-semibold'>{name}</h2>
          <span>Love playing KSP</span>
        </div>
      </section>
    </header>
  )
}
