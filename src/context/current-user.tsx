import { signOut } from 'firebase/auth'
import { collection, query, Timestamp, where } from 'firebase/firestore'
import { createContext, useContext } from 'react'
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

export function useUserContext () {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('Oops! it seems like we were not able to find your information, please login again')
  }
  return context
}

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
