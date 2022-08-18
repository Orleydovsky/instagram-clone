import { collection, query, where } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { db } from '../services/firebase/firebase-config'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ProfileHeader from '../components/profile/header'
import ProfilePosts from '../components/profile/posts'
import { FullPageSpinner, NoPostsYet, NoUserFound } from '../components/lib'
import ErrorBoundary from '../error/error-boundary'
import ProfileFallback from '../error/profie-fallback'

export default function Profile () {
  const { username } = useParams()
  const [user, userLoading] =
    useCollectionData(
      query(collection(db, 'users'),
        where('username', '==', username)
      )
    )
  console.log('user', user)
  const [posts, postsLoading] =
    useCollectionData(
      query(collection(db, 'posts'),
        where('author', '==', username)
      )
    )
  return (
    <ErrorBoundary FallbackComponent={ProfileFallback}>
      {userLoading || postsLoading
        ? <FullPageSpinner/>
        : user?.length
          ? <main>
              <ProfileHeader data={user} totalPosts={posts?.length}/>
              {posts?.length ? <ProfilePosts posts={posts}/> : <NoPostsYet/>}
            </main>
          : <NoUserFound/>
      }
    </ErrorBoundary>
  )
}
