import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import styled from 'styled-components'
import img1 from '../assets/login.png'
import Button from '../components/Button'
import '../styles/OnBoarding.css'

function OnBoarding() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Carousel>
        <div>
          <img src={img1} alt="" />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <img src={img1} alt="" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={img1} alt="" />
          <p className="legend">Legend 3</p>
        </div>
        <div>
          {/* <img src={img1} alt="" /> */}
          {/* <p className="legend">Legend 3</p> */}
          <Button
            type="button"
            width="328px"
            position="absolute"
            top="650px"
            background="#4675F0"
            onClick={() => {
              navigate('/kakaologin')
            }}
          >
            시작하러가기!
          </Button>
        </div>
      </Carousel>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 720px;
`

export default OnBoarding
