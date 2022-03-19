import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { setFlexStyles } from '../styles/Mixin'


function AddFriends() {
  return (
    <Wrapper>
      <TopDiv>
        <NavLink to="/friends">
          <ButtonDiv />
          <Button />
        </NavLink>
        <Title>친구 추가</Title>
        <AddFriend />
        <TopLine />
      </TopDiv>
      <NicknameText>닉네임</NicknameText>
      <NicknameInput placeholder="닉네임을 입력해주세요" />
      <FriendLine>
        <FriendInfo>
          <FriendCharactor />
          <FriendNickName>나는 부자</FriendNickName>
        </FriendInfo>
        <FriendAddButton>
          <FriendAddButtonText>추가</FriendAddButtonText>
        </FriendAddButton>
      </FriendLine>
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
  width: 60px;
  height: 23px;
  left: 150px;
  top: 43px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
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

const NicknameText = styled.div`
  position: absolute;
  width: 38px;
  height: 14px;
  left: 16px;
  top: 15.28%;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;

  color: #000000;
`
const NicknameInput = styled.input`
  position: absolute;
  width: 328px;
  height: 52px;
  left: 16px;
  top: 18.33%;

  background: #f5f5f7;
  border-radius: 8px;
  padding-left: 16px;
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
const FriendLine = styled.div`
  ${setFlexStyles({
    display: 'flex',
    flexDirection:'column',
    alignItems: 'flex-start',
  })}
  padding: 0px;

  position: absolute;
  width: 328px;
  height: 48px;
  left: 16px;
  top: 216px;
`

const FriendInfo = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  padding: 0px;

  position: absolute;
  width: 99px;
  height: 38px;
  left: 0px;
  top: 5px;
`
const FriendCharactor = styled.div`
  position: static;
  width: 38px;
  height: 38px;
  left: 0px;
  top: 0px;

  background: #f5f5f7;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 8px;
`
const FriendNickName = styled.div`
  position: static;
  width: 53px;
  height: 14px;
  left: 46px;
  top: 12px;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 8px;
`
const FriendAddButton = styled.button`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  padding: 7px 13px;

  position: absolute;
  width: 48px;
  height: 26px;
  left: 259px;
  top: 11px;

  /* color / gray / Gray30 */

  background: #cccccc;
  border-radius: 13px;
`
const FriendAddButtonText = styled.p`
  position: static;
  width: 22px;
  height: 12px;
  left: 13px;
  top: 7px;

  /* Heading/Noto Sans KR/H7 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  text-align: center;
  letter-spacing: -0.04em;

  /* Rectangle 173 */

  color: #ffffff;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
`

export default AddFriends
