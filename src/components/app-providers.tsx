import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

interface Props {
  children: JSX.Element
}

export function AppProviders ({ children }: Props) {
  return (
    <React.StrictMode>
      <Router>{children}</Router>
    </React.StrictMode>
  )
}
