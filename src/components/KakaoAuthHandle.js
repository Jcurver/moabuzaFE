import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router';
import styled from 'styled-components'
import { apis } from '../utils/axios'

import { setCookie } from '../utils/cookie'

import bg from '../assets/login.png'



// 닉네임
function KakaoAuthHandle(props) {
  // const navigate = useNavigate()
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')
    console.log(code)
    const kakaoLogin = async () => {
      await apis.kakaoLogin1(code).then((res) => {
        console.log("성공 response :",res)
        setCookie('A-AUTH-TOKEN', res.data.access)
        setCookie('R-AUTH-TOKEN', res.data.refresh)
        // localStorage.setItem('userId', res.data)
        // window.location.href = KAKAO_ADD_PROPERTIES
        // navigate("/home")
        window.location.href =
          'https://moabuza.com/callback'
      }).catch((error)=>console.error(error))
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
