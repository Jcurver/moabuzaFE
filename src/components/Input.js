import React from 'react'
import styled from 'styled-components'

function Input({ children, ...rest }) {
  return <InputArea {...rest} />
}

const InputArea = styled.input`
  position: ${(props) => props.position};
  width: ${(props) => props.width || '328px'};
  height: ${(props) => props.height || '52px'};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  background: #f5f5f7;
  border-radius: 8px;
  border: none;
  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;

  /* color / gray / Gray30 */

  ::placeholder {
    color: #cccccc;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
  }
`
export default Input
