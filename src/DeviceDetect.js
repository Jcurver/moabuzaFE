import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'



import backgroundSrcs from './assets/moabg.png'

export const setVh = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

function DeviceDetect({ children }) {
  // const setGlobalWebViewWrapper = useSetRecoilState(globalWebViewWrapperState)
  // const webViewWrapper = useRef(null)
  // useEffect(() => {
  //   const preventShrink = function () {
  //     var viewport = document.querySelector('meta[name=viewport]')
  //     viewport.setAttribute(
  //       'content',
  //       viewport.content + ', height=' + window.innerHeight,
  //     )
  //   }

  //   window.addEventListener('load', setVh)
  //   window.addEventListener('load', preventShrink)

  //   return () => {
  //     window.RemoveEventListener('load', setVh)
  //     window.removeEventListener('load', preventShrink)
  //   }
  // }, [])

  // useEffect(() => {
  //   if (!isMobile) {
  //     setGlobalWebViewWrapper(webViewWrapper)
  //   }
  // }, [setGlobalWebViewWrapper])

  return isMobile ? (
    <Layout>{children}</Layout>
  ) : (
    <WebBackgroundWrapper>
      <ClayPhone>
        <WebViewLayout>{children}</WebViewLayout>
      </ClayPhone>
    </WebBackgroundWrapper>
  )
}

DeviceDetect.propTypes = {
  children: PropTypes.element.isRequired,
}

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const WebViewLayout = styled(Layout)`
  max-width: 360px;

  /* border-radius: 18px; */
  max-height: 720px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`

const ClayPhone = styled.div`
  width: 360px;
  height: 720px;
  position: fixed;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  background: url(${backgroundSrcs}) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  @media screen and (min-width: 1120px) {
    right: 10%;
    top: 50%;
    transform: translateX(0%);
    transform: translateY(-50%);
  }
`

const WebBackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;


  background: url(${backgroundSrcs}) no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  @media screen and (min-width: 1120px) {
    background: url(${backgroundSrcs}) no-repeat fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`

export default DeviceDetect
