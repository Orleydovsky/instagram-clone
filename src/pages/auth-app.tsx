import { Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../components/header'
import Profile from './profile'
import Dashboard from './dashboard'
import { UserProvider } from '../context/current-user'

export default function AuthApp () {
  console.log('auth')
  useEffect(() => {
    document.title = 'Instagram'
  }, [])
  return (
    <UserProvider>
      <Fragment>
        <Header/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/:username' element={<Profile/>}/>
        </Routes>
      </Fragment>
    </UserProvider>
  )
}
