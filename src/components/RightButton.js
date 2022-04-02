import React from 'react'
import styled from 'styled-components'

function RightButton({ children, ...rest }) {
  return (

      <RightBtn {...rest}>{children}</RightBtn>

  )
}
const RightBtn = styled.div`
  position: absolute;
  top: 4.305%;
  right: 1.11%;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */
  color: ${(props) => props.color || '#4675F0'};
  text-align: center;
  letter-spacing: -0.04em;
`

export default RightButton
