import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ReactComponent as Search } from '../assets/icons/common/search.svg'
import { setFlexStyles } from '../styles/Mixin'
import Loading from './Loading'
import { BunnyFace, TongkiFace, TanniFace } from '../assets/character/index'
import ErrorLog from './ErrorLog'
import { ReactComponent as Backarr } from '../assets/icons/arrow/backarr.svg'
import { useSearchFriend, requestFriend } from '../apis/friendsData.js'
import TitleText from '../components/Header/TitleText'

function AddFriends() {
  const navigate = useNavigate()
  const findFriend = useSearchFriend()
  const [nick, setNick] = useState('')

  if (findFriend.isLoading) {
    return <Loading />
  }

  if (findFriend.isError) {
    return <ErrorLog error={findFriend.error} />
  }

  return (
    <Wrapper>
      <NavLink to="/friends">
        <Backarr
          style={{
            position: 'absolute',
            left: '4.44%',
            top: '6.45%',
            width: '24px',
            height: '24px',
          }}
        />
      </NavLink>
      <TitleText>친구 추가</TitleText>

      <TopLine />

      <NicknameText>닉네임</NicknameText>
      <NicknameInput
        placeholder="닉네임을 입력해주세요"
        onChange={(e) => setNick(e.target.value)}
      />
      <NicknameButton
        onClick={() => {
          findFriend.mutate(nick)
        }}
      >
        <Search />
      </NicknameButton>
      {findFriend?.data?.data?.nickname ? (
        <FriendLine>
          <FriendInfo>
            {/* <FriendCharactor /> */}
            <FriendCharactor
              src={
                findFriend.data.data.hero === 'bunny'
                  ? BunnyFace
                  : findFriend.data.data.hero === 'tongki'
                  ? TongkiFace
                  : findFriend.data.data.hero === 'tanni'
                  ? TanniFace
                  : null
              }
            />
            <FriendNickName>{findFriend.data.data.nickname}</FriendNickName>
          </FriendInfo>
          <FriendAddButton>
            <FriendAddButtonText
              onClick={() => {
                Swal.fire({
                  title: '친구로 추가하시겠어요?',
                  // text: '!',
                  showCancelButton: true,
                  confirmButtonText: '추가',
                  cancelButtonText: '취소',
                  showLoaderOnConfirm: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    requestFriend(findFriend.data.data.nickname)
                    Swal.fire({
                      title: '친구요청 완료!',
                      confirmButtonText: '확인!',
                    }).then(() => {
                      navigate(0)
                    })
                  }
                })
              }}
            >
              추가
            </FriendAddButtonText>
          </FriendAddButton>
        </FriendLine>
      ) : (
        ''
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
  top: 110px;

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
  width: 91.1%;
  height: 52px;
  left: 16px;
  top: 132px;
  font-family: 'Noto Sans KR';
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
const NicknameButton = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 146px;
  right: 10%;
`
const FriendLine = styled.div`
  ${setFlexStyles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  })}
  padding: 0px;

  position: absolute;
  width: 91.1%;
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
const FriendCharactor = styled.img`
  position: static;
  width: 38px;
  height: 38px;
  left: 0px;
  top: 0px;
  border-radius: 50%;

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
  /* left: 259px; */
  right: 10%;
  top: 11px;

  /* color / gray / Gray30 */

  background: #4675f0;
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
