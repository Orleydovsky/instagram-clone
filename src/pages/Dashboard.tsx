import Feed from '../components/feed'
import Suggestions from '../components/suggestions'
import DashBoardFallBack from '../error/dashboard-fallback'
import ErrorBoundary from '../error/error-boundary'
import { useUserContext } from '../hooks/use-user-context'

export default function Dashboard () {
  const { following, uid } = useUserContext()
  return (
    <ErrorBoundary FallbackComponent={DashBoardFallBack}>
      <section className='grid grid-cols-3 container mx-auto max-w-screen-lg'>
        <Feed following={following} uid={uid}/>
        <Suggestions following={following} uid={uid}/>
      </section>
    </ErrorBoundary>
  )
}
