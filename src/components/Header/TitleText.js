import React from 'react'
import styled from 'styled-components'

function TitleText({ children, ...rest }) {
  return <Title {...rest}>{children}</Title>
}

const Title = styled.div`
  position: absolute;

  width: 40%;
  left:30%;
  height: 16px;
  top: 6.45%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.04em;

  color: #000000;
`

export default TitleText
