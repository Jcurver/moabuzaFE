import React, { useEffect, useState } from 'react'
import instance from 'axios'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2'
import styled from 'styled-components'
import { setFlexStyles } from '../styles/Mixin'
import { request, api } from '../utils/axios'
import { getCookie, setCookie } from '../utils/cookie'
import { KAKAO_AUTH_URL } from '../utils/OAuth'
import { fcmToken } from '../utils/fcm'
import { BunnyFace, TanniFace, TongkiFace } from '../assets/character'

function UserInfo() {
  const navigate = useNavigate()
  const [nickNameDup, setNickNameDup] = useState(false)

  const [hero, setHero] = useState('hero0')
  function setHeroValue(i) {
    setHero(i)
    setValue('character', i)
  }

  const onValid = async (data) => {
    if (hero === 'hero0') {
      return
    }
    console.log('fcmToken:::', fcmToken)
    if (!nickNameDup) {
      Swal.fire({
        title: '닉네임 중복확인해부자',
        //  text: '열심히 모아부자!',
        // icon: 'success',
      }).then((result) => {
        console.log(result)
      })
      return
    }

    await api.getUserInfo(data, hero)
    navigate('/')
  }
  const nicknameDup = () => {
    console.log('닉네임::', watch().nickname)
    if (watch().nickname === '') {
      return null
    }
    return request({
      url: '/nickname/validation',
      method: 'post',
      data: { nickname: watch().nickname },
    })
      .then((res) => {
        console.log('중복확인::', res)
        if (res.status === 200) {
          if (res.data === '닉네임 사용 가능') {
            setNickNameDup(true)
            Swal.fire({
              title: '사용가능한 닉네임',
              text: '열심히 모아부자!',
              // icon: 'success',
            }).then((result) => {
              console.log(result)
            })
          }
          if (res.data === '사용중인 닉네임') {
            setNickNameDup(false)
            Swal.fire({
              title: '사용중인 닉네임',
              text: '다른거로 골라부자 ㅠㅠ',
              // icon: 'success',
            }).then((result) => {
              console.log(result)
            })
          }
        }
      })
      .catch(() => {
        Swal.fire({
          title: '이미 사용중인 닉네임',
          text: '다른걸로 해부자 ㅜㅜ',
          // icon: 'success',
        }).then((result) => {
          console.log(result)
        })
      })
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError,
  } = useForm()
  console.log(watch())

  useEffect(() => {
    setNickNameDup(false)
    console.log(nickNameDup)
    if (!window.location.search) {
      return
    }
    const kakaoAuthCode = window.location.search.split('=')[1]

    async function getTokenWithKakao() {
      const { data } = await api.getKakaoLogin(kakaoAuthCode)
      setCookie('A-AUTH-TOKEN', data.data.access)
      setCookie('R-AUTH-TOKEN', data.data.refresh)
      if (data.data.nickname) {
        navigate('/')
      }
      console.log('200받았을때 data : ', data)
      console.log('겟쿠키 A-AUTH-TOKEN : ', getCookie('A-AUTH-TOKEN'))
    }
    getTokenWithKakao()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, watch().nickname])

  return (
    <Wrapper>
      <TopLine />

      <Title>캐릭터/닉네임 설정</Title>
      <form onSubmit={handleSubmit(onValid)}>
        <ButtonSubmit>확인</ButtonSubmit>
        <CharacterDiv>
          <CharacterCenterDiv>
            <CharacterOne
              style={{ left: '0px' }}
              onClick={() => setHeroValue('bunny')}
            >
              <Character src={BunnyFace} />
              <CharacterName
                style={{ fontWeight: hero === 'bunny' ? '800' : '400' }}
              >
                버니
              </CharacterName>
            </CharacterOne>
            <CharacterOne
              style={{ left: '104px' }}
              onClick={() => setHeroValue('tongki')}
            >
              <Character src={TongkiFace} />
              <CharacterName
                style={{ fontWeight: hero === 'tongki' ? '800' : '400' }}
              >
                통키
              </CharacterName>
            </CharacterOne>
            <CharacterOne
              style={{ left: '208px' }}
              onClick={() => setHeroValue('tanni')}
            >
              <Character src={TanniFace} />
              <CharacterName
                style={{ fontWeight: hero === 'tanni' ? '800' : '400' }}
              >
                타니
              </CharacterName>
            </CharacterOne>
          </CharacterCenterDiv>
        </CharacterDiv>
        <NicknameText>닉네임</NicknameText>
        <NicknameInput
          placeholder="닉네임을 입력해주세요"
          {...register('nickname', {
            required: '닉네임 수정을 깜빡했어요',
            minLength: { value: 2, message: '한글자는 너무 짧아요' },
            maxLength: { value: 8, message: '8자를 초과했어요!' },
            pattern: {
              value: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣A-Za-z0-9]*$/,
              message: '숫자와 문자만 입력해부자!',
            },
          })}
        />
        <NicknameSubmit onClick={() => nicknameDup()}>중복확인</NicknameSubmit>

        {errors?.nickname ? (
          <NicknameAlert style={{ color: 'red' }}>
            {errors?.nickname?.message}
          </NicknameAlert>
        ) : (
          <NicknameAlert>8자 이내로 입력해주세요</NicknameAlert>
        )}
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const TopDiv = styled.div`
  position: absolute;
  width: 360px;
  height: 86px;
  left: 0px;
  top: 0px;
`

const ButtonDiv = styled.div`
  position: absolute;
  left: 1.11%;

  top: 33.72%;
  width: 48px;
  height: 48px;

  background: rgba(196, 196, 196, 0.3);
`

const Button = styled.div`
  position: absolute;
  left: 4.44%;

  top: 5.97%;
  width: 24px;
  height: 24px;

  background: #c4c4c4;
`
const ButtonSubmit = styled.button`
  position: absolute;
  width: 26px;
  height: 14px;
  left: 318px;
  top: 6.67%;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  text-align: center;
  letter-spacing: -0.04em;

  color: #000000;
  background-color: #fff;
`
const Title = styled.div`
  position: absolute;
  width: 122px;
  height: 23px;
  left: 119px;
  top: 5.97%;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  text-align: center;
  letter-spacing: -0.04em;

  color: #000000;
`
const TopLine = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 98.84%;
  bottom: 0%;

  /* color/Btn-basic2 */

  background: #f5f5f7;
`
const CharacterDiv = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'flex-start',
  })}
  padding: 0px;

  position: absolute;
  width: 360px;
  height: 166px;
  top: 85px;
  background-color: #f6f9fe;
`
const CharacterCenterDiv = styled.div`
  position: absolute;
  width: 288px;
  height: 102px;
  left: calc(50% - 288px / 2);
  top: 32px;
`

const CharacterOne = styled.div`
  position: absolute;
  width: 80px;
  height: 102px;
  top: 0px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`
const Character = styled.img`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  left: 0px;
  top: 0px;
  /* color/Btn-basic1 */

  background: #e5eaf2;
`
const CharacterName = styled.div`
  position: absolute;
  width: 46px;
  height: 14px;
  left: 17px;
  top: 88px;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  text-align: center;
  letter-spacing: -0.04em;

  color: #000000;
`
const NicknameText = styled.div`
  position: absolute;
  width: 38px;
  height: 14px;
  left: 16px;
  top: 37.78%;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  letter-spacing: -0.04em;

  color: #000000;
`
const NicknameInput = styled.input`
  position: absolute;
  width: 216px;
  height: 52px;
  left: 16px;
  top: 40.83%;

  background: #f5f5f7;
  border-radius: 8px;
  padding-left: 16px;
  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: -0.04em;
    color: #cccccc;
  }
  :-ms-input-placeholder {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: -0.04em;
    color: #cccccc;
  }
`
const NicknameSubmit = styled.div`
  position: absolute;
  width: 104px;
  height: 52px;
  left: 240px;
  top: 40.83%;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}

  /* color/Btn-basic1 */

  border: 1px solid #e5eaf2;
  box-sizing: border-box;
  border-radius: 8px;

  /* Heading/Noto Sans KR/H6 */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  text-align: right;
  letter-spacing: -0.04em;

  /* color/Secondary */

  color: #4675f0;
`
const NicknameAlert = styled.div`
  position: absolute;
  width: 110px;
  height: 11px;
  left: 31px;
  top: 48.89%;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 100%;
  /* identical to box height, or 11px */

  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  letter-spacing: -0.04em;

  /* color / gray / Gray50 */

  color: #999999;
`

export default UserInfo
