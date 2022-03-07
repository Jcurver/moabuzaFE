import * as React from 'react'
import styled from 'styled-components'
import { setFlexStyles } from '../styles/Mixin'

function MainPage() {
  const [buttonSelect, setButtonSelect] = React.useState(false)
  console.log(buttonSelect)

  return (
    <Wrapper>
      <ButtonWrapper>
        <div id="btn" />
        <SelectButton
          onClick={() => {
            setButtonSelect(false)
          }}
        >
          첼린지
        </SelectButton>
        <SelectButton
          onClick={() => {
            setButtonSelect(true)
          }}
        >
          공동목표
        </SelectButton>
      </ButtonWrapper>
      {buttonSelect ? <div>true</div> : <div>false</div>}
      <div>djdjddjj</div>
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

  /* ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })} */
  padding: 0 16px;
  & svg {
    cursor: pointer;
  }
`
const ButtonWrapper = styled.div`
  width: 300px;
  margin: 35px auto;
  position: relative;
  border-radius: 30px;
  background: #fff;
`

const SelectButton = styled.button`
  /* width: 20%;
  max-width: 414px; */
  padding: 10px 40px;
  margin: 5% auto;
  height: 30px;
  /* background: var(--bg-active); */
  background-color:${(props) => (props.isOn === true ? 'green' : 'black')}
  /* border: none; */
  border-radius: 30px;
  position: relateive;
  text-align: cnter;
`
export default MainPage
