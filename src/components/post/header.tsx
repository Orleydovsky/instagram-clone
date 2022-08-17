import { Link } from 'react-router-dom'
import { Avatar } from '../lib'

export function Header ({ author }: {author: string}) {
  return (
    <header className='h-14 flex flex-row items-center px-3'>
      <span>
        <Link to={`/${author}`}>
          <Avatar picture={`https://i.pravatar.cc/150?u=@${author}`} size='small' />
        </Link>
      </span>
      <span className='font-semibold mx-2'>
        <Link to={`/${author}`}>{author}</Link>
      </span>
    </header>
  )
}
