import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { request } from '../utils/axios'

export const useFriendsData = (navigate) => {
  return useQuery(['friend', navigate], () => {
    return request({ url: '/friend', method: 'get' })
  })
}

export async function requestFriend(nickname) {
  return request({
    url: '/friend',
    method: 'post',
    data: { friendNickname: nickname },
  })
}

export const searchFriends = (nickname) => {
  return request({
    url: '/friend/search',
    method: 'post',
    data: {
      friendNickname: nickname,
    },
  })
}
export const useSearchFriend = () => {
  return useMutation(searchFriends, {
    onSuccess: (data) => {
      // window.location.href('/')
      return data
    },
    onError: (data) => {
      return data
    },
  })
}
