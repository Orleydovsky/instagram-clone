import { auth } from '../../services/firebase/firebase-config'
import CurrentUserCard from './current-user-card'
import SuggestedUserCard from './suggested-user-card'

interface SuggestionsTypes {
  profilePicture: string
  suggestedUsers: any,
  userDoc: any,
  currentUser: any
  following: string[]
}

export default function Suggestions ({ profilePicture, suggestedUsers, userDoc, currentUser, following }: SuggestionsTypes) {
  return (
    <div className='invisible lg:visible px-5'>
      <CurrentUserCard profilePicture={profilePicture} currentUser={currentUser}/>
      <div className='w-full'>
        <div className='text-sm font-bold text-gray-400 my-2'>
          Suggestions For You
        </div>
        {suggestedUsers?.docs.filter((suggestedUsers: any) => suggestedUsers.data().uid !== auth.currentUser?.uid).map((suggestedUser: any) => {
          const { profilePicture, username, name, uid: suggestedUserUid } = suggestedUser.data()
          if (following.includes(suggestedUserUid)) {
            return null
          }
          return (
            <SuggestedUserCard
              key={username}
              username={username}
              name={name}
              profilePicture={profilePicture}
              userDoc={userDoc}
              suggestedUserDocId={suggestedUser.id}
              suggestedUserUid={suggestedUserUid}
            />
          )
        })}
      </div>
    </div>
  )
}
