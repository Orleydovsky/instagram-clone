import { useContext } from 'react'
import { UserContext } from '../context/current-user'

export function useUserContext () {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('Oops! it seems like we were not able to find your information, please login again')
  }
  return context
}
