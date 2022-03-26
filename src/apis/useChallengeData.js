import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios'

export const useChallengeData = (navigate) => {
  return useQuery(['challenge-data', navigate], () => {
    return request({ url: '/money/challenge', method: 'get' })
  })
}

export const useChallengeMainPageData = (navigate) => {
  return useQuery(['challenge-home', navigate], () => {
    return request({ url: '/home', method: 'get' })
  })
}
