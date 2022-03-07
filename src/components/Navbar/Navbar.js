import React from 'react'
import styled from 'styled-components'

import { setFlexStyles } from '../../styles/Mixin'

function Navbar({ marginBottom }) {
  return (
    <Wrapper marginBottom={marginBottom}>
      <NavButton>\\\</NavButton>
      <NavButton>내역</NavButton>
      <NavButton>홈</NavButton>
      <NavButton>목표리스트</NavButton>
      <NavButton>챌린지리스트</NavButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 414px;
  width: 100%;
  margin-top: 24px;
  margin-bottom: ${({ marginBottom }) => marginBottom || '12px'};
  height: 44px;
  justify-content: space-around;
  border: 1px solid black;

  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  padding: 0 16px;
  & svg {
    cursor: pointer;
  }
`

const NavButton = styled.button`
  width: 15%;
  height: 40px;
  margin: 5px;
  border: none;
  border-radius: 10px;
  transition: background-color 0.5s;
  &:hover {
    /* transition: background-color 0.5s; */
    background-color: skyblue;
    color: blue;
  }
`

export default Navbar
