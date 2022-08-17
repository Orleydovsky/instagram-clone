import Feed from '../components/feed'
import Suggestions from '../components/suggestions'
import { useUserContext } from '../context/current-user'

export default function Dashboard () {
  const { following, uid } = useUserContext()
  return (
    <section className='grid grid-cols-3 container mx-auto max-w-screen-lg'>
      <Feed following={following} uid={uid}/>
      <Suggestions following={following} uid={uid}/>
    </section>
  )
}
