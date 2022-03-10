import React, { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router'
import { ReactQueryDevtools } from 'react-query/devtools'
import styled from 'styled-components'
import ErrorLog from './ErrorLog'
import Loading from './Loading'

const MainPage = lazy(() => import('./MainPage'))
const Login = lazy(() => import('./Login'))
const Register = lazy(() => import('./Register'))
const Detail = lazy(() => import('./Detail'))
const CalendarMain = lazy(() => import('./CalendarMain'))
const NavBar = lazy(() => import('../components/navBar'))

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorLog}>
      <Suspense fallback={<Loading />}>
        <MainDiv>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/calendar" element={<CalendarMain />} />
          </Routes>
          <NavBar />

          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </MainDiv>
      </Suspense>
    </ErrorBoundary>
  )
}

const MainDiv = styled.div`
  height: 100%;
  position: fixed;
  left: 50%;
  margin: 0 auto;
  padding: 0px;
  left: 0;
  right: 0;
  overflow: hidden;
  width: 360px;
`

export default App
