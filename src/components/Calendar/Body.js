import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Dates from './Dates'

function Body(props) {
  const { totalDate, today, month, year } = props
  const lastDate = totalDate.indexOf(1)
  const firstDate = totalDate.indexOf(1, 7)

  // today
  const findToday = totalDate.indexOf(today)
  const getMonth = new Date().getMonth() + 1

  // eslint-disable-next-line global-require
  const shortid = require('shortid')
  return (
    <Form>
      {totalDate.map((elm, idx) => {
        return (
          <Dates
            key={shortid.generate()}
            idx={idx}
            lastDate={lastDate}
            firstDate={firstDate}
            elm={elm}
            findToday={findToday === idx && month === getMonth && findToday}
            month={month}
            year={year}
          />
        )
      })}
    </Form>
  )
}

const Form = styled.div`
  display: flex;
  flex-flow: row wrap;
`
export default Body
