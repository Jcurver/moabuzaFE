import React from 'react'
import styled from 'styled-components'
import ProgressBar from '@ramonak/react-progress-bar'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useGroupData } from '../hooks/useGroupData'
import { request } from '../utils/axios'
// import '../styles/SweetAlertButton.css'

function ChallengeBuzaDetail() {
  const navigate = useNavigate()
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

  const AccountData = [
    {
      accountDate: '2022-03-18',
      account: [
        {
          src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
          accountTitle: '룰루랄라1',
          acconutNumber: 10000,
          accountText: '오늘도 힘내부자!',
        },
        {
          src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
          accountTitle: '룰루랄라2',
          acconutNumber: 20000,
          accountText: '내일도 힘내부자!!',
        },
        {
          src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
          accountTitle: '룰루랄라3',
          acconutNumber: 30000,
          accountText: '어제도 힘내부자!!',
        },
      ],
    },
    {
      accountDate: '2022-03-19',
      account: [
        {
          src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
          accountTitle: '룰루랄라1',
          acconutNumber: 10000,
          accountText: '오늘도 힘내부자!',
        },
        {
          src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
          accountTitle: '룰루랄라2',
          acconutNumber: 20000,
          accountText: '내일도 힘내부자!!',
        },
        {
          src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
          accountTitle: '룰루랄라3',
          acconutNumber: 30000,
          accountText: '어제도 힘내부자!!',
        },
      ],
    },
    {
      accountDate: '2022-03-20',
      account: [
        {
          src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
          accountTitle: '룰루랄라1',
          acconutNumber: 10000,
          accountText: '오늘도 힘내부자!',
        },
        {
          src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
          accountTitle: '룰루랄라2',
          acconutNumber: 20000,
          accountText: '내일도 힘내부자!!',
        },
        {
          src: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
          accountTitle: '룰루랄라3',
          acconutNumber: 30000,
          accountText: '어제도 힘내부자!!',
        },
      ],
    },
  ]
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
      console.log(result)
      if (result.isConfirmed) {
        request({
          url: `/money/group/exitgroup/${data.data.id}`,
          method: 'get',
        }).then(
          Swal.fire('포기!', '그룹을 포기했습니다!', 'success'),
          navigate('/groupbuza'),
        )
      }
    })
  }

  console.log('detail------', data)
  // const ampsdnl = AccountData.map((dd, i) => {
  //   return dd.account.map((ddd, idx) => {
  //     return ddd.src
  //   })
  // })
  // console.log(ampsdnl)
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
          <Text>같이해부자</Text>
        </Title>
        <ForgiveMoveButton onClick={cancelGroup}>포기</ForgiveMoveButton>

        <DetailWrapper>
          <DetailTitle>
            {data ? data.data.groupName : '그룹이름이 없습니다'}
          </DetailTitle>
          <DetailTextWrapper>
            <DetailAmount>
              {data ? data.data.groupLeftAmount : '남은게 없네유'}
            </DetailAmount>
            <DetaileText>원 남았어요!</DetaileText>
          </DetailTextWrapper>
          <GroupFriend>
            {FriendData.map((data, idx) => {
              return <GroupFriendIcon src={data.src} />
            })}
          </GroupFriend>
          <DetailCharacter>sdsd</DetailCharacter>
          <ProgressBar
            // completed={data ? data.data.groupNowPercent : 0}
            completed={70}
            animateOnRender="true"
            bgColor="#FFB000"
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
      </ColorWrapper>
      <AccountTitle>내역</AccountTitle>
      <AccountSummaryWrapper>
        {AccountData.map((acd, idx) => {
          return (
            <AccountContent>
              <AccountDate>{acd.accountDate}</AccountDate>
              <AccountListsWrapper>
                {acd.account.map((acd2, idx) => {
                  return (
                    <AccountList>
                      <AccountImg src={acd2.src} />
                      <AccountListCenter>
                        <AccountListTitle>{acd2.accountTitle}</AccountListTitle>
                        <AccountListText>{acd2.accountText}</AccountListText>
                      </AccountListCenter>
                      <AccountNumber>{acd2.acconutNumber} 원</AccountNumber>
                    </AccountList>
                  )
                })}
              </AccountListsWrapper>
            </AccountContent>
          )
        })}
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
  height: 480px;
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
  /* position: absolute; */
  height: 400px;
  top: 483px;
  left: 16px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
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
  width: 48px;
  height: 48px;
  margin-right: 12px;
  /* margin-left: 3px; */
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
