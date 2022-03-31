import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { setFlexStyles } from '../styles/Mixin'
import { ReactComponent as Backarr } from '../assets/icons/arrow/backarr.svg'
import { ReactComponent as Search } from '../assets/icons/common/search.svg'
import Loading from './Loading'
import { BunnyFace, TongkiFace, TanniFace } from '../assets/character/index'

import ErrorLog from './ErrorLog'
import { useFriendsData, useSearchFriend } from '../apis/friendsData'

function Friends() {
  function searchFriend() {
    console.log('cccc')
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError,
  } = useForm()
  const { isLoading, data: friendList, error, isError } = useFriendsData()
  console.log('friendList::', friendList)

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    console.log('error : ', error)
    return <ErrorLog error={error} />
  }

  console.log('friendList:::', friendList)

  function onValid() {}

  return (
    <Wrapper>
      <TopDiv>
        <NavLink to="/menu">
          <Backarr
            style={{
              position: 'absolute',
              left: '4.44%',
              top: '47.67%',
              width: '24px',
              height: '24px',
            }}
          />
        </NavLink>
        <Title>친구</Title>

        <NavLink to="/friends/add">
          <AddFriendText>추가</AddFriendText>
        </NavLink>
        <TopLine />
      </TopDiv>
      <form onSubmit={handleSubmit(onValid)}>
        <FriendInput placeholder="닉네임을 입력해주세요." />
        <FriendSearch style={{ color: '#999999' }}>
          <Search />
        </FriendSearch>
      </form>
      <FriendsDiv>
        {friendList.data.waitingFriendListDto.map((d) => {
          return (
            <FriendsLine>
              <FriendProfile>
                <FriendIcon src={d.hero} />
                <FriendText>{d.nickname}</FriendText>
              </FriendProfile>
              <AddButton>수락대기</AddButton>
            </FriendsLine>
          )
        })}
        {friendList.data.friendListDto.map((d) => {
          return (
            <FriendsLine>
              <FriendProfile>
                <FriendIcon
                  src={
                    d.hero === 'bunny'
                      ? BunnyFace
                      : d.hero === 'tongki'
                      ? TongkiFace
                      : d.hero === 'tanni'
                      ? TanniFace
                      : null
                  }
                />
                <FriendText>{d.nickname}</FriendText>
              </FriendProfile>
            </FriendsLine>
          )
        })}
        {/* <FriendsLine>
          <FriendProfile>
            <FriendIcon src={bunny} />
            <FriendText>홍길동</FriendText>
          </FriendProfile>
          <AddButton>수락대기</AddButton>
        </FriendsLine>
        <FriendsLine>
          <FriendProfile>
            <FriendIcon />
            <FriendText>홍길동</FriendText>
          </FriendProfile>
          <AddButton>수락대기</AddButton>
        </FriendsLine>
        <FriendsLine>
          <FriendProfile>
            <FriendIcon />
            <FriendText>홍길동</FriendText>
          </FriendProfile>
        </FriendsLine> */}
      </FriendsDiv>
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
  height: 82px;
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

  color: #4675f0;
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
const FriendSearch = styled.button`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 116px;
  left: 304px;
`
const FriendsDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 154.1px;
  padding: 16px 16px 0px 16px;
  overflow: scroll;
  bottom: 0px;
`
const FriendsLine = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  padding: 0px;
  width: 328px;
  height: 48px;
  margin-bottom: 1.11%;
`
const FriendProfile = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}

  width:100px;
`
const FriendIcon = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 20px;
  /* background: #f5f5f7; */
  margin-right: 8px;
`
const FriendText = styled.div``
const AddButton = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  padding: 7px 13px;

  width: 69px;
  height: 26px;
  left: 259px;
  top: 11px;

  /* color / gray / Gray30 */

  background: #e5eaf2;
  border-radius: 13px;
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

  color: #8c939d;
`

export default Friends
