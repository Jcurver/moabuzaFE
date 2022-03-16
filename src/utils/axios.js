import axios from 'axios'
import { getCookie, setCookie } from './cookie'
import {
  BAD_REQUEST,
  OK,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from '../constants/statusCode'
import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SIGNATURE_EXCEPTION,
  ACCESS_TOKEN_MALFORMED,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SIGNATURE_EXCEPTION,
  REFRESH_TOKEN_MALFORMED,
} from '../constants/statusMessage'

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
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Access-Control-Allow-Credentials'] = true
  config.headers.withCredentials = true
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
export const api = {
  getPostButton: () =>
    instance.post('/member/info', {
      nickname: 'pangpang',
      hero: 'hero1',
    }),
}
// instance.interceptors.response.use(
//   (response) => {
//     return response
//   },

//   async (error) => {
//     const { data: responseData, config: originalRequest } = error.response

//     if (
//       responseData.responseMessage === null &&
//       responseData.statusCode === null
//     ) {
//       if (process.env.REACT_APP_NODE_ENV === 'development') {
//         console.error(error.response)
//       }

//       return Promise.reject(error)
//     }

//     if (responseData.status === INTERNAL_SERVER_ERROR) {
//       if (process.env.REACT_APP_NODE_ENV === 'development') {
//         console.error(error)
//       }

//       return Promise.reject(error)
//     }

//     if (responseData.statusCode === UNAUTHORIZED) {
//       if (responseData.responseMessage === ACCESS_TOKEN_SIGNATURE_EXCEPTION) {
//         if (process.env.REACT_APP_NODE_ENV === 'development') {
//           console.error(error)
//         }

//         return Promise.reject(error)
//       }

//       if (responseData.responseMessage === ACCESS_TOKEN_MALFORMED) {
//         if (process.env.REACT_APP_NODE_ENV === 'development') {
//           console.error(error)
//         }

//         return Promise.reject(error)
//       }
//     }

//     if (
//       responseData.statusCode === BAD_REQUEST &&
//       responseData.responseMessage === ACCESS_TOKEN_EXPIRED
//     ) {
//       if (process.env.REACT_APP_NODE_ENV === 'development') {
//         console.error(responseData)
//       }

//       try {
//         const { data } = await axios({
//           method: 'GET',
//           url: `${process.env.REACT_APP_BASE_URL}/user/loginCheck`,
//           headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//             'R-AUTH-TOKEN': getCookie('habit-R-Token'),
//           },
//         })

//         if (data.statusCode === OK) {
//           setCookie('habit-A-Token', data.accessToken)
//           originalRequest.headers['A-AUTH-TOKEN'] = `${data.accessToken}`
//           return axios(originalRequest)
//         }
//       } catch (error) {
//         if (
//           error?.response?.data?.statusCode === BAD_REQUEST &&
//           error?.response?.data?.responseMessage === REFRESH_TOKEN_EXPIRED
//         ) {
//           if (process.env.REACT_APP_NODE_ENV === 'development') {
//             console.error(error)
//           }

//           return Promise.reject(error)
//         }
//         if (error?.response?.data?.statusCode === UNAUTHORIZED) {
//           if (
//             error?.response?.data?.responseMessage ===
//             REFRESH_TOKEN_SIGNATURE_EXCEPTION
//           ) {

//             return Promise.reject(error)
//           }
//           if (
//             error?.response?.data?.responseMessage === REFRESH_TOKEN_MALFORMED
//           ) {
//             if (process.env.REACT_APP_NODE_ENV === 'development') {
//               console.error(error)
//             }

//             return Promise.reject(error)
//           }
//         }
//         if (process.env.REACT_APP_NODE_ENV === 'development') {
//           console.error(error)

//         }
//         return Promise.reject(error)
//       }
//     }

//     if (error.response.data.statusCode === NOT_FOUND) {
//       if (process.env.REACT_APP_NODE_ENV === 'development') {
//         console.error(error)
//       }
//       return Promise.reject(error)
//     }

//     if (error.response.data.statusCode === INTERNAL_SERVER_ERROR) {
//       if (process.env.REACT_APP_NODE_ENV === 'development') {
//         console.error(error)
//       }

//       return Promise.reject(error)
//     }

//     return Promise.reject(error)
//   },
// )
