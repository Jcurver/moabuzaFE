import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
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

export const instance = axios.create({
  baseURL: 'https://panghoon.shop',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
})
instance.interceptors.request.use( (config) => {
  const A_AUTH_TOKEN = getCookie('A-AUTH-TOKEN')
  const R_AUTH_TOKEN = getCookie('R-AUTH-TOKEN')
  console.log('A_AUTH_TOKEN : ', A_AUTH_TOKEN)
  if (A_AUTH_TOKEN) {
    config.headers.common['A-AUTH-TOKEN'] = `Bearer ${A_AUTH_TOKEN}`
    config.headers.common['R-AUTH-TOKEN'] = `Bearer ${R_AUTH_TOKEN}`
  }
  // config.headers['Access-Control-Allow-Origin'] = '*'
  // config.headers['Access-Control-Allow-Credentials'] = true
  // config.headers.withCredentials = true
  return config
})

export const request = async ({ ...options }) => {
  // console.log('request 안에 있는 인스턴스:', instance)

  // instance.defaults.headers.common['A-AUTH-TOKEN'] = `Bearer ${A_AUTH_TOKEN}`
  // instance.defaults.headers.common['R-AUTH-TOKEN'] = `Bearer ${R_AUTH_TOKEN}`
  console.log(
    'req instance headers: ',
    instance.defaults.headers,
  )

  const onSuccess = (response) => {
    return response
  }
  const onError = (error) => {
    // optionaly catch errors and add additional logging here
    return error
  }
  return instance(options).then(onSuccess).catch(onError)
}

export const api = {
  getUserInfo: (data, hero) =>
    instance
      .put('/member/info', {
        nickname: data.nickname,
        hero,
      })
      .then(() => {
        Swal.fire({
          title: '환영합니다!',
          text: '이제부터 열심히 모아부자!',
          icon: 'success',
        })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
      }),
  getKakaoLogin: (code) =>
    instance
      .get(`/user/kakao/callback?code=${code}`)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.log(error);
      }),
  getHomeData: () => 
    instance
      .get(`/home`)
      .then((res) => {
        console.log('홈 res : ', res)
        return res.data
      })
      .catch((error) => {
        console.log(error);
        return error;
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
