import React from 'react'
import styled from 'styled-components'

function ScrollWrapper({ children, ...rest }) {
  return <MainWrapper {...rest}>{children}</MainWrapper>
}

const MainWrapper = styled.div`
  height: ${(props) => props.height || '630px'};
  margin: 0 0 0 4.444%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`

export default ScrollWrapper
