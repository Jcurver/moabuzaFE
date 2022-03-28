import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router';
import { request } from '../utils/axios'

export const useAlertsFriendData = (navigate) => {
  return useQuery(['alerts-friend', navigate], () => {
    return request({ url: '/alarm/friend', method: 'get' })
  })
}

export const useAlertsGroupData = (navigate) => {
  return useQuery(['alerts-group', navigate], () => {
    return request({ url: '/alarm/group', method: 'get' })
  })
}


export const useAlertsChallengeData = (navigate) => {
  return useQuery(['alerts-challenge', navigate], () => {
    return request({ url: '/alarm/challenge', method: 'get' })
  })
}

export const alarmChallengeAccept = (id) => {
  return request({ url: `/challenge/${id}/accept`, method: 'post'})
}

export const alarmChallengeRefuse = (id) => {
  return request({ url: `/challenge/${id}/refuse`, method: 'post' })
}

export const alarmGroupAccept = (id) => {
  return request({ url: `/group/${id}/accept`, method: 'post' })
}

export const alarmGroupRefuse = (id) => {
  return request({ url: `/group/${id}/refuse`, method: 'post' })
}

export const alarmDelete = (id) => {

  return request({ url: `/alarm/${id}`, method: 'delete' }).then((res)=>console.log("알람삭제ㅣ:::",res))
}


export const alarmFriendAccept = (nickname) => {
  return request({
    url: `/firend/accept`, method: 'post', data: {
    friendNickname:nickname
  } })
}
export const alarmFriendRefuse = (nickname) => {
  return request({
    url: `/firend/refuse`, method: 'post', data: {
    friendNickname:nickname
  } })
}



// export const useAcceptGroup = () => {
//   const queryClient = useQueryClient()
//   return useMutation(acceptGroup, {
    
//     onMutate: async (newHero) => {
//       await queryClient.cancelQueries('alerts-group')
//       const previousHeroData = queryClient.getQueryData('alerts-group')
//       queryClient.setQueryData('alerts-group', (oldQueryData) => {
//         return {
//           ...oldQueryData,
//           data: [
//             ...oldQueryData.data,
//             // { id: oldQueryData?.data?.length + 1, ...newHero },
//           ],
//         }
//       })
//       return { previousHeroData }
//     },
//     onError: (_err, _newTodo, context) => {
//       queryClient.setQueryData('alerts-group', context.previousHeroData)
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries('alerts-group')
//     },
//   })
// }

// export const useOnedayPageData = (date) => {
//   useMutation(() => {
//     return request({
//       url: '/money/dayList',
//       method: 'post',
//       data: { recordDate: date },
//     })
//   })
// }
