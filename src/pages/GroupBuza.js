import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '@ramonak/react-progress-bar'
import Swal from 'sweetalert2'
import { setFlexStyles } from '../styles/Mixin'
import Button from '../components/Button'
import Nav from '../components/Nav'
import { api, request } from '../utils/axios'
import { useGroupData } from '../apis/useGroupData'
import Loading from './Loading'
import {
  BunnyFace,
  TanniFace,
  TonkiFace,
  TanniStep02,
} from '../assets/character'

const shortid = require('shortid')

function GroupBuza() {
  const [pending, setPending] = useState(true)
  const [isData, setIsData] = useState(true)
  const navigate = useNavigate()

  // 홈데이터 부르는 부분 수정사함 -----------
  const { isLoading, isError, data, error } = useGroupData(navigate)
  console.log('groupData-------', data)
  const cancelGroup = (id) => {
    Swal.fire({
      title: '그룹포기!',
      text: '진짜 포기하시겠어요?!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '넵 포기!',
      cancelButtonText: '취소!',
    }).then((result) => {
      console.log('result------', result)
      if (result.isConfirmed) {
        request({
          url: `/money/group/exitgroup/${data.data.id}`,
          method: 'delete',
          data: {
            id: data.id,
          },
        }).then((res) => {
          navigate(0)
        })
      }
    })
  }
  useEffect(() => {}, [navigate])
  // if (homeData.isLoading) {
  //   return <Loading />
  // }
  if (isLoading) {
    return <Loading />
  }
  const groupData = data.data

  return (
    <Wrapper>
      {/* {data ? groupData.goalStatus : 'asdasd'}
      <button
        type="button"
        onClick={() => {
          request({
            url: `/money/group`,
            method: 'get',
            data: {
              id: data.id,
            },
          }).then(
            (response) => console.log(response),
            (groupData.goalStatus = 'goal'),
            navigate('/groupbuza'),
          )
        }}
      >
        설정변경
      </button> */}
      <Title>
        <Text>같이해부자</Text>
      </Title>{' '}
      {data
        ? groupData.goalStatus === 'noGoal' && (
            <GoalWrapper>
              <GoalText>원하는 목표를 만들어보세요</GoalText>
              <GoalDescribe>
                공동의 목표를 친구와 함께 달성해보세요.
              </GoalDescribe>
              <Button
                width="296px"
                height="52px"
                fontSize="14px"
                background="#4675F0"
                baseBgColor="E5EAF2"
                onClick={() => {
                  navigate('/groupbuzacreate')
                }}
              >
                + 목표 개설하기
              </Button>
            </GoalWrapper>
          )
        : null}
      {data
        ? groupData.goalStatus === 'goal' && (
            <>
              <GoalWrapper
                onClick={() => {
                  navigate('/groupbuzadetail')
                }}
              >
                <GroupFriend>
                  {groupData.groupMembers.map((member) => {
                    return (
                      <GroupFriendIcon
                        key={shortid.generate()}
                        src={
                          // eslint-disable-next-line no-nested-ternary
                          member.groupMemberHero === 'tanni'
                            ? TanniFace
                            : // eslint-disable-next-line no-nested-ternary
                            member.groupMemberHero === 'tongki'
                            ? TonkiFace
                            : member.groupMemberHero === 'bunny'
                            ? BunnyFace
                            : null
                        }
                      />
                    )
                  })}
                </GroupFriend>
                <GroupFriendTitle>{groupData.groupName}</GroupFriendTitle>
                <GroupFriendGoal>
                  <GroupFriendGoalAmount>
                    {groupData.groupLeftAmount.toLocaleString('ko-KR')}
                  </GroupFriendGoalAmount>
                  <span> 원 남았습니다.</span>
                </GroupFriendGoal>
                <ProgressBar
                  // completed={60}
                  completed={data ? groupData.groupNowPercent : 50}
                  animateOnRender
                  bgColor="#4675F0"
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
                {groupData.groupDoneGoals.map((data) => {
                  return (
                    <CompletedContent key={shortid.generate()}>
                      <CompletedText>{data}</CompletedText>
                    </CompletedContent>
                  )
                })}
              </CompletedList>
            </>
          )
        : null}
      {data
        ? groupData.goalStatus === 'waiting' && (
            <GoalWrapper>
              <GoalText>수락대기중</GoalText>
              <GoalDescribe>
                모두 수락되면 같이해부자가 생성됩니다.
              </GoalDescribe>

              <Button
                width="296px"
                height="52px"
                fontSize="14px"
                background="#4675F0"
                onClick={cancelGroup}
              >
                대기취소
              </Button>
            </GoalWrapper>
          )
        : null}
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
  position: absolute;
  width: 72px;
  height: 22px;
  left: 144px;
  top: 43px;
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
  padding: 16px;

  display: flex;
  /* justify-content: center; */

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
  width: 200px;
  height: 24px;
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

  color: #4675f0;
`

export default GroupBuza
