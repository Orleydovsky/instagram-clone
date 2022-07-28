import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import Post from '../components/Post'
import { db } from '../services/firebase/firebase-config'

export default function Dashboard ({ following }: any) {
  useEffect(() => {
    document.title = 'Instagram'
  }, [])
  if (following.length) {
    const { data: posts } = useQuery(
      ['posts'],
      () => getDocs(query(collection(db, 'posts'),
        where('author', 'in', following)
      )))
    return (
      <div className='w-full'>
        <div className='flex flex-col items-center'>
        {
          posts?.docs.map(post => {
            const { contentSrc, caption, username, likes } = post.data()
            return (
              <Post
                key={post.id}
                contentSrc={contentSrc}
                caption={caption}
                username={username}
                likes={likes}
              />)
          })
        }
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
