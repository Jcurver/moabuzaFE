import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios'

export const useGroupData = (navigate) => {
  return useQuery(['group-data', navigate], () => {
    return request({ url: '/group', method: 'get' })
  })
}

export const useGroupDataPost = (date) => {
  useMutation(() => {
    return request({
      url: '/money/group/creategroup',
      method: 'post',
      data: { recordDate: date },
    })
  })
}

export const useFriendData = (navigate) => {
  return useQuery(['friend-data', navigate], () => {
    return request({ url: '/group/friend', method: 'get' })
  })
}
