import { Avatar } from '../lib'

export default function ProfileHeader ({ data, totalPosts }: any) {
  const { profilePicture, username, name, following, followers } = data[0]
  return (
    <header className='container mx-auto max-w-screen-md grid grid-cols-3 border-b-2 py-5'>
      <div className='flex justify-center h-40'>
        <Avatar picture={profilePicture} size='large' />
      </div>
      <section className='px-5 w-full m-auto col-span-2'>
        <h1 className='text-3xl font-thin'>{username}</h1>
        <ul className=' py-5 flex flex-row'>
          <li><span className='font-semibold'>{totalPosts}</span>&nbsp;posts</li>
          <li className='mx-10'><span className='font-semibold'>{followers.length}</span>&nbsp;followers</li>
          <li><span className='font-semibold'>{following.length}</span>&nbsp;following</li>
        </ul>
        <div>
          <h2 className='font-semibold'>{name}</h2>
          <span>Love playing KSP</span>
        </div>
      </section>
    </header>
  )
}
