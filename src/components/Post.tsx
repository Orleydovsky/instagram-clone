import React, { useState } from 'react'
import { Avatar } from './Lib'
import comment from '../assets/comment.svg'
import share from '../assets/share.svg'
import bookmark from '../assets/bookmark.svg'
import { Link } from 'react-router-dom'
import like from '../assets/like.svg'
import liked from '../assets/liked.svg'
import { auth, db } from '../services/firebase/firebase-config'
import { arrayRemove, arrayUnion, doc, setDoc } from 'firebase/firestore'

type commentObject = {
  author: string,
  comment: string
}

interface PostType {
  contentSrc: string,
  caption: string,
  author: string,
  likes: string[],
  postId: string
  comments: commentObject[]
}

export default function Post ({ contentSrc, caption, author, likes: totalLikes, postId, comments: dataBaseComments }: PostType) {
  const [likes, setLikes] = useState(totalLikes.length)
  const [isLiked, setIsLiked] = useState(Boolean(totalLikes.find(user => user === auth.currentUser?.uid)))
  const [comments, setComments] = useState(dataBaseComments)
  const [commentInput, setCommentInput] = useState({
    author: auth.currentUser?.displayName ? auth.currentUser?.displayName : 'anonymous',
    comment: ''
  })
  const isSubmitInvalid = commentInput.comment === ''
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput({
      ...commentInput,
      comment: event.target.value
    })
  }
  const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setComments([...comments, commentInput])
    setCommentInput({
      ...commentInput,
      comment: ''
    })
    try {
      await setDoc(doc(db, 'posts', postId), {
        comments: arrayUnion(commentInput)
      }, {
        merge: true
      })
    } catch (error) {
      error instanceof Error ? console.log(error.message) : console.log(error)
    }
  }
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
    <article className='w-96 bg-white my-2 border border-gray-200 rounded-lg'>
      <header className='h-14 flex flex-row items-center px-3'>
        <span className='w-8'>
          <Link to={`/${author}`}>
            <Avatar source={contentSrc}/>
          </Link>
        </span>
        <span className='font-semibold mx-2'>
          <Link to={`/${author}`}>{author}</Link>
        </span>
      </header>
      <div className='h-96 w-full bg-black'>
        <img className='object-cover w-full h-full' src={contentSrc}/>
      </div>
      <div className='px-4 py-3'>
        <section className='flex justify-between items-center'>
          <div className='flex items-center'>
            <span>
              <button onClick={handleLike} className='hover:opacity-50'>
                <img src={isLiked ? liked : like}/>
              </button>
            </span>
            <span>
              <button className='mx-3 hover:opacity-50'><img src={comment}/></button>
            </span>
            <span>
              <button className='hover:opacity-50'><img src={share}/></button>
            </span>
          </div>
          <section>
            <span>
              <button className='hover:opacity-50'><img src={bookmark}/></button>
            </span>
          </section>
        </section>
        <section className='font-semibold text-sm py-1'>
          {likes === 0 ? null : likes === 1 ? `${likes} like` : `${likes} likes`}
        </section>
        <section className='text-gray-800 text-sm leading-5 line-clamp-2'>
          <span className='font-semibold'>
            <Link to={author}>{author}&nbsp;</Link>
          </span>
          <span>{caption}</span>
        </section>
        <section>
          {comments.map(comment => {
            return (
              <div key={postId} className='text-gray-800 text-sm leading-5 line-clamp-2'>
                <span className='font-semibold'>
                  <Link to={comment.author}>
                    {comment.author}&nbsp;
                  </Link>
                </span>
                <span>
                  {comment.comment}
                </span>
              </div>
            )
          })}
        </section>
      </div>
      <section>
        <form onSubmit={handleCommentSubmit} className='flex flex-row border-t p-3'>
          <input
            onChange={handleCommentChange}
            value={commentInput.comment}
            type='text' className='w-full outline-none text-sm rounded-b-lg'
            name='comment'
            placeholder='Add a comment...'
          />
        <button disabled={isSubmitInvalid} className='text-blue-500 font-medium text-sm disabled:opacity-50'>Post</button>
      </form>
      </section>
    </article>
  )
}
