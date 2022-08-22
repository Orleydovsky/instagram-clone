import { arrayRemove, arrayUnion, doc, setDoc } from 'firebase/firestore'
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
