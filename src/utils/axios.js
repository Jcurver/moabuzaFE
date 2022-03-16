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
  console.log("A_AUTH_TOKEN : ",A_AUTH_TOKEN)
  if (A_AUTH_TOKEN) {
    config.defaults.headers.common['A-AUTH-TOKEN'] = `Bearer ${A_AUTH_TOKEN}`
    config.defaults.headers.common['R-AUTH-TOKEN'] = `Bearer ${R_AUTH_TOKEN}`
  }
  // config.headers['Access-Control-Allow-Origin'] = '*'
  // config.headers['Access-Control-Allow-Credentials'] = true
  // config.headers.withCredentials = true
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
  getKakaoLogin: (code) => instance.get(`/user/kakao/callback?code=${code}`)
    .then((res)=>console.log(res))
    .catch((error) => {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      console.log(error.request);
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }
    console.log(error.config);
  })
}

export const api = {
  getPostButton: () =>
    instance.put('/member/info', {
      nickname: 'pangpang',
      hero: 'hero1',
    })
   .catch((error) => {
    // if (error.response) {
    //   // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
    //   console.log(error.response.data);
    //   console.log(error.response.status);
    //   console.log(error.response.headers);
    // }
    // else if (error.request) {
    //   // 요청이 이루어 졌으나 응답을 받지 못했습니다.
    //   // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
    //   // Node.js의 http.ClientRequest 인스턴스입니다.
    //   console.log(error.request);
    // }
    // else {
    //   // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
    //   console.log('Error', error.message);
    // }
    // console.log(error.config);
    console.log(error)
  })
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
