import * as React from 'react'
import styled from 'styled-components'
import FullCalendar, { EventInput, EventContentArg } from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'

import SaveDialog from '../components/SaveDialog'

import AddEvent from '../components/AddEvent'

const data = [
  {
    title: 'Rent is Due',
    start: '2022-03-04',
    amount: 1000,
  },
  {
    title: 'Rent is Due',
    start: '2022-03-07',
    amount: 2000,
  },
]
function Calendar() {
  const [openSave, setOpenSave] = React.useState(false)
  const [date, setDate] = React.useState(new Date())
  const [show, setShow] = React.useState(false)

  //   let clicks = 0
  //   let timer = setTimeout(() => {}, 500)
  //   let dateClicked = ''
  //   const reset = () => {
  //     clicks = 0
  //     clearTimeout(timer)
  //     dateClicked = ''
  //   }
  const handleDateClick = (e) => {
    saveRecord(e.date)
    // clicks += 1
    // if (clicks === 1) {
    //   dateClicked = e.dateStr
    //   timer = setTimeout(() => {
    //     // alert(`you single clicked on ${e.dateStr}`)
    //     setShow(true)
    //     reset()
    //   }, 100)
    // } else {
    //   if (dateClicked === e.dateStr) {
    //     setShow(true)
    //   }
    //   console.log('hello')
    // }
  }

  //   const getevents = (fetchInfo, callback) => {
  //     retrieveData(fetchInfo.start, fetchInfo.end, callback)
  //   }

  //   const retrieveData = async (from, to, callback) => {
  //     try {
  //       const filteredData = await getDocs(collection(fs, 'revenue'))
  //       filteredData
  //         .forEach((doc) => {
  //           console.log(`${doc.id} => ${doc.data().date_paid.startAt(from)}`)
  //         })
  //         .collection('revenue')
  //         .orderBy('date_paid')
  //         .startAt(from)
  //         .endAt()
  //         .get()

  //       callback(
  //         filteredData.docs.map((doc) => {
  //           return {
  //             start: doc.data().date_paid.toDate(),
  //             title: `${doc.data().customer}:$${doc.data().amount}`,
  //             allDay: true,
  //           }
  //         }),
  //       )
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  const injectionCellcontent = (args) => {
    return (
      <div>
        <button type="button" onClick={() => saveRecord(args.date)}>
          {args.dayNumberText}
        </button>
      </div>
    )
  }
  const saveRecord = (date) => {
    setOpenSave(true)
    setDate(date)
  }

  //   React.useEffect(() => {
  //     renderEvent()
  //   }, [])
  const renderEvent = (e) => {
    return (
      <>
        {' '}
        <span>{e.event.title}asdasd</span>
        <span>{e.event.amount}asdasda</span>
      </>
    )
  }
  return (
    <Wrapper>
      <div>calendar</div>
      <div>
        {show && <SaveDialog />}
        <FullCalendar
          locale="ko"
          eventContent={renderEvent}
          events={data}
          plugins={[daygridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          //   dayCellContent={injectionCellcontent}
        />
        <SaveDialog open={openSave} onClose={setOpenSave} date={date} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 414px;
  width: 100%;
  margin-top: 24px;
  /* margin-bottom: ${({ marginBottom }) => marginBottom || '12px'}; */
  height: 640px;
  text-align: center;
  /* justify-content: space-around; */
  border: 1px solid black;

  /* padding: 0 3%; */
  & svg {
    cursor: pointer;
  }
`
export default Calendar
