
export default function ProfilePosts ({ posts }: any) {
  return (
    <article className='grid grid-cols-3 gap-1 container mx-auto max-w-screen-md mt-5'>
      {
        posts?.map((post: any) => {
          const { contentSrc, postId } = post
          return (
            <div key={postId} className='bg-black w-full aspect-square'>
              <img src={contentSrc} className='w-full h-full object-cover'/>
            </div>
          )
        })
      }
    </article>
  )
}
