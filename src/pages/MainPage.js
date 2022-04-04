/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useRecoilState, atom } from 'recoil'
import { NavLink, useNavigate } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ProgressBar from '@ramonak/react-progress-bar'
import axios from 'axios'
import { getToken, onMessage } from 'firebase/messaging'

import { setFlexStyles } from '../styles/Mixin'
import { getCookie, setCookie } from '../utils/cookie'

import { toggleGroupChallenge } from '../recoil/homeToggle'
import { useMainPageData } from '../apis/mainpageData'
import { ReactComponent as Alert } from '../assets/icons/alert/alram.svg'
import { ReactComponent as AlertOn } from '../assets/icons/alert/alram-1.svg'
import Loading from './Loading'
import ErrorLog from './ErrorLog'
import Nav from '../components/Nav'
import { api } from '../utils/axios'
import '../styles/MenuTransition.css'
import { nowDate } from '../hooks/nowDate'
import { onedayBuzaDate } from '../recoil/setDateToday'
import { setItem, getItem } from '../utils/sessionStorage'
import {
  BunnyGG,
  TongkiGG,
  TanniGG,
  TanniStep03,
  TanniStep02,
  TanniStep01,
  BunnyStep03,
  TongkiStep03,
  TongkiStep02,
  TongkiStep01,
  BunnyStep02,
  BunnyStep01,
} from '../assets/character'
import { setMoveToLoginPage } from '../utils/setMoveToLoginPage'

// 홈에 있는 주석을 절대 삭제하지 말아주세요

function MainPage() {
  const [toggle, setToggle] = useRecoilState(toggleGroupChallenge)
  const navigate = useNavigate()
  setItem('nowdate', new Date())

  const { isLoading, data, isError, error } = useMainPageData(navigate)

  function makeGoal() {
    if (toggle === 'group') {
      navigate('/groupbuzacreate')
    }
    if (toggle === 'challenge') {
      navigate('/challengebuzacreate')
    }
  }

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
  useEffect(() => {
    const accessToken = getCookie('A-AUTH-TOKEN')
    if (!accessToken && !isLoading) {
      setMoveToLoginPage()
    }
  }, [isLoading])

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    console.log('error : ', error)
    return <ErrorLog error={error} />
  }
  console.log('데이터확인 : ', isLoading, data, isError, error)

  const nowChallengePercent = data.data.challengePercent
  const nowGroupPercent = data.data.groupPercent

  console.log('nowChallengePercent', nowChallengePercent)
  console.log('nowGroupPercent', nowGroupPercent)
  // if(data && data.data.nickname )
  return (
    <Wrapper>
      <ColorWrapper>
        <NavLink to="/alerts">
          <RightButtonDiv />
          {data && data?.data?.alarmCount > 0 ? (
            <AlertOn
              style={{
                width: '24px',
                height: '24px',
                left: '88.89%',
                top: '8.43%',
                position: 'absolute',
              }}
            />
          ) : (
            <Alert
              style={{
                width: '24px',
                height: '24px',
                left: '88.89%',
                top: '8.43%',
                position: 'absolute',
              }}
            />
          )}
        </NavLink>
        <Toggle>
          <LeftBtn toggle={toggle} onClick={leftToggleBtn}>
            같이해부자
          </LeftBtn>
          <RightBtn toggle={toggle} onClick={rightToggleBtn}>
            도전해부자
          </RightBtn>
        </Toggle>
        {toggle === 'group' && data.data.groupName ? (
          <>
            <ContentGoalName>{data?.data?.groupName}</ContentGoalName>
            <CharacterWrapper
              src={
                data.data.hero === 'bunny' && nowGroupPercent < 30
                  ? BunnyStep01
                  : data.data.hero === 'bunny' && nowGroupPercent < 60
                  ? BunnyStep02
                  : data.data.hero === 'bunny' && nowGroupPercent
                  ? BunnyStep03
                  : data.data.hero === 'tongki' && nowGroupPercent < 30
                  ? TongkiStep01
                  : data.data.hero === 'tongki' && nowGroupPercent < 60
                  ? TongkiStep02
                  : data.data.hero === 'tongki' && nowGroupPercent
                  ? TongkiStep03
                  : data.data.hero === 'tanni' && nowGroupPercent < 30
                  ? TanniStep01
                  : data.data.hero === 'tanni' && nowGroupPercent < 60
                  ? TanniStep02
                  : data.data.hero === 'tanni' && nowGroupPercent
                  ? TanniStep03
                  : null
              }
            />
            <ContentUnderDiv>
              <ContentWon>
                {data.data.groupNeedAmount.toLocaleString('en-US')}원
              </ContentWon>
              <ContentNeed>남았어요!</ContentNeed>
            </ContentUnderDiv>
            {/* <CharacterInfo>
            <CharacterLevel>Lv.{data.data.heroLevel}</CharacterLevel>
            <CharacterNickname>{data.data.hero}</CharacterNickname>
          </CharacterInfo> */}
            <ProgressDiv>
              <ProgressBar
                // completed={60}
                completed={data.data.groupPercent}
                animateOnRender
                bgColor="#4675F0"
                baseBgColor="#E5EAF2"
                height="20px"
                margin="0 auto"
                borderRadius="11px"
                labelAlignment={data.data.groupPercent > 9 ? 'center' : 'left'}
                labelSize="14px"
                width="91.1%"
              />
            </ProgressDiv>
          </>
        ) : (
          ''
        )}
        {toggle === 'group' && !data.data.groupName ? (
          <ContentDiv>😂 아직 목표가 없어요!</ContentDiv>
        ) : (
          ''
        )}
        {toggle === 'challenge' && data.data.challengeName ? (
          <div>
            <ContentGoalName>{data?.data?.challengeName}</ContentGoalName>
            <CharacterWrapper
              src={
                data.data.hero === 'bunny' && nowChallengePercent < 30
                  ? BunnyStep01
                  : data.data.hero === 'bunny' && nowChallengePercent < 60
                  ? BunnyStep02
                  : data.data.hero === 'bunny' && nowChallengePercent
                  ? BunnyStep03
                  : data.data.hero === 'tongki' && nowChallengePercent < 30
                  ? TongkiStep01
                  : data.data.hero === 'tongki' && nowChallengePercent < 60
                  ? TongkiStep02
                  : data.data.hero === 'tongki' && nowChallengePercent
                  ? TongkiStep03
                  : data.data.hero === 'tanni' && nowChallengePercent < 30
                  ? TanniStep01
                  : data.data.hero === 'tanni' && nowChallengePercent < 60
                  ? TanniStep02
                  : data.data.hero === 'tanni' && nowChallengePercent
                  ? TanniStep03
                  : null
              }
            />
            <ContentUnderDiv>
              <ContentWon>
                {data?.data?.challengeNeedAmount.toLocaleString('en-US')}원
              </ContentWon>
              <ContentNeed>남았어요!</ContentNeed>
            </ContentUnderDiv>
            {/* <CharacterInfo>
            <CharacterLevel>Lv.{data.data.heroLevel}</CharacterLevel>
            <CharacterNickname>{data.data.hero}</CharacterNickname>
          </CharacterInfo> */}
            {/* <ProgressDiv />
          <div
            style={{
              width: '100%',
              height: '20px',
              position: 'absolute',
              marginTop: '130%',
            }}
          >
            <ProgressBar
              completed={data ? data.data.challengePercent : ''}
              // completed={data ? data.data.groupNowPercent : 50}
              animateOnRender="true"
              bgColor="#FFB000"
              width="328px"
              height="20px"
              margin="0 auto"
              borderRadius="11px"
              labelAlignment="center"
              labelSize="14px"
            />
            <ProgressBarCharge
              percent={data ? data.data.challengePercent : '0'}
            >
              {data ? data.data.challengePercent : '0'}%
              {data && data.data.challengePercent > 5 ? "%":''}
            </ProgressBarCharge>
          </div> */}
            <ProgressDiv>
              <ProgressBar
                completed={data.data.challengePercent}
                animateOnRender
                bgColor="#4675F0"
                baseBgColor="#E5EAF2"
                width="91.11%"
                height="20px"
                margin="0 auto"
                borderRadius="11px"
                labelAlignment={
                  data.data.challengePercent > 9 ? 'center' : 'left'
                }
                labelSize="14px"
              />
            </ProgressDiv>
          </div>
        ) : (
          ''
        )}
        {toggle === 'challenge' && !data.data.challengeName ? (
          <ContentDiv>😂 아직 목표가 없어요!</ContentDiv>
        ) : (
          ''
        )}
        {data && toggle === 'group' && !data.data.groupName ? (
          <>
            <CharacterWrapper
              src={
                data.data.hero === 'tanni'
                  ? TanniGG
                  : data.data.hero === 'tongki'
                  ? TongkiGG
                  : data.data.hero === 'bunny'
                  ? BunnyGG
                  : null
              }
            />
            <SetAmountButton onClick={() => makeGoal()}>
              목표를 설정해주세요
            </SetAmountButton>
          </>
        ) : (
          ''
        )}
        {data && toggle === 'challenge' && !data.data.challengeName ? (
          <>
            <CharacterWrapper
              src={
                data.data.hero === 'tanni'
                  ? TanniGG
                  : data.data.hero === 'tongki'
                  ? TongkiGG
                  : data.data.hero === 'bunny'
                  ? BunnyGG
                  : null
              }
            />
            <SetAmountButton onClick={() => makeGoal()}>
              목표를 설정해주세요
            </SetAmountButton>
          </>
        ) : (
          ''
        )}
      </ColorWrapper>
      <BottomLine style={{ top: '69.58%' }}>
        <MyWallet>나의 지갑은</MyWallet>
        <Won>{data ? data.data.wallet.toLocaleString('en-US') : '0'}원</Won>
        {/* <ChartBtn>분석해부자</ChartBtn> */}
      </BottomLine>
      <BottomLine style={{ top: '79.03%' }}>
        <MyWallet>나의 자산은</MyWallet>
        <Won>
          {data ? data.data.totalAmount.toLocaleString('en-US') : '0'}원
        </Won>
        {/* <ChartBtn>분석해부자</ChartBtn> */}
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
const ColorWrapper = styled.div`
  height: 66%;
  background-color: #f6f9fe;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`

const CharacterWrapper = styled.img`
  position: absolute;
  width: 287px;
  height: 168px;
  left: calc(50% - 143.5px);
  top: 31.52%;
`
const RightButtonDiv = styled.div`
  position: absolute;
  left: 85.56%;
  top: 4.03%;
  width: 48px;
  height: 48px;
  /* background: rgba(196, 196, 196, 0.3); */
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
  width: 50.5%;
  height: 34px;
  left: 24.7%;
  top: 7.78%;
  background-color: #e5eaf2;
  padding: 2px 2.55px;
  display: flex;
  justify-content: space-between;
`

const LeftBtn = styled.button`
  width: 51%;
  height: 30px;
  background-color: ${(props) =>
    props.toggle === 'challenge' ? ' #e5eaf2' : '#FFB000'};
  font-weight: ${(props) => (props.toggle === 'challenge' ? '400' : 'bold')};
  color: ${(props) => (props.toggle === 'challenge' ? '#8c939d' : 'white')};
  font-size: 14px;
  white-space: nowrap;
  border-radius: 20px;
  border: none;
`

const RightBtn = styled.button`
  width: 51%;
  height: 30px;
  background-color: ${(props) =>
    props.toggle === 'group' ? ' #e5eaf2' : '#FFB000'};
  font-weight: ${(props) => (props.toggle === 'group' ? '400' : 'bold')};
  color: ${(props) => (props.toggle === 'group' ? '#8c939d' : 'white')};
  white-space: nowrap;
  font-size: 14px;
  border-radius: 20px;
  border: none;
`

const ContentGoalName = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 31px;
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
const ContentUnderDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 23.47%;
  width: 100%;
  height: 29px;
`
const ContentWon = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: -0.04em;
  color: #4675f0;
  margin-right: 6px;
`
const ContentNeed = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -0.04em;

  color: #333333;
`
const ContentDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 31px;

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
const SetAmountButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 20px;
  position: absolute;
  width: 171px;
  height: 48px;
  left: calc(50% - 85.5px);
  top: 56.25%;
  background: #ffffff;
  box-shadow: 0px 6px 8px rgba(205, 218, 240, 0.8);
  border-radius: 24px;
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
const CharacterInfo = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 55.69%;
  width: 360px;
  height: 20px;
`
const CharacterLevel = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.04em;
  color: #999999;
  margin-right: 4px;
`
const CharacterNickname = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.04em;

  color: #333333;
`

const ProgressDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 60px;

  top: 62.08%;
`
// const ProgressBar = styled.div`
//   position: absolute;
//   width: 328px;
//   height: 22px;
//   left: 16px;
//   top: 62.1%;

//   /* color/Btn-basic1 */

//   /* background: yellow; */
//   background: #e5eaf2;
//   border-radius: 11px;
// `

const ProgressBarCharge = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}

  position: absolute;
  width: ${(props) => props.percent * 3.28}px;
  height: 20px;
  left: 16px;
  top: 0px;
  /* top: 62.1%; */

  /* color / Accent */

  background: #ffb000;
  border-radius: 11px;

  /* color / Accent */

  background: #ffb000;
  border-radius: 11px;
  font-family: 'Roboto-Medium';
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
  margin: 0% 4.45%;
`

const MyWallet = styled.span`
  font-family: 'Roboto-Medium';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-left: 5%;
  margin-right: 1%;
`

const Won = styled.span`
  font-family: 'Roboto-Medium';
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
  background: #ffb000;
  border-radius: 14px;
  margin-left: 243.5px;
`

export default MainPage
