import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { request } from '../utils/axios'
import { BunnyFace, TanniFace, TonkiFace } from '../assets/character'
import { ReactComponent as Close } from '../assets/icons/common/closeSmall.svg'
import Loading from './Loading'
import { useChallengeFriendData } from '../apis/challengeData'

function ChallengeBuzaCreate() {
  const navigate = useNavigate()
  const [datalist, setDatalist] = useState([])
  console.log('data:::', datalist)
  const { data: friendsList, isLoading } = useChallengeFriendData(navigate)
  const [selectFriends, setSelectFriends] = useState([])
  useEffect(() => {
    if (friendsList) {
      setDatalist([...friendsList.data.challengeMembers])
    }
  }, [friendsList])
  // console.log('FF', friendsList)
  // if (friendsList.data !== undefined) {
  //   setDatalist([...friendsList.data.challengeMembers])
  // }
  // const friendData = () => {
  //   return request({
  //     url: '/money/challenge/createChallenge',
  //     method: 'get',
  //   }).then((res) => {
  //     console.log(res.data.challengeMembers)
  //     setDatalist([...res.data.challengeMembers])
  //   })
  // }

  console.log('selectFriends', selectFriends)
  const selectFriendNickName = selectFriends.map(
    (data) => data.challengeMemberNickname,
  )

  const onError = (error) => {
    console.log(error)
  }

  // console.log('selectFriends', selectFriends)
  const onValid = (challengeData) => {
    console.log('challengeData', challengeData)
    return request({
      url: '/alarm/goal',
      method: 'post',
      data: {
        goalType: 'CHALLENGE',
        goalName: challengeData.createChallengeName,
        goalAmount: parseInt(challengeData.createChallengeAmount, 10),
        friendNickname: selectFriendNickName,
      },
    }).then(
      (res) => console.log('challengeCreate', res),
      Swal.fire({
        title: '입력 완료!',
        text: '시작이 반!!',
        icon: 'success',
      }).then((result) => {
        console.log(result)
        navigate('/challengebuza')
      }),
    )
  }
  // useEffect(() => {
  //   friendData()
  // }, [])

  const {
    control,
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors },
  } = useForm()
  console.log(watch())

  return (
    <Wrapper>
      <CancleMoveButton
        type="button"
        onClick={() => {
          navigate('/challengebuza')
        }}
      >
        취소
      </CancleMoveButton>
      <Title>
        <Text>도전해부자</Text>
      </Title>
      <form onSubmit={handleSubmit(onValid, onError)}>
        <CreateMoveButton>생성</CreateMoveButton>
        <GoalInputBox>
          <IconBox>💰 목표 금액</IconBox>
          <Input
            height="52px"
            placeholder="목표 금액을 입력해주세요."
            {...register('createChallengeAmount', {
              required: '이 부분을 채워부자!',
              pattern: {
                value: /^[0-9]+$/,
                message: '숫자만 써부자',
                shouldFocus: true,
              },
            })}
          />
          <ErrorSpan style={{ top: '91px' }}>
            {errors?.createChallengeAmount?.message}
          </ErrorSpan>
        </GoalInputBox>
        <MemoInputBox>
          <IconBox>
            <i className="fas fa-smile" />
            ✏️ 메모
          </IconBox>
          <Input
            placeholder="메모를 입력해주세요."
            height="80px"
            {...register('createChallengeName', {
              required: '이 부분을 채워부자!',
              maxLength: {
                value: 10,
                message: '10글자 이하로 입력해부자!',
              },
            })}
          />
          <ErrorSpan style={{ top: '120px' }}>
            {errors?.createChallengeName?.message}
          </ErrorSpan>
        </MemoInputBox>
      </form>

      <FriendWrapper>
        <Text fontSize="14px">
          ✓ 함께 할 친구 설정 <SmallText>2인 - 4인</SmallText>
        </Text>
        {selectFriends.length === 0 && <FriendEmptyBox>+</FriendEmptyBox>}
        <SelectedFriendWrapper>
          {selectFriends.map((da, idx) => {
            return (
              <div key={da.id}>
                <SelectedFriendContent>
                  <CircleImg
                    src={
                      // eslint-disable-next-line no-nested-ternary
                      da.hero === 'tanni'
                        ? TanniFace
                        : // eslint-disable-next-line no-nested-ternary
                        da.hero === 'tongki'
                        ? TonkiFace
                        : da.hero === 'bunny'
                        ? BunnyFace
                        : null
                    }
                  />
                  <SelectFriendNameDiv>
                    {selectFriends[idx].challengeMemberNickname}
                  </SelectFriendNameDiv>
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
                key={da.id}
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
                  // if (selectFriends.challengeMemberCanInvite) {
                  //   Swal.fire({
                  //     icon: 'error',
                  //     title: '이미 선택!',
                  //     text: '이미 진행중이에요!',
                  //   })
                  //   return
                  // }
                  const targetIndex = datalist.findIndex(
                    (d) =>
                      d.challengeMemberNickname === da.challengeMemberNickname,
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
                  console.log('selectFriends', selectFriends)
                }}
              >
                <CircleImg
                  src={
                    // eslint-disable-next-line no-nested-ternary
                    da.hero === 'tanni'
                      ? TanniFace
                      : // eslint-disable-next-line no-nested-ternary
                      da.hero === 'tongki'
                      ? TonkiFace
                      : da.hero === 'bunny'
                      ? BunnyFace
                      : null
                  }
                />
                <FriendsText>{da.challengeMemberNickname}</FriendsText>
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
  padding-left: 12px;

  /* color / gray / Gray30 */

  ::placeholder {
    color: #999999;
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
  top: 335px;
`

const FriendsList = styled.div`
  /* Auto layout */
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  overflow: scroll;
  position: absolute;
  left: 1px;
  right: 0%;
  top: 84px;
  bottom: 0%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`
const FriendEmptyBox = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 328px;
  height: 52px;
  color: #cccccc;
  /* color / gray / Gray30 */
  margin-top: 8px;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 600;
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
  margin-left: 12px;
  top: 0px;

  background: #f5f5f7;

  /* Inside auto layout */
  border-radius: 50%;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 8px 0px 0px;
`
const SelectFriendNameDiv = styled.div`
  display: block;
  width: 53px;
  height: 14px;
  margin-right: -5px;
  /* text-overflow: ellipsis; */

  /* Heading/Noto Sans KR/H6 */

  /* Inside auto layout */

  /* margin: 0px 3px; */
`
const CreateButtonWrapper = styled.div`
  position: absolute;
  /* text-align: center; */
  width: 328px;
  height: 60px;
  color: #000000;
  /* background-color: white; */
  top: 82.5%;
  left: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  /* z-index: 99; */
`
const CreateButton = styled.button`
  /* 공통 스타일 */
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 400;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  width: 328px;
  height: 36px;
  margin: 16px 0px;
  /* Inside auto layout */

  flex: none;
  order: 6;
  flex-grow: 0;

  /* 색상 */
  background: #5f5f77;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }
`

const SelectedFriendWrapper = styled.div`
  /* Auto layout */

  display: flex;
  align-items: flex-start;
  padding: 0px;
  overflow-y: scroll;
  width: 328px;
  height: 140px;
  margin-top: 8px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const SelectedFriendContent = styled.div`
  /* Auto layout */

  display: flex;

  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  padding-left: 12px;

  position: static;
  width: 142px;
  height: 52px;

  border-radius: 8px;
  border: 1px solid #e5eaf2;
  /* Inside auto layout */
  margin: 0px 8px 0px 0px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;
`
const DeleteFriendContent = styled.button`
  width: 0px;
  /* color / text / Color-text-Gray1 */

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
export default ChallengeBuzaCreate
