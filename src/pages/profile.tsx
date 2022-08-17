import { collection, query, where } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { db } from '../services/firebase/firebase-config'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ProfileHeader from '../components/profile/header'
import ProfilePosts from '../components/profile/posts'
import { FullPageSpinner, NoPostsYet } from '../components/lib'
import ErrorBoundary from '../error/error-boundary'
import ErrorFallback from '../error/profie-fallback'
import ProfileFallback from '../error/profie-fallback'

export default function Profile () {
  const { username } = useParams()
  const [user, userLoading] =
    useCollectionData(
      query(collection(db, 'users'),
        where('username', '==', username)
      )
    )
  const [posts, postsLoading] =
    useCollectionData(
      query(collection(db, 'posts'),
        where('author', '==', username)
      )
    )
  console.log(user)
  return (
    <ErrorBoundary FallbackComponent={ProfileFallback}>
      {userLoading || postsLoading
        ? <FullPageSpinner/>
        : user?.length
          ? <div>No user</div>
          : <main>
              <ProfileHeader data={user} totalPosts={posts?.length}/>
              {posts?.length ? <ProfilePosts posts={posts}/> : <NoPostsYet/>}
            </main>
      }
    </ErrorBoundary>
  )
}
