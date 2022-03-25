import { useQuery, useMutation, useQueryClient } from 'react-query'
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

export const alarmAccept = (id) => {
  return request({ url: `/alarm/goal/accept/${id}`, method: 'post'})
}

export const alarmRefuse = (id) => {
  return request({ url: `/alarm/goal/refuse/${id}`, method: 'post' })
}
export const alarmDelete = (id) => {
  return request({ url: `/alarm/delete/${id}`, method: 'delete' })
}


export const alarmFriendAccept = (nickname) => {
  return request({ url: `/alarm/firend/accept/${nickname}`, method: 'post' })
}
export const alarmFriendRefuse = (nickname) => {
  return request({ url: `/alarm/firend/refuse/${nickname}`, method: 'post' })
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
