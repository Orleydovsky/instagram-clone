import { collection, query, Timestamp, where } from 'firebase/firestore'
import { createContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import FullPageLoader from '../pages/full-page-loader'
import { auth, db } from '../services/firebase/firebase-config'

export interface UserData {
  dateCreated: Timestamp,
  email: string,
  followers: string[],
  following: string[],
  name: string,
  profilePicture: string,
  uid: string,
  username: string
}

export const UserContext = createContext<UserData | null>(null)

export function UserProvider ({ children }: {children: JSX.Element}) {
  const [userData] =
    useCollectionData(
      query(collection(db, 'users'),
        where('uid', '==', auth.currentUser?.uid)
      )
    )
  const value = userData?.find(user => user !== undefined) as UserData
  return value
    ? <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
    : <FullPageLoader/>
}
