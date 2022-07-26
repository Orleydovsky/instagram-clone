import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
const queryClient = new QueryClient()

export function AppProviders ({ children }: any) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <Router>{children}</Router>
      </QueryClientProvider>
    </React.StrictMode>
  )
}
