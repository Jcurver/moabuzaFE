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
// console.log('refreshSubscribers', refreshSubscribers)

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken))
  // console.log('refreshSubscribers', refreshSubscribers)
}

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback)
}

instance.interceptors.request.use((config) => {
  const A_AUTH_TOKEN = getCookie('A-AUTH-TOKEN')
  const R_AUTH_TOKEN = getCookie('R-AUTH-TOKEN')
  // console.log('A_AUTH_TOKEN : ', A_AUTH_TOKEN)
  if (A_AUTH_TOKEN) {
    config.headers.common['A-AUTH-TOKEN'] = `Bearer ${A_AUTH_TOKEN}`
    config.headers.common['R-AUTH-TOKEN'] = `Bearer ${R_AUTH_TOKEN}`
    // console.log('인터셉터 REQUEST CONFIG', config)
    // config.headers.common['FB-TOKEN'] = `Bearer ${FB_TOKEN}`
  }
  // config.headers['Access-Control-Allow-Origin'] = '*'
  // config.headers['Access-Control-Allow-Credentials'] = true
  // config.headers.withCredentials = true
  return config
})

export const request = async ({ ...options }) => {
  // console.log('req instance headers: ', instance.defaults.headers)

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

let token

if (getItem('fcmtoken')) {
  token = getItem('fcmtoken')
} else {
  token = 'token'
}

export const api = {
  getUserInfo: (data, hero) =>
    instance
      .put('/member/info', {
        fcmToken: getItem('fcmToken'),
        nickname: data.nickname,
        hero,
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error)
      }),
  getKakaoLogin: (code) =>
    instance
      .get(`/user/kakao/callback?code=${code}`)
      .then((res) => {
        return res
      })
      .catch((error) => {
        console.log(error)
      }),
  getHomeData: () =>
    instance
      .get(`/`)
      .then((res) => {
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
      setMoveToLoginPage()
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

        if (data.code === 'OK') {
          const newAccess = data.data.access
          const newRefresh = data.data.refresh
          deleteCookie('A-AUTH-TOKEN')
          deleteCookie('R-AUTH-TOKEN')
          setCookie('A-AUTH-TOKEN', newAccess)
          setCookie('R-AUTH-TOKEN', newRefresh)
          originalRequest.headers['A-AUTH-TOKEN'] = `Bearer ${newAccess}`
          originalRequest.headers['R-AUTH-TOKEN'] = `Bearer ${newRefresh}`
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
