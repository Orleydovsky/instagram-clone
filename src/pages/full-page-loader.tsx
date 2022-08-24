import { signOut } from 'firebase/auth'
import icon from '../assets/icon.svg'
import { auth } from '../services/firebase/firebase-config'

export default function FullPageLoader () {
  return (
    <div className='flex h-screen'>
      <img className='w-16 m-auto animate-pulse' src={icon}/>
    </div>
  )
}
