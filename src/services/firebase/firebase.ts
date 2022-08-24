import { arrayRemove, arrayUnion, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from './firebase-config'

export const toggleFollow = async (currentUserUid: string, userToBeFollowedUid: string, isFollowed: boolean) => {
  await setDoc(doc(db, 'users', currentUserUid), {
    following: isFollowed ? arrayRemove(userToBeFollowedUid) : arrayUnion(userToBeFollowedUid)
  }, {
    merge: true
  })
  await setDoc(doc(db, 'users', userToBeFollowedUid), {
    followers: isFollowed ? arrayRemove(currentUserUid) : arrayUnion(currentUserUid)
  }, {
    merge: true
  })
}

export const doesUsernameExist = async (username: string) => {
  const { empty } = await getDocs(
    query(collection(db, 'users'),
      where('username', '==', username)
    )
  )
  if (!empty) throw new Error("This username isn't available. Please try another")
}
