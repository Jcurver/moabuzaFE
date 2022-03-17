import React, { useEffect, useState } from 'react'
import instance from 'axios'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
// import { useCookies,Cookies } from 'react-cookie'
import Swal from 'sweetalert2'
import styled from 'styled-components'
import { getCookie, setCookie } from '../utils/cookie'
import { apis, api } from '../utils/axios'
// import { setCookie } from '../utils/cookie'
import { KAKAO_AUTH_URL } from '../utils/OAuth'

function UserInfo() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!window.location.search) {
      return
    }
    const kakaoAuthCode = window.location.search.split('=')[1]

    async function getTokenWithKakao() {
      const { data } = await apis.getKakaoLogin(kakaoAuthCode)

      setCookie('A-AUTH-TOKEN', data.data.access)
      setCookie('R-AUTH-TOKEN', data.data.refresh)
      console.log('겟쿠키 A-AUTH-TOKEN : ', getCookie('A-AUTH-TOKEN'))
      console.log('200받았을때 data : ', data)
    }
    getTokenWithKakao()
  }, [navigate])

  const [hero, setHero] = useState('hero0')
  function setHeroValue(i) {
    setHero(i)
    setValue('character', i)
  }

  const onValid = async (data) => {
    if (hero === 'hero0') {
      return
    }
    await instance.put('/member/info', {
      nickname: data.nickname,
      hero
    }).then(() => {
      Swal.fire({
        title: '환영합니다!',
        text: '이제부터 열심히 모아부자!',
        icon: 'success',
      }).then((result) => {
        console.log(result)
        navigate('/settings')
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
  return (
    <Wrapper>

      <TopLine />

      <Title>캐릭터/닉네임 설정</Title>
      <form onSubmit={handleSubmit(onValid)}>
        <ButtonSubmit>확인</ButtonSubmit>
        <CharacterDiv>
          <CharacterOne style={{ left: '0px' }} onClick={() => setHeroValue('hero1')}>
            <Character />
            <CharacterName style={{ fontWeight: hero === 'hero1' ? '800' : '400' }}>
              캐릭터A
            </CharacterName>
          </CharacterOne>
          <CharacterOne
            style={{ left: '104px' }}
            onClick={() => setHeroValue('hero2')}
          >
            <Character />
            <CharacterName style={{ fontWeight: hero === 'hero2' ? '800' : '400' }}>
              캐릭터B
            </CharacterName>
          </CharacterOne>
          <CharacterOne
            style={{ left: '208px' }}
            onClick={() => setHeroValue('hero3')}
          >
            <Character />
            <CharacterName style={{ fontWeight: hero === 'hero3' ? '800' : '400' }}>
              캐릭터C
            </CharacterName>
          </CharacterOne>
        </CharacterDiv>
        <NicknameText>닉네임</NicknameText>
        <NicknameInput
          placeholder="닉네임을 입력해주세요"
          {...register('nickname', {
            required: '닉네임 수정을 깜빡했어요',
            minLength: { value: 2, message: '한글자는 너무 짧아요' },
            maxLength: { value: 8, message: '8자를 초과했어요!' },
            pattern: {
              value: /^[A-Za-z0-9]*$/,
              message: '숫자와 문자만 입력해부자!',
            },
          })}
        />
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
  display: flex;
  align-items: center;
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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  width: 288px;
  height: 102px;
  left: calc(50% - 288px / 2);
  top: 15.83%;
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
const Character = styled.div`
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
  width: 328px;
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

  display: flex;
  align-items: center;
  letter-spacing: -0.04em;

  /* color / gray / Gray50 */

  color: #999999;
`

export default UserInfo
