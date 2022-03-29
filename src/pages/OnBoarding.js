import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import styled from 'styled-components'
import img1 from '../assets/login.png'
import Button from '../components/Button'
import '../styles/OnBoarding.css'
import {
  HomeGuide,
  ChallengeGuide,
  OneDayBuzaDelete,
  OneDayBuzaGuide,
  GroupBuzaGuide,
} from '../assets/onboarding'

function OnBoarding() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Carousel>
        <div>
          <TextArea>
            친구들과 함께
            <TextArea fontWeight="500" margin="0 auto 10px auto">
              {' '}
              저축 습관을 길러보세요!
            </TextArea>
          </TextArea>
          <OnBoardingImg src={HomeGuide} alt="" />
          <Button
            onClick={() => {
              navigate('/kakaologin')
            }}
            boarderRadius="8px"
            width="328px"
            height="52px"
            background="#4675F0"
            marginTop="60px"
          >
            건너뛰기
          </Button>

          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <TextArea>
            하루부자의 내역을
            <TextArea fontWeight="500" margin="0 auto 10px auto">
              {' '}
              밀어서 삭제해보세요!
            </TextArea>
          </TextArea>

          <OnBoardingImg src={OneDayBuzaGuide} alt="" />
          <Button
            onClick={() => {
              navigate('/kakaologin')
            }}
            boarderRadius="8px"
            width="328px"
            height="52px"
            background="#4675F0"
            marginTop="60px"
          >
            건너뛰기
          </Button>

          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <TextArea>
            공동의 목표를 친구와
            <TextArea fontWeight="500" margin="0 auto 10px auto">
              {' '}
              함께 달성해보세요!
            </TextArea>
          </TextArea>

          <OnBoardingImg src={OneDayBuzaDelete} alt="" />
          <Button
            onClick={() => {
              navigate('/kakaologin')
            }}
            boarderRadius="8px"
            width="328px"
            height="52px"
            background="#4675F0"
            marginTop="60px"
          >
            건너뛰기
          </Button>

          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <TextArea>
            목표 금액을 세우고
            <TextArea fontWeight="500" margin="0 auto 10px auto">
              {' '}
              도전해봐요!
            </TextArea>
          </TextArea>

          <OnBoardingImg src={GroupBuzaGuide} alt="" />
          <Button
            onClick={() => {
              navigate('/kakaologin')
            }}
            boarderRadius="8px"
            width="328px"
            height="52px"
            background="#4675F0"
            marginTop="60px"
          >
            건너뛰기
          </Button>

          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <TextArea>
            친구들과 함께 <br />
            <TextArea fontWeight="500" margin="0 auto 10px auto">
              {' '}
              저축 습관을 길러보세요!
            </TextArea>
          </TextArea>

          <OnBoardingImg src={ChallengeGuide} alt="" />
          <Button
            onClick={() => {
              navigate('/kakaologin')
            }}
            boarderRadius="8px"
            width="328px"
            height="52px"
            background="#4675F0"
            marginTop="60px"
          >
            시작해부자!
          </Button>

          {/* <p className="legend">Legend 1</p> */}
        </div>
      </Carousel>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 720px;
`

const TextArea = styled.div`
  height: 58px;
  margin: ${(props) => props.margin || '64px auto 10px auto'};
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: ${(props) => props.fontWeight || 350};
  font-size: 21px;
  line-height: 140%;
  /* or 29px */

  letter-spacing: -0.04em;

  color: #000000;
`

const OnBoardingImg = styled.img`
  width: 217px !important;
  height: 402px;
`

export default OnBoarding
