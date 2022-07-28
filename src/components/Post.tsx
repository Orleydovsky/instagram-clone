import React from 'react'
import { Avatar } from './Lib'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import share from '../assets/share.svg'
import bookmark from '../assets/bookmark.svg'
import { Link } from 'react-router-dom'

interface PostType {
  contentSrc: string,
  caption: string,
  username: string
  likes: string[]
}

export default function Post ({ contentSrc, caption, username, likes }: PostType) {
  return (
    <article className='w-96 bg-white my-2 border border-gray-200 rounded-lg'>
      <div className='p-3'>
        <Link to={username} className='flex flex-row'>
          <Avatar source={contentSrc}/>
          <h1 className='font-semibold mx-3'>{username}</h1>
        </Link>
      </div>
      <div className='h-96 w-full bg-gray-200'>
        <img className='object-cover w-full h-full' src={contentSrc}/>
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
          {likes.length}  likes
        </div>
        <p className='text-gray-800 text-sm leading-5 line-clamp-2'>
          <Link to={username}>
            <span className='font-semibold'>{username}</span>
          </Link>
          {caption}
        </p>
      </div>
      <form className='flex flex-row border-t p-3'>
      <textarea rows={1} className='w-full overflow-hidden resize-none outline-none text-sm rounded-b-lg' name='comment' placeholder='Add a comment...'/>
      <button className='text-blue-500 font-medium text-sm'>Post</button>
      </form>
    </article>
  )
}
