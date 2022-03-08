import * as React from 'react'
import styled from 'styled-components'

function ToggleBtn() {
  return (
    <Toggle>
      <LeftBtn>dfs</LeftBtn>
      <RightBtn />
    </Toggle>
  )
}
const Toggle = styled.div`
  width: 182px;
  height: 34px;
  margin-top: 7.8%;
  background-color: #e5eaf2;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const LeftBtn = styled.button`
  width: 84px;
  height: 30px;
  background-color: #ffb000;
  border-radius: 20px;
  border: none;
  `

const RightBtn = styled.button`
  width: 84px;
  height: 30px;
  background-color: #ffb000;
  border-radius: 20px;
  border: none;
  margin-left: 5px;
`

export default ToggleBtn
