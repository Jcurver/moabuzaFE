import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { request, instance } from '../utils/axios'

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
  }).then((res) => {
    if (!res.data.nicknameValid) {
       Swal.fire({
         title: '해당 사용자가 없어요!',
         text: '다른 닉네임으로 검색해부자!',
         icon: 'warning',
         showCancelButton: false,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: '넵ㅠㅠ',
         cancelButtonText: '취소!',
       }).then((result) => {
         console.log(result)
       })
    }
    console.log("searchFriend::",res)
    return res
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
