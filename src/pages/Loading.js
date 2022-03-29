import * as React from 'react'
import styled from 'styled-components'
import { LoadingIcon } from '../assets/icons/loading'

function Loading() {
  return (
    <Wrapper>
      <LoadingIconBox src={LoadingIcon} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const LoadingIconBox = styled.img`
  position: absolute;
  width: 60px;
  height: 60px;
  left: 150px;
  top: 308px;
`
export default Loading
