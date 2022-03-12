import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

function Friends() {
  return (
    <Wrapper>
      <TopDiv>
        <NavLink to="/menu">
          <ButtonDiv />
          <Button />
        </NavLink>
        <Title>친구</Title>
        <AddFriend />
        <NavLink to="/Friends/Add">
          <AddFriendText>추가</AddFriendText>
        </NavLink>
        <TopLine />
      </TopDiv>
      <FriendInput placeholder="닉네임을 입력해주세요." />
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
const AddFriendText = styled.div`
  position: absolute;
  width: 26px;
  height: 14px;
  left: 318px;
  top: 48px;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  text-align: center;
  letter-spacing: -0.04em;

  color: #000000;
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
const FriendInput = styled.input`
  position: absolute;
  width: 328px;
  height: 52px;
  left: 16px;
  top: 102px;
  padding-left: 16px;
  border: none;
  background: #f5f5f7;
  border-radius: 8px;
  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: -0.04em;
    color: #cccccc;
  }
  :-ms-input-placeholder {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: -0.04em;
    color: #cccccc;
  }
`
export default Friends
