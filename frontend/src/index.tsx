import 'bootstrap/dist/css/bootstrap.min.css'
import 'remixicon/fonts/remixicon.css'

import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthContextProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()
const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
