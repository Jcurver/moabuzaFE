import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import DatePicker, { registerLocale } from 'react-datepicker'

import 'react-calendar/dist/Calendar.css'
import 'react-datepicker/dist/react-datepicker.css'
// import Moment from 'react-moment'
import '../styles/CalendarStyle.css'
import ko from 'date-fns/locale/ko'
import { useMutation } from 'react-query'
import {
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list'
import useRecoilState from 'recoil'
import { setFlexStyles } from '../styles/Mixin'
import { selectDate } from '../recoil/todayState'
import { request } from '../utils/axios'
import Nav from '../components/Nav'
import '@sandstreamdev/react-swipeable-list/dist/styles.css'
import { getDate } from '../hooks/getDate'
import { getItem, setItem } from '../utils/sessionStorage';
// import { setDateInOnedayList } from '../hooks/useUserData';
import { nowDate } from '../hooks/nowDate'

registerLocale('ko', ko)

function ExampleCustomInput({ value, onClick }) {
  return (
    <CalBtn className="example-custom-input" type="button" onClick={onClick}>
      {value}
    </CalBtn>
  )
}

function OnedayBuza() {
  const navigate = useNavigate()


  
  const [startDate, setStartDate] = useState(new Date(nowDate()))
  function setDateMutate(date) {

    const newdate = getDate(date)
    setItem('nowdate', date)
    // console.log("date",date)
    setStartDate(date)
    // console.log('newdate:', newdate)
    mutation.mutate(newdate)
  }
  

  const mutation = useMutation((date) => {
    return request({
      url: '/money/dayList',
      method: 'post',
      data: { recordDate: date },
    })
  })
  
  useEffect(() => {
    const selectDate = getDate(startDate)
    // setDaylist(mutation?.data?.data?.dayRecordList)

    mutation.mutate(selectDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate])

  const getFormattedDate = (date) => {
    const month = date.toLocaleDateString('ko-KR', { month: 'long' })
    const day = date.toLocaleDateString('ko-KR', { day: 'numeric' })
    return `${month.substr(0, month.length - 1)}/${day.substr(
      0,
      day.length - 1,
    )}`
  }
  const removeTodayList = (id) => {
    // const d = mutation.data.data.dayRecordList.findIndex((a) => a.id === id)
    // console.log('mmm', mutation.data.data.dayRecordList, d)
    // // console.log("idx::",d)
    // setDaylist([
    //   ...mutation.data.data.dayRecordList.silce(0, d),
    //   ...mutation.data.data.dayRecordList.silce(d + 1),
    // ])

    return request({
      url: `/money/dayList/delete/${id}`,
      method: 'delete',
      data: {},
    }).then(navigate(0))
  }
  const getDayName = (date) => {
    return date.toLocaleDateString('ko-KR', { weekday: 'long' }).substr(0, 1)
  }
  const createDate = (date) => {
    return new Date(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
    )
  }

  return (
    <Wrapper>
      <TopDiv>
        <Title>하루부자</Title>
      </TopDiv>
      <NavLink to="/onedaypost">
        <RightButtonDiv />
        <RightButton />
      </NavLink>
      <NavLink to="/">
        <LeftButtonDiv />
        <LeftButton />
      </NavLink>
      <TopLine />
      <CalDiv>
        <DatePicker
          dateFormat="yyyy.MM.dd"
          locale="ko"
          selected={startDate}
          onChange={(date) => setDateMutate(date)}
          customInput={<ExampleCustomInput />}
          maxDate={new Date()}
          // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
          popperModifiers={{ preventOverflow: { enabled: true } }}
          popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록
          dayClassName={(date) => {
            if (getDayName(createDate(date)) === '토') {
              return 'saturday'
            }
            if (getDayName(createDate(date)) === '일') {
              return 'sunday'
            }
            return null
          }}
        />
      </CalDiv>
      <CalendarLine />
      <TotalLine style={{ top: '23.89%' }}>
        <TotalLeft>수입</TotalLeft>
        <TotalRight>
          + {mutation?.data?.data?.dayIncomeAmount.toLocaleString('en-US')} 원
        </TotalRight>
      </TotalLine>
      <TotalLine style={{ top: '28.61%' }}>
        <TotalLeft>지출</TotalLeft>
        <TotalRight>
          - {mutation?.data?.data?.dayExpenseAmount.toLocaleString('en-US')} 원
        </TotalRight>
      </TotalLine>
      <MidLine />
      <TotalLine style={{ top: '36.25%' }}>
        <TotalLeft>같이해부자</TotalLeft>
        <TotalRight>
          + {mutation?.data?.data?.dayGroupAmount.toLocaleString('en-US')} 원
        </TotalRight>
      </TotalLine>
      <TotalLine style={{ top: '40.97%' }}>
        <TotalLeft>도전해부자</TotalLeft>
        <TotalRight>
          + {mutation?.data?.data?.dayChallengeAmount.toLocaleString('en-US')}{' '}
          원
        </TotalRight>
      </TotalLine>
      <BottomLine />
      <TodayListTitle>전체 내역</TodayListTitle>
      <TodayListDiv>
        <SwipeableList threshold={0.7}>
          {mutation &&
            mutation?.data?.data?.dayRecordList.map((d) => (
              <SwipeableListItem
                key={d.id}
                swipeLeft={{
                  content: (
                    <div style={{ marginLeft: '10px', marginBottom: '10px' }}>
                      밀어서 삭제
                    </div>
                  ),
                  action: () => {
                    removeTodayList(d.id)
                  },
                }}
              >
                <TodayListLine key={d.id}>
                  <TodayListLineLeft>
                    <TodayListLineTitle>
                      {d.recordType === 'income' ? '수입' : ''}
                      {d.recordType === 'expense' ? '지출' : ''}
                      {d.recordType === 'group' ? '같이해부자' : ''}
                      {d.recordType === 'challenge' ? '도전해부자' : ''}
                    </TodayListLineTitle>
                    <TodayListLineMemo>{d.memos}</TodayListLineMemo>
                  </TodayListLineLeft>
                  <TodayListLineRight>
                    {d.recordType === 'income' ? '+' : ''}
                    {d.recordType === 'expense' ? '-' : ''}
                    {d.recordType === 'group' ? '👬' : ''}
                    {d.recordType === 'challenge' ? '👬' : ''}{' '}
                    {d.recordAmount.toLocaleString('en-US')} 원
                  </TodayListLineRight>
                </TodayListLine>
              </SwipeableListItem>
            ))}
        </SwipeableList>
      </TodayListDiv>
      <Nav />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const TopDiv = styled.div`
  position: absolute;
  width: 360px;
  height: 86px;
  left: 0px;
  top: 0px;
`
const LeftButtonDiv = styled.div`
  position: absolute;
  left: 1.11%;
  top: 3.75%;
  width: 48px;
  height: 48px;
  background: rgba(196, 196, 196, 0.3);
`
const LeftButton = styled.div`
  position: absolute;
  left: 4.44%;

  top: 5.3%;
  width: 24px;
  height: 24px;

  background: #c4c4c4;
`
const RightButtonDiv = styled.div`
  position: absolute;
  left: 85.56%;

  top: 4.03%;
  width: 48px;
  height: 48px;

  background: rgba(196, 196, 196, 0.3);
`

const RightButton = styled.div`
  position: absolute;
  left: 88.89%;

  top: 5.69%;
  width: 24px;
  height: 24px;

  background: #c4c4c4;
`

const Title = styled.div`
  position: absolute;
  left: 42.22%;
  right: 41.94%;
  top: 50%;
  bottom: 23.26%;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;

  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  text-align: center;
  letter-spacing: -0.04em;

  color: #000000;
`
const TopLine = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 98.84%;
  bottom: 0%;

  /* color/Btn-basic2 */

  background: #f5f5f7;
`
const MidLine = styled.hr`
  position: absolute;
  width: 325px;
  height: 1px;
  left: 19px;
  top: 33.33%;

  /* color / gray / Gray50 */

  border: 0.5px solid #999999;
  box-sizing: border-box;
`
const BottomLine = styled.hr`
  position: absolute;
  width: 325px;
  height: 1px;
  left: 19px;
  top: 45.69%;

  /* color / gray / Gray50 */

  border: 0.5px dashed #999999;
  box-sizing: border-box;
`
const CalDiv = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  position: absolute;
  width: 120px;
  height: 23px;
  left: 120px;
  top: 15.7%;
`
const CalBtn = styled.button`
  /* position: absolute;
  width: 97px;
  height: 23px;
  left: 132px;
  top: 113px; */
  /* Heading / Roboto / H3(B) */
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  letter-spacing: -0.04em;
  margin: 0 auto;
  color: #000000;
`
const CalendarLine = styled.hr`
  position: absolute;
  width: 325px;
  height: 1px;
  left: 19px;
  top: 20.97%;
  background-color: #999999;
  /* color / gray / Gray50 */
  border: 1px solid #999999;
  box-sizing: border-box;
`
const TotalLine = styled.div`
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'space-between',
  })}
  position: absolute;
  width: 324px;
  height: 14px;
  left: 18px;
`
const TotalLeft = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;
  /* color / gray / Gray70 */
  color: #555555;
`
const TotalRight = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */
  text-align: right;
  letter-spacing: -0.04em;
  /* color / text / Color-text-Black */
  color: #000000;
`
const TodayListTitle = styled.div`
  position: absolute;
  width: 53px;
  height: 14px;
  left: 16px;
  top: 56.39%;
  /* Heading/Noto Sans KR/H6(B) */
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;

  /* color / text / Color-text-Black */
  color: #000000;
`
const TodayListDiv = styled.div`
  position: relative;
  width: 100%;
  height: 28%;
  top: 60.56%;
  padding: 0 16px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
const TodayListLine = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  padding: 12px;
  position: relative;
  width: 328px;
  height: 31.75%;

  /* color/Btn-basic1 */
  background: #e5eaf2;
  border-radius: 8px;
  margin-bottom: 8px;
`
const TodayListLineLeft = styled.div``
const TodayListLineRight = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
  padding: 6px 12px;
  white-space: nowrap;
  /* position: absolute; */
  width: 92px;
  height: 28px;

  /* color / text / Color-text-Gray3 */
  background: #60666f;
  border-radius: 25px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.04em;

  /* Rectangle 173 */
  color: #ffffff;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
`
const TodayListLineTitle = styled.div`
  /* Heading/Noto Sans KR/H6(B) */
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */
  padding-bottom: 4px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;
  /* color / text / Color-text-Black */
  color: #000000;
`
const TodayListLineMemo = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;
  /* color / gray / Gray70 */
  color: #555555;
`

export default OnedayBuza
