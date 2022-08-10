import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../services/firebase/firebase-config'
import { NoPostsYet } from '../lib'
import Post from '../post/post'

interface FeedTypes {
  following: string[]
}

export default function Feed ({ following }: FeedTypes) {
  const { data: posts } = useQuery(
    ['posts'],
    () => getDocs(query(collection(db, 'posts'),
      where('authorId', 'in', [...following, auth.currentUser?.uid])
    )))
  return (
    posts?.empty
      ? <div className='grid col-span-3 lg:justify-center lg:items-start justify-center lg:col-span-2 w-full'>
          <NoPostsYet/>
        </div>
      : <div className='grid col-span-3 lg:justify-end justify-center lg:col-span-2 w-full'>
        {posts?.docs.map(post => {
          return <Post key={post.id} postId={post.id} postData={post.data()}/>
        })}
        </div>
  )
}
