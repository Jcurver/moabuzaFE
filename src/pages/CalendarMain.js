import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Head from '../components/Calendar/Head'
import Body from '../components/Calendar/Body'
import Button from '../components/Button'

function CalendarMain() {
  const DATE = new Date()
  const YEAR = DATE.getFullYear()
  const MONTH = DATE.getMonth() + 1

  const [month, setMonth] = useState(MONTH)
  const [year, setYear] = useState(YEAR)
  const [totalDate, setTotalDate] = useState([])

  const changeDate = (month) => {
    // 이전 날짜
    const PVLastDate = new Date(YEAR, month - 1, 0).getDate()
    const PVLastDay = new Date(YEAR, month - 1, 0).getDay()
    // 다음 날짜
    const ThisLasyDay = new Date(YEAR, month, 0).getDay()
    const ThisLasyDate = new Date(YEAR, month, 0).getDate()

    // 이전 날짜 만들기
    const PVLD = []
    if (PVLastDay !== 6) {
      for (let i = 0; i < PVLastDay + 1; i += 1) {
        PVLD.unshift(PVLastDate - i)
      }
    }
    // 다음 날짜 만들기
    const TLD = []
    for (let i = 1; i < 7 - ThisLasyDay; i += 1) {
      if (i === 0) {
        return TLD
      }
      TLD.push(i)
    }

    // 현재날짜
    let TD = []

    TD = [...Array(ThisLasyDate + 1).keys()].slice(1)

    return PVLD.concat(TD, TLD)
  }

  useEffect(() => {
    setTotalDate(changeDate(7))
    setTotalDate(changeDate(month))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month])

  const [today, setToday] = useState(0)

  const goToday = () => {
    const TODAY = new Date().getDate()
    const goMonth = new Date().getMonth() + 1
    setMonth(goMonth)
    setToday(TODAY)
  }

  return (
    <Wrapper>
      <Head year={year} month={month} setMonth={setMonth} goToday={goToday} />
      <Body totalDate={totalDate} today={today} month={month} year={year} />
      <Button>button</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export default CalendarMain
