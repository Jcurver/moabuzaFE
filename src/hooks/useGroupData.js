import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios'

export const useGroupData = (navigate) => {
  return useQuery(['group-data', navigate], () => {
    return request({ url: '/money/group', method: 'get' })
  })
}
