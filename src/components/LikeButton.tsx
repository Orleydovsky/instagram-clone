import React from 'react'
import { doc, setDoc, arrayRemove, arrayUnion } from 'firebase/firestore'
import like from '../assets/like.svg'
import liked from '../assets/liked.svg'
import { auth, db } from '../services/firebase/firebase-config'

interface LikeButtonType {
  isLiked: boolean,
  setIsLiked: Function
  postId: string
}

export default function LikeButton ({ isLiked, setIsLiked, postId }: LikeButtonType) {
  const currentUser = auth.currentUser?.uid
  const handleLike = async () => {
    setIsLiked(!isLiked)
    await setDoc(doc(db, 'posts', postId), {
      likes: isLiked ? arrayRemove(currentUser) : arrayUnion(currentUser)
    }, { merge: true })
  }
  return (
    <button className='hover:opacity-50' onClick={handleLike}>
      <img src={isLiked ? liked : like}/>
    </button>
  )
}
