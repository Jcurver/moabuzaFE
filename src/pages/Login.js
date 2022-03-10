import * as React from 'react'
import { KAKAO_AUTH_URL } from '../utils/OAuth'

function Login() {
  return (
    <a href={KAKAO_AUTH_URL}>
      <img src="img/kakao_login_medium_wide.png" alt="카카오계정 로그인" />

    </a>
  )
}

export default Login
