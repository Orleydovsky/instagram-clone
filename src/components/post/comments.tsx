import { Link } from 'react-router-dom'

export function Comments ({ comments }: any) {
  return (
    <section>
    {comments.length
      ? comments.map((comment: any) => {
        const { comment: caption, author } = comment
        return (
          <div key={Math.random()} className='text-gray-800 text-sm leading-5 line-clamp-2'>
            <span className='font-semibold'>
              <Link to={author}>
                {author}&nbsp;
              </Link>
            </span>
            <span>
              {caption}
            </span>
          </div>
        )
      })
      : null
  }
  </section>
  )
}
