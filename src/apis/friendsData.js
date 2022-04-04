import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
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
  }).then((res) => {
    console.log('searchFriend::', res)
    if (res.data.msg === '이미 친구로 저장되어 있습니다.') {
      Swal.fire({
        title: '이미 친구에요!',
        //  text: '다른 닉네임으로 검색해부자!',
        showCancelButton: false,
        confirmButtonText: '확인',
        cancelButtonText: '취소!',
      }).then((result) => {
        console.log(result)
      })
    }
    if (res.data.msg === '친구요청을 보낸 상태입니다.') {
      Swal.fire({
        // title: '친구요청을 이미 보내거나 받았어요!',
        text: '친구요청을 이미 보내거나 받았어요!',
        showCancelButton: false,
        confirmButtonText: '확인',
        cancelButtonText: '취소!',
      }).then((result) => {
        console.log(result)
      })
    }
    if (res.data.msg === '존재하지 않는 아이디입니다.') {
      Swal.fire({
        title: '해당 닉네임이 없어요!',
        text: '다른 닉네임으로 검색해부자!',
        showCancelButton: false,
        confirmButtonText: '확인',
        cancelButtonText: '취소!',
      }).then((result) => {
        console.log(result)
      })
    }
    return res
  })
}
export const useSearchFriend = () => {
  return useMutation(searchFriends, {
    onSuccess: (data) => {
      // window.location.href('/')
      console.log(data)
      return data
    },
    onError: (data) => {
      return data
    },
  })
}
