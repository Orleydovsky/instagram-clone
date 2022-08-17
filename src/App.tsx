import { lazy } from 'react'
import { auth } from './services/firebase/firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import FullPageLoader from './pages/full-page-loader'

const AuthApp = lazy(() => import('./pages/auth-app'))
const UnauthApp = lazy(() => import('./pages/unauth-app'))

export default function App () {
  const [user, isLoading] = useAuthState(auth)
  return (
    isLoading
      ? <FullPageLoader/>
      : user
        ? <AuthApp/>
        : <UnauthApp/>
  )
}
