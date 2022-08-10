import { Comments } from './comments'
import { Actions } from './actions'
import { Comment } from './comment'
import { Content } from './content'
import { Header } from './header'
import { useState } from 'react'
import comment from '../../assets/comment.svg'
import share from '../../assets/share.svg'
import bookmark from '../../assets/bookmark.svg'
import { Link } from 'react-router-dom'
import like from '../../assets/like.svg'
import liked from '../../assets/liked.svg'

export default function Post ({ postData, postId }: any) {
  const { contentSrc, caption, author, likes: totalLikes, comments: dataBaseComments } = postData
  console.log('author', author)
  const [comments, setComments] = useState(dataBaseComments)
  return (
    <article className='w-96  border bg-white mb-4 border-gray-200 rounded-lg'>
      <Header author={author}/>
      <Content contentSrc={contentSrc}/>
      <div className='px-4 py-3'>
      <Actions totalLikes={totalLikes} postId={postId} liked={liked} like={like} comment={comment} share={share} bookmark={bookmark}/>
      <section className='text-gray-800 text-sm leading-5 line-clamp-2'>
        <span className='font-semibold'>
          <Link to={author}>{author}&nbsp;</Link>
        </span>
        <span>{caption}</span>
      </section>
      <Comments comments={comments}/>
      </div>
      <Comment comments={comments} setComments={setComments} postId={postId}/>
    </article>
  )
}
