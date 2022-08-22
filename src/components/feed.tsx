import { collection, query, where } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../services/firebase/firebase-config'
import { FullPageSpinner, NoPostsYet } from './lib'
import Post from './post'

interface Props {
  following: string[],
  uid: string
}

export default function Feed ({ following, uid }: Props) {
  const [posts, isLoading] =
  useCollectionData(
    query(collection(db, 'posts'),
      where('authorId', 'in', [...following, uid])
    )
  )
  return (
    !posts?.length
      ? <div className='grid col-span-3 lg:justify-center lg:items-start justify-center lg:col-span-2 w-full'>
          {isLoading ? <FullPageSpinner/> : <NoPostsYet/>}
        </div>
      : <div className='grid col-span-3 lg:justify-end justify-center lg:col-span-2 w-full'>
          {posts?.map((post) => {
            return <Post key={post.postId} postData={post}/>
          })}
        </div>
  )
}
