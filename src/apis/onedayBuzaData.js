import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios'

export const useMainPageData = (navigate) => {
  return useQuery(['main-page', navigate], () => {
    return request({ url: '/home', method: 'get' })
  })
}

export const useOnedayBuzaData = () => {
  return useMutation((date) => {
    return request({
      url: '/money/dayList',
      method: 'post',
      data: { recordDate: date },
    })
  },)
}

