import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-calendar/dist/Calendar.css'
import 'react-datepicker/dist/react-datepicker.css'
// import Moment from 'react-moment'
import '../styles/CalendarStyle.css'
import '../styles/Dropdown.css'
import ko from 'date-fns/locale/ko'
import '../styles/SelectStyle.css'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import Nav from '../components/Nav'

registerLocale('ko', ko)

function ExampleCustomInput({ value, onClick }) {
  return (
    <>
      <CalDate>{value}</CalDate>
      <CalBtn
        className="example-custom-input"
        type="button"
        onClick={onClick}
      />
    </>
  )
}

function OnedayPost() {
  const navigate = useNavigate()
  const [selectDate, setSelectDate] = useState(new Date())
  useEffect(() => {
    setValue('date',selectDate)
  },[selectDate])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError,
  } = useForm()
  console.log(watch())
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

  const onValid = (data) => {
          Swal.fire({
            title: '입력 완료!',
            text: '더 열심히 모아부자!',
            icon: 'success',
          }).then((result) => {
            console.log(result)
            navigate('/onedaybuza')
          })
    console.log('옵션', data.option)
    // setError("memo", { message: "Server offline." });
    if (data.option === '-- 항목을 골라부자 --') {
      setError(
        'option',
        { message: '항목을 안 골랐나부자' },
        { shouldFocus: true },
      )
    }
    // setError("extraError", { message: "Server offline." });
  }


  return (
    <Wrapper>
      <TopDiv>
        <Title>입력</Title>
        <TopLine />
      </TopDiv>
      <NavLink to="/onedaybuza">
        <LeftButton />
        <LeftButtonDiv />
      </NavLink>
      <OptionTitle style={{ top: '17.36%' }}>항목 선택</OptionTitle>
      {/* <details style={{ top: '155px', left: '12px' }}>
        <summary>-- 항목을 선택해부자 --</summary>
        <ul>
          <li>수입</li>
          <li>지출</li>
          <li>같이해부자</li>
          <li>도전해부자</li>
        </ul>
      </details> */}
      <form onSubmit={handleSubmit(onValid)}>
        <select
          {...register('option')}
          style={{
            position: 'absolute',
            top: '21.53%',
            left: '16px',
          }}
        >
          <option selected>-- 항목을 골라부자 --</option>
          <option>수입</option>
          <option>지출</option>
          <option>같이해부자</option>
          <option>도전해부자</option>
        </select>
        <ErrorSpan style={{ top: '28%' }}>{errors?.option?.message}</ErrorSpan>

        <OptionTitle style={{ top: '31.67%' }}>날짜 선택</OptionTitle>
        <OptionDiv>
          <DatePicker
            dateFormat="yyyy.MM.dd"
            locale="ko"
            selected={selectDate}
            onChange={(date) => setSelectDate(date)}
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
          />
        </OptionDiv>
        <OptionTitle style={{ top: '45.97%' }}>💰 금액</OptionTitle>
        <Input
          style={{ top: '49%' }}
          placeholder="금액을 입력해주세요"
          {...register('amount', {
            required: '금액을 적어부자',
            pattern: {
              value: /^[0-9]+$/,
              message: '숫자만 써부자',
              shouldFocus: true,
            },
          })}
        />
        <ErrorSpan style={{ top: '56%' }}>{errors?.amount?.message}</ErrorSpan>
        <OptionTitle style={{ top: '61.58%' }}>✏️ 메모</OptionTitle>
        <Input
          style={{ top: '63.79%' }}
          placeholder="메모를 입력해주세요"
          {...register('memo', {
            required: '메모를 적어부자',
            maxLength: {
              value: 12,
              message: '12자 이내로 입력해부자',
              shouldFocus: true,
            },
          })}
        />
        <ErrorSpan style={{ top: '71%' }}>{errors?.memo?.message}</ErrorSpan>
        <RightButton>저장</RightButton>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const CalDiv = styled.div`
  width: 328px;
  height: 87px;
  left: 16px;
`
const CalDate = styled.div`
  margin-left: 16px;
`
const CalBtn = styled.button`
  position: absolute;
  left: 288px;

  top: -6px;
  width: 24px;
  height: 24px;

  background: #c4c4c4;
`
const OptionTitle = styled.div`
  position: absolute;
  width: 53px;
  height: 14px;
  left: 16px;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;

  color: #000000;
`
const OptionDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: 328px;
  height: 52px;
  left: 16px;
  top: 35.83%;

  background: #f5f5f7;
  border-radius: 8px;
`
const OptionRightButton = styled.div`
  position: absolute;
  left: 84.44%;
  right: 8.89%;
  z-index: 1;
  background: #c4c4c4;
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
const TopDiv = styled.div`
  position: absolute;
  width: 360px;
  height: 86px;
  left: 0px;
  top: 0px;
`

const RightButton = styled.button`
  position: absolute;
  width: 26px;
  height: 14px;
  left: 319px;
  top: 46px;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray70 */

  color: #555555;
`

const Title = styled.div`
  position: absolute;
  left: 46.11%;
  right: 45.83%;
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
const Input = styled.input`
  position: absolute;
  width: 328px;
  height: 52px;
  left: 16px;

  border: none;
  background: #f5f5f7;
  border-radius: 8px;
  padding-left: 16px;
  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: -0.04em;
    color: #cccccc;
  }
  :-ms-input-placeholder {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: -0.04em;
    color: #cccccc;
  }
`
const ErrorSpan = styled.span`
  position: absolute;
  width: 104px;
  height: 11px;
  left: 32px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 100%;
  /* identical to box height, or 11px */

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  color: #ff3d00;
`

export default OnedayPost
