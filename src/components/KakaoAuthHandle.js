import React, { useEffect } from 'react'
import styled from 'styled-components'
import { apis } from '../utils/axios'

import { setCookie } from '../utils/cookie'

import bg from '../assets/login.png'


// 닉네임
function KakaoAuthHandle(props) {

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')
    const kakaoLogin = async () => {
      await apis.kakaoLogin1(code).then((res) => {
        console.log("성공",res)
        setCookie('token', res.headers.authorization)
        // localStorage.setItem('userId', res.data)
        // window.location.href = KAKAO_ADD_PROPERTIES
        window.location.href =
          'http://moabuza.s3-website.ap-northeast-2.amazonaws.com/home/'
      })
    }
    kakaoLogin()
  }, [])

  return <Container src={bg} alt="로딩 이미지" />
}

export default KakaoAuthHandle

const Container = styled.img`
  width: 100%;
  min-height: calc(100vh - 55px);
`
