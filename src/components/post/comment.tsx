import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { auth, db } from '../../services/firebase/firebase-config'

export function Comment ({ comments, setComments, postId }: any) {
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
  console.log('postId', postId)
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
      error instanceof Error ? console.error(error.message) : console.error(error)
    }
  }
  return (
    <section>
      <form onSubmit={handleCommentSubmit} className='flex flex-row border-t p-3'>
        <input onChange={handleCommentChange} value={commentInput.comment} type='text' className='w-full outline-none text-sm rounded-b-lg' name='comment' placeholder='Add a comment...' />
        <button disabled={isSubmitInvalid} className='text-blue-500 font-medium text-sm disabled:opacity-50'>Post</button>
      </form>
      </section>
  )
}
