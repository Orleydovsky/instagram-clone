import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import Post from '../components/Post'
import { db } from '../services/firebase/firebase-config'

interface DashboardType {
  following: string[],
}

export default function Dashboard ({ following }: DashboardType) {
  if (following.length) {
    const { data: posts } = useQuery(
      ['posts'],
      () => getDocs(query(collection(db, 'posts'),
        where('authorId', 'in', following)
      )))
    return (
      <div className='w-full'>
        <div className='flex flex-col items-center'>
          {posts?.docs.map(post => {
            const { contentSrc, caption, author, likes, comments } = post.data()
            return (
            <Post
              key={post.id}
              postId={post.id}
              contentSrc={contentSrc}
              caption={caption}
              author={author}
              likes={likes}
              comments={comments}
            />)
          })}
        </div>
      </div>
    )
  }
  return (
    <div className='w-full'>
      <div className='text-center'>
        <h1 className='font-bold text-xl'>Welcome to Instagram</h1>
        <p>Follow people to start seeing the photos and videos they share</p>
      </div>
    </div>
  )
}
