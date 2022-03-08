import React, { useState } from 'react'
import styled from 'styled-components'
import NavBar from '../components/navBar'
import { setFlexStyles, disappearScrollbar } from '../styles/Mixin'

function MainPage() {
  const [bgcolor, setColor] = useState(true)

  const toggleBtn = () => {
    return setColor(!bgcolor)
  }

  return (
    <Wrapper>
      <TopDiv>
        <Toggle>
          <LeftBtn bgcolor={bgcolor} onClick={toggleBtn}>
            같이해부자
          </LeftBtn>
          <RightBtn bgcolor={bgcolor} onClick={toggleBtn}>
            도전해부자
          </RightBtn>
        </Toggle>
        <ContentDiv>😂 아직 목표가 없어요!</ContentDiv>
        {/* <CharactorDiv>
          <Charactor>캐릭터</Charactor>
        </CharactorDiv> */}
        <MakeChallenge>자산을 설정해주세요</MakeChallenge>
      </TopDiv>
      <BottomDiv>
        <BottomLine>
          <MyWallet>나의 지갑은</MyWallet>
          <Won>82,900원</Won>
          <ChartBtn>분석해부자</ChartBtn>
        </BottomLine>
        <BottomLine>
          <MyWallet>나의 자산은</MyWallet>
          <Won>82,900원</Won>
          <ChartBtn>분석해부자</ChartBtn>
        </BottomLine>
      </BottomDiv>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position:relative;
  width: 100%;
  height: calc(100% - 0px);
`
const TopDiv = styled.div`
  ${setFlexStyles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  })}

  width: 100%;
  height: 67.4%;
`

const Toggle = styled.div`
  /* width: 182px;
  height: 34px;
  margin-top: 7.8%;
  background-color: #e5eaf2;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center; */
  position: absolute;
  width: 182px;
  height: 34px;
  left: 89px;
  top: 56px;
`

const RightBtn = styled.button`
  width: 84px;
  height: 30px;
  background-color: ${(props) => (props.bgcolor ? '#FFB000' : 'none')};
  font-weight: ${(props) => (props.bgcolor ? 'bold' : '400')};
  color: ${(props) => (props.bgcolor ? 'white' : 'gray')};
  font-size: 14px;
  border-radius: 20px;
  border: none;
  margin-left: 5px;
`

const LeftBtn = styled.button`
  width: 84px;
  height: 30px;
  font-size: 14px;
  background-color: ${(props) => (props.bgcolor ? 'none' : '#FFB000')};
  font-weight: ${(props) => (props.bgcolor ? '400' : 'bold')};
  color: ${(props) => (props.bgcolor ? 'gray' : 'white')};
  border-radius: 20px;
  border: none;
`
const ContentDiv = styled.div`
  position: absolute;
  width: 197px;
  height: 31px;
  left: 85px;
  top: 130px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
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
const Content = styled.span`
  font-size: 22px;
  font-weight: 700;
`
const CharactorDiv = styled.div`

  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  height: 44%;
`
const Charactor = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-color: orange;
`
const MakeChallenge = styled.button`
  /* home_입력전_자산설정Btn */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 20px;
  border:none;
  position: absolute;
  width: 171px;
  height: 48px;
  left: 95px;

  top: 56.25%;
  background: #ffffff;
  box-shadow: 0px 6px 8px rgba(205, 218, 240, 0.8);
  border-radius: 24px;
`
const BottomDiv = styled.div`
  ${setFlexStyles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  width: 100%;
  height: 21.2%;
`
const BottomLine = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  width: 91.1%;
  height: 6.7vh;
`
const MyWallet = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-left: 5%;
  margin-right: 1%;
`
const Won = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
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
  margin-left: 250px;
`

export default MainPage
