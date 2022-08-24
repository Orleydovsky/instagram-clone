import { Link } from 'react-router-dom'
import { Comment } from './index'

export function Comments ({ comments }: {comments: Comment[]}) {
  return (
    <section>
      {comments.length
        ? comments.map((comment: any) => {
          const { comment: content, author, id } = comment
          return (
            <div key={id} className='text-gray-800 text-sm leading-5 line-clamp-2'>
              <span className='font-semibold'>
                <Link to={author}>{author}&nbsp;</Link>
              </span>
              <span>{content}</span>
            </div>
          )
        })
        : null
      }
    </section>
  )
}
