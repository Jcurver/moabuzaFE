import React, { useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { apis } from '../utils/axios'

import { setCookie,getCookie } from '../utils/cookie'
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
      console.log("data.data.access : ", data.data.access)
      console.log('data.data : ', data.data)
      setCookie('A-AUTH-TOKEN', data.data.access)
      setCookie('R-AUTH-TOKEN', data.data.refresh)
      // refresher()

      window.location.href("https://moabuza.com/manse")
      // } catch (err) {
      //   console.log('에러가 났네요 ㅠㅠ')
      //   console.error(err.response)
      // }
    }
    getTokenWithKakao()
  }, [])

  console.log('ddd')


  return (
    // <button type="button" onClick={() => manse()}>
    //   광훈님민우님만세
    // </button>
    null
  )
}

export default UserInfo
