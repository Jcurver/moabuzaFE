import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { request } from '../utils/axios'

function ChallengeBuzaCreate() {
  const navigate = useNavigate()

  const data = [
    {
      id: 1,
      title: '모아모아1',
      src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
    {
      id: 2,
      title: '모아모아2',
      src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
    {
      id: 3,
      title: '모아모아3',
      src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
    {
      id: 4,
      title: '모아모아4',
      src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
    {
      id: 5,
      title: '모아모아5',
      src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
    {
      id: 6,
      title: '모아모아6',
      src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
    {
      id: 7,
      title: '모아모아7',
      src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
    {
      id: 8,
      title: '모아모아8',
      src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
    {
      id: 9,
      title: '모아모아9',
      src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
    {
      id: 10,
      title: '모아모아10',
      src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
    {
      id: 11,
      title: '모아모아',
      src: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    },
  ]
  const [selectFriends, setSelectFriends] = useState([])
  // console.log(selectFriends)

  const [datalist, setDatalist] = useState(data)
  // console.log(datalist)
  // const listfreind = () => {}
  // console.log('selectFriends', selectFriends)

  const {
    control,
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors },
  } = useForm()
  console.log(watch())
  const onSubmit = (data) => {
    console.log(data, ...selectFriends)
  }

  const onError = (error) => {
    console.log(error)
  }

  console.log('selectFriends', selectFriends)
  const onValid = (challengeData) => {
    console.log('challengeData', challengeData)
    return request({
      url: '/money/challenge/createChallenge',
      method: 'post',
      data: {
        createChallengeName: challengeData.createChallengeName,
        createChallengeAmount: parseInt(
          challengeData.createChallengeAmount,
          10,
        ),
        challengeFriends: [...selectFriends],
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
  //   console.log(selectFriends)
  // }, [selectFriends])

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
            type="number"
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
            <i className="fas fa-smile" />✏ 메모
          </IconBox>
          <Input
            placeholder="메모를 입력해주세요."
            height="80px"
            {...register('createChallengeName', {
              required: '이 부분을 채워부자!',
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
        <SelectedFriendWrapper>
          {selectFriends.length === 0
            ? null
            : selectFriends.map((da, idx) => {
                return (
                  <div key={da.id}>
                    <SelectedFriendContent>
                      {selectFriends[idx].title}
                      <DeleteFriendContent
                        onClick={() => {
                          setSelectFriends(
                            selectFriends.filter((flist) => flist.id !== da.id),
                          )
                          setDatalist([da, ...datalist])
                        }}
                      >
                        X
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

                  setSelectFriends((prevList) => [...prevList, da])
                  const targetIndex = datalist.findIndex(
                    (d) => d.title === da.title,
                  )
                  setDatalist([
                    ...datalist.slice(0, targetIndex),
                    ...datalist.slice(targetIndex + 1),
                  ])
                  console.log(selectFriends.length)
                }}
              >
                <CircleImg src={da.src} />
                <FriendsText>{da.title}</FriendsText>
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
  /* 
  display: flex;
  align-items: center; */
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
`

const CreateMoveButton = styled.button`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 308px;
  top: 31px;
`
// Inputbox
const GoalInputBox = styled.div`
  position: absolute;
  /* margin: 106px 16px 16px 16px; */
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
  /* left: 0px;
  top: 5px; */

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
// const Icon = styled.i``

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
  /* Auto layout */

  /* display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px; */

  /* position: absolute; */
  width: 328px;
  height: 36px;
  margin: 16px 0px;
  /* Inside auto layout */

  flex: none;
  order: 6;
  flex-grow: 0;
  /* margin: 16px 0px; */

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
  /* flex-direction: row; */
  align-items: flex-start;
  padding: 0px;
  overflow-y: scroll;
  width: 328px;
  height: 140px;
  /* overflow: hidden; */
  /* position: absolute;
  width: 442px;
  height: 52px;
  left: 0px;
  top: 30px; */
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
  /* position: absolute; */
  width: 0px;
  height: 18px;
  margin-left: 15px;
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
