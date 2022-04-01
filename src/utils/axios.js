import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { setMoveToLoginPage } from './setMoveToLoginPage'
import { deleteCookie, getCookie, setCookie } from './cookie'
import { getItem } from './sessionStorage'
// import { fcmToken } from './fcm'

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
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  // baseURL: 'https://6b0c50c6-f658-42ea-80c0-f14d34966068.mock.pstmn.io',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
    'Access-Control-Allow-Origin': '*',
  },
})

let isTokenRefreshing = false
const refreshSubscribers = []
console.log('refreshSubscribers', refreshSubscribers)

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken))
  console.log('refreshSubscribers', refreshSubscribers)
}

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback)
}

instance.interceptors.request.use((config) => {
  setCookie(
    'A-AUTH-TOKEN',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGU2NzdjNCIsImlhdCI6MTY0ODgzNjAzMiwiZXhwIjoxNjQ4OTIyNDMyfQ.1Y_P98WBwhoZFBJdoCCTus6hMqc5_Ky-AoFXwN0Zuwk',
  )
  setCookie(
    'R-AUTH-TOKEN',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGU2NzdjNCIsImlhdCI6MTY0ODgzNjAzMiwiZXhwIjoxNjQ4OTIyNDMyfQ.1Y_P98WBwhoZFBJdoCCTus6hMqc5_Ky-AoFXwN0Zuwk',
  )
  const A_AUTH_TOKEN = getCookie('A-AUTH-TOKEN')
  const R_AUTH_TOKEN = getCookie('R-AUTH-TOKEN')
  console.log('A_AUTH_TOKEN : ', A_AUTH_TOKEN)
  if (A_AUTH_TOKEN) {
    config.headers.common['A-AUTH-TOKEN'] = `Bearer ${A_AUTH_TOKEN}`
    config.headers.common['R-AUTH-TOKEN'] = `Bearer ${R_AUTH_TOKEN}`
    console.log('인터셉터 REQUEST CONFIG', config)
    // config.headers.common['FB-TOKEN'] = `Bearer ${FB_TOKEN}`
  }
  // config.headers['Access-Control-Allow-Origin'] = '*'
  // config.headers['Access-Control-Allow-Credentials'] = true
  // config.headers.withCredentials = true
  return config
})

export const request = async ({ ...options }) => {
  console.log('req instance headers: ', instance.defaults.headers)

  const onSuccess = (response) => {
    return response
  }
  const onError = (error) => {
    console.log('error:::', error.response)
    // optionaly catch errors and add additional logging here
    return error
  }
  return instance(options).then(onSuccess).catch(onError)
}

export const api = {
  getUserInfo: (data, hero) =>
    instance
      .put('/member/info', {
        // fcmToken: getItem('fcmToken'),
        fcmToken: 'fcmToken',
        nickname: data.nickname,
        hero,
      })
      .then((res) => {
        console.log('getUserInfo:::', res)

        // window.location.href('/onboarding')
        // Swal.fire({
        //   title: '환영합니다!',
        //   text: '이제부터 열심히 모아부자!',
        //   icon: 'success',
        // })
        //   .then((result) => {
        //     console.log(result)
        //   })
        //   .catch((err) => console.log(err))
      })
      .catch((error) => {
        console.log(error)
      }),
  getKakaoLogin: (code) =>
    instance
      .get(`/user/kakao/callback?code=${code}`)
      .then((res) => {
        console.log(res)
        return res
      })
      .catch((error) => {
        console.log(error)
      }),
  getHomeData: () =>
    instance
      .get(`/`)
      .then((res) => {
        console.log('홈 res : ', res)
        return res.data
      })
      .catch((error) => {
        console.log(error)
        return error
      }),
}

instance.interceptors.response.use(
  (response) => {
    return response
  },

  async (error) => {
    const {
      data: responseData,
      config: originalRequest,
      status: statusCode,
    } = error.response
    console.log(
      'ERR RESPONSED',
      responseData,
      responseData.message,
      originalRequest,
      statusCode,
    )
    if (responseData.msg === 'Move to Login Page') {
      console.log('dddd')
      // setMoveToLoginPage()
      return Promise.reject(error)
    }

    if (statusCode === UNAUTHORIZED && responseData.code === 1004) {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true
        if (process.env.REACT_APP_NODE_ENV === 'development') {
          console.error('엑세스 토큰 만료됨', error)
        }

        const oldAccess = `Bearer ${getCookie('A-AUTH-TOKEN')}`
        const oldRefresh = `Bearer ${getCookie('R-AUTH-TOKEN')}`

        const { data } = await axios({
          url: `${process.env.REACT_APP_SERVER_URL}/member/reissue`,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'A-AUTH-TOKEN': oldAccess,
            'R-AUTH-TOKEN': oldRefresh,
            accept: 'application/json,',
          },
        }).catch(() => {

          setMoveToLoginPage()

        })

        console.log('reissue데이터::', data)

        if (data.code === 'OK') {
          const newAccess = data.data.access
          const newRefresh = data.data.refresh
          deleteCookie('A-AUTH-TOKEN')
          deleteCookie('R-AUTH-TOKEN')
          setCookie('A-AUTH-TOKEN', newAccess)
          setCookie('R-AUTH-TOKEN', newRefresh)
          console.log('오리지날1', originalRequest)
          originalRequest.headers['A-AUTH-TOKEN'] = `Bearer ${newAccess}`
          originalRequest.headers['R-AUTH-TOKEN'] = `Bearer ${newRefresh}`
          console.log('오리지날2', originalRequest)
          isTokenRefreshing = false
          return axios(originalRequest)
        }
      } else {
        setMoveToLoginPage()
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)

// const R_AUTH_TOKEN = getCookie('R-AUTH-TOKEN')
// const refreshToken = await AsyncStorage.getItem('refreshToken')
// token refresh 요청

//     try {
//       const originalRequest = error.config;
//       const data = await instance.get('/member/reissue');
//       if (data) {
//         const { access, refresh } = data.data;
//         console.log("토큰들",access,refresh)
//         deleteCookie('A-AUTH-TOKEN');
//         deleteCookie('R-AUTH-TOKEN');
//         setCookie('A-AUTH-TOKEN', access);
//         setCookie('R-AUTH-TOKEN', refresh);
//         // localStorage.removeItem('user');
//         // localStorage.setItem('user', JSON.stringify(data.data, ['accessToken', 'refreshToken']));
//         originalRequest.headers['A-AUTH-TOKEN'] = access;
//         originalRequest.headers['R-AUTH-TOKEN'] = refresh;
//         return await instance.request(originalRequest);
//       }
//     } catch (error) {
//       localStorage.removeItem('user');
//       console.log(error);
//     }
//     return Promise.reject(error);

// }
// const A_AUTH_TOKEN = getCookie('A-AUTH-TOKEN')
// const R_AUTH_TOKEN = getCookie('R-AUTH-TOKEN')
// console.log("신규엑세스토큰",A_AUTH_TOKEN)
// axios.defaults.headers.common[
//   'A-AUTH-TOKEN'
// ] = `Bearer ${A_AUTH_TOKEN}`
// axios.defaults.headers.common[
//   'R-AUTH-TOKEN'
// ] = `Bearer ${R_AUTH_TOKEN}`

// const { data } = await axios
//   .get(
//     'https://panghoon.shop/member/reissue',

// {
//   refreshToken,
// },
// )
// .then((res) => {
// const newAccessToken = res.data.data.access;
// const newRefreshToken = res.data.data.refresh;
//     deleteCookie('A-AUTH-TOKEN')
//     deleteCookie('R-AUTH-TOKEN')
// setCookie('A-AUTH-TOKEN', newAccessToken);
// setCookie('R-AUTH-TOKEN', newRefreshToken);
// originalRequest.headers.common[
//   'A-AUTH-TOKEN'
// ] = `Bearer ${newAccessToken}`;
// originalRequest.headers.common[
//   'R-AUTH-TOKEN'
// ] = `Bearer ${newRefreshToken}`;
// isTokenRefreshing = false;
// return axios(originalRequest);
//   return res
// })
// .catch((error) => {
//   console.log('토큰 만료후 재 요청시 에러:::', error.response)
// })

//   console.log('리프레쉬된 토큰 데이터가 왔따!!!', data)
//   // 새로운 토큰 저장
//   const newAccessToken = data.data.access
//   const newRefreshToken = data.data.refresh
//   console.log(newAccessToken, newRefreshToken)
//   deleteCookie('A-AUTH-TOKEN')
//   deleteCookie('R-AUTH-TOKEN')

//   setCookie('A-AUTH-TOKEN', newAccessToken)
//   setCookie('R-AUTH-TOKEN', newRefreshToken)

//   isTokenRefreshing = false
//   originalRequest.headers[
//     'A-AUTH-TOKEN'
//   ] = `Bearer ${newAccessToken}`
//   originalRequest.headers[
//     'R-AUTH-TOKEN'
//   ] = `Bearer ${newRefreshToken}`

//   onTokenRefreshed(newAccessToken)
//   onTokenRefreshed(newRefreshToken)
// }

// const retryOriginalRequest = new Promise((resolve) => {
//   addRefreshSubscriber((accessToken, refreshToken) => {
//     originalRequest.headers.common[
//       'A-AUTH-TOKEN'
//     ] = `Bearer ${accessToken}`
//     originalRequest.headers.common[
//       'R-AUTH-TOKEN'
//     ] = `Bearer ${refreshToken}`
//     console.log("리트라이오리지날리퀘스트",originalRequest)
//     return resolve(axios(originalRequest))
//   })
//   // const accessToken = getCookie('A-AUTH-TOKEN')
//   // const refreshToken = getCookie('R-AUTH-TOKEN')
//   // originalRequest.headers.common['A-AUTH-TOKEN'] = `Bearer ${accessToken}`
//   // originalRequest.headers.common['R-AUTH-TOKEN'] = `Bearer ${refreshToken}`
//   // resolve(axios(originalRequest))
// })

// if (responseData.responseMessage === ACCESS_TOKEN_MALFORMED) {
//   if (process.env.REACT_APP_NODE_ENV === 'development') {
//     console.error(error)
//   }

//   return Promise.reject(error)
// }

// if (
//   responseData.statusCode === BAD_REQUEST &&
//   responseData.responseMessage === ACCESS_TOKEN_EXPIRED
// ) {
//   if (process.env.REACT_APP_NODE_ENV === 'development') {
//     console.error(responseData)
//   }

//   try {
//     const { data } = await axios({
//       method: 'GET',
//       url: `${process.env.REACT_APP_BASE_URL}/user/loginCheck`,
//       headers: {
//         'Content-Type': 'application/json;charset=UTF-8',
//         'R-AUTH-TOKEN': getCookie('habit-R-Token'),
//       },
//     })

//     if (data.statusCode === OK) {
//       setCookie('habit-A-Token', data.accessToken)
//       originalRequest.headers['A-AUTH-TOKEN'] = `${data.accessToken}`
//       return axios(originalRequest)
//     }
//   } catch (error) {
//     if (
//       error?.response?.data?.statusCode === BAD_REQUEST &&
//       error?.response?.data?.responseMessage === REFRESH_TOKEN_EXPIRED
//     ) {
//       if (process.env.REACT_APP_NODE_ENV === 'development') {
//         console.error(error)
//       }

//       return Promise.reject(error)
//     }
//     if (error?.response?.data?.statusCode === UNAUTHORIZED) {
//       if (
//         error?.response?.data?.responseMessage ===
//         REFRESH_TOKEN_SIGNATURE_EXCEPTION
//       ) {
//         return Promise.reject(error)
//       }
//       if (
//         error?.response?.data?.responseMessage === REFRESH_TOKEN_MALFORMED
//       ) {
//         if (process.env.REACT_APP_NODE_ENV === 'development') {
//           console.error(error)
//         }

//         return Promise.reject(error)
//       }
//     }
//     if (process.env.REACT_APP_NODE_ENV === 'development') {
//       console.error(error)
//     }
//     return Promise.reject(error)
//   }
// }

// if (error.response.data.statusCode === NOT_FOUND) {
//   if (process.env.REACT_APP_NODE_ENV === 'development') {
//     console.error(error)
//   }
//   return Promise.reject(error)
// }

// if (error.response.data.statusCode === INTERNAL_SERVER_ERROR) {
//   if (process.env.REACT_APP_NODE_ENV === 'development') {
//     console.error(error)
//   }

//   return Promise.reject(error)
// }
