import { collection, limit, query, where } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../services/firebase/firebase-config'
import CurrentUserCard from './current-user-card'
import SuggestedUserCard from './suggested-user-card'

interface Props {
  following: string[],
  uid: string
}

export default function Suggestions ({ following, uid }: Props) {
  const [suggestions] =
  useCollectionData(
    query(collection(db, 'users'),
      where('uid', 'not-in', [...following, uid]),
      limit(5)
    )
  )
  return (
    <div className='invisible lg:visible px-5'>
      <CurrentUserCard/>
      <div className='w-full'>
        <div className='text-sm font-bold text-gray-400 my-2'>
          Suggestions For You
        </div>
        {suggestions?.map(suggestion => {
          const { username, name, profilePicture, uid } = suggestion
          return (
            <SuggestedUserCard
              key={username}
              username={username}
              name={name}
              profilePicture={profilePicture}
              docId={suggestion.id}
              uid={uid}
            />
          )
        })
        }
      </div>
    </div>
  )
}
