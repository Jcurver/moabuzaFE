import React, { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router'
import { ReactQueryDevtools } from 'react-query/devtools'
import styled from 'styled-components'
import ErrorLog from './ErrorLog'
import Loading from './Loading'
import Settings from './Settings'
import Menu from './Menu'

import Nav from '../components/Nav'

const MainPage = lazy(() => import('./MainPage'))
const Login = lazy(() => import('./Login'))
const Register = lazy(() => import('./Register'))
const Detail = lazy(() => import('./Detail'))
const Oneday = lazy(() => import('./Oneday'))
const Group = lazy(() => import('./Group'))
const Challenge = lazy(() => import('./Challenge'))

const CalendarMain = lazy(() => import('./CalendarMain'))
const KakaoAuthHandle = lazy(() => import('../components/KakaoAuthHandle'))
const Friends = lazy(() => import('./Friends'))
const AddFriends = lazy(() => import('./AddFriends.js'))


const GroupBuza = lazy(() => import('./GroupBuza'))
const GroupBuzaCreate = lazy(() => import('./GroupBuzaCreate'))

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorLog}>
      <Suspense fallback={<Loading />}>
        <MainDiv>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/oneday" element={<Oneday />} />
            <Route path="/group" element={<Group />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<KakaoAuthHandle />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/calendar" element={<CalendarMain />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/friends/add" element={<AddFriends />} />
            <Route path="/groupbuza" element={<GroupBuza />} />
            <Route path="/groupbuzacreate" element={<GroupBuzaCreate />} />
          </Routes>

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
