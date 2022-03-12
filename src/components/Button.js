import React from 'react'
import styled from 'styled-components'

function Button({ children, ...rest }) {
  return (
    <Wrapper>
      <MainButton {...rest}>{children}</MainButton>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const MainButton = styled.button`
  /* 공통 스타일 */
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 400;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  width: ${(props) => props.width || '100%'};

  height: ${(props) => props.height || '2.25rem'};
  font-size: ${(props) => props.fontSize || '1rem'};

  /* 색상 */
  background: #5f5f77;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }
`
export default Button
