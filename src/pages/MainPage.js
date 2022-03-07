import * as React from 'react'
import styled from 'styled-components'
import { setFlexStyles } from '../styles/Mixin'

function MainPage(props) {
  const [buttonSelect, setButtonSelect] = React.useState(false)
  console.log(buttonSelect)
  console.log(props)
  return (
    <Wrapper>
      <ButtonWrapper>
        <div id="btn" />
        <SelectButton
          isOn={!buttonSelect}
          onClick={() => {
            setButtonSelect(false)
          }}
        >
          Test 첼린지
        </SelectButton>
        <SelectButton
          isOn={buttonSelect}
          zindex="true"
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
  width: 217px;
  padding: 0;
  margin: 35px auto;
  position: relative;
  border-radius: 30px;
  background: #fff;
  border: 1px solid black;
`

const SelectButton = styled.button`
  /* width: 20%;
  max-width: 414px; */
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 0px 5px;
  /* height: 30px; */
  /* background: var(--bg-active); */
  background-color: ${(props) => (props.isOn ? 'green' : 'black')};
  z-index: ${(props) => (props.zindex ? 99 : 999)};
  /* border: none; */
  border-radius: 30px;
  position: relative;
  text-align: center;
`
export default MainPage
