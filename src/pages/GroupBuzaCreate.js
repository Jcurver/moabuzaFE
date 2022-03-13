import React from 'react'
import styled from 'styled-components'
import { setFlexStyles } from '../styles/Mixin'
import Button from '../components/Button'
import Input from '../components/Input'

function GroupBuzaCreate() {
  return (
    <Wrapper>
      <Title>
        <MoveButton type="button">취소</MoveButton>
        <Text>같이해부자</Text>
        <MoveButton type="button">생성</MoveButton>
      </Title>
      <InputBox margin="24px 16px 16px 16px">
        <IconBox>+ 목표 금액</IconBox>
        <Input placeholder="목표 금액을 입력해주세요." />
      </InputBox>
      <InputBox margin="16px 16px 16px 16px">
        <IconBox>
          <i className="fas fa-smile" />+ 메모
        </IconBox>
        <Input placeholder="메모를 입력해주세요." height="80px" />
      </InputBox>

      <FriendWrapper>
        <Text fontSize="14px">
          ✓ 함께 할 친구 설정 <SmallText>2인 - 4인</SmallText>
        </Text>

        <div>kajsdjas</div>
        <div>askdnlaksn</div>
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
  ${setFlexStyles({
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  })}
  margin-top: 31px;
  margin-bottom: 33px;

  /* position: absolute; */

  /* left: 144px; */
  top: 43px;
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

const MoveButton = styled.button`
  width: 48px;
  height: 48px;
  border: none;
`
// Inputbox
const InputBox = styled.div`
  /* position: absolute; */
  margin: ${(props) => props.margin};
  /* margin: 24px 16px 16px 16px; */
  width: 328px;
  height: 87px;
  /* left: 16px;
  top: 106px; */
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
// const Icon = styled.i``

const FriendWrapper = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  width: 328px;
  height: 378px;
  left: 16px;
  top: 335px;
`

export default GroupBuzaCreate
