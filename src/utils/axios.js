import axios from 'axios'
import { getCookie } from './cookie.js'

const instance = axios.create({
  baseURL: 'https://panghoon.shop',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
})

instance.interceptors.request.use(async (config) => {
  const A_AUTH_TOKEN = getCookie('A-AUTH-TOKEN')
  const R_AUTH_TOKEN = getCookie('R-AUTH-TOKEN')
  config.headers['A-AUTH-TOKEN'] = `Bearer ${A_AUTH_TOKEN}`
  config.headers['R-AUTH-TOKEN'] = `Bearer ${R_AUTH_TOKEN}`
  return config
})

export const request = ({ ...options }) => {
  console.log(instance)
  const onSuccess = (response) => response
  const onError = (error) => {
    // optionaly catch errors and add additional logging here
    return error
  }
  return instance(options).then(onSuccess).catch(onError)
}

export const apis = {
  // 카카오 소셜로그인
  getKakaoLogin: (code) => instance.get(`/user/kakao/callback?code=${code}`),

}
// export const api = {
//   getPostButton: instance.post('/member/info', {
//     nickname: 'pangpang',
//     hero: 'hero1',
//   }),
// }
