import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router'
import { ReactQueryDevtools } from 'react-query/devtools'
import Navbar from '../components/Navbar/Navbar'
import ErrorLog from './ErrorLog'
import MainPage from './MainPage'
import Login from './Login'
import Register from './Register'
import Detail from './Detail'
import Calendar from './Calendar'

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
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      <Navbar />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </ErrorBoundary>
  )
}
// appmodify
export default App
