import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { alertSelect } from '../recoil/alertSelect'

function Alerts() {
  const [selectAlert, setSelectAlert] = useRecoilState(alertSelect)
  return (
    <Wrapper>
      <TopDiv>
        <NavLink to="/">
          <ButtonDiv />
          <Button />
        </NavLink>
        <Title>알림</Title>
        <AddFriend />
        <TopLine />
      </TopDiv>

      <SelectDiv
        style={{
          left: '0%',
          fontWeight: selectAlert === 1 ? '500' : '400',
          color: selectAlert === 1 ? '#000000' : '#555555',
        }}
        onClick={() => setSelectAlert(1)}
      >
        일반
      </SelectDiv>
      {selectAlert === 1 ? <SelectLine style={{ left: '0%' }} /> : null}
      <SelectDiv
        style={{
          left: '33.33%',
          fontWeight: selectAlert === 2 ? '500' : '400',
          color: selectAlert === 2 ? '#000000' : '#555555',
        }}
        onClick={() => setSelectAlert(2)}
      >
        같이해부자
      </SelectDiv>
      {selectAlert === 2 ? <SelectLine style={{ left: '33.33%' }} /> : null}

      <SelectDiv
        style={{
          left: '66.67%',
          fontWeight: selectAlert === 3 ? '500' : '400',
          color: selectAlert === 3 ? '#000000' : '#555555',
        }}
        onClick={() => setSelectAlert(3)}
      >
        도전해부자
      </SelectDiv>
      {selectAlert === 3 ? <SelectLine style={{ left: '66.67%' }} /> : null}
      <AlertListDiv>
        <AlertList>
          <AlertCharacter />
          <AlertTextDiv>
            <AlertTextTop>룰루랄라룰루랄라 님이</AlertTextTop>
            <AlertTextBottom>초대했어요!</AlertTextBottom>
          </AlertTextDiv>
          <AlertAcceptRefuse style={{ left: '232px' }}>수락</AlertAcceptRefuse>
          <AlertAcceptRefuse style={{ left: '312px' }}>거절</AlertAcceptRefuse>
        </AlertList>
        <AlertHr />
        <AlertList>
          <AlertCharacter />
          <AlertTextDiv>
            <AlertTextTop>룰루랄라룰루랄라 님이</AlertTextTop>
            <AlertTextBottom>초대했어요!</AlertTextBottom>
          </AlertTextDiv>
          <AlertAcceptRefuse style={{ left: '232px' }}>수락</AlertAcceptRefuse>
          <AlertAcceptRefuse style={{ left: '312px' }}>거절</AlertAcceptRefuse>
        </AlertList>
        <AlertHr />
        <AlertList>
          <AlertCharacter />
          <AlertTextDiv>
            <AlertTextTop>룰루랄라룰루랄라 님이</AlertTextTop>
            <AlertTextBottom>초대했어요!</AlertTextBottom>
          </AlertTextDiv>
          <AlertAcceptRefuse style={{ left: '232px' }}>수락</AlertAcceptRefuse>
          <AlertAcceptRefuse style={{ left: '312px' }}>거절</AlertAcceptRefuse>
        </AlertList>
        <AlertHr />
      </AlertListDiv>
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
  right: 85.56%;
  top: 33.72%;
  bottom: 10.47%;

  background: rgba(196, 196, 196, 0.3);
`

const Button = styled.div`
  position: absolute;
  left: 4.44%;
  right: 88.89%;
  top: 47.67%;
  bottom: 24.42%;

  background: #c4c4c4;
`

const AddFriend = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 308px;
  top: 31px;

  /* color/Btn-basic1 */

  background: #e5eaf2;
  opacity: 0.5;
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

const SelectDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 120px;
  top: 11.94%;
  height: 50px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray70 */

  color: #555555;
`

const SelectLine = styled.div`
  position: absolute;

  width: 120px;
  top: 18.47%;
  height: 3px;

  /* color/Secondary */

  background: #4675f0;
`
const AlertListDiv = styled.div`
  position: absolute;
  top: 20%;
  bottom: 0%;
  width: 100%;
  overflow: scroll;
`

const AlertList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 336px;
  height: 48px;
  margin-left: 8px;
  margin-top: 4%;
`
const AlertCharacter = styled.div`
  width: 32px;
  height: 32px;
  padding: 8px;
  background: gray;
`
const AlertTextDiv = styled.div`
  width: 160px;
  height: 34px;
  padding: 8px;
  margin-left: 8px;
`
const AlertTextTop = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  /* or 12px */

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray70 */

  color: #555555;
`
const AlertTextBottom = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  /* or 12px */

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray70 */

  color: #555555;
`
const AlertAcceptRefuse = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 24px;

  /* color / gray / Gray30 */

  background: #cccccc;
  border-radius: 12px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray50 */

  color: #999999;
`
const AlertHr = styled.hr`
  position: absolute;
  width: 360px;
  height: 1px;
  left: 0px;
  margin-top: 2.22%;

  /* color / gray / Gray30 */

  background: #cccccc;
`
export default Alerts
