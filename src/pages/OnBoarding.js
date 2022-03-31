import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { useNavigate, Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import styled from 'styled-components'
import Swal from 'sweetalert2'
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
import { TanniFace } from '../assets/character'

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
          {/* <JumpButton
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
          </JumpButton> */}

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
          {/* <JumpButton
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
          </JumpButton> */}

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
          {/* <JumpButton
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
          </JumpButton> */}

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
          {/* <JumpButton
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
          </JumpButton> */}

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
          {/* <JumpButton
            type="button"
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
          </JumpButton> */}

          {/* <p className="legend">Legend 1</p> */}
        </div>
      </Carousel>
      <PrevArrow img={TanniFace} />
      <NextArrow img={TanniFace} />
      <Link to="/">
        <JumpButton
          type="button"
          onClick={() => {
            navigate('/')

            Swal.fire({
              title: '환영합니다!',
              text: '이제부터 열심히 모아부자!',
              icon: 'success',
            })
              .then((result) => {
                console.log(result)
              })
              .catch((err) => console.log(err))
          }}
          boarderRadius="8px"
          width="328px"
          height="52px"
          background="#4675F0"
          // marginTop="60px"
        >
          건너뛰기!
        </JumpButton>
      </Link>
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
const JumpButton = styled.button`
  position: absolute;
  width: 328px;
  height: 52px;
  left: 16px;
  top: 596px;

  /* color/Secondary */

  background: #4675f0;
  border-radius: 8px;

  /* Button / Noto Sans KR / Btn_Md(m) */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  text-align: center;

  /* Rectangle 173 */

  color: #ffffff;
`

const OnBoardingImg = styled.img`
  width: 217px !important;
  height: 402px;
`

const PrevArrow = styled.img`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 4px;
  top: 336px;
`
const NextArrow = styled.img`
  position: absolute;
  width: 48px;
  height: 48px;
  right: 4px;
  top: 336px;
`

export default OnBoarding
