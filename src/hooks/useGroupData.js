import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios'

export const useGroupData = (toggle, navigate, onSuccess, onError) => {
  return useQuery(
    ['group-data', navigate, toggle],
    () => {
      return request({ url: '/money/group', method: 'get' })
    },
    onSuccess,
    onError,
  )
}
