import { Comments } from './display-comments'
import { Actions } from './actions'
import { AddComment } from './add-comment'
import { Content } from './content'
import { Header } from './header'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DocumentData, Timestamp } from 'firebase/firestore'

export interface Comment {
  id: string,
  author: string,
  comment: string
}

export interface PostData {
  author: string,
  authorId: string,
  caption: string,
  comments: Comment[]
  contentSrc: string,
  datePosted: Timestamp,
  likes: string[],
  postId: string
}

export default function Post ({ postData }: {postData: DocumentData}) {
  const { contentSrc, caption, author, likes, comments: dataBaseComments, postId } = postData as PostData
  const [comments, setComments] = useState(dataBaseComments)
  return (
    <article className='w-96  border bg-white mb-4 border-gray-200 rounded-lg'>
      <Header author={author}/>
      <Content contentSrc={contentSrc}/>
      <div className='px-4 py-3'>
        <Actions likes={likes} postId={postId}/>
        <section className='text-gray-800 text-sm leading-5 line-clamp-2'>
          <span className='font-semibold'>
            <Link to={author}>{author}&nbsp;</Link>
          </span>
          <span>{caption}</span>
        </section>
        <Comments comments={comments}/>
      </div>
      <AddComment comments={comments} setComments={setComments} postId={postId}/>
    </article>
  )
}
