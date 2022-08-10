import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import NotFoundPage from './not-found-page'
import { db } from '../services/firebase/firebase-config'
import { Avatar, NoPostsYet } from '../components/lib'

export default function Profile () {
  const { username } = useParams()
  const { data: visitedUser } = useQuery(
    ['visitedUser'],
    () => getDocs(query(collection(db, 'users'),
      where('username', '==', username)
    )))
  const { data: visitedUserPosts } = useQuery(
    ['visitedUserPosts'],
    () => getDocs(query(collection(db, 'posts'),
      where('author', '==', username)
    )))
  if (visitedUser?.empty) {
    return <NotFoundPage/>
  }
  return (
    <main>
      <header className='container mx-auto max-w-screen-md grid grid-cols-3 border-b-2 py-5'>
        <div className='flex justify-center h-40'>
          <Avatar picture={visitedUser?.docs[0].data().profilePicture} size='large'/>
        </div>
        <section className='px-5 w-full m-auto col-span-2'>
          <h1 className='text-3xl font-thin'>{username}</h1>
          <ul className=' py-5 flex flex-row'>
            <li><span className='font-semibold'>{visitedUserPosts?.size}</span>&nbsp;post</li>
            <li className='mx-10'><span className='font-semibold'>{visitedUser?.docs[0].data().followers.length}</span>&nbsp;followers</li>
            <li><span className='font-semibold'>{visitedUser?.docs[0].data().following.length}</span>&nbsp;following</li>
          </ul>
          <div>
            <h2 className='font-semibold'>{visitedUser?.docs[0].data().name}</h2>
            <span>Love playing KSP</span>
          </div>
        </section>
      </header>
        <article className='container mx-auto max-w-screen-md mt-5 text-center'>
          {visitedUserPosts?.empty
            ? <NoPostsYet/>
            : <Posts visitedUserPosts={visitedUserPosts}/>
        }
        </article>

    </main>
  )
}

function Posts ({ visitedUserPosts }: any) {
  return (
    <div className='grid grid-cols-3 gap-1'>
      {
        visitedUserPosts?.docs.map((visitedUserPost: any) => {
          const { contentSrc } = visitedUserPost.data()
          return (
            <div key={1} className='bg-black w-full aspect-square'>
              <img src={contentSrc} className='w-full h-full object-cover'/>
            </div>
          )
        })
      }
    </div>
  )
}
