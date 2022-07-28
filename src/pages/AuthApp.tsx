import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import Profile from '../components/Profile'
import { auth, db } from '../services/firebase/firebase-config'
import Dashboard from './Dashboard'
import FullPageLogo from './FullPageLogo'
import NotFoundPage from './NotFoundPage'

function AuthApp () {
  const { data: user, isLoading } = useQuery(
    ['user'],
    () => getDocs(query(collection(db, 'users'),
      where('uid', '==', auth.currentUser?.uid)
    )))
  if (isLoading) {
    return (<FullPageLogo/>)
  }
  if (user) {
    const { following, profilepicture } = user?.docs[0].data()
    console.log(following)
    return (
      <div className='w-full flex flex-col'>
        <Header profilepicture={profilepicture}/>
      <Routes>
        <Route path='/' element={<Dashboard following={following}/>}/>
        <Route path='/users/:userId' element={<Profile/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </div>
    )
  }
}

export default AuthApp
