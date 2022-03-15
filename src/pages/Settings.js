import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

function Settings() {
  function logout() {
    console.log('gkgk')
    Swal.fire({
      title: '로그아웃할 거지?',
      text: '꼭 다시 돌아와부자!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '나가부자',
      cancelButtonText: '있어부자',
    })
      .then((result) => {
        if (result.value) {
        console.log(result)
        // this.props.submitUser(this.state)
      }
    })

  }

  return (
    <Wrapper>
      <TopDiv>
        <NavLink to="/menu">
          <ButtonDiv />
          <Button />
        </NavLink>
        <Title>설정</Title>
        <TopLine />
      </TopDiv>
      <NavLink to="/modified">
        <TodayDiv style={{ top: '11.94%' }}>
          <TodayLogoDiv />
          <TodayLogo />
          <TodayText>캐릭터/닉네임 수정</TodayText>
        </TodayDiv>
      </NavLink>
      <TodayDiv style={{ top: '20.27%' }}>
        <TodayLogoDiv />
        <TodayLogo />
        <TodayText>리뷰</TodayText>
      </TodayDiv>
      <TodayDiv onClick={()=>logout()} style={{ top: '35.97%' }}>
        <TodayLogoDiv />
        <TodayLogo />
        <TodayText>로그아웃</TodayText>
      </TodayDiv>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const TopDiv = styled.div`
  position: absolute;
  width: 360px;
  height: 86px;
  left: 0px;
  top: 0px;
`

const ButtonDiv = styled.div`
  position: absolute;
  left: 1.11%;
  top: 33.72%;
  width: 48px;
  height: 48px;

  background: rgba(196, 196, 196, 0.3);
`

const Button = styled.div`
  position: absolute;
  left: 4.44%;
  top: 47.67%;
  width: 24px;
  height: 24px;

  background: #c4c4c4;
`
const Title = styled.div`
  position: absolute;
  left: 46.11%;
  right: 45.83%;
  top: 50%;
  bottom: 23.26%;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.04em;

  color: #000000;
`
const TopLine = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 98.84%;
  bottom: 0%;

  /* color/Btn-basic2 */

  background: #f5f5f7;
`

const TodayDiv = styled.div`
  position: absolute;
  width: 360px;
  height: 60px;
  left: 0px;
`

const TodayLogoDiv = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 4px;
  top: 6px;

  background: rgba(196, 196, 196, 0.3);
`
const TodayLogo = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 16px;
  top: 18px;

  background: #c4c4c4;
`
const TodayText = styled.div`
  position: absolute;
  width: 150px;
  height: 14px;
  left: 57px;
  top: 23px;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  color: #000000;
`

export default Settings
