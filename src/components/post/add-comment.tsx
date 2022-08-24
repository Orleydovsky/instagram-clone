import React, { useState } from 'react'
import { Comment } from './index'
import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import { db } from '../../services/firebase/firebase-config'
import { useUserContext } from '../../hooks/use-user-context'

interface Props {
  comments: Comment[]
  setComments: Function,
  postId: string
}

export function AddComment ({ comments, setComments, postId }: Props) {
  const { username } = useUserContext()
  const [commentInput, setCommentInput] = useState({
    author: username,
    comment: '',
    id: `${postId}/${comments.length}`
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
