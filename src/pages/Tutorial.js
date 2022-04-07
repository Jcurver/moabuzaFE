import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { isMobile } from 'react-device-detect'
import { ReactComponent as LeftArr } from '../assets/tutorial/slide_left.svg'
import { ReactComponent as RightArr } from '../assets/tutorial/slide_right.svg'
import { ReactComponent as Close } from '../assets/tutorial/close.svg'

import '../styles/Tutorial.css'

import Tutorial01 from '../assets/tutorial/tutorial 01.png'
import Tutorial02 from '../assets/tutorial/tutorial 02.png'
import { TanniFace } from '../assets/character'

function Tutorial() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Carousel>
        <div>
          <TutorialBox>
            <TutorialImg src={Tutorial01} alt="" />
          </TutorialBox>

          <NextArrow />
        </div>
        <div>
          <TutorialBox>
            {' '}
            <TutorialImg src={Tutorial02} alt="" />
          </TutorialBox>

          <PrevArrow />
          <CloseButton
            onClick={() => {
              Swal.fire({
                title: '환영합니다!',
                text: '이제부터 열심히 모아부자!',
              })
                .then((result) => {
                  navigate('/')
                })
                .catch((err) => console.log(err))
            }}
          />
        </div>
      </Carousel>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`
const TutorialBox = styled.div`
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`
const TutorialImg = styled.img`
  border-radius: ${isMobile ? 0 : '31.4px'};
  /* object-fit: cover; */
  /* height: 100% !important; */
  /* min-height: 100vh; */
`

const PrevArrow = styled(LeftArr)`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 4px;
  top: 48%;
  /* overflow: visible; */
  z-index: 99;
`
const NextArrow = styled(RightArr)`
  position: absolute;
  width: 48px;
  height: 48px;
  right: 4px;
  top: 48%;
  /* overflow: visible; */
  z-index: 99;
`

const CloseButton = styled(Close)`
  position: absolute;
  width: 48px;
  height: 48px;
  right: 4px;
  top: 5%;
`

export default Tutorial
