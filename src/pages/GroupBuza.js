import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '@ramonak/react-progress-bar'
import { setFlexStyles } from '../styles/Mixin'
import Button from '../components/Button'
import Nav from '../components/Nav'

function GroupBuza() {
  const [pending, setPending] = useState(true)
  const [isData, setIsData] = useState(true)
  const navigate = useNavigate()

  const CompletedData = [
    {
      title: '✈️ 제주도 여행가자!',
    },
    {
      title: '매일 2,000원씩 저금하기!',
    },
    {
      title: '🍫 초코에몽 대신 저금하기!',
    },
    {
      title: '💵  50,000원 모으기!',
    },
  ]
  const FriendData = [
    {
      src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
    },
    {
      src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
    },
    {
      src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
    },
    {
      src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
    },
  ]

  return (
    <Wrapper>
      <button
        type="button"
        onClick={() => {
          setPending(!pending)
        }}
      >
        수락대기중
      </button>
      <button
        type="button"
        onClick={() => {
          setIsData(!isData)
        }}
      >
        데이터가 있을때
      </button>
      <Title>
        {/* <MoveButton type="button">asdasd</MoveButton> */}
        <Text>같이해부자</Text>
        {/* <MoveButton type="button">asdasd</MoveButton> */}
      </Title>{' '}
      {pending && !isData && (
        <GoalWrapper>
          <GoalText>원하는 목표를 만들어보세요</GoalText>
          <GoalDescribe>공동의 목표를 친구와 함께 달성해보세요.</GoalDescribe>
          <Button
            width="296px"
            height="52px"
            fontSize="14px"
            onClick={() => {
              navigate('/groupbuzacreate')
            }}
          >
            + 목표 개설하기
          </Button>
        </GoalWrapper>
      )}
      {!pending && !isData && (
        <GoalWrapper>
          <GoalText>수락대기중</GoalText>
          <GoalDescribe>모두 수락되면 같이해부자가 생성됩니다.</GoalDescribe>
          <Button width="296px" height="52px" fontSize="14px">
            대기취소
          </Button>
        </GoalWrapper>
      )}
      {isData && (
        <>
          <GoalWrapper
            onClick={() => {
              navigate('/groupbuzadetail')
            }}
          >
            <GroupFriend>
              {FriendData.map((data, idx) => {
                return <GroupFriendIcon src={data.src} />
              })}
            </GroupFriend>
            <GroupFriendTitle>티끌모아 태산 동전 저금하기!</GroupFriendTitle>
            <GroupFriendGoal>
              <GroupFriendGoalAmount>9999 </GroupFriendGoalAmount>
              <span>원 남았습니다.</span>
            </GroupFriendGoal>
            <ProgressBar
              completed={60}
              bgColor="#60666F"
              width="304px"
              height="20px"
              margin="0 auto"
              borderRadius="11px"
              labelAlignment="center"
              labelSize="14px"
            />
          </GoalWrapper>
          <ConmpletedTitle>완료목록</ConmpletedTitle>
          <CompletedList>
            {CompletedData.map((data) => {
              return (
                <CompletedContent>
                  <CompletedText>{data.title}</CompletedText>
                </CompletedContent>
              )
            })}
          </CompletedList>
        </>
      )}
      <Nav />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const Title = styled.div`
  /* ${setFlexStyles({
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  })}
  margin-top: 19px;
  margin-bottom: 33px; */

  position: absolute;
  width: 72px;
  height: 22px;
  left: 144px;
  top: 43px;
`

const MoveButton = styled.button`
  width: 48px;
  height: 48px;
`

const Text = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
`

const GoalWrapper = styled.div`
  position: absolute;
  width: 328px;
  height: 156px;
  left: 16px;
  top: 13%;

  /* color/Btn-basic2 */

  background: #f5f5f7;
  border-radius: 8px;
`

const GoalText = styled.div`
  margin: 24px 131px 8px 16px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  /* or 22px */

  letter-spacing: -0.04em;

  color: #000000;
`
const GoalDescribe = styled.div`
  margin: 0px 120px 16px 16px;
  /* Body / Noto Sans KR / P12 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: -0.04em;

  /* color / text / Color-text-Gray3 */

  color: #60666f;
`

// 완료
const ConmpletedTitle = styled.span`
  position: absolute;
  width: 53px;
  height: 14px;
  left: 16px;
  top: 40.2%;

  font-size: 14px;
  line-height: 100%;
`

const CompletedList = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  width: 328px;
  height: 256px;
  left: 16px;
  top: 44%;
`

const CompletedContent = styled.div`
  position: static;
  width: 328px;
  height: 52px;

  background: #f5f5f7;
  border-radius: 8px;
  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 8px 0px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const CompletedText = styled.div`
  width: 208px;
  height: 14px;
  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;
`
// 데이터가 존재 할때
const GroupFriend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  margin: 20px 0px 16px 12px;
  /* position: absolute; */
  width: 200px;
  height: 24px;
  /* left: 28px;
  top: 16.5%; */
`
const GroupFriendIcon = styled.img`
  /* position: static; */
  width: 24px;
  height: 24px;

  /* color / gray / Gray50 */

  background: #999999;
  border-radius: 50%;
  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 8px 0px 0px;
`

const GroupFriendTitle = styled.div`
  /* position: absolute;
   */
  margin: 16px 132px 8px 12px;
  width: 300px;
  height: 16px;
  left: 28px;
  top: 22%;

  /* Heading/Noto Sans KR/H5(B) */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;
`

const GroupFriendGoal = styled.div`
  width: 300px;
  height: 21px;
  margin: 8px 0px 15px 12px;
`

const GroupFriendGoalAmount = styled.span`
  /* Heading / Roboto / H4(B) */
  width: 53px;
  height: 21px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;
`

export default GroupBuza
