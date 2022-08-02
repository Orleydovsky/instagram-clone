import React, { useState } from 'react'
import { Avatar } from './Lib'
import comment from '../assets/comment.svg'
import share from '../assets/share.svg'
import bookmark from '../assets/bookmark.svg'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import { auth, db } from '../services/firebase/firebase-config'
import { arrayUnion, doc, setDoc } from 'firebase/firestore'

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
  const isSubmitInvalid = commentInput.comment === ''
  return (
    <article className='w-96 bg-white my-2 border border-gray-200 rounded-lg'>
      <div className='p-3'>
        <Link to={author} className='flex flex-row'>
          <Avatar source={contentSrc}/>
          <h1 className='font-semibold mx-3'>{author}</h1>
        </Link>
      </div>
      <div className='h-96 w-full bg-gray-200'>
        <img className='object-cover w-full h-full' src={contentSrc}/>
      </div>
      <div className='px-4 py-3'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} postId={postId}/>
            <button className='mx-5 hover:opacity-50'><img src={comment}/></button>
            <button className='hover:opacity-50'><img src={share}/></button>
          </div>
          <div>
            <button className='hover:opacity-50'><img src={bookmark}/></button>
          </div>
        </div>
        <div className='font-semibold text-sm py-1'>
          {!isLiked ? likes : likes + 1} likes
        </div>
        <p className='text-gray-800 text-sm leading-5 line-clamp-2'>
          <Link to={author}>
            <span className='font-semibold'>{author}&nbsp;</span>
          </Link>
          {caption}
        </p>
        <div>
          {comments.map(comment => {
            return (
            <p key={postId} className='text-gray-800 text-sm leading-5 line-clamp-2'>
          <Link to={comment.author}>
            <span className='font-semibold'>{comment.author}&nbsp;</span>
          </Link>
          {comment.comment}
        </p>
            )
          })}
        </div>
      </div>
      <form onSubmit={handleCommentSubmit} className='flex flex-row border-t p-3'>
      <input onChange={handleCommentChange} value={commentInput.comment} type='text' className='w-full overflow-hidden resize-none outline-none text-sm rounded-b-lg' name='comment' placeholder='Add a comment...'/>
      <button disabled={isSubmitInvalid} className='text-blue-500 font-medium text-sm disabled:opacity-50'>Post</button>
      </form>
    </article>
  )
}
