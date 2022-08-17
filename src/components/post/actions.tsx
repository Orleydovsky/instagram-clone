import { arrayRemove, arrayUnion, doc, setDoc } from 'firebase/firestore'
import { Fragment, useState } from 'react'
import { db } from '../../services/firebase/firebase-config'
import comment from '../../assets/comment.svg'
import share from '../../assets/share.svg'
import bookmark from '../../assets/bookmark.svg'
import like from '../../assets/like.svg'
import liked from '../../assets/liked.svg'
import { useUserContext } from '../../context/current-user'

interface Props {
  likes: string[],
  postId: string
}

export function Actions ({ likes, postId }: Props) {
  const { uid } = useUserContext()
  const [likesCount, setLikesCount] = useState(likes.length)
  const [isLiked, setIsLiked] = useState(Boolean(likes.find((user: string) => user === uid)))
  const handleLike = async () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    try {
      await setDoc(doc(db, 'posts', postId), {
        likes: isLiked ? arrayRemove(uid) : arrayUnion(uid)
      }, { merge: true })
    } catch (error) {
      error instanceof Error ? console.error(error.message) : console.error(error)
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
        {likesCount === 0 ? null : likesCount === 1 ? `${likesCount} like` : `${likesCount} likes`}
      </section>
    </Fragment>
  )
}
