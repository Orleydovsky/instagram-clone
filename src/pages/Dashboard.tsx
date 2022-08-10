import Feed from '../components/dashboard/feed'
import Suggestions from '../components/dashboard/suggestions'
import { NotFollowing } from '../components/lib'

interface DashboardType {
  following: string[],
  profilePicture: string,
  suggestedUsers: any,
  userDoc: any,
  currentUser: any
}

export default function Dashboard ({ following, profilePicture, suggestedUsers, userDoc, currentUser }: DashboardType) {
  return following.length
    ? <section className='grid grid-cols-3 container mx-auto max-w-screen-lg'>
        <Feed following={following}/>
        <Suggestions profilePicture={profilePicture} suggestedUsers={suggestedUsers} currentUser={currentUser} userDoc={userDoc} following={following}/>
      </section>
    : <section className='grid grid-cols-3 container mx-auto max-w-screen-lg'>
        <NotFollowing/>
        <Suggestions profilePicture={profilePicture} suggestedUsers={suggestedUsers} userDoc={userDoc} currentUser={currentUser} following={following}/>
    </section>
}
