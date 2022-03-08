import React, { useState } from 'react'
import styled from 'styled-components'
import NavBar from '../components/navBar'

function MainPage() {
  const [bgcolor, setColor] = useState(true)

  const toggleBtn = () => {
    return setColor(!bgcolor)
  }

  return (
    <div style={{ minWidth: '360px' }}>
      <TopDiv>
        <Toggle>
          <LeftBtn bgcolor={bgcolor} onClick={toggleBtn}>
            같이해부자
          </LeftBtn>
          <RightBtn bgcolor={bgcolor} onClick={toggleBtn}>
            도전해부자
          </RightBtn>
        </Toggle>
        <ContentDiv>
          <Content>😂 아직 목표가 없어요!</Content>
        </ContentDiv>
        <CharactorDiv>
          <Charactor>캐릭터</Charactor>
        </CharactorDiv>
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
      <NavBar />
    </div>
  )
}

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;
  height: 67.4vh;
`

const Toggle = styled.div`
  width: 182px;
  height: 34px;
  margin-top: 7.8%;
  background-color: #e5eaf2;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Content = styled.span`
  font-size: 22px;
  font-weight: 700;
`
const CharactorDiv = styled.div`
  height: 27vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Charactor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-color: orange;
`
const MakeChallenge = styled.button`
  border: none;
  width: 47.5%;
  height: 6.7vh;
  padding: 16px 20px;
  box-shadow: 0px 6px 8px rgba(205, 218, 240, 0.8);
  border-radius: 24px;
`
const BottomDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 21.2vh;
`
const BottomLine = styled.div`
  display: flex;

  align-items: center;

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
  padding: 6px 9px;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
  background: #4675f0;
  border-radius: 14px;
  margin-left: 65%;
`

export default MainPage
