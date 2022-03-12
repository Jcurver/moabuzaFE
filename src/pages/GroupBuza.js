import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { setFlexStyles } from '../styles/Mixin'
import Button from '../components/Button'

function GroupBuza() {
  const [pending, setPending] = useState(true)
  const navigate = useNavigate()

  return (
    <Wrapper>
      <Title>
        {/* <MoveButton type="button">asdasd</MoveButton> */}
        <Text>같이해부자</Text>
        {/* <MoveButton type="button">asdasd</MoveButton> */}
      </Title>{' '}
      {pending && (
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
      {/* {!pending && (
        <GoalWrapper>
          <GoalText>수락대기중</GoalText>
          <GoalDescribe>모두 수락되면 같이해부자가 생성됩니다.</GoalDescribe>
          <Button width="296px" height="52px" fontSize="14px">
            대기취소
          </Button>
        </GoalWrapper>
      )} */}
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
export default GroupBuza
