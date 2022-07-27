import React from 'react'
import { Avatar } from './Lib'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import share from '../assets/share.svg'
import bookmark from '../assets/bookmark.svg'
import { Link } from 'react-router-dom'

export default function Post () {
  const userId = 'orleydovsky'
  return (
    <article className='w-96 bg-white my-2 border border-gray-200 rounded-lg'>
      <div className='p-3 flex flex-row'>
        <Link to={userId}>
          <Avatar source='https://i.pinimg.com/originals/6d/bf/f3/6dbff3702716c733a5301ee4c9e17726.jpg'/>
          <h1 className='font-semibold mx-3'>orleydosky</h1>
        </Link>
      </div>
      <div className='h-96 w-full bg-gray-200'>
        <img className='object-cover w-full h-full' src='https://i.pinimg.com/originals/6d/bf/f3/6dbff3702716c733a5301ee4c9e17726.jpg'/>
      </div>
      <div className='px-4 py-3'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <button className='hover:opacity-50'><img src={like}/></button>
            <button className='mx-5 hover:opacity-50'><img src={comment}/></button>
            <button className='hover:opacity-50'><img src={share}/></button>
          </div>
          <div>
            <button className='hover:opacity-50'><img src={bookmark}/></button>
          </div>
        </div>
        <div className='font-semibold text-sm py-1'>
          4,136 Likes
        </div>
        <p className='text-gray-800 text-sm leading-5 line-clamp-2'>
          <Link to={userId}>
            <span className='font-semibold'>orleydosky </span>
          </Link>
          Enjoy the tranquility of Tulum's beautiful landscape from this spacious penthouse with tall windows, surrounded by palm
        </p>
      </div>
      <form className='flex flex-row border-t p-3'>
      <textarea rows={1} className='w-full overflow-hidden resize-none outline-none text-sm rounded-b-lg' name='comment' placeholder='Add a comment...'/>
      <button className='text-blue-500 font-medium text-sm'>Post</button>
      </form>
    </article>
  )
}
