import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { request } from '../utils/axios'
import { useFriendData } from '../apis/groupData'
import { ReactComponent as Close } from '../assets/icons/common/closeSmall.svg'
import Loading from './Loading'
import {
  BunnyFace,
  TanniFace,
  TongkiFace,
  TanniStep02,
} from '../assets/character'

function GroupBuzaCreate() {
  const navigate = useNavigate()
  const { data, isLoading } = useFriendData(navigate)
  // 수정대기2
  const friendData = () => {
    return request({ url: '/money/group/creategroup', method: 'get' }).then(
      (res) => {
        console.log(res)
        setDatalist([...res.data.groupMembers])
      },
    )
  }

  useEffect(() => {
    friendData()
  }, [navigate])
  const {
    control,
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors },
  } = useForm()
  console.log(watch())

  const [datalist, setDatalist] = useState([])
  const [selectFriends, setSelectFriends] = useState([])

  const selentFriendNickName = selectFriends.map(
    (data) => data.groupMemberNickname,
  )

  const onError = (error) => {
    console.log(error)
  }
  const onValid = (groupData) => {
    if (selectFriends.length < 1) {
      return Swal.fire({
        title: '1명 이상 선택!',
        text: '1명 이상 선택해주세요!!',
        icon: 'error',
      })
    }
    return request({
      url: '/alarm/goal',
      method: 'post',
      data: {
        goalType: 'GROUP',
        goalName: groupData.createGroupName,
        goalAmount: parseInt(groupData.createGroupAmount, 10),
        friendNickname: selentFriendNickName,
      },
    }).then(
      (res) => console.log('groupCreate', res),
      Swal.fire({
        title: '입력 완료!',
        text: '시작이 반!!',
        icon: 'success',
      }).then((result) => {
        console.log(result)
        navigate('/groupbuza')
      }),
    )
  }

  if (isLoading) {
    return <Loading />
  }
  console.log(data)
  // useEffect(() => {
  //   console.log(selectFriends)
  // }, [selectFriends])

  return (
    <Wrapper>
      <CancleMoveButton
        type="button"
        onClick={() => {
          navigate('/groupbuza')
        }}
      >
        취소
      </CancleMoveButton>
      <Title>
        <Text>같이해부자</Text>
      </Title>
      <form onSubmit={handleSubmit(onValid, onError)}>
        <CreateMoveButton>생성</CreateMoveButton>
        <GoalInputBox>
          <IconBox>💰 목표 금액</IconBox>
          <Input
            type="number"
            height="52px"
            placeholder="목표 금액을 입력해주세요."
            {...register('createGroupAmount', {
              required: '이 부분을 채워부자!',
              pattern: {
                value: /^[0-9]+$/,
                message: '숫자만 써부자',
                shouldFocus: true,
              },
            })}
          />
          <ErrorSpan style={{ top: '91px' }}>
            {errors?.createGroupAmount?.message}
          </ErrorSpan>
        </GoalInputBox>
        <MemoInputBox>
          <IconBox>
            <i className="fas fa-smile" />✏ 메모
          </IconBox>
          <Input
            placeholder="메모를 입력해주세요."
            height="80px"
            {...register('createGroupName', {
              required: '이 부분을 채워부자!',
            })}
          />
          <ErrorSpan style={{ top: '120px' }}>
            {errors?.createGroupName?.message}
          </ErrorSpan>
        </MemoInputBox>
      </form>

      <FriendWrapper>
        <Text fontSize="14px">
          ✓ 함께 할 친구 설정 <SmallText>2인 - 4인</SmallText>
        </Text>
        <SelectedFriendWrapper>
          {selectFriends.length === 0
            ? null
            : selectFriends.map((da, idx) => {
                return (
                  <div key={Date.now()}>
                    <SelectedFriendContent>
                      {selectFriends[idx].groupMemberNickname}
                      <DeleteFriendContent
                        onClick={() => {
                          const targetIndex = selectFriends.findIndex(
                            (d) =>
                              d.challengeMemberNickname ===
                              da.challengeMemberNickname,
                          )
                          setDatalist([selectFriends[targetIndex], ...datalist])
                          setSelectFriends([
                            ...selectFriends.slice(0, targetIndex),
                            ...selectFriends.slice(targetIndex + 1),
                          ])

                          console.log('datalist', datalist)
                        }}
                      >
                        <Close />
                      </DeleteFriendContent>
                    </SelectedFriendContent>
                  </div>
                )
              })}
        </SelectedFriendWrapper>
        <FriendsList friendslength={selectFriends.length}>
          {datalist.map((da, idx) => {
            return (
              <Friends
                key={Date.now()}
                onClick={() => {
                  if (selectFriends.length > 2) {
                    // eslint-disable-next-line no-alert
                    Swal.fire({
                      icon: 'error',
                      title: '인원초과!',
                      text: '3명까지 선택가능해요!',
                    })
                    return
                  }

                  setSelectFriends((prevList) => [...prevList, da])
                  const targetIndex = datalist.findIndex(
                    (d) => d.groupMemberNickname === da.groupMemberNickname,
                  )
                  setSelectFriends((prevList) => [
                    datalist[targetIndex],
                    ...prevList,
                  ])
                  setDatalist([
                    ...datalist.slice(0, targetIndex),
                    ...datalist.slice(targetIndex + 1),
                  ])
                  console.log(selectFriends.length)
                }}
              >
                <CircleImg
                  src={
                    // eslint-disable-next-line no-nested-ternary
                    datalist.hero === 'tanni'
                      ? TanniFace
                      : // eslint-disable-next-line no-nested-ternary
                      da.hero === 'tongki'
                      ? TongkiFace
                      : da.hero === 'bunny'
                      ? BunnyFace
                      : null
                  }
                />
                <FriendsText>{da.groupMemberNickname}</FriendsText>
              </Friends>
            )
          })}
        </FriendsList>
      </FriendWrapper>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const Title = styled.div`
  position: absolute;
  width: 72px;
  height: 23px;
  left: 144px;
  top: 43px;
`
const Input = styled.input`
  width: 100%;
  height: ${(props) => props.height};
  background: #f5f5f7;
  border-radius: 8px;
  border: none;
  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;

  /* color / gray / Gray30 */

  ::placeholder {
    color: #cccccc;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
  }
`

const Text = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: ${(props) => props.fontWeight || 500};
  font-size: ${(props) => props.fontSize || '16px'};
  line-height: 140%;
`
const SmallText = styled.span`
  /* Heading/Noto Sans KR/H7 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */

  letter-spacing: -0.04em;

  /* color / gray / Gray50 */

  color: #999999;
`

const CancleMoveButton = styled.button`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 4px;
  top: 31px;
  background-color: #fff;
`

const CreateMoveButton = styled.button`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 308px;
  top: 31px;
  background-color: #fff;
  color: #4675f0;
`
// Inputbox
const GoalInputBox = styled.div`
  position: absolute;
  width: 328px;
  height: 87px;
  left: 16px;
  top: 106px;
`
const IconBox = styled.div`
  /* position: absolute; */
  width: 328px;
  height: 14px;
  margin: 5px 262px 16px 0px;

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

const MemoInputBox = styled.div`
  position: absolute;
  width: 328px;
  height: 110px;
  left: 16px;
  top: 209px;
`

// Friends
const FriendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  width: 328px;
  height: 40%;
  left: 16px;
  top: 340px;
`

const FriendsList = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  overflow: scroll;
  position: absolute;
  left: 1px;
  right: 0%;
  top: ${(props) => (props.friendslength === 0 ? '57px' : '28%')};
  bottom: 0%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`

const Friends = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  position: static;
  width: 328px;
  height: 36px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 8px 0px;
`

const FriendsText = styled.div`
  position: static;
  width: 100px;
  height: 14px;
  left: 44px;
  top: 11px;

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
const CircleImg = styled.img`
  /* Ellipse 20 */

  position: static;
  width: 36px;
  height: 36px;
  left: 0px;
  top: 0px;

  background: #f5f5f7;

  /* Inside auto layout */
  border-radius: 50%;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 8px 0px 0px;
`

const SelectedFriendWrapper = styled.div`
  /* Auto layout */

  display: flex;
  align-items: flex-start;
  padding: 0px;
  overflow-y: scroll;
  width: 328px;
  height: 140px;
  margin: 10px 0px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`

const SelectedFriendContent = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  position: static;
  width: 142px;
  height: 52px;

  border-radius: 8px;
  border: 1px solid #e5eaf2;
  /* Inside auto layout */
  margin: 0px 8px 0px 0px;
`
const DeleteFriendContent = styled.button`
  width: 0px;
  height: 18px;
  margin-left: 15px;
  background: white;
`

const ErrorSpan = styled.span`
  position: absolute;
  width: 104px;
  height: 11px;
  left: 8px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 100%;
  /* identical to box height, or 11px */

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  color: #ff3d00;
`
export default GroupBuzaCreate
