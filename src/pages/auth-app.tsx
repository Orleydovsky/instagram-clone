import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../components/header'
import Profile from './profile'
import { auth, db } from '../services/firebase/firebase-config'
import Dashboard from './dashboard'
import FullPageLogo from './full-page-loader'
import NotFoundPage from './not-found-page'

export default function AuthApp () {
  useEffect(() => {
    document.title = 'Instagram'
  }, [])
  const { data: currentUser, isLoading } = useQuery(
    ['currentUser'],
    () => getDocs(query(collection(db, 'users'),
      where('uid', '==', auth.currentUser?.uid)
    )))
  const { data: suggestedUsers } = useQuery(
    ['suggestedUsers'],
    () => getDocs(query(collection(db, 'users')
    )))
  if (isLoading) {
    return (<FullPageLogo/>)
  }
  if (currentUser) {
    const { following, profilePicture } = currentUser?.docs[0].data()
    return (
      <div className='w-full flex flex-col'>
        <Header profilePicture={profilePicture}/>
        <Routes>
          <Route path='/' element={<Dashboard following={following} currentUser={currentUser} profilePicture={profilePicture} suggestedUsers={suggestedUsers} userDoc={currentUser.docs[0].id}/>}/>
          <Route path='/:username' element={<Profile/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    </div>
    )
  } else {
    return <div>Any react element</div>
  }
}
