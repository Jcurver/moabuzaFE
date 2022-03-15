import React from 'react'
import styled from 'styled-components'
import ProgressBar from '@ramonak/react-progress-bar'
import Swal from 'sweetalert2'

function GroupBuzaDetail() {
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
      <ColorWrapper>
        <CancleMoveButton>취소</CancleMoveButton>
        <Title>
          <Text>같이해부자</Text>
        </Title>
        <ForgiveMoveButton>포기</ForgiveMoveButton>

        <DetailWrapper>
          <DetailTitle>티끌모아 태산 동전 저금하기!</DetailTitle>
          <DetailTextWrapper>
            <DetailAmount>40,000</DetailAmount>
            <DetaileText>원 남았어요!</DetaileText>
          </DetailTextWrapper>
          <GroupFriend>
            {FriendData.map((data, idx) => {
              return <GroupFriendIcon src={data.src} />
            })}
          </GroupFriend>
          <DetailCharacter>sdsd</DetailCharacter>
          <ProgressBar
            completed={60}
            bgColor="#60666F"
            baseBgColor="#ffffff"
            width="328px"
            height="22px"
            margin="0 auto"
            borderRadius="11px"
            labelAlignment="center"
            labelSize="14px"
          />

          <button
            type="button"
            onClick={() => {
              Swal.fire({
                icon: 'success',
                title: '목표달성!',
                text: '이미 프로 도전러! ',
              })
            }}
          >
            완료버튼
          </button>
        </DetailWrapper>
      </ColorWrapper>
      <AccountSummaryWrapper>
        <AccountTitle>내역</AccountTitle>
        <AccountContent>
          <AccountDate>2022.03.04</AccountDate>
          <AccountListsWrapper>
            <AccountList>
              <AccountImg>ss</AccountImg>
              <AccountListCenter>
                <AccountListTitle>룰루랄라</AccountListTitle>
                <AccountListText>오늘도 힘내부자!</AccountListText>
              </AccountListCenter>
              <AccountNumber>1.0000원</AccountNumber>
            </AccountList>
          </AccountListsWrapper>
        </AccountContent>
      </AccountSummaryWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* background: #f5f5f7; */
`
const ColorWrapper = styled.div`
  background: #e5e5e5;
  /* border: 1px solid black; */
  box-sizing: border-box;
  height: 65%;
`
const Title = styled.div`
  position: absolute;
  width: 72px;
  height: 23px;
  left: 144px;
  top: 43px;
`

const Text = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: ${(props) => props.fontWeight || 500};
  font-size: ${(props) => props.fontSize || '16px'};
  margin-top : ${(props) => props.marginTop}
  line-height: 140%;
`

const CancleMoveButton = styled.button`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 4px;
  top: 31px;
`

const ForgiveMoveButton = styled.button`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 308px;
  top: 31px;
`

const DetailWrapper = styled.div`
  width: 328px;
  height: 23px;

  position: absolute;
  top: 103px;
  left: 15px;
`

const DetailTitle = styled.div`
  width: 328px;
  height: 23px;
  /* Heading / Roboto / H3(B) */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;

  text-align: center;
  margin: 21px 0px 8px 0px;
`

const DetailTextWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`

const DetailAmount = styled.span`
  height: 23px;
  text-align: center;
`

const DetaileText = styled.span`
  height: 16px;
  /* Heading/Noto Sans KR/H5 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;
`

const DetailCharacter = styled.div`
  width: 329px;
  height: 185px;
  border: 1px solid black;
`

const AccountSummaryWrapper = styled.div`
  width: 328px;
  /* border: 1px solid black; */
  margin: 0 auto;
  position: absolute;
  top: 65%;
  left: 16px;
`
const GroupFriend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px;

  margin: 24px 0px;
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

const AccountTitle = styled.div`
  margin: 24px 0px 8px 0px;
`
const AccountContent = styled.div`
  /* border: 1px solid black; */
  width: 328px;
`

const AccountDate = styled.div`
  /* border: 1px solid black; */
  /* Body / Noto Sans KR / P12 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray70 */

  color: #555555;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 8px 0px;
`

const AccountListsWrapper = styled.div`
  /* border: 1px solid black; */
`

const AccountList = styled.div`
  position: relative;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  background: #f5f5f7;
  border-radius: 8px;
  /* border: 1px solid black; */
  width: 328px;
  height: 64px;
  margin-bottom: 8px;
`

const AccountImg = styled.div`
  width: 48px;
  height: 48px;
  border: 0.3px solid black;
  margin-right: 12px;
`

const AccountListCenter = styled.div``

const AccountListTitle = styled.div`
  /* Heading/Noto Sans KR/H6(B) */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;
`

const AccountListText = styled.div`
  /* Body / Noto Sans KR / P12 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray70 */

  color: #555555;
`

const AccountNumber = styled.div`
  /* width: 78px; */
  position: absolute;
  right: 12px;
  height: 28px;
  /* margin: 18px 12px 18px 0px; */
  border: 0.1px solid black;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 6px 12px;
  background: #60666f;
  color: white;
  /* Heading / Roboto / H6(B) */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.04em;
`

export default GroupBuzaDetail
