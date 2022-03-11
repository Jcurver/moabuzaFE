import React from 'react'
import styled from 'styled-components'

function Button({ children }) {
  return (
    <Wrapper>
      <MainButton>{children}</MainButton>
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
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  width: 90%;
  height: 2.25rem;
  font-size: 1rem;

  /* 색상 */
  background: #5f5f77;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }

  /* 기타 */
  /* & + & {
    margin-left: 1rem;
  } */
`
export default Button
