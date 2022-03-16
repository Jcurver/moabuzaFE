import React, { useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
// import { useCookies } from 'react-cookie'
import { apis } from '../utils/axios'
import { setCookie } from '../utils/cookie'
import { KAKAO_AUTH_URL } from '../utils/OAuth'


function UserInfo() {
  useEffect(() => {
    if (!window.location.search) {
      return
    }
    // const kakaoAuthCode = new URL(window.location.href).searchParams.get('code')
    const kakaoAuthCode = window.location.search.split('=')[1]

    async function getTokenWithKakao() {
      console.log('kakao code : ', kakaoAuthCode)
      // try {
      const { data } = await apis.getKakaoLogin(kakaoAuthCode)
      console.log('200이든 400대 에러이든 일단 받은 data : ', data)
      console.log('data.data : ', data.data)
      console.log('data.data.access : ', data.data.access)
      console.log('data.access : ', data.access)
      setCookie('A-AUTH-TOKEN', data.data.access)
      setCookie('R-AUTH-TOKEN', data.data.refresh)
      // refresher()
      console.log('200받았을때 data : ', data)

      // } catch (err) {
      //   console.log('에러가 났네요 ㅠㅠ')
      //   console.error(err.response)
      // }
    }
    getTokenWithKakao()
  }, [])

  console.log('ddd')
  async function manse() {
    await axios
      .get(`https://panghoon.shop/health`)
      .then((res) => console.log('백에서 보낸 요청 응답 : ', res))
  }

  return (
    <button type="button" onClick={() => manse()}>
      광훈님민우님만세
    </button>
  )
}

export default UserInfo
