import { arrayRemove, arrayUnion, doc, setDoc } from 'firebase/firestore'
import { Fragment, useState } from 'react'
import { auth, db } from '../../services/firebase/firebase-config'
export function Actions ({
  liked,
  like,
  comment,
  share,
  bookmark,
  totalLikes,
  postId
}: any) {
  console.log('postId on Actions', postId)
  const [likes, setLikes] = useState(totalLikes.length)
  const [isLiked, setIsLiked] = useState(Boolean(totalLikes.find((user: any) => user === auth.currentUser?.uid)))
  const handleLike = async () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
    const currentUser = auth.currentUser?.uid
    try {
      await setDoc(doc(db, 'posts', postId), {
        likes: isLiked ? arrayRemove(currentUser) : arrayUnion(currentUser)
      }, { merge: true })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Fragment>
      <section className='flex justify-between items-center'>
        <div className='flex items-center'>
          <span>
            <button onClick={handleLike} className='hover:opacity-50'>
              <img src={isLiked ? liked : like} />
            </button>
          </span>
          <span>
            <button className='mx-3 hover:opacity-50'><img src={comment} /></button>
          </span>
          <span>
            <button className='hover:opacity-50'><img src={share} /></button>
          </span>
        </div>
        <section>
          <span>
            <button className='hover:opacity-50'><img src={bookmark} /></button>
          </span>
        </section>
      </section>
      <section className='font-semibold text-sm py-1'>
        {likes === 0 ? null : likes === 1 ? `${likes} like` : `${likes} likes`}
      </section>
    </Fragment>
  )
}
