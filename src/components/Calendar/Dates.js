import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Modal from './Modal'

function Dates(props) {
  const { lastDate, firstDate, elm, findToday, month, year, idx, holiday } =
    props

  const [userInput, setUserInput] = useState({})
  const [evtList, setEvtList] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const dateKey = `${month} ${elm}`
  const registEvent = (value) => {
    setEvtList([...evtList, value])
    setUserInput('')
    setOpenModal(false)
  }

  return (
    <Form
      onClick={() => {
        setOpenModal(true)
      }}
    >
      <DateNum
        idx={idx}
        lastDate={lastDate}
        firstDate={firstDate}
        findToday={findToday}
      >
        <TodayCSS findToday={findToday}>{elm}</TodayCSS>일
      </DateNum>
      {openModal && (
        <Modal
          elm={elm}
          month={month}
          year={year}
          registEvent={registEvent}
          setOpenModal={setOpenModal}
          openModal={openModal}
          userInput={userInput}
          setUserInput={setUserInput}
        />
      )}

      {Boolean(evtList[0]) && (
        <Lists>
          {evtList.map((list, index) => {
            return (
              list.slice(0, list.indexOf('_')) === dateKey && (
                <List
                  key={list + dateKey}
                  onClick={() => {
                    setOpenModal(true)
                  }}
                >
                  {list.slice(list.indexOf('_') + 1, list.length)}
                </List>
              )
            )
          })}
        </Lists>
      )}
    </Form>
  )
}
const Form = styled.li`
  position: relative;
  padding: 0 0.6vw;
  width: calc(100% / 7);
  height: 80px;
  text-align: right;
  border-bottom: 1px solid #e4e3e6;
  border-left: 1px solid #e4e3e6;
  :nth-child(7n + 1) {
    color: red;
    background-color: #f5f5f5;
  }
  :nth-child(7n) {
    color: blue;
    background-color: #f5f5f5;
  }
`

const DateNum = styled.div`
  padding: 1vw 0.9vw 0 0;
  ${(props) => props.idx < props.lastDate && `color: #969696;`};
  ${(props) =>
    props.firstDate > 0 &&
    props.idx > props.firstDate - 1 &&
    `
    color: #969696;
  `};
`

const TodayCSS = styled.span`
  ${(props) =>
    props.findToday &&
    ` position: relative;
    padding: .5vw;
    border-radius: 50%;
    font-size: 1.2vw;
    font-weight: 700;
    color: #FFFFFF;
    background-color:red
 `}
`

const Lists = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`
const List = styled.span`
  margin-top: 100px;
  padding-left: 100px;
  background-color: #f7ced9;
  border-radius: 5px;
`
const Holidays = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`
const Holiday = styled.div`
  margin-top: 0.3vw;
  padding-left: 0.5vw;
  color: red;
  font-weight: 700;
  background-color: skyblue;
  border-radius: 5px;
`

export default Dates
