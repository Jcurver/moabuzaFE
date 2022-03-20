// import React, { useEffect } from 'react'
// // import { useNavigate } from 'react-router';
// import styled from 'styled-components'
// import { apis } from '../utils/axios'

// import { setCookie } from '../utils/cookie'

// import bg from '../assets/login.png'

// // 닉네임
// function KakaoAuthHandle(props) {
//   // const navigate = useNavigate()
//   useEffect(() => {
//     const code = new URL(window.location.href).searchParams.get('code')
//     console.log(code)
//     const kakaoLogin = async () => {
//       await apis.kakaoLogin1(code).then((res) => {
//         console.log("성공 response :",res)
//         setCookie('A-AUTH-TOKEN', res.data.access)
//         setCookie('R-AUTH-TOKEN', res.data.refresh)
//         // localStorage.setItem('userId', res.data)
//         // window.location.href = KAKAO_ADD_PROPERTIES
//         // navigate("/home")
//         window.location.href =
//           'https://moabuza.com/callback'
//       }).catch((error)=>console.error(error))
//     }
//     kakaoLogin()
//   }, [])

//   return <Container src={bg} alt="로딩 이미지" />
// }

// export default KakaoAuthHandle

// const Container = styled.img`
//   width: 100%;
//   min-height: calc(100vh - 55px);
// `

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

// import { auth } from '../../api'

// import { KakaoSymbol } from '../assets/icons'

// import { OK } from '../../constants/statusCode'

// import { useRefreshUser } from '../../hooks'

// import { loginBtnStyle } from '../../styles'

import { setCookie } from '../utils/cookie'
import { KAKAO_AUTH_URL } from '../utils/OAuth'

function KakaoLogin() {
  const navigate = useNavigate()
  // const refresher = useRefreshUser()

  // useEffect(() => {
  //   if (!window.location.search) {
  //     return
  //   }
  //   // const kakaoAuthCode = new URL(window.location.href).searchParams.get('code')
  //   const kakaoAuthCode = window.location.search.split('=')[1]

  //   async function getTokenWithKakao() {
  //     console.log('kakao code : ', kakaoAuthCode)
  //     try {
  //       const { data } = await apis.getKakaoLogin(kakaoAuthCode)
  //       console.log('200이든 400대 에러이든 일단 받은 data : ', data)
  //       setCookie('A-AUTH-TOKEN', data.access)
  //       setCookie('R-AUTH-TOKEN', data.refresh)
  //       // refresher()

  //       console.log('200받았을때 data : ', data)
  //       navigate('/userinfo')
  //     } catch (err) {
  //       console.log('에러가 났네요 ㅠㅠ')
  //       console.error(err.response)
  //     }
  //   }
  //   getTokenWithKakao()
  // }, [navigate])

  const loginWithKakao = () => {
    window.location.href = `${KAKAO_AUTH_URL}`
  }

  return (
    <Wrapper>
      <TextDiv>
        <div style={{display:"flex",justifyContent:"center"}}>
          <p style={{fontWeight:"700"}}>모아부자</p>
          <p>에</p>
        </div>
        <p>오신걸 환영합니다!</p>
      </TextDiv>
      <KakaoLogins onClick={loginWithKakao}>
        <img src="img/kakao_login_medium_wide.png" alt="카카오계정 로그인" />
      </KakaoLogins>
    </Wrapper>
  )
}
const TextDiv = styled.div`
  position: absolute;
  left: 26.94%;
  right: 26.67%;
  top: 14.72%;
  bottom: 76.39%;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
  letter-spacing: -0.04em;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
`
const KakaoLogins = styled.div`
  margin-top: 176%;
`

export default KakaoLogin
