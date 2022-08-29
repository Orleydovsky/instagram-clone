import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import FullPageLoader from './full-page-loader'
import Test from './test'

const LoginForm = lazy(() => import('../components/login-form'))
const SignUpForm = lazy(() => import('../components/sign-up-form'))
const NotFoundPage = lazy(() => import('./not-found-page'))

export default function UnauthApp () {
  return (
    <div className='w-full flex justify-center'>
      <Suspense fallback={<FullPageLoader/>}>
        <Routes>
          <Route path='/' element={<LoginForm/>}/>
          <Route path='/signup' element={<SignUpForm/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
          <Route path='/test' element={<Test/>}/>
        </Routes>
      </Suspense>
    </div>
  )
}
