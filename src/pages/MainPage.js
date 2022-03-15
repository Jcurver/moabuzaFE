import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRecoilState, atom } from 'recoil'
import { NavLink } from 'react-router-dom'
import { setFlexStyles } from '../styles/Mixin'
import { toggleGroupChallenge } from '../recoil/homeToggle'
import { useHomeData } from '../hooks/useUserData'
import Loading from './Loading'
import ErrorLog from './ErrorLog'
import Nav from '../components/Nav'

// 홈에 있는 주석을 절대 삭제하지 말아주세요

function MainPage() {
  const [toggle, setToggle] = useRecoilState(toggleGroupChallenge)
  // const { isLoading, data, isError, error } = useHomeData(toggle)
  // console.log('홈 데이터 : ', data)
  const leftToggleBtn = () => {
    if (toggle === 'challenge') {
      setToggle('group')
    }
  }
  const rightToggleBtn = () => {
    if (toggle === 'group') {
      setToggle('challenge')
    }
  }

  // if (isLoading) {
  //   return <Loading />
  // }
  // if (isError) {
  //   console.log('error : ', error)
  //   return <ErrorLog error={error} />
  // }

  return (
    <Wrapper>
      <NavLink to="/alerts">
        <RightButtonDiv />
        <RightButton />
      </NavLink>
      <Toggle>
        <LeftBtn toggle={toggle} onClick={leftToggleBtn}>
          같이해부자
        </LeftBtn>
        <RightBtn toggle={toggle} onClick={rightToggleBtn}>
          도전해부자
        </RightBtn>
      </Toggle>
      {/* {(toggle === 'group' && data?.isGroupGoal) ||
        (toggle === 'challenge' && data?.isChallengeGoal) ? (
          <ContentDiv>😂 아직 목표가 없어요!</ContentDiv>
          ) : (
            ''
          )} */}

      <ContentDiv>😂 아직 목표가 없어요!</ContentDiv>

      {/* <MakeChallenge>자산을 설정해주세요</MakeChallenge> */}
      <ProgressDiv />
      <ProgressBar />
      <ProgressBarCharge>30%</ProgressBarCharge>

      <BottomLine style={{ top: '69.58%' }}>
        <MyWallet>나의 지갑은</MyWallet>
        <Won>82,900원</Won>
        <ChartBtn>분석해부자</ChartBtn>
      </BottomLine>
      <BottomLine style={{ top: '79.03%' }}>
        <MyWallet>나의 자산은</MyWallet>
        <Won>82,900원</Won>
        <ChartBtn>분석해부자</ChartBtn>
      </BottomLine>

      <Nav />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const RightButtonDiv = styled.div`
  position: absolute;
  left: 85.56%;

  top: 4.03%;
  width:48px;
  height:48px;

  background: rgba(196, 196, 196, 0.3);
`

const RightButton = styled.div`
  position: absolute;
  left: 88.89%;

  top: 5.69%;
  width: 24px;
  height: 24px;

  background: #c4c4c4;
`
const TopDiv = styled.div`
  ${setFlexStyles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  })}
  position: absolute;
  width: 360px;

  left: 0px;
  top: 0px;

  background: #f6f9fe;

  height: 67.4%;
`

const Toggle = styled.div`
  border-radius: 20px;
  position: absolute;
  width: 182px;
  height: 34px;
  left: 89px;
  top: 7.78%;
  background-color: #e5eaf2;

  padding: 2px 2.55px;
  display: flex;
  justify-content: space-between;
`

const LeftBtn = styled.button`
  width: 92px;
  height: 30px;
  background-color: ${(props) =>
    props.toggle === 'challenge' ? ' #e5eaf2' : '#FFB000'};
  font-weight: ${(props) => (props.toggle === 'challenge' ? '400' : 'bold')};
  color: ${(props) => (props.toggle === 'challenge' ? '#B9BFC8' : 'white')};
  font-size: 14px;
  white-space: nowrap;
  border-radius: 20px;
  border: none;
`

const RightBtn = styled.button`
  width: 92px;
  height: 30px;
  background-color: ${(props) =>
    props.toggle === 'group' ? ' #e5eaf2' : '#FFB000'};
  font-weight: ${(props) => (props.toggle === 'group' ? '400' : 'bold')};
  color: ${(props) => (props.toggle === 'group' ? '#B9BFC8' : 'white')};
  white-space: nowrap;
  font-size: 14px;
  border-radius: 20px;
  border: none;
`
const ContentDiv = styled.div`
  position: absolute;
  width: 197px;
  height: 31px;
  left: 81px;
  top: 18.06%;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 140%;
  /* identical to box height, or 31px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray80 */

  color: #333333;
`

const MakeChallenge = styled.button`
  /* home_입력전_자산설정Btn */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 20px;
  border: none;
  position: absolute;
  width: 171px;
  height: 48px;
  left: 95px;

  top: 56.25%;
  background: #ffffff;
  box-shadow: 0px 6px 8px rgba(205, 218, 240, 0.8);
  border-radius: 24px;
`

const ProgressDiv = styled.div`
  position: absolute;
  width: 328px;
  height: 60px;
  left: 16px;
  top: 56.8%;
  position: absolute;
  width: 328px;
  height: 60px;
  left: 16px;
  top: 409/720px;
`
const ProgressBar = styled.div`
  position: absolute;
  width: 328px;
  height: 22px;
  left: 16px;
  top: 62.1%;

  /* color/Btn-basic1 */

  /* background: yellow; */
  background: #e5eaf2;
  border-radius: 11px;
`
const ProgressBarCharge = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  position: absolute;
  width: 110.77px;
  height: 22px;
  left: 16px;
  top: 62.1%;

  /* color / Accent */

  background: #ffb000;
  border-radius: 11px;

  /* color / Accent */

  background: #ffb000;
  border-radius: 11px;
  font-family: Roboto-Medium;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;

  /* color/gray/White */

  color: #ffffff;
`


const BottomLine = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  position: absolute;

  width: 91.1%;
  height: 6.7%;
  background: #f5f5f7;
  border-radius: 8px;
  margin: 8px;
`

const MyWallet = styled.span`
  font-family: Roboto-Medium;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-left: 5%;
  margin-right: 1%;
`

const Won = styled.span`
  font-family: Roboto-Medium;
  font-style: normal;
  /* font-weight: bold; */
  font-size: 18px;
  line-height: 21px;
`

const ChartBtn = styled.button`
  border: none;
  position: fixed;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */
  padding: 9px 12px;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
  background: #4675f0;
  border-radius: 14px;
  margin-left: 243.5px;
`

export default MainPage
