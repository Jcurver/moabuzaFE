import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-calendar/dist/Calendar.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/CalendarStyle.css'
import '../styles/Dropdown.css'
import ko from 'date-fns/locale/ko'
import '../styles/SelectStyle.css'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useMainPageData } from '../apis/mainpageData'
import { setFlexStyles } from '../styles/Mixin'
import { getDate } from '../hooks/getDate'
import { getItem, setItem } from '../utils/sessionStorage'

import { ReactComponent as Rightarr } from '../assets/icons/arrow/rightarr.svg'

import Nav from '../components/Nav'
import { request } from '../utils/axios'

import Loading from './Loading'
import TitleText from '../components/Header/TitleText'
import RightButton from '../components/Header/RightButton'

registerLocale('ko', ko)

function ExampleCustomInput({ value, onClick }) {
  return (
    <>
      <CalDate>{value}</CalDate>
      <CalBtn className="example-custom-input" type="button" onClick={onClick}>
        <Rightarr style={{ transform: 'rotate(90deg)' }} />
      </CalBtn>
    </>
  )
}

function OnedayPost() {
  const textInput = useRef()
  const navigate = useNavigate()
  const { data, isLoading } = useMainPageData(navigate)

  const [selectDate, setSelectDate] = useState(new Date(getItem('nowdate')))
  function setSelectDateValue(date) {
    setSelectDate(date)
    setItem('nowdate', date)
    setValue('date', textInput.current.state.preSelection)
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError,
  } = useForm()

  const handleChange = (e) => {}

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
    if (data.option === '0') {
      setError(
        'option',
        { message: '항목을 안 골랐나부자' },
        { shouldFocus: true },
      )
    } else {
      return request({
        url: '/daylist/record',
        method: 'post',
        data: {
          recordType: data.option,
          recordDate: getDate(selectDate),
          memos: data.memo,
          recordAmount: parseInt(data.amount, 10),
        },
      })
        .then((res) => {
          if (res.data.complete) {
            Swal.fire({
              title: '목표 완료!',
              text: '다시 한번 해부자!',
              confirmButtonText: '확인!',
              imageUrl:
                'https://user-images.githubusercontent.com/66179677/160414132-24f69bd6-0b83-4f14-b69c-ab29f79f6450.svg',
            }).then(() => {
              navigate('/')
            })
          } else {
            Swal.fire({
              title: '입력 완료!',
              text: '더 힘차게 모아부자!',
              confirmButtonText: '확인!',
            }).then(() => {
              navigate('/onedaybuza')
            })
          }
        })
        .catch((error) => {
          console.log('에러저장', error.response)
          Swal.fire({
            title: '금액 부족!',
            text: '지갑에 돈이 부족해요ㅠㅠ',
            confirmButtonText: '확인!',
          })
        })
    }
    return null
  }
  if (isLoading) {
    return <Loading />
  }
  const homeData = data.data

  return (
    <Wrapper>
      <TitleText>입력</TitleText>

      <Rightarr
        onClick={() => navigate('/onedaybuza')}
        style={{
          position: 'absolute',
          transform: 'rotate(180deg)',
          width: '48px',
          height: '48px',
          left: '1.11%',
          top: '4.305%',
        }}
      />

      <form onSubmit={handleSubmit(onValid)}>
        <RightButton>
          <RightBtn>저장</RightBtn>
        </RightButton>
        <OptionTitle style={{ top: '125px' }}>항목 선택</OptionTitle>
        <SelectDiv>
          <Select
            onChange={handleChange}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('option')}
          >
            <option value="0">-- 항목을 골라부자 --</option>
            <option value="income">수입</option>
            <option value="expense">지출</option>
            {homeData.groupName ? (
              <option value="group">같이해부자</option>
            ) : null}
            {homeData.challengeName ? (
              <option value="challenge">도전해부자</option>
            ) : null}
          </Select>
          <Rightarr
            style={{
              transform: 'rotate(90deg)',
            }}
          />
        </SelectDiv>
        <ErrorSpan style={{ top: '201.6px' }}>
          {errors?.option?.message}
        </ErrorSpan>

        <OptionTitle style={{ top: '228px' }}>날짜 선택</OptionTitle>
        <OptionDiv>
          <DatePicker
            ref={textInput}
            name="dp"
            dateFormat="yyyy.MM.dd"
            locale="ko"
            selected={selectDate}
            onChange={(date) => setSelectDateValue(date)}
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
        <OptionTitle style={{ top: '331px' }}>💰 금액</OptionTitle>
        <Input
          style={{ top: '367.2px' }}
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
        <ErrorSpan style={{ top: '424.8px' }}>
          {errors?.amount?.message}
        </ErrorSpan>
        <OptionTitle style={{ top: '446.4px' }}>✏️ 메모</OptionTitle>
        <Input
          style={{ top: '482.4px' }}
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
        <ErrorSpan style={{ top: '540.7px' }}>
          {errors?.memo?.message}
        </ErrorSpan>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100%;
`

const CalDate = styled.div`
  margin-left: 16px;
`
const CalBtn = styled.div`
  position: absolute;
  right: 19px;

  top: -6px;
  width: 24px;
  height: 24px;
  background-color: inherit;
`
const SelectDiv = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  position: absolute;
  width: 91.1%;
  height: 52px;
  left: 4.44%;
  top: 155px;
  background: #f5f5f7;
  border-radius: 8px;
  padding-left: 8px;
  padding-right: 18px;
`
const OptionTitle = styled.div`
  position: absolute;
  width: 53px;
  height: 14px;
  left: 4.44%;

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
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}

  position: absolute;
  width: 91.1%;
  height: 52px;
  left: 4.44%;
  top: 258px;

  background: #f5f5f7;
  border-radius: 8px;
`

const RightBtn = styled.button`
  width: 48px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  text-align: center;
  letter-spacing: -0.04em;

  /* color/Secondary */

  color: #4675f0;
`

const Input = styled.input`
  position: absolute;
  width: 91.1%;
  height: 52px;
  left: 4.44%;
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
  left: 5.2%;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 100%;
  /* identical to box height, or 11px */

  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;

  color: #ff3d00;
`
const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`

export default OnedayPost
