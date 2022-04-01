/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProgressBar from '@ramonak/react-progress-bar'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useGroupData } from '../apis/groupData'
import { request } from '../utils/axios'
import { ReactComponent as Backarr } from '../assets/icons/arrow/backarr.svg'
import coin from '../assets/icons/coin/ico_coin1.png'
import {
  BunnyFace,
  TanniFace,
  TongkiFace,
  TanniStep02,
  BunnyStep03,
  AllCharacters01,
  AllCharacters02,
  AllCharacters03,
} from '../assets/character'
// import '../styles/SweetAlertButton.css'

const shortid = require('shortid')

function GroupBuzaDetail() {
  const navigate = useNavigate()
  const [sortedData, setsortedData] = useState([])
  const { data } = useGroupData(navigate)
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
      console.log(data.data.id)
      if (result.isConfirmed) {
        request({
          url: `/group/doing`,
          method: 'post',
     
        }).then(() => {
          navigate('/groupbuza')
        })
      }
    })
  }

  console.log(data)
  const dateDescending = (a, b) => {
    const dateA = new Date(a.groupDate).getTime()
    const dateB = new Date(b.groupDate).getTime()
    return dateA < dateB ? 1 : -1
  }

  useEffect(() => {
    const sortDate = () => {
      return request({
        url: `/money/group`,
        method: 'get',
      }).then((res) => {
        setsortedData([...res.data.groupLists])
      })
    }
    sortDate()
  }, [])

  return (
    <Wrapper>
      <ColorWrapper>
        <CancleMoveButton
          onClick={() => {
            navigate('/groupbuza')
          }}
        >
          <Backarr />
        </CancleMoveButton>
        <Title>
          <Text>같이해부자</Text>
        </Title>
        <ForgiveMoveButton onClick={cancelGroup}>포기</ForgiveMoveButton>
      </ColorWrapper>
      <ScrollWrapper>
        <DetailWrapper>
          <DetailTitle>
            {data ? data.data.groupName : '그룹이름이 없습니다'}
          </DetailTitle>
          <DetailTextWrapper>
            <DetailAmount>
              {data
                ? data.data.groupLeftAmount.toLocaleString('ko-KR')
                : '남은게 없네유'}
            </DetailAmount>
            <DetaileText> 원 남았어요!</DetaileText>
          </DetailTextWrapper>
          <GroupFriend>
            {data
              ? data.data.groupMembers.map((data, idx) => {
                  return (
                    <GroupFriendIcon
                      key={shortid.generate()}
                      src={
                        data.groupMemberHero === 'tanni'
                          ? TanniFace
                          : data.groupMemberHero === 'tongki'
                          ? TongkiFace
                          : data.groupMemberHero === 'bunny'
                          ? BunnyFace
                          : null
                      }
                    />
                  )
                })
              : null}
          </GroupFriend>
          <DetailCharacter
            src={
              data.data.groupNowPercent <= 20
                ? AllCharacters01
                : data.data.groupNowPercent > 20
                ? AllCharacters02
                : data.data.groupNowPercent > 60
                ? AllCharacters03
                : null
            }
          />
          <ProgressBar
            completed={data ? data.data.groupNowPercent : 0}
            // completed={70}
            animateOnRender
            bgColor="#4675F0"
            baseBgColor="#ffffff"
            width="328px"
            height="22px"
            margin="0 auto"
            borderRadius="11px"
            labelAlignment={
              data && data.data.groupNowPercent > 9 ? 'center' : 'left'
            }
            labelSize="14px"
          />
        </DetailWrapper>

        <AccountTitle>내역</AccountTitle>
        <AccountSummaryWrapper>
          {data
            ? sortedData.sort(dateDescending).map((acd, idx) => {
                return (
                  <AccountContent key={shortid.generate()}>
                    <AccountDate>{acd.groupDate.slice(0, 10)}</AccountDate>
                    <AccountListsWrapper>
                      <AccountList>
                        <AccountImg src={coin} />
                        <AccountListCenter>
                          <AccountListTitle>{acd.nickname}</AccountListTitle>
                          <AccountListText>{acd.groupMemo}</AccountListText>
                        </AccountListCenter>
                        <AccountNumber>
                          {acd.groupAmount.toLocaleString('ko-KR')} 원
                        </AccountNumber>
                      </AccountList>
                    </AccountListsWrapper>
                  </AccountContent>
                )
              })
            : null}
        </AccountSummaryWrapper>
      </ScrollWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const ScrollWrapper = styled.div`
  height: 650px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`
const ColorWrapper = styled.div`
  background: #f6f9fe;
  box-sizing: border-box;
  height: 79px;
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
  margin-top: ${(props) => props.marginTop};
  line-height: 140%;
`

const CancleMoveButton = styled.button`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 4px;
  top: 31px;
  background-color: #f6f9fe;
  cursor: pointer;
`

const ForgiveMoveButton = styled.button`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 308px;
  top: 31px;
  color: #4675f0;
  background-color: #f6f9fe;
  cursor: pointer;
`

const DetailWrapper = styled.div`
  width: 360px;
  background-color: #f6f9fe;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 24px;
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
  margin: 0px 0px 8px 0px;
`

const DetailTextWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`

const DetailAmount = styled.span`
  height: 23px;
  text-align: center;
  color: #4675f0;
  /* Heading / Roboto / H3(B) */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: -0.04em;
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

const DetailCharacter = styled.img`
  width: 329px;
  height: 185px;
  margin: 0px auto 28px auto;
  /* border: 1px solid black; */
`

const AccountSummaryWrapper = styled.div`
  width: 328px;
  margin: 0 auto;
  height: 250px;
  top: 483px;
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
  width: 32px;
  height: 32px;

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
  margin: 24px 0px 8px 16px;
`
const AccountContent = styled.div`
  width: 328px;
`

const AccountDate = styled.div`
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

const AccountListsWrapper = styled.div``

const AccountList = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #f5f5f7;
  border-radius: 8px;
  width: 328px;
  height: 64px;
  margin-bottom: 8px;
`

const AccountImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  margin-left: 12px;
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
  position: absolute;
  right: 12px;
  height: 28px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 6px 12px;
  background: #ffb000;
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
