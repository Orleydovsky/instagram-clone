import { signOut } from 'firebase/auth'
import { Component, ElementType, ReactNode } from 'react'
import { auth } from '../services/firebase/firebase-config'

interface Props {
  children: ReactNode,
  FallbackComponent: ElementType
}
interface State {
  error: null | Error
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }
  static getDerivedStateFromError (error: Error) {
    return { error }
  }

  render () {
    const { error } = this.state
    if (error) {
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
}

export function ErrorFallback ({ error }: {error: Error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{ error.message }</pre>
      <button className='bg-black px-3 py-1 rounded-md text-white ' onClick={async () => await signOut(auth)}>Back</button>
    </div>
  )
}
