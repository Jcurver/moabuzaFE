import React from 'react'
import styled from 'styled-components'
import { deleteCookie } from '../utils/cookie'
import { KAKAO_AUTH_URL } from '../utils/OAuth'
import LogoImg from '../assets/icons/login/logo_start.gif'
import { ReactComponent as KakaoLoginBtn } from '../assets/icons/kakaoLoginBtn.svg'
import { ReactComponent as MoabuzaText } from '../assets/icons/login/moabuza_logo.svg'

function KakaoLogin() {
  deleteCookie('A-AUTH-TOKEN')
  deleteCookie('R-AUTH-TOKEN')
  const loginWithKakao = () => {
    window.location.href = `${KAKAO_AUTH_URL}`
  }

  return (
    <Wrapper>
      <LoadingIconBox
        src={LogoImg}
        style={{ position: 'absolute', top: '30%' }}
      />
      <MoabuzaText style={{ position: 'absolute', top: '47.78%' }} />
      <Explain>챌린지를 통한 경제습관 바로잡기</Explain>
      <KakaoLogins onClick={loginWithKakao}>
        <KakaoLoginBtn />
      </KakaoLogins>
    </Wrapper>
  )
}

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

const Explain = styled.div`
  position: absolute;
  width: 221px;
  height: 18px;
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
