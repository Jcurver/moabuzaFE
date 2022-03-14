import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-calendar/dist/Calendar.css'
import 'react-datepicker/dist/react-datepicker.css'
// import Moment from 'react-moment'
import '../styles/CalendarStyle.css'
import ko from 'date-fns/locale/ko'
import Nav from '../components/Nav'

registerLocale('ko', ko)

function ExampleCustomInput({ value, onClick }) {
  return (
    <CalBtn className="example-custom-input" type="button" onClick={onClick}>
      {value}
    </CalBtn>
  )
}
function OnedayBuza() {
  const [startDate, setStartDate] = useState(new Date())
  // 월/일
  const getFormattedDate = (date) => {
    const month = date.toLocaleDateString('ko-KR', { month: 'long' })
    const day = date.toLocaleDateString('ko-KR', { day: 'numeric' })
    return `${month.substr(0, month.length - 1)}/${day.substr(
      0,
      day.length - 1,
    )}`
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
        <NavLink to="/onedaypost">
          <RightButtonDiv />
          <RightButton />
        </NavLink>
      </TopDiv>
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
          onChange={(date) => setStartDate(date)}
          customInput={<ExampleCustomInput />}
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
          //     : getDayName(createDate(date)) === '일'
          //     ? 'sunday'
          //     : undefined
          // }
        />
      </CalDiv>
      <CalendarLine />
      <TodayListTitle>내역</TodayListTitle>
      <TodayListDiv>
        <TodayListLine>
          <TodayListLineTitle>지출</TodayListLineTitle>
          <TodayListLineMemo>오늘도 힘내부자</TodayListLineMemo>

          <TodayListLineRight>-10,000원</TodayListLineRight>
        </TodayListLine>
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
  right: 85.56%;
  top: 3.75%;
  bottom: 90.05%;
`
const LeftButton = styled.div`
  position: absolute;
  left: 4.44%;
  right: 88.89%;
  top: 5.3%;
  bottom: 91.6%;
  background: #c4c4c4;
`
const RightButtonDiv = styled.div`
  position: absolute;
  left: 85.56%;
  right: 1.11%;
  top: 33.72%;
  bottom: 10.47%;

  background: rgba(196, 196, 196, 0.3);
`

const RightButton = styled.div`
  position: absolute;
  left: 88.89%;
  right: 4.44%;
  top: 47.67%;
  bottom: 24.42%;
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
  display: flex;
  align-items: center;
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
const CalDiv = styled.div`
  position: absolute;
  width: 97px;
  height: 23px;
  left: 132px;
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
const TodayListTitle = styled.div`
  position: absolute;
  width: 26px;
  height: 14px;
  left: 16px;
  top: 468px;

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
const TodayListDiv = styled.div`
position:relative;
width: 100%;
top:490px;

`
const TodayListLine = styled.div`
  position: relative;
  width: 328px;
  height: 64px;
  left: 16px;
  top: 8px;

  /* color/Btn-basic1 */

  background: #e5eaf2;
  border-radius: 8px;
`
const TodayListLineLeft = styled.div``
const TodayListLineRight = styled.div``
const TodayListLineTitle = styled.div`
  position: absolute;
  width: 26px;
  height: 14px;
  left: 28px;
  top: 514px;

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
const TodayListLineMemo = styled.div``

export default OnedayBuza
