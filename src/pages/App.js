import React, { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router'

import { ReactQueryDevtools } from 'react-query/devtools'
import Loading from './Loading'
import ErrorLog from './ErrorLog'
import MainPage from './MainPage'
import Login from './Login'
import Register from './Register'
import Detail from './Detail'

// const MainPage = lazy(() => import('./MainPage'))
// const Login = lazy(() => import('./Login'))
// const Register = lazy(() => import('./Register'))
// const Detail = lazy(() => import('./Detail'))

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorLog}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </ErrorBoundary>
  )
}

export default App
