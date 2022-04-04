import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { deleteCookie, setCookie } from '../utils/cookie'
import { KAKAO_AUTH_URL } from '../utils/OAuth'
import LogoImg from '../assets/icons/login/logo_start.gif'
import { ReactComponent as KakaoLoginBtn } from '../assets/icons/kakaoLoginBtn.svg'
import { ReactComponent as MoabuzaText } from '../assets/icons/login/moabuza_logo.svg'
import { loginBtnStyle } from '../styles/Mixin'
import {getItem} from '../utils/sessionStorage'

function KakaoLogin() {
  const navigate = useNavigate()
  deleteCookie('A-AUTH-TOKEN')
  deleteCookie('R-AUTH-TOKEN')
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
  console.log(getItem('fcmToken'))
  const loginWithKakao = () => {
    window.location.href = `${KAKAO_AUTH_URL}`
  }

  return (
    <Wrapper>
      <LoadingIconBox
        src={LogoImg}
        style={{ position: 'absolute', top: '30%' }}
      />
      {/* <LogoTextBox src={LogoText} /> */}
      <MoabuzaText style={{ position: 'absolute', top: '47.78%' }} />
      <Explain>챌린지를 통한 경제습관 바로잡기</Explain>
      <KakaoLogins onClick={loginWithKakao}>
        <KakaoLoginBtn />
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
  position: absolute;
  top: 88%;
`
const LoadingIconBox = styled.img`
  position: absolute;
  width: 128px;
  height: 128px;
  /* left: 116px;
  top: 34.44%; */
`
const SocialTitle = styled.span`
  margin: 0 auto;
  /* height: 24px;
  margin: 0px 83px 0px 103px; */
`

const LogoTextBox = styled.img`
  position: absolute;
  left: 20%;
  right: 20%;
  top: 52.22%;
  bottom: 42.59%;
`
const Explain = styled.div`
  position: absolute;
  width: 221px;
  height: 18px;
  /* left: 70px; */
  top: 55.13%;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  /* identical to box height, or 18px */

  display: flex;
  align-items: flex-end;
  text-align: center;
  letter-spacing: -0.08em;

  /* color/Secondary */

  color: #4675f0;
`

export default KakaoLogin
