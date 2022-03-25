/* eslint-disable import/no-dynamic-require */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProgressBar from '@ramonak/react-progress-bar'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import {
  useChallengeData,
  useChallengeMainPageData,
} from '../hooks/useChallengeData'
import { request } from '../utils/axios'
import Loading from './Loading'
import coin from '../assets/icons/coin/ico_coin1.png'
import {
  BunnyFace,
  TanniFace,
  TonkiFace,
  TanniStep02,
} from '../assets/character'

const shortid = require('shortid')

function ChallengeBuzaDetail() {
  const navigate = useNavigate()

  const { data, isLoading } = useChallengeData(navigate)
  const homeData = useChallengeMainPageData(navigate)

  const cancelGroup = (id) => {
    Swal.fire({
      title: '도전포기!',
      text: '진짜 포기하시겠어요?!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '넵 포기!',
      cancelButtonText: '취소!',
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        request({
          url: `/money/challenge/exitchallenge/${data.data.id}`,
          method: 'delete',
        }).then(() => {
          navigate('/challengebuza')
        })
      }
    })
  }
  const dateDescending = (a, b) => {
    const dateA = new Date(a.challengeRecordDate).getTime()
    const dateB = new Date(b.challengeRecordDate).getTime()
    return dateA < dateB ? 1 : -1
  }
  useEffect(() => {}, [navigate])
  if (isLoading) {
    return <Loading />
  }
  if (homeData.isLoading) {
    return <Loading />
  }

  const challengeData = data.data
  console.log(homeData)
  console.log(challengeData)
  return (
    <Wrapper>
      <ColorWrapper>
        <CancleMoveButton
          onClick={() => {
            navigate('/challengebuza')
          }}
        >
          취소
        </CancleMoveButton>
        <Title>
          <Text>도전해부자</Text>
        </Title>
        <ForgiveMoveButton
          onClick={() => {
            cancelGroup()
          }}
        >
          포기
        </ForgiveMoveButton>
      </ColorWrapper>
      <ScrollWrapper>
        <DetailWrapper>
          <DetailTitle>
            {data ? challengeData.challengeName : '도전이름이 없습니다'}
          </DetailTitle>
          <DetailTextWrapper>
            <DetailAmount>
              {homeData
                ? homeData.data.data.challengeNeedAmount.toLocaleString('ko-KR')
                : '남은게 없네유'}
            </DetailAmount>
            <DetaileText> 원 남았어요!</DetaileText>
          </DetailTextWrapper>
          <GroupFriend>
            {challengeData.challengeMembers.map((member) => {
              return (
                <GroupFriendIcon
                  key={shortid.generate()}
                  src={
                    // eslint-disable-next-line no-nested-ternary
                    member.challengeMemberHero === 'tanni'
                      ? TanniFace
                      : // eslint-disable-next-line no-nested-ternary
                      member.challengeMemberHero === 'tonki'
                      ? TonkiFace
                      : member.challengeMemberHero === 'bunny'
                      ? BunnyFace
                      : null
                  }
                />
              )
            })}
          </GroupFriend>
          <DetailImgWrapper>
            <DetailCharacter src={TanniStep02} />
          </DetailImgWrapper>

          <ProgressBar
            completed={homeData ? homeData.data.data.challengePercent : 0}
            // completed={70}
            animateOnRender
            bgColor="#4675F0"
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
                // imageUrl: 'https://unsplash.it/400/200',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
              })
            }}
          >
            완료버튼
          </button>
          {data
            ? data.data.groupNowPercent === 100 && (
                <button
                  type="button"
                  onClick={() => {
                    Swal.fire({
                      icon: 'success',
                      title: '목표달성!',
                      text: '이미 프로 도전러! ',
                      imageUrl: 'https://unsplash.it/400/200',
                      imageWidth: 400,
                      imageHeight: 200,
                      imageAlt: 'Custom image',
                    })
                  }}
                >
                  완료버튼
                </button>
              )
            : null}
        </DetailWrapper>

        <ChallengeFriendWrapper>
          {data
            ? challengeData.challengeMembers.map((member, idx) => {
                return (
                  <ChallengeFriendList key={shortid.generate()}>
                    <ChallengeFriendContents>
                      <ChallengeFriendIcon
                        src={
                          // eslint-disable-next-line no-nested-ternary
                          member.challengeMemberHero === 'tanni'
                            ? TanniFace
                            : // eslint-disable-next-line no-nested-ternary
                            member.challengeMemberHero === 'tonki'
                            ? TonkiFace
                            : member.challengeMemberHero === 'bunny'
                            ? BunnyFace
                            : null
                        }
                      />
                      <ChallengeFriendNickName>
                        {member.challengeMemberNickname}
                      </ChallengeFriendNickName>
                      <ChallengeFriendAmount>
                        {member.challengeMemberLeftAmount.toLocaleString(
                          'ko-KR',
                        )}
                        <span> 원 남았어요!</span>
                      </ChallengeFriendAmount>
                    </ChallengeFriendContents>
                    <ProgressBar
                      completed={member.challengeMemberNowPercent}
                      animateOnRender
                      bgColor="#4675F0"
                      baseBgColor="#ffffff"
                      width="304px"
                      height="20px"
                      margin="0 auto"
                      borderRadius="11px"
                      labelAlignment="center"
                      labelSize="14px"
                    />
                  </ChallengeFriendList>
                )
              })
            : null}
        </ChallengeFriendWrapper>
        <AccountTitle>내역</AccountTitle>
        <AccountSummaryWrapper>
          {data
            ? challengeData.challengeLists
                .sort(dateDescending)
                .map((acd, idx) => {
                  return (
                    <AccountContent key={shortid.generate()}>
                      <AccountDate>
                        {acd.challengeRecordDate.slice(0, 10)}
                      </AccountDate>
                      <AccountListsWrapper>
                        <AccountList>
                          <AccountImg src={coin} />
                          <AccountListCenter>
                            <AccountListTitle>
                              {acd.challengeMemo}
                            </AccountListTitle>
                            {/* <AccountListText>{acd.accountText}</AccountListText> */}
                          </AccountListCenter>
                          <AccountNumber>
                            {acd.challengeAmount.toLocaleString('ko-KR')} 원
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
const ColorWrapper = styled.div`
  background: #ebf2ff;
  box-sizing: border-box;
  height: 79px;
`
const Title = styled.div`
  position: absolute;
  width: 72px;
  height: 23px;
  left: 144px;
  top: 43px;
  background-color: #ebf2ff;
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
  background-color: #ebf2ff;
`

const ForgiveMoveButton = styled.button`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 308px;
  top: 31px;
  background-color: #ebf2ff;
  color: #4675f0;
`

const DetailWrapper = styled.div`
  width: 360px;
  background-color: #ebf2ff;
  text-align: center;
`

const DetailTitle = styled.div`
  width: 328px;
  /* height: 23px; */
  /* Heading / Roboto / H3(B) */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: -0.04em;
  margin: 0 auto;
  /* color / text / Color-text-Black */
  background-color: #ebf2ff;

  color: #000000;

  text-align: center;
  /* margin: 21px 0px 8px 0px; */
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
const DetailImgWrapper = styled.div`
  text-align: center;
`
const DetailCharacter = styled.img`
  width: 287px;
  height: 168px;
  margin: 0px auto 28px auto;

  /* border: 1px solid black; */
`
// Scroll
const ScrollWrapper = styled.div`
  height: 630px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`

// ChallengeFriend
const ChallengeFriendWrapper = styled.div`
  width: 328px;
  margin: 16px auto;
`

const ChallengeFriendList = styled.div`
  width: 328px;
  height: 92px;
  margin-bottom: 8px;

  /* color / gray / Gray10 */

  background: #f2f2f2;
  border-radius: 8px;
`
const ChallengeFriendContents = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`
const ChallengeFriendIcon = styled.img`
  width: 36px;
  height: 36px;
  margin: 12px 8px 12px 12px;
  border-radius: 50%;
`

const ChallengeFriendNickName = styled.span`
  height: 14px;
`

const ChallengeFriendAmount = styled.span`
  position: absolute;
  right: 12px;
  height: 16px;
  /* margin-right: 12px; */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 2px;
`
// Account Summary
const AccountSummaryWrapper = styled.div`
  width: 328px;
  /* border: 1px solid black; */
  margin: 0 auto;
  /* position: absolute; */
  height: 400px;
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
  /* position: static; */
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
  /* overflow: scroll; */
  /* height: 1000px; */
`

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
  /* width: 78px; */
  position: absolute;
  right: 12px;
  height: 28px;
  /* margin: 18px 12px 18px 0px; */
  /* border: 0.1px solid black; */
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 6px 12px;
  background: #4675f0;
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

export default ChallengeBuzaDetail
