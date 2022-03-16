import React, { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router'
import { ReactQueryDevtools } from 'react-query/devtools'
import styled from 'styled-components'
import ErrorLog from './ErrorLog'
import Loading from './Loading'
import Settings from './Settings'
import Menu from './Menu'
import Modified from './Modified'
import KakaoLogin from '../components/KakaoLogin'


import Nav from '../components/Nav'

const MainPage = lazy(() => import('./MainPage'))
const Alerts = lazy(() => import('./Alerts'))
const Login = lazy(() => import('./Login'))
const Register = lazy(() => import('./Register'))
const Detail = lazy(() => import('./Detail'))
const OnedayBuza = lazy(() => import('./OnedayBuza'))
const OnedayPost = lazy(() => import('./OnedayPost'))
const Group = lazy(() => import('./Group'))
const ChallengeBuza = lazy(() => import('./ChallengeBuza'))

const CalendarMain = lazy(() => import('./CalendarMain'))
const KakaoAuthHandle = lazy(() => import('../components/KakaoLogin'))
const Friends = lazy(() => import('./Friends'))
const AddFriends = lazy(() => import('./AddFriends.js'))

const GroupBuza = lazy(() => import('./GroupBuza'))
const GroupBuzaCreate = lazy(() => import('./GroupBuzaCreate'))
const GroupBuzaDetail = lazy(() => import('./GroupBuzaDetail'))
const Bedge = lazy(() => import('./Bedge'))
const UserInfo = lazy(() => import('./UserInfo'))

function App() {

  return (
    <ErrorBoundary FallbackComponent={ErrorLog}>
      <Suspense fallback={<Loading />}>
        <MainDiv>
          <Routes>
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/onedaybuza" element={<OnedayBuza />} />
            <Route path="/onedaypost" element={<OnedayPost />} />
            <Route path="/group" element={<Group />} />
            <Route path="/challengebuza" element={<ChallengeBuza />} />
            <Route path="/kakaoLogin" element={<KakaoLogin />} />
            <Route path="/callback" element={<KakaoAuthHandle />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/calendar" element={<CalendarMain />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/modified" element={<Modified />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/friends/add" element={<AddFriends />} />
            <Route path="/groupbuza" element={<GroupBuza />} />
            <Route path="/groupbuzacreate" element={<GroupBuzaCreate />} />
            <Route path="/groupbuzadetail" element={<GroupBuzaDetail />} />
            <Route path="/bedge" element={<Bedge />} />
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
