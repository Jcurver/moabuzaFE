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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingIconBox = styled.img`
  width: 60px;
  height: 60px;
`
export default Loading
