import React, { Suspense, lazy, useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router'
import { ReactQueryDevtools } from 'react-query/devtools'
import { getToken, onMessage } from 'firebase/messaging'
import styled from 'styled-components'

import ErrorLog from './ErrorLog'
import Loading from './Loading'
import Fcmprac from './Fcmprac'
import Settings from './Settings'
import Menu from './Menu'
import Modified from './Modified'
import KakaoLogin from '../components/KakaoLogin'
import '../utils/fcm'

const MainPage = lazy(() => import('./MainPage'))
const Alerts = lazy(() => import('./Alerts'))
const AlertsGroup = lazy(() => import('./AlertsGroup'))
const AlertsChallenge = lazy(() => import('./AlertsChallenge'))
const Login = lazy(() => import('./Login'))

const OnedayBuza = lazy(() => import('./OnedayBuza'))
const OnedayPost = lazy(() => import('./OnedayPost'))
const Group = lazy(() => import('./Group'))
const ChallengeBuza = lazy(() => import('./ChallengeBuza'))
const ChallengeBuzaCreate = lazy(() => import('./ChallengeBuzaCreate'))
const ChallengeBuzaDetail = lazy(() => import('./ChallengeBuzaDetail'))

const KakaoAuthHandle = lazy(() => import('../components/KakaoLogin'))
const Friends = lazy(() => import('./Friends'))
const FriendsAdd = lazy(() => import('./FriendsAdd.js'))

const GroupBuza = lazy(() => import('./GroupBuza'))
const GroupBuzaCreate = lazy(() => import('./GroupBuzaCreate'))
const GroupBuzaDetail = lazy(() => import('./GroupBuzaDetail'))

const UserInfo = lazy(() => import('./UserInfo'))
const OnBoarding = lazy(() => import('./OnBoarding'))

function App() {
  // let swRegist = null

  // const [Token, setToken] = useState(null)

  // getToken(messaging, {
  //   vapidKey: process.env.REACT_APP_VAPID_KEY,

  // }).then((token) => {
  //   console.log('token', token)
  //   setToken(token)
  //   swRegist = messaging.swRegistration
  // })

  // // async 를 사용학 위해 메서드로 따로 분리함
  // const firebaseMessageToken = async () => {
  //   const token = await getToken()
  //   console.log('token === ', token)
  // }
  // // 추후 서버에 토큰을 저장하는 기능을 여기에 추가
  // useEffect(() => {
  //   firebaseMessageToken()
  // }, [])

  return (
    <ErrorBoundary FallbackComponent={KakaoLogin}>
      <Suspense fallback={<Loading />}>
        <MainDiv>
          <Routes>
            {/* <Route path="/userinfo" element={<UserInfo />} /> */}
            <Route path="/" element={<MainPage />} />
            <Route path="/fcmprac" element={<Fcmprac />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/alertsgroup" element={<AlertsGroup />} />
            <Route path="/alertschallenge" element={<AlertsChallenge />} />
            <Route path="/onedaybuza" element={<OnedayBuza />} />
            <Route path="/onedaypost" element={<OnedayPost />} />
            <Route path="/group" element={<Group />} />
            <Route path="/challengebuza" element={<ChallengeBuza />} />
            <Route
              path="/challengebuzacreate"
              element={<ChallengeBuzaCreate />}
            />
            <Route
              path="/challengebuzadetail"
              element={<ChallengeBuzaDetail />}
            />
            <Route path="/kakaologin" element={<KakaoLogin />} />
            <Route path="/callback" element={<KakaoAuthHandle />} />

            <Route path="/settings" element={<Settings />} />
            <Route path="/modified" element={<Modified />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/friends/add" element={<FriendsAdd />} />
            <Route path="/groupbuza" element={<GroupBuza />} />
            <Route path="/groupbuzacreate" element={<GroupBuzaCreate />} />
            <Route path="/groupbuzadetail" element={<GroupBuzaDetail />} />

            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/user/kakao/callback/*" element={<UserInfo />} />
            <Route path="/onboarding" element={<OnBoarding />} />
            <Route path="/loading" element={<Loading />} />
          </Routes>

          {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
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
  width: 100%;

  -webkit-full-screen {
    width: 100%;
    height: 100%;
  }
`

export default App
