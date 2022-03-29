import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios'

export const useChallengeData = (navigate) => {
  return useQuery(['challenge-data', navigate], () => {
    return request({ url: '/challenge', method: 'get' })
  })
}


export const useFriendData = (navigate) => {
  return useQuery(['challenge-friend', navigate], () => {
    return request({ url: '/challenge/friend', method: 'get' })
  })
}
